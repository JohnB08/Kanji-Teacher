export const dummydata = {
    "Qy8Y7izWhNS66chGKtVvclx4Zr53": {
        "卡": {
            "correctTranslation": "card",
            "possibleAnswers": ["card", "car", "lard", "bard"]
        },
        "卣": {
            "correctTranslation": "vessel",
            "possibleAnswers": ["vessel", "vassal", "vassil", "bassil"]
        },
        "卥": {
            "correctTranslation": "to rest",
            "possibleAnswers": ["to rest", "to test", "to best", "to vest"]
        },
        "卦": {
            "correctTranslation": "divination",
            "possibleAnswers": ["divination", "apparition", "discovery", "apathy"]
        },
        "卧": {
            "correctTranslation": "to lie down",
            "possibleAnswers": ["to lie down", "to get up", "to strech out", "to bend over"]
        },
        "卨": {
            "correctTranslation": "to cut",
            "possibleAnswers": ["to cut", "to crush", "to lift", "to crack"]
        },
        "卩": {
            "correctTranslation": "seal",
            "possibleAnswers": ["seal", "sale", "sell", "sail"]
        },
        "卪": {
            "correctTranslation": "to bend",
            "possibleAnswers": ["to bend", "to straighten", "to angle", "to crack"]
        }
    },
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
        }
    }
};

export type DummyData = typeof dummydata;

export type DummyDataKeys = keyof DummyData;

export type DummyDataValues = {[K in DummyDataKeys]: DummyData[K]}[DummyDataKeys];

export type DummyDataKanji = {[K in DummyDataKeys]: keyof DummyData[K]}[keyof DummyData];

export interface Dataset{
    [key: string]: {
        correctTranslation: string,
        possibleAnswers: string[]
    }
}