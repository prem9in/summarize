import React from 'react';
import Base from 'view/base';
import Source from 'view/source';
import UiStatus from 'view/uistatus';
import Phrases from 'view/phrases';
import Sentiment from 'view/sentiment';
import TextDocument from 'view/textdocument';
import Words from 'view/words';
import Summary from 'view/summary';

'use strict';

export default class Main extends Base {

    render() {
        return (
            <div>
                <UiStatus />
                <Source/>
                <TextDocument />
                <Summary />
                <Words />
                <Sentiment />
                <Phrases />
            </div>
        );
    }
}
