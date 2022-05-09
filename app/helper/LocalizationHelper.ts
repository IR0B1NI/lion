import i18next, { i18n, InitOptions } from 'i18next';
import I18NextHttpBackend, { BackendOptions } from 'i18next-http-backend';

/**
 * Singleton instance.
 */
let instance: i18n | undefined;

/**
 * The backend options regarding i18next.
 */
const backendOptions: BackendOptions = {
    loadPath: '/api/locales/{{lng}}',
    allowMultiLoading: false,
    crossDomain: false,
    withCredentials: false,
    requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
    },
    reloadInterval: false,
};

/**
 * The initialization options for i18next.
 */
const initOptions: InitOptions = {
    lng: 'en',
    fallbackLng: 'en',
    backend: backendOptions,
    cache: {
        enabled: true,
    },
};

/**
 * Initialize the singleton.
 * 
 * @param {string} languageShortKey The requested language short key to use for the initialization.
 * @returns {Promise<i18n>} The promise of the i18n instance.
 */
export const initialize = async (languageShortKey?: string): Promise<i18n> => {
    if (!instance) {
        if (languageShortKey && languageShortKey !== '') {
            initOptions.lng = languageShortKey;
        }
        if (initOptions.lng) {
            // Initially set the html lang tag based on the stored language.
            document.documentElement.lang = initOptions.lng;
        }
        await i18next.use(I18NextHttpBackend).init(initOptions);
        instance = i18next;
    }
    return instance;
};

export default instance;
