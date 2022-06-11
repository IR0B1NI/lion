import React, { FunctionComponent, ReactNode } from 'react';

import { TopMenu } from '../menus/TopMenu';

interface IBasicLayoutProps {
    /** The children to render. */
    children: ReactNode;
}

/**
 * Basic layout that is rendered around it's child components.
 *
 * @param {IBasicLayoutProps} props The properties of the basic layout.
 * @returns {FunctionComponent} The basic layout component.
 */
export const BasicLayout: FunctionComponent<IBasicLayoutProps> = (props) => {
    return (
        <div className="flex flex-1 flex-col max-h-screen">
            <TopMenu />
            <div className="flex flex-1 flex-col bg-gray-50">{props.children}</div>
        </div>
    );
};
