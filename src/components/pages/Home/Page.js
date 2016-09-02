/**
 * Created by guopeng on 16/9/2.
 */

import React, {PropTypes}  from 'react';
import Page from '../../BasePage';
import {autobind} from 'core-decorators';
import Button from 'chanjet-ui/lib/Button';
import {routes} from '../../../app-routes';

export default class Home extends Page{

    title = '首页';

    renderContent(){
        return(
            <div>
                <h1 style={{textAlign:'center', margin:'50px'}}>wellcome to chanjet !</h1>
                <Button
                    label="下一页"
                    primary={true}
                    style={{position:'absolute', top:'150px', right:'40px'}}
                    onTouchTap={this.onButtonClick}
                />
            </div>

        );
    }

    @autobind
    onButtonClick(){
       this.navigationController.push(routes.list);
    }

}

