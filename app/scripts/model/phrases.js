import Base from 'model/base';
import helper from 'service/helper';
import extractor from 'model/extractor';

'use strict';

class Phrases extends Base {

    get idAttribute() {
        return 'id';
    }

    get url() {
        return helper.getTextAnalyticsUrl('GetKeyPhrasesBatch');
    }

    defaults() {
        return {
            "KeyPhrases": [],
            "KeyPhrasesTitle": [],
            "initialized": false,
            "Error": null
        }
    }

   fetch() {
       return super.fetch(helper.getTextAnalyticsReuestOptions());
    }

    parse(response, options) {
        let result = {};
        if (response) {
            if (response.KeyPhrasesBatch && response.KeyPhrasesBatch.length > 0) {
                result = {KeyPhrases: [], KeyPhrasesTitle: [], initialized: true, Error: null};
                for (let item of response.KeyPhrasesBatch) {
                    let kphrases = extractor.ignorePhrases(item.KeyPhrases);
                    switch (item.Id) {
                        case "Content":
                            result.KeyPhrases = kphrases;
                            break;
                        case "Title":
                            result.KeyPhrasesTitle = kphrases;
                            break;
                    }
                }
            }
            if (response.Errors && response.Errors.length > 0) {
                let err = '';
                for (let error of response.Errors) {
                    err += ', Field: ' + error.Id + ': ' + error.Message;
                }
                err = err.remove(0, 1);
                result = _.extend(result, {initialized: true, Error: err});
            }
        } else {
            result = {KeyPhrases: [], KeyPhrasesTitle: [], initialized: true, Error: null};
        }
        return result;
    }

    save() {
        throw 'Save is not supported on Phrases';
    }
}

const phrases = new Phrases();
export {
    phrases as
    default
};
