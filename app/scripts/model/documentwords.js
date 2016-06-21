import Base from 'model/base';
import sentences from 'model/documentsentences';
import _ from 'underscore';
import ignoreWords from 'model/ignorewords';
import $ from 'jquery';

'use strict';

class DocumentWords extends Base {

    get url() {
        return '';
    }

    defaults() {
        return {
            Content: new Map(),
            Title: new Map(),
            Summary: new Map(),
            initialized: false
        }
    }

    fetch() {
        let deffered = $.Deferred();
        _.defer(()=>{
            try {
                let content = sentences.get("Content");
                let title = sentences.get("Title");
                let summary = sentences.get("Summary");
                let model = {
                    Content: this._getWords(content),
                    Title: this._getWords(title),
                    Summary: this._getWords(summary),
                    initialized: true
                };
                this.set(model, {slient: true}).trigger('change');
                deffered.resolveWith(this, model);
            } catch (err) {
                deffered.rejectWith(this, err);
            }
        });
        return deffered;
    }

    save() {
        throw 'Save is not supported on DocumentWords';
    }

    _getWords(sentences) {
        let wordsWithCount = new Map();
        if (sentences && sentences.length > 0) {
            for(let sent of sentences){
                let words = sent.split(' ');
                for (let word of words) {
                    let trimmed = word.trim().replace(/[:"‘’'“”?!,]/igm,'');
                    if (trimmed.length > 0 &&
                        ignoreWords.indexOf(trimmed.toLowerCase()) == -1) {
                        if (wordsWithCount.has(trimmed)) {
                            let count = wordsWithCount.get(trimmed) + 1;
                            wordsWithCount.set(trimmed, count);
                        } else {
                            wordsWithCount.set(trimmed, 1);
                        }
                    }
                }
            }
        }

        return wordsWithCount;
    }
}

const words = new DocumentWords();
export {
    words as
        default
};
