import _ from 'underscore';
import Backbone from 'backbone';
import Base from 'model/base';
import words from 'model/documentwords';
import sentences from 'model/documentsentences';
import phrases from 'model/phrases';
import textDocument from 'model/textdocument';

'use strict';

const maxSentencesInSummary = 5;
const minRepeatation = 5;

class Summary extends Base {


    defaults() {
        return {
            fromDocument: '',
            fromKeyPhrase: '',
            fromTitlePhrase: '',
            fromWordCount: '',
            initialized: false
        }
    }

    fetch() {
        _.defer(() => {
            this.set({
                fromDocument: textDocument.get('Summary'),
                fromKeyPhrase: this._getSentencesFromKeyPhrases(),
                fromTitlePhrase: this._getSentencesFromKeyPhrasesTitle(),
                fromWordCount: this._getSentencesFromWords(),
                initialized: true
            }, {silent:true}).trigger('change');
        });
    }

    save() {
        throw 'Save is not supported on Summary';
    }

    _getSentencesFromKeyPhrasesTitle() {
        let summary = [];
        let kphrasesTitle = phrases.get("KeyPhrasesTitle");
        for (const phr of kphrasesTitle) {
            summary = _.union(summary, this._checkSentence(phr));
        }
        return summary.length > maxSentencesInSummary ? summary.splice(0, maxSentencesInSummary): summary;
    }

    _getSentencesFromKeyPhrases() {
        let summary = [];
        let kphrases = phrases.get("KeyPhrases");
        for (const phr of kphrases) {
            summary = _.union(summary, this._checkSentence(phr));
        }
        return summary.length > maxSentencesInSummary ? summary.splice(0, maxSentencesInSummary): summary;
    }

    _getSentencesFromWords() {
        let summary = [];
        let contentWords = words.get("Content");
        for (let [word, count] of contentWords) {
            if (count >= minRepeatation) {
                summary = _.union(summary, this._checkSentence(word));
            }
        }

        return summary.length > maxSentencesInSummary ? summary.splice(0, maxSentencesInSummary): summary;
    }

    _checkSentence(word) {
        let summary = [];
        let contentsentences = sentences.get("Content");
        for (let sent of contentsentences) {
            if (this._hasWord(sent, word)) {
                summary.push(sent);
            }
        }
        return summary;
    }

    _hasWord(sentence, trimmedWord) {
        let word = ' ' + trimmedWord + ' ';
        return sentence.indexOf(word) > -1;
    }
}

const summary = new Summary();
export {
    summary as
    default
};
