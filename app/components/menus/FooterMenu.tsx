import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

/**
 * Component to render a footer menu.
 *
 * @returns {FunctionComponent} The footer menu component.
 */
export const FooterMenu: FunctionComponent = () => {
    /** Access to translations. */
    const { t } = useTranslation();

    return (
        <div className="flex w-full py-2 px-8 items-center">
            <Link href="" passHref>
                <a className="text-xxs">{t('Imprint')}</a>
            </Link>
            <Link href="" passHref>
                <a className="text-xxs ml-3">{t('Privacy')}</a>
            </Link>
        </div>
    );
};
