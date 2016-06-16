/**
 * Created by prprak on 6/15/2016.
 */
import extractorConfig from 'model/extractorconfig';
import _ from 'underscore';

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

        let resultContent = $(content);
        if (extractorDetected && extractorDetected.selector) {
            resultContent = resultContent.find(extractorDetected.selector)
        }

        return resultContent.text().trim();
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