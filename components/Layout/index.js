import React from 'react'

import './index.scss'

export default function Layout({children}) {
  return(
    <div className='main-layout'>
      {children}
    </div>
  )
}