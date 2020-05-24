import React, { Fragment } from 'react'
import { withRouter } from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux';
 
const Login= ({router}) => {

  const goRegist= (e) => {
    e.preventDefault()
    router.push('/user/regist')
  }

  return (
    <Fragment>
      <div>Login Page</div>
      <Button onClick={goRegist}></Button>
    </Fragment>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))