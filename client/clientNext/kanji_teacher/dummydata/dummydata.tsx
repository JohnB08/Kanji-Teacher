export const dummydata = {
    "anonymous": {
        "叡": {
            "correctTranslation": "wise",
            "possibleAnswers": ["wise", "dumb", "knowledge", "politician"]
        },
        "叢": {
            "correctTranslation": "thicket",
            "possibleAnswers": ["thicket", "forest", "jungle", "bush"]
        },
        "口": {
            "correctTranslation": "mouth",
            "possibleAnswers": ["mouth", "ear", "nose", "eye"]
        },
        "古": {
            "correctTranslation": "ancient",
            "possibleAnswers": ["ancient", "modern", "new", "old"]
        },
        "句": {
            "correctTranslation": "sentence",
            "possibleAnswers": ["sentence", "word", "paragraph", "essay"]
        },
        "卡": {
            "correctTranslation": "card",
            "possibleAnswers": ["card", "car", "lard", "bard"]
        },
    }
};

export type dataInterface = {
    [key: string]: kanjiData
}

export interface kanjiData {
    correctTranslation: string,
    possibleAnswers: string[]
}

