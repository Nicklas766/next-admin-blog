import React from 'react';
import Head from 'next/head'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../components/ContentWrapper.js'
import fetch from 'isomorphic-unfetch'

function getDateFormattedString(dateString) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(dateString);


    return monthNames[date.getMonth()] + " " + date.getUTCDate()
}

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
             </Head>

            <ContentWrapper>
                <div className="wrapper">
                <h1>Articles</h1>
                <p>Browse around and read our cool articles!</p>

                <h2>Latest Articles:</h2>

                {this.props.articles.map(article => (
                    <article key={article._id}>
                       
                        <div aria_hidden="true">
                            <Link as={`/article/${article.slug}`} href={`/article?slug=${article.slug}`}>
                                <a>
                                    <img src={article.img_url} alt={article.img_alt} title={article.img_title}/>
                                </a>
                            </Link>
                        </div>

                        <div className="text-container">
                            <h2>
                                <Link as={`/article/${article.slug}`} href={`/article?slug=${article.slug}`}>
                                    <a>{article.name}</a>
                                </Link>
                            </h2>
                        
                            <span> {getDateFormattedString(article.date)}</span>
                            

                            <p>
                                {article.introduction}
                            </p>
                        </div>

                    </article>
                    
                ))}
                </div>
                <style jsx>{`
                    .wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                    }

                    .text-container {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 10px;
                    }

                    .text-container h2 {
                        margin-top: 0;
                        margin-bottom: 0;
                        
                    }

                    span {
                        width: 100%;
                        font-size: 0.8em;
                        text-align: left;
                    }

                    article {
                        box-shadow: 0 0 11px 2px #dfdfdf;
                        background: #fff;
                        margin-bottom: 30px;
                        border-radius: 0.3em;
                        width: 48%;
                        margin-left: 1%;
                        margin-right: 1%;
                        border-bottom: 1px solid silver;
                        
                    }

                    article a {
                        font-family: 'Montserrat',sans-serif;
                        font-weight: bold;
                        color: #1D1B1B;
                        line-height: 1.2em;
                        text-decoration: none;
                    }
                    h2 a:hover {
                        transition: 0.5s;
                        color: #6DBCDB;
                        text-decoration: underline;
                      }

                      p {
                          margin-top: 24px;
                      }


                    /* Large screens ----------- */
                    @media only screen  and (max-width : 1100px) {
                        article {
                            width: 98%;
                        }
                    }
                   
                    img {
                        width: 100%;
                    }

                    img:hover {
                        transition: 0.5s;
                        opacity:0.9;
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
