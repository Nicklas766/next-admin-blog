import Head from 'next/head'
import Layout from '../components/Layout.js'
import ContentWrapper from '../components/ContentWrapper.js'
import Link from 'next/link'
import React from 'react'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <Layout>
        <Head>
            <title>{this.props.statusCode} error</title>
        </Head>
        {this.props.statusCode
          ? <ContentWrapper>
            <h1> Error {this.props.statusCode} | Page not found </h1>
            <p>Go back to <Link href={"/"}><a>{"homepage"}</a></Link></p>
          
          </ContentWrapper>
          : <ContentWrapper>'An error occurred on client'</ContentWrapper>}
    </Layout>
    )
  }
}

export default Error