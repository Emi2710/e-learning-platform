import React from 'react'


type Props = {children: any, data: any}

export default function Layout({children, data}: Props) {
  return (
    <div>
        <p>{data.name}</p>
        {children}
    </div>
  )
}