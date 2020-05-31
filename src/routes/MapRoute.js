/**
 * 不管是几级路由页面，都会用到Switch Route
 */

import React, { Component } from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
class MapRoute extends Component {
    render() {
        let { routes } = this.props
        return (
            <Switch>
                {
                    routes.map(item => {
                        return item.path ? (
                            <Route 
                                key={item.path}
                                path={item.path}
                                component={item.component}
                            />
                        ) : (
                            <Redirect key={item.from} to={item.to} />
                        )
                    })
                }
            </Switch>
        );
    }
}

export default MapRoute;
