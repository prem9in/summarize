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
            "initialized": false,
            "Error": null
        }
    }

   fetch() {
       return super.fetch(helper.getTextAnalyticsReuestOptions());
    }

    parse(response, options) {
        if (response && response.KeyPhrasesBatch && response.KeyPhrasesBatch.length > 0) {
            let kphrases = response.KeyPhrasesBatch[0].KeyPhrases;
            kphrases = extractor.ignorePhrases(kphrases);
            return {KeyPhrases: kphrases, initialized: true, Error: null};
        } else if (response && response.Errors && response.Errors.length > 0) {
            return {KeyPhrases: [], initialized: true, Error: response.Errors[0].Message};
        } else {
            return {KeyPhrases: [], initialized: true, Error: null};
        }
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
