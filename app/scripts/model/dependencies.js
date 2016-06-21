import uistatus from 'model/uistatus';
import sentiment from 'model/sentiment';
import textDocument from 'model/textdocument';
import phrases from 'model/phrases';
import sentences from 'model/documentsentences';
import words from 'model/documentwords';
import summary from 'model/summary';
import $ from 'jquery';

class Dependencies {

    constructor() {
        textDocument.on('change', () => {
            uistatus.set({messageKey: 'Analyzing'});
            let sentenceFetch = sentences.fetch();
            let sentiFetch = sentiment.fetch();
            let phraseFetch = phrases.fetch();
            $.when(sentiFetch, phraseFetch, sentenceFetch)
                .done(()=>{
                    this.registerSummary();
                    uistatus.set({messageKey: 'AnalyzeComplete'});
                })
                .fail(()=>{
                    this.registerSummary();
                    if (sentiFetch.state() == 'rejected') {
                        uistatus.set({messageKey: 'SentimentGetFailed'});
                    } else if (phraseFetch.state() == 'rejected') {
                        uistatus.set({messageKey: 'PhraseGetFailed'});
                    }
                });
        });

    }

    registerSummary() {
        let wordsFetch = words.fetch();
        $.when(wordsFetch).done(()=>{
            summary.fetch();
        }).fail(()=>{
            summary.fetch();
        });
    }
}

const dependencies = new Dependencies();
export {
    dependencies
    as default
};
