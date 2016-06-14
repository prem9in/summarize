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
            "initialized": false
        }
    }

    fetch() {
        return super.fetch(helper.getTextAnalyticsReuestOptions());
    }

    parse(response, options) {
        if (response && response.SentimentBatch && response.SentimentBatch.length > 0) {
            return {Score: response.SentimentBatch[0].Score, initialized: true};
        } else {
            return {Score: -1, initialized: true};
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
