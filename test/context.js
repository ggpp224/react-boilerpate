/**
 * Created by guopeng on 16/5/30.
 */

import {Component, PropTypes} from 'react';
import theme from '../src/theme';

const context = Object.assign({}, {
    context: {
        navigationController: {
            currentPage: {},
            push: (...url) => {
                context.context.navigationController.currentPage = Array.isArray(url) && url.length > 0 ? url[0] : '';
            }
        },
        muiTheme: theme
    },

    childContextTypes: {
        muiTheme: PropTypes.object,
        navigationController: PropTypes.object,
        store: PropTypes.object
    }
});

export  default context
