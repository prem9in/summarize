import React from 'react';
import Base from 'view/base';
import Source from 'view/source';
import UiStatus from 'view/uistatus';
import Phrases from 'view/phrases';
import Sentiment from 'view/sentiment';
import TextDocument from 'view/textdocument';

'use strict';

export default class Main extends Base {

    render() {
        return (
            <div>
                <UiStatus />
                <Source/>
                <TextDocument />
                <Sentiment />
                <Phrases />
            </div>
        );
    }
}
