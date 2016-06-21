/**
 * Created by prprak on 6/15/2016.
 */
import extractorConfig from 'model/extractorconfig';
import _ from 'underscore';

const newlinePattern = /[\r\n]+/igm;
const newlinePattern2 = /\n+/igm;
const tabPattern = /\t+/igm;
const copyright = /copyright/igm;
const copyrightsym = /©/igm;
const maxLength = 5 * 1000; // less than 10Kb
const removeselector = 'script,img,link,a,rel,ul,ol,li';

class Extractor {

    defaults() {
        return {
            available: [],
            selected: null
        }
    }

    constructor() {
        this.attributes = this.defaults();
        this.attributes.available = extractorConfig.extractors;
        this.attributes.selected = this.attributes.available &&
                                    this.attributes.available.length > 0 ?
                                        this.attributes.available[0] :
                                        null;
    }

    get(key) {
        if (this.attributes.hasOwnProperty(key)) {
            return this.attributes[key];
        } else {
            return null;
        }
    }

    setSelected(selected) {
        this.attributes.selected = selected;
    }

    extract(content, url) {
        let selected = this.attributes.selected;
        let extractorDetected = null;
        if (selected.nameKey == 'AutoDetect') {
            for (let item of this.attributes.available) {
                if (item.autodetect(url)) {
                    extractorDetected = item;
                    break;
                }
            }
        } else {
            extractorDetected = this.attributes.selected;
        }

        let docContent = $(content);
        let resultContent = $('<div></div>');
        let titleContent = $('<div></div>');
        let summaryContent = $('<div></div>');
        if (extractorDetected) {
            if (extractorDetected.titleSelector) {
                titleContent = docContent.find(extractorDetected.titleSelector);
            }
            if (extractorDetected.selector) {
                resultContent = docContent.find(extractorDetected.selector);
            }
            if (extractorDetected.summarySelector) {
                summaryContent = docContent.find(extractorDetected.summarySelector);
            }
        } else {
            resultContent = docContent;
        }

        return {
            content: this.normalize(resultContent),
            title: this.normalize(titleContent),
            summary: this.normalize(summaryContent)
        };
    }

    normalize(content) {
        let removedContent = content.find(removeselector).remove();
        let result = content.text()
            .replace(newlinePattern, ' ')
            .replace(newlinePattern2, ' ')
            .replace(tabPattern, '')
            .replace(copyright, '')
            .replace(copyrightsym, '');
        if (result.length > maxLength) {
            result = result.substring(0, maxLength);
        }
        return result.trim();
    }

    ignorePhrases(phrases) {
        let selected = this.attributes.selected;
        if (selected && selected.ignorePhrases && selected.ignorePhrases.length > 0) {
            phrases = _.reject(phrases, (p)=>{
                _.some(selected.ignorePhrases, (i)=>{
                   return i.toLowerCase() == p.toLowerCase();
                });
            });
        }
        return phrases;
    }
}

const extractor = new Extractor();
export {
    extractor as
        default
};