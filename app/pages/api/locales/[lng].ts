import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import en from '../../../assets/translations/en.json';
import de from '../../../assets/translations/de.json';

/**
 * Endpoint to fetch the content for the requested language key.
 *
 * @param {NextApiRequest} req The access to the request.
 * @param {NextApiResponse} res The access to the response.
 */
const get: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const { lng } = req.query;
    let translations: object;
    switch (lng) {
        case 'de':
            translations = de;
            logDifferenceToDefault('de', translations);
            break;
        case 'en':
            translations = en;
            logDifferenceToDefault('en', translations);
            break;
        default:
            translations = en;
            break;
    }
    // Return the stage specific configuration.
    res.status(200).json(translations);
};

/**
 * Log the difference of the number of language keys between the default and the requested language.
 *
 * @param {string} languageShort The language short key.
 * @param {object} requestedLanguage The language object that is requested.
 */
const logDifferenceToDefault = (languageShort: string, requestedLanguage: object) => {
    const defaultLength = Object.keys(en).length;
    const requestedLanguageLength = Object.keys(requestedLanguage).length;
    if (defaultLength > requestedLanguageLength) {
        console.warn(`WARNING - Thg language ${languageShort} has ${defaultLength - requestedLanguageLength} keys less than the default!`);
    }
};

export default get;
