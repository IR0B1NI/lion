import { TranslateIcon } from '@heroicons/react/solid';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStoreActions, useStoreState } from '../store/Store';

/**
 * Component to select and switch the application display language.
 *
 * @returns {FunctionComponent} The language selector component.
 */
export const LanguageSelector: FunctionComponent = () => {
    /** Access to translations. */
    const { t, i18n } = useTranslation();

    /** Whether the popover is open or not. */
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    /** Global state of the user settings. */
    const userSettings = useStoreState((state) => state.UserModel.userSettings);
    /** Action to update the global user settings. */
    const updateUserSettings = useStoreActions((actions) => actions.UserModel.updateUserSettings);

    /**
     * The icon to use for the language selection opening button.
     */
    const icon = <TranslateIcon className="h-5 w-5 text-black" />;

    /**
     * Properties of the custom button.
     */
    interface ILanguageButtonProps {
        /** The text to render. */
        text: string;
        /** On click event of the button. */
        onClick: () => void;
        /** Whether this is the active language or not. */
        isActiveLanguage: boolean;
        /** The aria label to use. */
        ariaLabel: string;
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
     * Switch the language.
     *
     * @param {string} languageShortKey The short key of the desired language.
     */
    const switchLanguage = (languageShortKey: string) => {
        if (!userSettings) {
            return;
        }
        // Switch the language.
        i18n.changeLanguage(languageShortKey);
        // Update the global user settings.
        userSettings.language = languageShortKey;
        updateUserSettings({ ...userSettings });
        // Update the html lang tag.
        document.documentElement.lang = userSettings.language;
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
                            <LanguageButton
                                ariaLabel={t('Language_Button_En_Aria_Label')}
                                isActiveLanguage={i18n.language === 'en'}
                                text={t('Language_Option_En')}
                                onClick={() => {
                                    switchLanguage('en');
                                    setIsPopoverOpen(false);
                                }}
                            />
                        </li>
                        <li>
                            <LanguageButton
                                ariaLabel={t('Language_Button_De_Aria_Label')}
                                isActiveLanguage={i18n.language === 'de'}
                                text={t('Language_Option_De')}
                                onClick={() => {
                                    switchLanguage('de');
                                    setIsPopoverOpen(false);
                                }}
                            />
                        </li>
                    </ul>
                </div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
    );
};
