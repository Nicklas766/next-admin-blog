import React from 'react';
import Head from 'next/head'
import Layout from '../../../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../../../components/ContentWrapper.js'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Button';


class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            value: "new article",
        };

    }

    async componentDidMount() {
        const res = await fetch('/api/articles')
        const data = await res.json()
        this.setState({articles: data});
    }


    render = () => (
        <Layout>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="robots" content="noindex"/>
                <meta name="description" content="description here"/>
             </Head>

            <ContentWrapper>
                <h1>Admin Dashboard</h1>
      
                <Link href={{ pathname: '/admin/dashboard/edit'}}><a>Create new article!</a></Link>

                <h2>Work with previous articles</h2>
                    {this.state.articles.map(article => (
                        <li key={article._id}>
                             <Link href={{ pathname: '/admin/dashboard/edit', query: { article: article.slug }}}><a>edit: {article.slug}</a></Link>
                        </li>))}
            
    

                <h2> Upload sitemap.xml, robots.txt or images </h2>
                
                <form action={`${process.env.API_URL}/admin/upload`} method="post" encType="multipart/form-data">
                    <input type="file" name="file" />
                    <input type="submit" value="upload file to /static" />
                </form>
                


            </ContentWrapper>
        </Layout>
        );
    }



export default AdminDashboard;
