import React from 'react';
import Head from 'next/head'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../components/ContentWrapper.js'
import PreArticle from '../components/PreArticle.js'
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
                <div className="wrapper">
                    <h1>Articles</h1>
                    <p>Browse around and read our cool articles!</p>

                    <h2>Latest Articles:</h2>

                    {this.props.articles.map(article => (<PreArticle key={article._id} article={article}/>))}
                </div>
                <style jsx>{`
                    .wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                    }
            `}</style>
            </ContentWrapper>
        </Layout>
        );
    }


Home.getInitialProps = async function() {
    const res = await fetch(process.env.API_URL + '/api/articles')
    const data = await res.json()
  
    return {
      articles: data.reverse()
    }
}

export default Home;
