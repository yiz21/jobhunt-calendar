import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RouteMustNotAuthenticated = ({uid, component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={props =>
        uid ? (
          <Redirect to={'/'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  console.log("RouteMustNotAuthenticated: ", state);
  return {
    uid: state.auth.uid
  }
}

export default connect(mapStateToProps)(RouteMustNotAuthenticated)