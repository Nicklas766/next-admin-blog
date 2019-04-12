import React from 'react';
import Head from 'next/head'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../components/ContentWrapper.js'
import fetch from 'isomorphic-unfetch'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => (
        <Layout>
            <Head>
                <title>title here</title>
                <meta name="description" content="description here"/>
             </Head>

            <ContentWrapper>
                <h1>articles here</h1>
                <p>text here</p>

                {this.props.articles.map(article => (
                    <li key={article.name}>
                        <Link as={`/article/${article.slug}`} href={`/article?slug=${article.slug}`}>
                            <a>{article.name}</a>
                        </Link>
                    </li>
                ))}
            </ContentWrapper>
        </Layout>
        );
    }


Home.getInitialProps = async function() {
    const res = await fetch('http://localhost:3000/fetch')
    const data = await res.json()
  
    return {
      articles: data.data
    }
}

export default Home;
