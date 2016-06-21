import Base from 'model/base';
import helper from 'service/helper';
import _ from 'underscore';

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
            "ScoreTitle": -1,
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
            if (response.SentimentBatch && response.SentimentBatch.length > 0) {
                result = {Score: -1, ScoreTitle: -1,  initialized: true, Error: null};
                for (let item of response.SentimentBatch) {
                    switch (item.Id) {
                        case "Content":
                            result.Score =  item.Score;
                            break;
                        case "Title":
                            result.ScoreTitle = item.Score;
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
            result = {Score: -1, ScoreTitle: -1, initialized: true, Error: null};
        }

        return result;
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
