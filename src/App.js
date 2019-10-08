import React, { Component } from 'react'
import LoginForm from './containers/loginFormContainer'
import ScheduleView from './containers/scheduleViewContainer'
import RouteNeedAuthenticated from './components/privateRoute'
import RouteMustNotAuthenticated from './components/guestRoute'
import { BrowserRouter, Switch } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <RouteNeedAuthenticated path='/' exact component={ScheduleView} />
            <RouteMustNotAuthenticated path='/login' component={LoginForm} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
