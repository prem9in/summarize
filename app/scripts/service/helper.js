
import appconfig from 'model/appconfig';
import textDocument from 'model/textdocument';

'use strict';

class Helper {
    getTextAnalyticsUrl(service) {
        return appconfig.textanalyticsapiurl + service;
    }

    getTextAnalyticsReuestOptions() {
        return {
            headers: {
                'Authorization': 'Basic ' + appconfig.apikey,
            },
            method: 'execute',
            model: {"Inputs": textDocument.attributes.Inputs},
            contentType: 'application/json',
            dataType: 'json',
            skipCache: true
        }
    }
}


const helper = new Helper();
export {
    helper as
        default
};