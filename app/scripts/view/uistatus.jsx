import React from 'react';
import Base from 'view/base';
import uistatus from 'model/uistatus';

'use strict';

export default class UiStatus extends Base {

    constructor(options) {
        super(options);
        this.registerForChange(uistatus);
    }

    render() {
        if (uistatus.get('messageKey')) {
            return (
                <div className="alert-info statusbar">
                    <span className="glyphicon-info-sign">
                    </span>
                    <span className="uistatus">
                        {this.props.resources.getString(uistatus.get('messageKey'))}
                    </span>
                </div>
            );
        }
        
        return  (<div className="statusbar"></div>);
    }
}
