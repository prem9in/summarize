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
            let inputs = textDocument.get('Inputs');
            if (inputs && inputs.length > 0) {
                return (
                    <div className="main">
                        <div className="panel-title">{this.props.resources.getString('TextDocumentTitle')}</div>
                        <div className="separator-blue"></div>
                        <p className="sourceDoc">{(inputs[0].Text && inputs[0].Text.length) > 0 ? inputs[0].Text : this.props.resources.getString('NoTextDocument')}</p>
                        <p className="sourceLength">{this.props.resources.getString('TextDocumentLength') + inputs[0].Text.length + this.props.resources.getString('TextDocumentChars')}</p>
                    </div>
                );
            } else {
                return (<Empty />);
            }
        } else {
            return (<Empty />);
        }
    }
}
