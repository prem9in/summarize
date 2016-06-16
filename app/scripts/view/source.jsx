import React from 'react';
import Base from 'view/base';
import textDocument from 'model/textdocument';
import uistatus from 'model/uistatus';
import Extractor from 'view/extractor';

'use strict';

export default class Source extends Base {

	constructor(options) {
        super(options);
		this.state={inputvalid: false, input: '', status: 'notstarted'};
    }

    validate(event) {
    	let input = event.target.value && event.target.value.trim();
        if (input && input.length > 5) {
            if (!input.startsWith('http://') &&
                !input.startsWith('https://')) {
                input = "http://" + input;
            }
            this.setState({inputvalid: true, input: input});
        } else {
            this.setState({inputvalid: false, input: '', status: 'notstarted'});
        }
    }

    getDocument() {
        if (this.state.inputvalid) {
            this.setState({status: 'started'});
            textDocument.fetch(this.state.input)
                .done(() => this.setState({status: 'completed'}))
                .fail(() => this.setState({status: 'failed'}));
        }
    }

    displayStatus() {
        let messageKey = null;
        switch(this.state.status) {
            case 'started':
                messageKey = 'ReadDocumentStarted';
                break;
            case 'completed':
                messageKey = 'ReadDocumentCompleted';
                break;
            case 'failed':
                messageKey = 'ReadDocumentFailed';
                break;
        }

        uistatus.set({messageKey: messageKey});
    }

    render() {
        this.displayStatus();
        return (
            <div className="main">
        	    <div className="form-group">
                    <label for="sourceInput">{this.props.resources.getString("sourceinputlabel")}</label>
                    <input type="text" id="sourceInput" onChange={this.validate.bind(this)} className="sourceInput form-control" placeholder={this.props.resources.getString("sourceinputplaceholder")} title={this.props.resources.getString("sourceinputplaceholder")} />
			    </div>
                <Extractor />
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.getDocument.bind(this)}>{this.props.resources.getString("sourceSubmit")}</button>
                </div>
           </div>
        );
    }
}
