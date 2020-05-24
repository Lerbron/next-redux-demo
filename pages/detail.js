import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Head from "next/head";
import { Button } from 'antd'

import '@/assets/styles/detail.scss'
import { getHomeDetail } from '@/redux/actions/detailActions'


const Detail= ({detailInfo, num}) => {
  const router = useRouter()
  const { id } = router.query
  const goBack=() => {
    router.back()
  }
  return(
    <Fragment>
      <Head>
        <title>detail page !!!</title>
      </Head>
      <span>id: {id}</span> | <span>num: {num}</span> | <Button onClick={goBack}>go back</Button>
      <div className='detail-title'>{detailInfo.title}</div>
      <div className='detail-content' dangerouslySetInnerHTML={{__html: detailInfo.content}}></div>
    </Fragment>
  )
}

Detail.getInitialProps= async ({ctx}) => {
  const { isServer, store, query, ...props } = ctx;
  const promises = [];
  promises.push( store.dispatch(getHomeDetail({ id: query.id}, isServer)))
  let data = await Promise.all(promises);
}

const mapStateToProps = (state, ownProps) => {
  return {
    detailInfo: state.detail.detailInfo,
    num: state.test.num
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)