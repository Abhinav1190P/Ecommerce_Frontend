import React from 'react'

export default function Layout({children,auth}) {
  return (
    <div auth={auth}>
        {children}
    </div>
  )
}
