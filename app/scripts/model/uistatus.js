import Backbone from 'backbone';

'use strict';

class UiStatus extends Backbone.Model {

    defaults() {
        return {
            messageKey: ''
        }
    }

    fetch(options) {
       throw 'Fetch not supportted for UiStatus';
    }

    save(options) {
        throw 'Save not supportted for UiStatus';
    }

    sync(method, model, options) {
        throw 'Sync not supported for UiStatus';
    }
}

const uistatus = new UiStatus();
export {
    uistatus as
        default
};
