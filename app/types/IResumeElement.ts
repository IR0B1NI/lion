import { ResumeElementType } from './ResumeElementType';

export interface IResumeElement {
    /** The translation key for the position. */
    positionKey: string;
    /** The name of the city. */
    city: string;
    /** The key of the country. */
    countryKey: string;
    /** The name of the institution. */
    institution: string;
    /** The web link of the institution. */
    institutionLink?: string;
    /** The start date. */
    startDate: Date | string;
    /** The end date. */
    endDate?: Date | string;
    /** The key of the text to display regarding this resume element. */
    textKey?: string;
    /** Whether the element is work experience or education data. */
    resumeElementType: ResumeElementType;
}
