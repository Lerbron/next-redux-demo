import React from 'react'
import { withRouter } from 'next/router'
import moment from '@/utils/moment'
import './index.scss'
const ListItem = ({data, router}) => {

  const goDetail= e => {
    router.push(`/detail?id=${data.id}`, `/detail/${data.id}`)
  }

  return (
  <div className='list-item' onClick={goDetail}>
    <span className='list-avatar'><img src={data.author && data.author.avatar_url} /></span>
    <span className='list-title'>{data.title}</span>
    <span className='list-time'>{data.create_at && moment(data.create_at).fromNow()}</span>
  </div>)
}

export default withRouter(ListItem)