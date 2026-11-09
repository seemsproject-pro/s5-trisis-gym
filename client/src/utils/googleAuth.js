/**
 * Google Cloud Console OAuth 2.0 & Google Identity Services (GIS) Helper
 * Mendukung OAuth 2.0 Web Client resmi dari Google Cloud Console:
 * https://console.cloud.google.com/apis/credentials
 */

const STORAGE_KEY = 'trisis_google_client_id';

export function getGoogleClientId() {
  const envId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (envId && envId.trim()) return envId.trim();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim()) return stored.trim();
  return '248186594719-50j0kdl1p3838eumsmsv4md4fj2tc668.apps.googleusercontent.com';
}

export function setGoogleClientId(clientId) {
  if (clientId && clientId.trim()) {
    localStorage.setItem(STORAGE_KEY, clientId.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function isGoogleClientConfigured() {
  const id = getGoogleClientId();
  return Boolean(id && id.includes('.apps.googleusercontent.com'));
}

/**
 * Memicu Google OAuth 2.0 Popup resmi menggunakan Google Identity Services SDK
 * Membuka jendela dialog autentikasi Google accounts.google.com
 */
export function triggerGoogleOAuth({ onSuccess, onError }) {
  const clientId = getGoogleClientId();

  if (!clientId || !clientId.includes('.apps.googleusercontent.com')) {
    if (onError) onError(new Error('Google Client ID belum dikonfigurasi. Silakan atur Google Cloud Client ID terlebih dahulu.'));
    return;
  }

  if (!window.google?.accounts?.oauth2) {
    if (onError) onError(new Error('Google Identity Services SDK sedang dimuat. Silakan coba sesaat lagi.'));
    return;
  }

  try {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'email profile openid',
      prompt: 'select_account',
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          if (onError) onError(new Error('Autentikasi Google Cloud dibatalkan atau gagal: ' + tokenResponse.error));
          return;
        }

        try {
          // Ambil data profil terverifikasi langsung dari endpoint resmi Google
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
          });

          if (!res.ok) {
            throw new Error('Gagal mengambil data profil dari Google API.');
          }

          const userInfo = await res.json();
          if (onSuccess) {
            onSuccess({
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              googleId: userInfo.sub,
              credential: tokenResponse.access_token
            });
          }
        } catch (fetchErr) {
          if (onError) onError(fetchErr);
        }
      }
    });

    tokenClient.requestAccessToken();
  } catch (err) {
    if (onError) onError(err);
  }
}
