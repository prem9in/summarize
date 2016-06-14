import React from 'react';
import Base from 'view/base';
import sentiment from 'model/sentiment';
import Empty from 'view/empty';

'use strict';

export default class Sentiment extends Base {

    constructor(options) {
        super(options);
        this.registerForChange(sentiment);
    }

    render() {
        let initialized = sentiment.get("initialized");
        if (initialized) {
            let score = sentiment.get("initialized") ? sentiment.get("Score") : -1;
            return (
                <div className="main">
                    <div className="panel-title">{this.props.resources.getString("SentimentTitle")}</div>
                    <div className="separator-blue"></div>
                    <p>{score < 0 ? this.props.resources.getString('NoSentimentScore') : score}</p>
                </div>
            );
        } else {
            return (<Empty />);
        }
    }
}
