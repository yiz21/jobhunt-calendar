import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RouteNeedAuthenticated = ({uid, component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={props =>
        uid ? (
          <Component {...rest} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  }
}

export default connect(mapStateToProps)(RouteNeedAuthenticated)