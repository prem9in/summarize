import React from 'react';
import Base from 'view/base';
import textDocument from 'model/textdocument';
import Empty from 'view/empty';

'use strict';

export default class TextDocument extends Base {

    constructor(options) {
        super(options);
        this.registerForChange(textDocument);
    }

    render() {
        let initialized = textDocument.get('initialized');
        if (initialized) {
            let title = textDocument.get('Title');
            let content = textDocument.get('Content');
                return (
                    <div className="main">
                        <div className="panel-title">{this.props.resources.getString('TextDocumentTitle')}</div>
                        <div className="separator-blue"></div>
                        <p className="sourceDoc"><span>{this.props.resources.getString('TitleDocument')}</span>{(title && title.length) > 0 ? title : this.props.resources.getString('NoTextDocument')}</p>
                        <p className="sourceLength">{this.props.resources.getString('TitleTextDocumentLength') + title.length + this.props.resources.getString('TextDocumentChars')}</p>
                        <div className="separator-grey"></div>
                        <p className="sourceDoc">{(content && content.length) > 0 ? content : this.props.resources.getString('NoTextDocument')}</p>
                        <p className="sourceLength">{this.props.resources.getString('TextDocumentLength') + content.length + this.props.resources.getString('TextDocumentChars')}</p>
                    </div>
                );
        } else {
            return (<Empty />);
        }
    }
}
