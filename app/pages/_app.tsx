import '../styles/global-styles.css';

import { StoreProvider } from 'easy-peasy';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { FunctionComponent, useEffect } from 'react';

import { Store } from '../store/Store';

/**
 * The main entry point of the next js application.
 *
 * @param {AppProps} param0 The properties of the app component.
 * @returns {FunctionComponent} The application component.
 */
const App: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => {
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

    return (
        /* @ts-expect-error: Ignore no children prop error. */
        <StoreProvider store={Store}>
            <CustomHead />
            <Component {...pageProps} />
        </StoreProvider>
    );
};

export default appWithTranslation(App);
