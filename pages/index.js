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
    //https://www.gotchseo.com/squeeze-page/
    render = () => (
        <Layout>
            <Head>
                <title>title here</title>
                <meta name="description" content="description here"/>
                <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" /> 
             </Head>

            <ContentWrapper>
                <h1>articles here</h1>
                <p>text here</p>

                {this.props.articles.map(article => (
                    <article key={article._id}>
                        <h2>
                            <Link as={`/article/${article.slug}`} href={`/article?slug=${article.slug}`}>
                                <a>{article.name}</a>
                            </Link>
                        </h2>

                        <div aria_hidden="true">
                            <Link as={`/article/${article.slug}`} href={`/article?slug=${article.slug}`}>
                                <a>
                                    <img src={article.img}/>
                                </a>
                            </Link>
                        </div>

                        <p>
                            more text here
                        </p>

        

                

                    </article>

                ))}
                <style jsx>{`
article {
    box-shadow: 0 0 11px 2px #dfdfdf;
    background: #fff;
    padding: 26px 30px 20px;
    margin-bottom: 30px;
    font-family: Lato,sans-serif;
    
}

article a {
    font-size: 28px !important;
    font-weight: 900 !important;
    font-family: Lato,sans-serif;
    color: #000;

    line-height: 1.6 !important;
    text-decoration: none;
}

article a:hover {
    transition: 0.5s;
    color: #c60000;
}



`}</style>
            </ContentWrapper>
        </Layout>
        );
    }


Home.getInitialProps = async function() {
    const res = await fetch('http://localhost:3000/api/articles')
    const data = await res.json()
  
    return {
      articles: data
    }
}

export default Home;
