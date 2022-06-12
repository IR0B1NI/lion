import { TranslateIcon } from '@heroicons/react/solid';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useState } from 'react';

import { useStoreActions, useStoreState } from '../store/Store';

/**
 * The icon to use for the language selection opening button.
 */
const icon = <TranslateIcon className="h-5 w-5 text-black" />;

/**
 * Properties of the custom button.
 */
interface ILanguageButtonProps {
    /** Whether this is the active language or not. */
    isActiveLanguage: boolean;
    /** The aria label to use. */
    ariaLabel: string;
    /** The text to render. */
    text: string;
    /** The on click callback. */
    onClick: () => void;
}

/**
 * Custom button component for the language list.\
 *
 * @param {object} props The properties of the custom button.
 * @returns {FunctionComponent} The styled button component to choose a language.
 */
const LanguageButton: FunctionComponent<ILanguageButtonProps> = (props) => (
    <button aria-label={props.ariaLabel} disabled={props.isActiveLanguage} className="py-2 px-6 min-w-full" onClick={props.onClick}>
        {props.text}
    </button>
);

/**
 * Component to select and switch the application display language.
 *
 * @returns {FunctionComponent} The language selector component.
 */
export const LanguageSelector: FunctionComponent = () => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();
    /** Access to the next js router. */
    const router = useRouter();

    /** The globally stored user settings. */
    const userSettings = useStoreState((state) => state.UserModel.userSettings);
    /** Action to update the globally stored user settings. */
    const updateUserSettings = useStoreActions((actions) => actions.UserModel.updateUserSettings);

    /** Whether the popover is open or not. */
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    /**
     * Update the language in the user settings.
     *
     * @param {string} languageShortKey The short key of the desired language.
     */
    const updateLanguageSetting = (languageShortKey: string) => {
        if (!userSettings) {
            return;
        }
        // Update the global user settings.
        userSettings.language = languageShortKey;
        updateUserSettings({ ...userSettings });
    };

    return (
        <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={(open: boolean) => setIsPopoverOpen(open)}>
            <PopoverPrimitive.Trigger asChild>
                <button aria-label={t('Language_Button_Aria_Label')} className="p-2 rounded-full" onClick={() => setIsPopoverOpen(true)}>
                    {icon}
                </button>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content align="start">
                <div className="flex flex-1 z-30 shadow rounded-lg bg-white">
                    <ul className="list-none">
                        <li>
                            <Link href={router.asPath} locale={'en'}>
                                <a>
                                    <LanguageButton
                                        ariaLabel={t('Language_Button_En_Aria_Label')}
                                        isActiveLanguage={i18n.language === 'en'}
                                        text={t('Language_Option_En')}
                                        onClick={() => updateLanguageSetting('en')}
                                    />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={router.asPath} locale={'de'}>
                                <a>
                                    <LanguageButton
                                        ariaLabel={t('Language_Button_De_Aria_Label')}
                                        isActiveLanguage={i18n.language === 'de'}
                                        text={t('Language_Option_De')}
                                        onClick={() => updateLanguageSetting('de')}
                                    />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
    );
};
