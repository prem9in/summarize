import uistatus from 'model/uistatus';
import sentiment from 'model/sentiment';
import textDocument from 'model/textdocument';
import phrases from 'model/phrases';
import $ from 'jquery';

class Dependencies {
    constructor() {
        textDocument.on('change', () => {
            uistatus.set({messageKey: 'Analyzing'});
            let sentiFetch = sentiment.fetch();
            let phraseFetch = phrases.fetch();
            $.when(sentiFetch, phraseFetch)
                .done(()=>{
                    uistatus.set({messageKey: 'AnalyzeComplete'});
                })
                .fail(()=>{
                    if (sentiFetch.state() == 'rejected') {
                        uistatus.set({messageKey: 'SentimentGetFailed'});
                    } else if (phraseFetch.state() == 'rejected') {
                        uistatus.set({messageKey: 'PhraseGetFailed'});
                    }
                });
        });
    }
}

const dependencies = new Dependencies();
export {
    dependencies
    as default
};
