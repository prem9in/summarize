import Backbone from 'backbone';
import Base from 'model/base';
import $ from 'jquery';

'use strict';

const newlinePattern = /[\r\n]+/igm;
const newlinePattern2 = /\n+/igm;
const tabPattern = /\t+/igm;
const copyright = /copyright/igm;
const copyrightsym = /©/igm;

class TextDocument extends Base {

    get idAttribute() {
        return 'id';
    }

    get url() {
        return ''; 
    }

    defaults() {
        return {"Inputs":[{"Id": "1", "Text": ""}]};
    }

    fetch(url) {
        return super.fetch({
            url: url,
            useProxy: true,
            dataType: 'html',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    }

    parse(response, options) {
        if (response) {
            response = response.substring(response.indexOf('<body'), response.indexOf('</body>'));
            response = this.removeTagElements(response, 'script');
            response = this.removeTagElements(response, 'a');
            response = this.removeTagElements(response, 'noscript');
            response = this.removeTagElements(response, 'ul');
            response = this.removeTagElements(response, 'ol');
            response = this.removeTagElements(response, 'style');
            response = this.removeTagElements(response, 'link', true);
            response = this.removeTagElements(response, 'img', true);
            response = response.replace(newlinePattern, ' ')
                .replace(newlinePattern2, ' ')
                .replace(tabPattern, '')
                .replace(copyright, '')
                .replace(copyrightsym, '');
            let text = $(response).text().trim();
            return {"Inputs":[{"Id": "1", "Text": text}]};
        } else {
            return this.defaults();
        }
    }

    removeTagElements(text, tag, selfClose) {
        let index = text.indexOf('<' + tag);
        while(index != -1){
            let closeIndex = index;
            if (selfClose) {
                closeIndex = text.indexOf('>', index) + 1;
            } else {
                let closeTag = '</' + tag + '>';
                closeIndex = text.indexOf(closeTag, index) + closeTag.length;
            }
            text = text.remove(index, closeIndex);
            index = text.indexOf('<' + tag);
        }
        return text;
    }

    save() {
        throw 'Save is not supported on TextDocument';
    }
}

const textDocument = new TextDocument();
export {
    textDocument as
    default
};
