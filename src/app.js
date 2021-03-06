/*
 *  应用入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import mutants from 'chanjet-mutants';
import {setConfig, config} from 'chanjet-ui/lib/config';
import MuiThemeProvider from 'chanjet-ui/lib/components/styles/MuiThemeProvider';
import NavigationController from 'chanjet-ui/lib/navigation/NavigationController';
import theme from './theme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {appRoutes} from './app-routes'
import './www/css/main.less';

// touchTap 插件初始化
injectTapEventPlugin();

/*
 *  mutants准备完成后，启动正式的应用入口
 */
mutants.ready((error) => {
    if(error)return;

    // 初始化Page和导航栏的主题
    setConfig({
        theme: {
            page: {
                navbar: {
                    backgroundColor: theme.palette.primary1Color,
                    color: theme.palette.alternateTextColor
                }
            }
        }
    });

    console.log(appRoutes);

    ReactDOM.render(
        <MuiThemeProvider muiTheme={theme}>
            <NavigationController
                pages={appRoutes}
                rootPage='/home'
            />
        </MuiThemeProvider>
      , document.getElementById('app')
    );

});
