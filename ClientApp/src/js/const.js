export const NOT_SELECTED = -1;
export const NOT_FOUND_CODE = 404;

export const Category = {
    SentenceCategory: 1,
    PhraseMeaningCategory: 2
};

export const SentenceCategory = {
    Unsorted: 1,
    PhrasalVerbs: 2,
    Verbs: 3,
    Words: 4,
    Phrases: 5,
    Idioms: 6
};

export const PhraseMeaningCategory = {
    Synonims: 1,
    Antonims: 2
};

export const Pages = {
    Files: 1,
    File: 2,
    Phrases: 3,
    Menu: 4,
    Settings: 5,
    NotFound: 6
};

export const CultureCode = {
    Russian: 'ru',
    English: 'en'
};

export const ApiRequest = {
    Localization: {
        GetPage: 'api/localization/page/',
        GetCulture: 'api/localization/culture/',
        UpdateCulture: 'api/localization/culture/'
    },
    Files: {
        Get: 'api/files/',
        GetAllFilesInfo: 'api/files/',
        Add: 'api/files/',
        Delete: 'api/files/'
    },
    Phrases: {
        Get: 'api/phrases/',
        GetNames: 'api/phrases/',
        GetForSentence: 'api/phrases/file/',
        Update: 'api/phrases/',
        Add: 'api/phrases/',
        Delete: 'api/phrases/'
    },
    Categories: {
        Get: 'api/categories/'
    }
}

export const NotificationType = {
    Info: 0,
    Success: 1,
    Warning: 2,
    Error: 3
}