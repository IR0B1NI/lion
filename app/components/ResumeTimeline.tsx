import 'react-vertical-timeline-component/style.min.css';

import { AcademicCapIcon, BriefcaseIcon, ExternalLinkIcon, UserGroupIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import { IResumeElement } from '../types/IResumeElement';
import { ResumeElementType } from '../types/ResumeElementType';

/**
 * Interface for the resume timeline properties.
 */
export interface IResumeTimelineProps {
    /** The data to display. */
    data: IResumeElement[];
}

/**
 * The timeline component to display resume data elements.
 *
 * @param {IResumeTimelineProps} props The properties.
 * @returns {FunctionComponent} The resume timeline component.
 */
export const ResumeTimeline: FunctionComponent<IResumeTimelineProps> = (props) => {
    /** Access to translations. */
    const { t } = useTranslation();
    /** The icon to use for an educational resume element. */
    const EducationIcon = <AcademicCapIcon className="text-black" />;
    /** The icon to use for a work experience resume element. */
    const WorkExperienceIcon = <BriefcaseIcon className="text-black" />;
    /** The icon to use for a social resume element. */
    const SocialIcon = <UserGroupIcon className="text-black" />;
    /** The icon for external links. */
    const ExternalIcon = <ExternalLinkIcon className="h-4 w-4 text-black" />;

    return (
        <VerticalTimeline>
            {props.data.map((re, i) => (
                <VerticalTimelineElement
                    key={`resume-data-${i}`}
                    iconClassName={
                        re.resumeElementType === ResumeElementType.Education
                            ? 'bg-blue-200'
                            : re.resumeElementType === ResumeElementType.WorkExperience
                                ? 'bg-red-200'
                                : re.resumeElementType === ResumeElementType.Social
                                    ? 'bg-green-200'
                                    : 'bg-black'
                    }
                    icon={
                        re.resumeElementType === ResumeElementType.Education
                            ? EducationIcon
                            : re.resumeElementType === ResumeElementType.WorkExperience
                                ? WorkExperienceIcon
                                : re.resumeElementType === ResumeElementType.Social
                                    ? SocialIcon
                                    : null
                    }
                    date={`${new Date(re.startDate).getFullYear()} - ${re.endDate ? new Date(re.endDate).getFullYear() : t('Today')}`}
                >
                    <h3 className="text-black font-bold mb-2">{t(re.positionKey)}</h3>
                    <div className="flex items-center">
                        {re.institution}
                        {re.institutionLink && (
                            <a aria-label={re.institution} className="ml-3" href={re.institutionLink} target="_blank" rel="noreferrer">
                                {ExternalIcon}
                            </a>
                        )}
                    </div>
                    <div>{`${re.city}, ${t(re.countryKey)}`}</div>
                    <p>{re.textKey && t(re.textKey)}</p>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};
