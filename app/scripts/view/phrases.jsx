import React from 'react';
import Base from 'view/base';
import phrases from 'model/phrases';
import Empty from 'view/empty';

'use strict';

export default class Phrases extends Base {

    constructor(options) {
        super(options);
        this.registerForChange(phrases);
    }

    render() {
        let initialized = phrases.get("initialized");
        if (initialized) {
            let words = phrases.get("KeyPhrases");
            let twords = phrases.get("KeyPhrasesTitle");
            let error = phrases.get("Error");
            return (
                <div className="main">
                    <div className="panel-title">{this.props.resources.getString("KeyPhrases")}</div>
                    <div className="separator-blue"></div>
                    <div>{this.props.resources.getString("PhraseTitle")}</div><div className="phrases">{(twords && twords.length > 0) ? twords.join(', ') : this.props.resources.getString('NoPhraseTitle')}</div>
                    <div className="separator-grey"></div>
                    <div>{this.props.resources.getString("PhraseContent")}</div><div className="phrases">{(words && words.length > 0) ? words.join(', ') : this.props.resources.getString('NoPhrases')}</div>
                    <p className={(error && error.length > 0) ? "alert-warning error" : "displaynone"}>{error}</p>
                </div>
            );
        } else {
            return (<Empty />);
        }

    }
}
