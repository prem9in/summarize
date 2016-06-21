'use strict';
class Resources {
    constructor() {
        this.resources = new Map();

        // in future we can load localized text files .. at present setting this via code.
        this.resources.set('LoadingMsg', 'Loading ...');  
        this.resources.set('sourceinputlabel', 'Enter document url here:');
        this.resources.set('sourceinputplaceholder', 'document url');
        this.resources.set('sourceSubmit', 'Submit');
        this.resources.set('SentimentTitle', 'Overall sentiment of source document');
        this.resources.set('SentimentScore', 'Document score');
        this.resources.set('PhraseTitle', 'Key phrases in this document');
        this.resources.set('KeyPhrases', 'Phrases list');
        this.resources.set('ReadDocumentStarted', 'Loading document from url..');
        this.resources.set('ReadDocumentCompleted', 'Document loaded successfully.');
        this.resources.set('ReadDocumentFailed', 'Document could not be loaded. Please check the URL.');
        this.resources.set('NoPhrases', 'Summarize could not determine key phrases in document');
        this.resources.set('NoSentimentScore', 'Summarise could not determine overall sentiment for this document');
        this.resources.set('Analyzing', 'Summarize is analyzing the document.');
        this.resources.set('AnalyzeComplete', 'Summarize finished analyzing the document.');
        this.resources.set('SentimentGetFailed', 'Summarize could not determine overall sentiment for this document');
        this.resources.set('NoSentimentTitleScore', 'Summarize could not determine overall sentiment for title of this document');
        this.resources.set('PhraseGetFailed', 'Summarize could not determine key phrases in document');
        this.resources.set('NoPhraseTitle', 'Summarize could not determine key phrases for title of this document');
        this.resources.set('TextDocumentTitle', 'Extracted text from source');
        this.resources.set('NoTextDocument', 'Extracted text from source has no content.');
        this.resources.set('TextDocumentLength', 'Document Length: ');
        this.resources.set('TextDocumentChars', ' characters');
        this.resources.set('AutoDetect', 'Auto Detect');
        this.resources.set('HindustanTimes', 'Hindustan Times');
        this.resources.set('FinancialExpress', 'Financial Express');
        this.resources.set('TOI', 'Times of India');
        this.resources.set('Custom', 'Custom');
        this.resources.set('SelectExtractor', 'Select extractor:');
        this.resources.set('Selector', 'Selector');
        this.resources.set('TitleSelector', 'Title selector');
        this.resources.set('SummarySelector', 'Summary selector');
        this.resources.set('SelectorPlaceholder', 'CSS selector for content root element.');
        this.resources.set('TitleSelectorPlaceholder', 'CSS selector for content title element.');
        this.resources.set('SummarySelectorPlaceholder', 'CSS selector for content summary element.');
        this.resources.set('IgnorePhrase', 'Ignore Phrases');
        this.resources.set('IgnorePhrasePlaceholder', 'Comma separated Phrases/Keywords to be ignored.');
        this.resources.set('SentimentContent', 'Sentiment score for content: ');
        this.resources.set('SentimentTitle', 'Sentiment score for title: ');
        this.resources.set('PhraseContent', 'Key phrases in content: ');
        this.resources.set('PhraseTitle', 'Key phrases in title: ');
        this.resources.set('TitleTextDocumentLength', 'Title Length: ');
        this.resources.set('TitleDocument', 'Title: ');
        this.resources.set('Words', 'Words in document');
        this.resources.set('ContentWords', 'Content words');
        this.resources.set('TitleWords', 'Title words');
        this.resources.set('SummaryWords', 'Summary words');
        this.resources.set('Summary', 'Document Summary');
        this.resources.set('NoSummaryfromDocument', 'No summary found in document');
        this.resources.set('SummaryFromDoc', 'Summary on document');
        this.resources.set('SummaryFromKeyPhrase', 'Summary (max 5 sentences) from key phrases in article.');
        this.resources.set('SummaryFromKeyPhraseTitle', 'Summary (max 5 sentences) from key phrases in title.');
        this.resources.set('NoSummaryFromKeyPhrase', 'No summary can be constructed from key phrases in article.');
        this.resources.set('NoSummaryFromKeyPhraseTitle', 'No summary can be constructed from key phrases in title.');
        this.resources.set('SummaryFromRepeatedWords', 'Summary (max 5 sentences) from repeated words (min 5 occurrences)');
        this.resources.set('NoSummaryFromRepeatedWords', 'No summary can be constructed from repeated words in article.');
        this.resources.set('CNN', 'CNN');
    }
   
    getString(key) {
        let result = key;
        if (this.resources.has(key)) {
            return this.resources.get(key);
        }
        else {
            return "Key_Not_found_" + result;
        }
    }
}

const resources = new Resources();
export {
    resources as
    default
};
