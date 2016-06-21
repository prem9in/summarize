import Base from 'model/base';
import textDocument from 'model/textdocument';
import _ from 'underscore';

'use strict';

class DocumentSentences extends Base {

    get url() {
        return '';
    }

    defaults() {
        return {
            Content: [],
            Title: [],
            Summary: [],
            initialized: false
        }
    }

    fetch() {
        let deffered = $.Deferred();
        _.defer(()=>{
            try {
                let model = {
                    Content: textDocument.get("Content").split('.'),
                    Title: textDocument.get("Title").split('.'),
                    Summary: textDocument.get("Summary").split('.'),
                    initialized: true
                };
                this.set(model, {silent: true}).trigger('change');
                deffered.resolveWith(this, model);
            } catch (err) {
                deffered.rejectWith(this, err);
            }
        });
        return deffered;
    }

    save() {
        throw 'Save is not supported on DocumentSentences';
    }
}

const sentences = new DocumentSentences();
export {
    sentences as
        default
};
