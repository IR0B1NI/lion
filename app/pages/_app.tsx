import '../styles/global-styles.css';

import { StoreProvider } from 'easy-peasy';
import { i18n } from 'i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getBrowserLanguageCodeShort } from '../helper/BrowserHelper';
import { initialize } from '../helper/LocalizationHelper';
import { Store } from '../store/Store';

/**
 * The main entry point of the next js application.
 *
 * @param {AppProps} param0 The properties of the app component.
 * @returns {FunctionComponent} The application component.
 */
const App: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => {
    /** The state of the i18n instance. */
    const [i18nInstance, setI18nInstance] = useState<i18n | undefined>(undefined);
    /** The public url to use for the open graph image access. */
    const openGraphImageUrl = 'https://robin-thoene.com/open-graph.png';

    /**
     * Initialize the application.
     */
    useEffect(() => {
        const storedSettingsString = localStorage.getItem('userSettings');
        Store.getActions().UserModel.updateUserSettings(
            storedSettingsString
                ? JSON.parse(storedSettingsString)
                : {
                    language: '',
                }
        );
        const storedUserSettings = storedSettingsString ? JSON.parse(storedSettingsString) : undefined;
        if (storedUserSettings) {
            Store.getActions().UserModel.updateUserSettings(storedUserSettings);
        }
        const initLanguage = Store.getState().UserModel.userSettings?.language ? Store.getState().UserModel.userSettings?.language : getBrowserLanguageCodeShort();
        // Initialize i18next.
        initialize(initLanguage).then((i) => {
            setI18nInstance(i);
        });
    }, []);

    /**
     * The custom head component.
     *
     * @returns {FunctionComponent} The custom html head to render.
     */
    const CustomHead = () => (
        <Head>
            <title>Robin Thöne</title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="description" content="Robin Thöne - Software Developer." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="Robin Thöne" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Robin Thöne - Software Developer." />
            <meta property="og:image" content={openGraphImageUrl} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="de_DE" />
            <meta name="google-site-verification" content="6E4fkyF9xXTXSHWCY2loZyjTPYV3DS6rMEEXRBuW0TU" />
        </Head>
    );

    return i18nInstance ? (
        /* @ts-expect-error: Ignore no children prop error. */
        <StoreProvider store={Store}>
            <I18nextProvider i18n={i18nInstance}>
                <CustomHead />
                <Component {...pageProps} />
            </I18nextProvider>
        </StoreProvider>
    ) : (
        <CustomHead />
    );
};

export default App;
