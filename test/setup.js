import { jsdom } from 'jsdom'
import history from 'history'
import localStorage from 'localStorage'
import xhr from 'xmlhttprequest'
import 'babel-plugin-px2rem/browser-polyfill.js';
import injectTapEventPlugin from 'react-tap-event-plugin';


var exposedProperties = ['window', 'navigator', 'document'];

global.history=history;
global.localStorage=localStorage;
global.XMLHttpRequest = xhr.XMLHttpRequest;
global.document = jsdom('<!doctype html><html><body></body></html>');

global.window = document.defaultView;
global.window.history=global.history;
global.window.localStorage=global.localStorage;
global.window.XMLHttpRequest = global.XMLHttpRequest;
global.window.generateThreeDprPx = function(val) {
    return val + 'px';
}

global.window.mutants = {
    plugin: {},
    env: {
        platform : 'browser',
        os: 'ios',
        constant : {
            os : {
                mobile : "mobile",
                ios : "ios",
                android : "android",
                computer : "computer"
            },

            browser : {
                ie : 'internet_explorer',
                chrome : 'chrome',
                firefox : 'firefox',
                safari : 'safari',
                opera : 'opera',
                unknown : 'unknown'
            },

            platform : {
                weixin : 'weixin',
                chanjet : 'chanjet',
                browser : 'browser'
            }
        }
    },

    resume: () => {},
    suspend: () => {}
};


global.window.lib = {
    flexiable : {}
};

global.window.rem = 75;

global.cordova = {
    exec: function(){}
};

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

global.documentRef = document;

injectTapEventPlugin({
    shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
        return true;
    }
});
