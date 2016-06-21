import React from 'react';
import Base from 'view/base';
import summary from 'model/summary';
import Empty from 'view/empty';

'use strict';

export default class Summary extends Base {

    constructor(options) {
        super(options);
        this.registerForChange(summary);
    }

    render() {
        let initialized = summary.get("initialized");
        if (initialized) {
            let fromDocument = summary.get("fromDocument");
            let fromKeyPhrase = summary.get("fromKeyPhrase");
            let fromTitlePhrase = summary.get("fromTitlePhrase");
            let fromWordCount = summary.get("fromWordCount");
            return (
                <div className="main">
                    <div className="panel-title">{this.props.resources.getString("Summary")}</div>
                    <div className="separator-blue"></div>
                    <div>{this.props.resources.getString("SummaryFromDoc")}</div><div className="summary">{(fromDocument && fromDocument.length > 0) ? fromDocument : this.props.resources.getString('NoSummaryfromDocument')}</div>
                    <div className="separator-grey"></div>
                    <div>{this.props.resources.getString("SummaryFromKeyPhraseTitle")}</div><div className="summary">{(fromTitlePhrase && fromTitlePhrase.length > 0) ? fromTitlePhrase.join(', ') : this.props.resources.getString('NoSummaryFromKeyPhraseTitle')}</div>
                    <div className="separator-grey"></div>
                    <div>{this.props.resources.getString("SummaryFromRepeatedWords")}</div><div className="summary">{(fromWordCount && fromWordCount.length > 0) ? fromWordCount.join('. ') : this.props.resources.getString('NoSummaryFromRepeatedWords')}</div>
                    <div className="separator-grey"></div>
                    <div>{this.props.resources.getString("SummaryFromKeyPhrase")}</div><div className="summary">{(fromKeyPhrase && fromKeyPhrase.length > 0) ? fromKeyPhrase.join('. ') : this.props.resources.getString('NoSummaryFromKeyPhrase')}</div>
                </div>
            );
        } else {
            return (<Empty />);
        }

    }
}
