package fr.esiee.toeicgrammaire;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageInstaller;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * L'application est une page web locale (assets/www) affichée dans une WebView :
 * tout fonctionne hors ligne et la progression est gardée dans le localStorage.
 *
 * Au démarrage, l'appli lit le fichier version.json de la dernière Release GitHub
 * (publiée par le workflow « Build APK ») et propose d'installer la nouvelle version.
 */
public class MainActivity extends Activity {

    private static final String RELEASES =
            "https://github.com/Atcpowaaa/TOEIC_Grammaire/releases/latest/download/";
    private static final String ACTION_INSTALL_STATUS = "fr.esiee.toeicgrammaire.INSTALL_STATUS";

    private WebView webView;
    // Mise à jour en attente pendant que l'utilisateur autorise les « sources inconnues ».
    private JSONObject pendingUpdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setTextZoom(100);

        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new Bridge(), "Android");

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            webView.loadUrl("file:///android_asset/www/index.html");
            checkForUpdate(false);
        }
        handleInstallStatus(getIntent());
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (pendingUpdate != null && getPackageManager().canRequestPackageInstalls()) {
            JSONObject info = pendingUpdate;
            pendingUpdate = null;
            startUpdate(info);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleInstallStatus(intent);
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        // La navigation de l'appli passe par le #hash : on remonte l'historique de la WebView.
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    /** Fonctions appelées depuis la page web (écran Statistiques). */
    private class Bridge {
        @JavascriptInterface
        public String version() {
            try {
                return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
            } catch (PackageManager.NameNotFoundException e) {
                return "";
            }
        }

        @JavascriptInterface
        public void checkUpdate() {
            runOnUiThread(() -> checkForUpdate(true));
        }
    }

    // ------------------------------------------------------------------ vérification

    private void checkForUpdate(boolean manual) {
        if (manual) toast("Recherche d'une mise à jour…");
        new Thread(() -> {
            try {
                JSONObject info = new JSONObject(new String(download(RELEASES + "version.json"), StandardCharsets.UTF_8));
                if (info.getLong("versionCode") > currentVersionCode()) {
                    runOnUiThread(() -> showUpdateDialog(info));
                } else if (manual) {
                    runOnUiThread(() -> toast("Tu as déjà la dernière version."));
                }
            } catch (Exception e) {
                // Pas de réseau ou pas encore de Release : l'appli fonctionne normalement.
                if (manual) runOnUiThread(() -> toast("Impossible de vérifier les mises à jour pour le moment."));
            }
        }).start();
    }

    @SuppressWarnings("deprecation")
    private long currentVersionCode() throws PackageManager.NameNotFoundException {
        PackageInfo info = getPackageManager().getPackageInfo(getPackageName(), 0);
        return Build.VERSION.SDK_INT >= 28 ? info.getLongVersionCode() : info.versionCode;
    }

    private void showUpdateDialog(JSONObject info) {
        if (isFinishing()) return;
        String name = info.optString("versionName", "");
        String notes = info.optString("notes", "");
        new AlertDialog.Builder(this)
                .setTitle("Mise à jour disponible" + (name.isEmpty() ? "" : " : version " + name))
                .setMessage((notes.isEmpty() ? "" : notes + "\n\n") + "Ta progression sera conservée.")
                .setPositiveButton("Mettre à jour", (dialog, which) -> startUpdate(info))
                .setNegativeButton("Plus tard", null)
                .show();
    }

    // ------------------------------------------------------------------ installation

    private void startUpdate(JSONObject info) {
        if (!getPackageManager().canRequestPackageInstalls()) {
            // Android demande une autorisation unique pour qu'une appli puisse installer des APK.
            pendingUpdate = info;
            toast("Autorise « TOEIC Grammaire » à installer des applis, puis reviens en arrière.");
            startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getPackageName())));
            return;
        }
        toast("Téléchargement de la mise à jour…");
        new Thread(() -> {
            try {
                File apk = new File(getCacheDir(), "update.apk");
                try (OutputStream out = new FileOutputStream(apk)) {
                    out.write(download(RELEASES + info.optString("apk", "TOEIC-Grammaire.apk")));
                }
                install(apk);
            } catch (Exception e) {
                runOnUiThread(() -> toast("Le téléchargement de la mise à jour a échoué."));
            }
        }).start();
    }

    private void install(File apk) throws IOException {
        PackageInstaller installer = getPackageManager().getPackageInstaller();
        PackageInstaller.SessionParams params =
                new PackageInstaller.SessionParams(PackageInstaller.SessionParams.MODE_FULL_INSTALL);
        int sessionId = installer.createSession(params);
        try (PackageInstaller.Session session = installer.openSession(sessionId)) {
            try (InputStream in = new FileInputStream(apk);
                 OutputStream out = session.openWrite("update", 0, apk.length())) {
                byte[] buffer = new byte[65536];
                int n;
                while ((n = in.read(buffer)) > 0) out.write(buffer, 0, n);
                session.fsync(out);
            }
            Intent status = new Intent(this, MainActivity.class).setAction(ACTION_INSTALL_STATUS);
            int flags = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 31 ? PendingIntent.FLAG_MUTABLE : 0);
            session.commit(PendingIntent.getActivity(this, 0, status, flags).getIntentSender());
        }
    }

    @SuppressWarnings("deprecation")
    private void handleInstallStatus(Intent intent) {
        if (intent == null || !ACTION_INSTALL_STATUS.equals(intent.getAction())) return;
        int status = intent.getIntExtra(PackageInstaller.EXTRA_STATUS, PackageInstaller.STATUS_FAILURE);
        if (status == PackageInstaller.STATUS_PENDING_USER_ACTION) {
            // Écran système « Voulez-vous mettre à jour cette application ? ».
            Intent confirm = intent.getParcelableExtra(Intent.EXTRA_INTENT);
            if (confirm != null) startActivity(confirm);
        } else if (status != PackageInstaller.STATUS_SUCCESS && status != PackageInstaller.STATUS_FAILURE_ABORTED) {
            String message = intent.getStringExtra(PackageInstaller.EXTRA_STATUS_MESSAGE);
            new AlertDialog.Builder(this)
                    .setTitle("Mise à jour impossible")
                    .setMessage("L'installation a échoué" + (message != null ? " (" + message + ")" : "") + ".\n\n"
                            + "Si cela se reproduit, désinstalle l'appli puis installe la nouvelle version depuis GitHub.")
                    .setPositiveButton("OK", null)
                    .show();
        }
    }

    // ------------------------------------------------------------------ utilitaires

    private static byte[] download(String url) throws IOException {
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setConnectTimeout(8000);
        connection.setReadTimeout(20000);
        connection.setInstanceFollowRedirects(true);
        try {
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new IOException("HTTP " + connection.getResponseCode());
            }
            try (InputStream in = connection.getInputStream()) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                byte[] buffer = new byte[65536];
                int n;
                while ((n = in.read(buffer)) > 0) out.write(buffer, 0, n);
                return out.toByteArray();
            }
        } finally {
            connection.disconnect();
        }
    }

    private void toast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }
}
