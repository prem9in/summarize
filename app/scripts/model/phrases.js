import Base from 'model/base';
import helper from 'service/helper';

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
            "initialized": false
        }
    }

   fetch() {
       return super.fetch(helper.getTextAnalyticsReuestOptions());
    }

    parse(response, options) {
        if (response && response.KeyPhrasesBatch && response.KeyPhrasesBatch.length > 0) {
            return {KeyPhrases: response.KeyPhrasesBatch[0].KeyPhrases, initialized: true};
        } else {
            return {KeyPhrases: [], initialized: true};
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