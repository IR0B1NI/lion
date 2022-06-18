import React, { FunctionComponent } from 'react';

/**
 * Interface for the properties of the skill tile component.
 */
export interface ISkillTileProps {
    /** The title of the tile. */
    title: string;
    /** The icon component to use on the tile. */
    icon: JSX.Element;
    /** The hex code of the main color to use for the tile. */
    tileColor: string;
}

/**
 * Display component for one skill.
 * 
 * @param {ISkillTileProps} props The properties of the skill tile.
 * @returns {FunctionComponent} The rendered skill component.
 */
export const SkillTile: FunctionComponent<ISkillTileProps> = (props) => {
    return (
        <div style={{ backgroundColor: props.tileColor }} className="flex flex-col justify-center items-center rounded-lg w-44 p-7 shadow">
            <div className="flex justify-center bg-gray-50 rounded-full w-16 h-16 p-2">
                <div className="flex justify-center items-center max-w-max max-h-full">{props.icon}</div>
            </div>
            <div className="flex justify-center mt-3 text-base font-bold text-black rounded-full bg-gray-50 px-3 py-1">{props.title}</div>
        </div>
    );
};
