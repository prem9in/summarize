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
        this.resources.set('PhraseGetFailed', 'Summarize could not determine key phrases in document');
        this.resources.set('TextDocumentTitle', 'Extracted text from source');
        this.resources.set('NoTextDocument', 'Extracted text from source has no content.');
        this.resources.set('TextDocumentLength', 'Length: ');
        this.resources.set('TextDocumentChars', ' characters');
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
