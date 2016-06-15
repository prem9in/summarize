import Base from 'model/base';
import helper from 'service/helper';

'use strict';

class Sentiment extends Base {

    get idAttribute() {
        return 'id';
    }

    get url() {
        return helper.getTextAnalyticsUrl('GetSentimentBatch');
    }

    defaults() {
        return {
           "Score": -1,
            "initialized": false,
            "Error": null
        }
    }

    fetch() {
        return super.fetch(helper.getTextAnalyticsReuestOptions());
    }

    parse(response, options) {
        if (response && response.SentimentBatch && response.SentimentBatch.length > 0) {
            return {Score: response.SentimentBatch[0].Score, initialized: true, Error: null};
        } else if (response && response.Errors && response.Errors.length > 0) {
            return {Score: -1, initialized: true, Error: response.Errors[0].Message};
        } else {
            return {Score: -1, initialized: true, Error: null};
        }
    }

    save() {
        throw 'Save is not supported on Sentiment';
    }
}

const sentiment = new Sentiment();
export {
    sentiment as
    default
};
