
import appconfig from 'model/appconfig';
import textDocument from 'model/textdocument';

'use strict';

class Helper {
    getTextAnalyticsUrl(service) {
        return appconfig.textanalyticsapiurl + service;
    }

    getTextAnalyticsReuestOptions() {
        let model = {"Inputs": []};
        model.Inputs.push({"Id": "Content", "Text": textDocument.get("Content") });
        model.Inputs.push({"Id": "Title", "Text": textDocument.get("Title") });
        return {
            headers: {
                'Authorization': 'Basic ' + appconfig.apikey,
            },
            method: 'execute',
            model: model,
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