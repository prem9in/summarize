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
            let score = sentiment.get("Score");
            let titlescore = sentiment.get("ScoreTitle");
            let error = sentiment.get("Error");
            return (
                <div className="main">
                    <div className="panel-title">{this.props.resources.getString("SentimentScore")}</div>
                    <div className="separator-blue"></div>
                    <div>{this.props.resources.getString("SentimentTitle")}</div><div className="score">{titlescore < 0 ? this.props.resources.getString('NoSentimentTitleScore') : titlescore}</div>
                    <div className="separator-grey"></div>
                    <div>{this.props.resources.getString("SentimentContent")}</div><div className="score">{score < 0 ? this.props.resources.getString('NoSentimentScore') : score}</div>
                    <p className={(error && error.length > 0) ? "alert-warning error" : "displaynone"}>{error}</p>
                </div>
            );
        } else {
            return (<Empty />);
        }
    }
}
