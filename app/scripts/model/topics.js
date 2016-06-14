import Backbone from 'backbone';
import Base from 'model/base';

'use strict';

class Topics extends Base {

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
        throw 'Save is not supported on Topics';
    }
}

const topics = new Topics();
export {
    topics as
    default
};
