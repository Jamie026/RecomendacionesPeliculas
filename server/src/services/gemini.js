const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const TMDB_GENRES = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    science_fiction: 878,
    thriller: 53,
    war: 10752,
    western: 37,
};

const parseSearchQuery = async (userInput) => {
    const prompt =
        'Given this movie search request: "' +
        userInput +
        '". ' +
        'Return a JSON object with two fields: ' +
        '1. "genres": array of genre keys from this list: ' +
        Object.keys(TMDB_GENRES).join(', ') +
        '. Max 3 genres. ' +
        '2. "keywords": a short English search phrase of max 3 words. ' +
        'Respond ONLY with valid JSON, no markdown, no explanation. ' +
        'Example: {"genres":["horror","thriller"],"keywords":"psychological fear"}';

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const parsed = JSON.parse(text);

    return {
        genreIds: parsed.genres.map((g) => TMDB_GENRES[g]).filter(Boolean),
        keywords: parsed.keywords,
    };
};

module.exports = { parseSearchQuery, TMDB_GENRES };
