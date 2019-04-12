import React from 'react';
import Head from 'next/head'
import Layout from '../../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../../components/ContentWrapper.js'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import InputForm from '../../components/InputForm';
import Button from '../../components/Button';


class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: "",
            title: "",
            description: "",
            visible: "",
            name: "",
            text: "",
            articles: [],
            value: "new article",
            workMode: false
        };
        
        this.publish = this.publish.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.workWithArticle = this.workWithArticle.bind(this);;
    }

    async componentDidMount() {
        const res = await fetch('http://localhost:3000/fetch')
        const data = await res.json()
        this.setState({articles: data.data});
    }

    async publish() {
        //const response = await axios.post("/admin/login", {username: this.state.username, password: this.state.password});
    }

    workWithArticle() {
        const article = this.state.articles.filter(x => x.name === this.state.value)[0];
        if (this.state.value === "new article") {
            this.setState({workMode: true});
            return true;
        }
        this.setState({
            slug: article.slug,
            title: article.title,
            description: article.metaDescription,
            visible: article.visible,
            name: article.name,
            text: article.text
        });
        this.setState({workMode: true});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSelectChange(event) {
        console.log(event.target.value)
        this.setState({value: event.target.value});
    }

    render = () => (
        <Layout>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="robots" content="noindex"/>
                <meta name="description" content="description here"/>
             </Head>

            <ContentWrapper>
                <h1>Dashboard</h1>

                {this.state.workMode == false &&
                <div>
                <select value={this.state.value} onChange={this.handleSelectChange}>
                    <option key={"new"}>new article</option>)
                    {this.state.articles.map(article => (<option key={article.name}>{article.name}</option>))}
                </select>

                <Button onSelect={this.workWithArticle}>work with option</Button>
                </div>}

                {this.state.workMode == true &&
                <div>
                    <p>Meta stuff:</p>
                    <InputForm name="slug" type={"input"} handleChange={this.handleChange} default={this.state.slug || ''} maxLength={""} >Slug</InputForm>
                    <InputForm name="title" type={"input"} handleChange={this.handleChange} default={this.state.title || ''} maxLength={""} >Title</InputForm>
                    <InputForm name="description" type={"input"} handleChange={this.handleChange} default={this.state.description || ''} maxLength={""} >Description</InputForm>

                    <p>Publish stuff:</p>
                    <InputForm name="visible" type={"input"} handleChange={this.handleChange} default={this.state.visible || ''} maxLength={""}>Should Visible? Yes/No</InputForm>

                    <p>Article:</p>
                    <InputForm name="name" type={"input"} handleChange={this.handleChange} default={this.state.name || ''} maxLength={""} >Name</InputForm>
                    <InputForm name="text" type={"textarea"} handleChange={this.handleChange} default={this.state.text || ''} maxLength={""} >Text</InputForm>

                    <Button onSelect={this.publish}>publish/update</Button>
                </div>}


            </ContentWrapper>
        </Layout>
        );
    }



export default AdminDashboard;
