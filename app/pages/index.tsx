import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import resumeData from '../assets/resume.json';
import { BasicLayout } from '../components/layouts/BasicLayout';
import { ResumeTimeline } from '../components/ResumeTimeline';
import { SkillTile } from '../components/SkillTile';
import { IResumeElement } from '../types/IResumeElement';

/**
 * Interface for the home page properties.
 */
interface IHomeProps {
    /** The resume data. */
    data: IResumeElement[];
}

/**
 * The page component to render at "/".
 *
 * @param {IHomeProps} props The home page properties.
 * @returns {NextPage} The home page component.
 */
const Home: NextPage<IHomeProps> = (props) => {
    /** Access to translations. */
    const { t } = useTranslation();

    return (
        <BasicLayout>
            <div className="flex flex-1 justify-center">
                <div className="flex flex-1 flex-col max-w-screen-lg py-4 overflow-x-hidden">
                    <div className="mt-20 mb-16">
                        <div className="flex justify-center mask mask-squircle">
                            <Image width={250} height={250} src="/images/profile.jpg" alt={t('ProfileImage_AltText')} />
                        </div>
                        <h1 className="flex justify-center mt-10">Robin Thöne</h1>
                    </div>
                    <h2 className="flex w-full mt-16 mb-7 justify-center">{t('Home_Resume_Headline')}</h2>
                    <ResumeTimeline data={props.data} />
                    <h2 className="flex w-full mt-16 mb-7 justify-center">{t('Home_Skills_Headline')}</h2>
                    <div className="flex flex-wrap justify-center px-4">
                        <div className="m-3">
                            <SkillTile
                                title="Azure"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/azure.svg" alt="Azure" />}
                                tileColor="#2C89D6"
                            />
                        </div>
                        <div className="m-3 flex">
                            <SkillTile
                                title="C#"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/csharp.svg" alt="C#" />}
                                tileColor="#A179DC"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="JavaScript"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/js.svg" alt="JavaScript" />}
                                tileColor="#E6A329"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="TypeScript"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/ts.svg" alt="TypeScript" />}
                                tileColor="#3178C6"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="Git"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/git.svg" alt="Git" />}
                                tileColor="#DE4C36"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="Docker"
                                icon={<Image width={42} height={24} className="bg-transparent rounded-full" src="/images/docker.svg" alt="Docker" />}
                                tileColor="#309AC9"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="HTML"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/html.svg" alt="HTML" />}
                                tileColor="#F15124"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="CSS"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/css.svg" alt="CSS" />}
                                tileColor="#4353AD"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="Java"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/java.svg" alt="Java" />}
                                tileColor="#E76F00"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="React"
                                icon={<Image width={42} height={42} className="bg-transparent rounded-full" src="/images/react.svg" alt="React" />}
                                tileColor="#53C1DE"
                            />
                        </div>
                        <div className="m-3">
                            <SkillTile
                                title="Next.js"
                                icon={<Image width={42} height={24} className="bg-transparent rounded-full" src="/images/nextjs.svg" alt="Next.js" />}
                                tileColor="#000000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

/**
 * Server side executed method to inject properties into the component.
 *
 * @returns {Promise<{props: IHomeProps}>} The props object to inject in the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            data: resumeData as IResumeElement[],
        },
    };
};

export default Home;
