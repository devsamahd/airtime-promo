import Head from 'next/head'
import React from 'react'

const Meta = ({title}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content="desc here" />
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
    </Head>
  )
}

export default Meta