import Backbone from 'backbone';
import Base from 'model/base';
import $ from 'jquery';
import extractor from 'model/extractor';

'use strict';

class TextDocument extends Base {

    get idAttribute() {
        return 'id';
    }

    get url() {
        return ''; 
    }

    defaults() {
        return {
            "Summary": "",
            "Title": "",
            "Content": "",
            "initialized": false
        };
    }

    //// this will work only in case when document.domain is same.
    fetchbyIframe(options) {
        let docloader = $('#docloader');
        if (!docloader || docloader.length == 0) {
            $('div class="displaynone"><iframe id="documentLoader"></iframe></div>').appendTo('body');
        }
        docloader = $('#docloader');
        docloader.on('load', ()=>{
            let resp = docloader.contents().html();
            this.set(this.parse(resp, options));
        });
        docloader.attr('src', url);
    }

    fetch(url) {
        let options = {
            url: url,
            useProxy: true,
            dataType: 'html',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        //// this.fetchbyIframe(options);
        return super.fetch(options);
    }

    parse(response, options) {
        if (response) {
            response = response.substring(response.indexOf('<body'), response.indexOf('</body>') + 7);
            let result = extractor.extract(response, options.url);
            return {
                "Summary": result.summary,
                "Title": result.title,
                "Content": result.content,
                "initialized": true
            };
        } else {
            return {
                "Summary": "",
                "Title": "",
                "Content": "",
                "initialized": true
            };
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
