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
            let words = initialized ? phrases.get("KeyPhrases") : [];
            return (
                <div className="main">
                    <div className="panel-title">{this.props.resources.getString("PhraseTitle")}</div>
                    <div className="separator-blue"></div>
                    <p>{(words && words.length > 0) ? words.join(', ') : this.props.resources.getString('NoPhrases')}</p>
                </div>
            );
        } else {
            return (<Empty />);
        }

    }
}
