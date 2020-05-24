import React, { Fragment } from 'react'
import { withRouter } from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux';
 
const Regist= ({router}) => {

  const goLogin= (e) => {
    e.preventDefault()
    router.push('/user/login')
  }

  return (
    <Fragment>
      <div>Regist Page</div>
      <Button onClick={goLogin}></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Regist))