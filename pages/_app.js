import React from 'react'
import App, { Container } from 'next/app'
import Router from "next/router";
import withGA from "next-ga";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_ID, Router)(MyApp);