import _ from 'underscore';
import Backbone from 'backbone';
import Base from 'model/base';

'use strict';

class Summary extends Base {

    get idAttribute() {
        return 'id';
    }

    get url() {
        return 'url'; 
    }

    defaults() {
        return {
           
        }
    }

    fetch() {
      
    }

    save() {
        throw 'Save is not supported on Summary';
    }
}

const summary = new Summary();
export {
    summary as
    default
};
