import React from 'react';
import Base from 'view/base';
import words from 'model/documentwords';
import Empty from 'view/empty';

'use strict';

export default class Words extends Base {

    constructor(options) {
        super(options);
        this.registerForChange(words);
    }

    renderWords(wordMap) {
        let contents = [];
        for (const entry of wordMap.entries()) {
            contents.push(<div className="row">
                <div className="col-sm-8">{entry[0]}</div>
                <div className="col-sm-4">{entry[1]}</div>
            </div>);
        }
        return contents;
    }

    render() {
        let initialized = words.get("initialized");
        if (initialized) {
            return (
            <div className="main">
                <div className="panel-title">{this.props.resources.getString("Words")}</div>
                <div className="separator-blue"></div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12 panel-title">
                                {this.props.resources.getString("ContentWords")}
                            </div>
                        </div>
                        <div className="sourceDoc">
                            {this.renderWords(words.get("Content"))}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12 panel-title">
                                {this.props.resources.getString("TitleWords")}
                            </div>
                        </div>
                        <div className="sourceDoc">
                            {this.renderWords(words.get("Title"))}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12 panel-title">
                                {this.props.resources.getString("SummaryWords")}
                            </div>
                        </div>
                        <div className="sourceDoc">
                            {this.renderWords(words.get("Summary"))}
                        </div>
                    </div>
                </div>
            </div>
            );
        } else {
            return (<Empty />);
        }
    }
}
