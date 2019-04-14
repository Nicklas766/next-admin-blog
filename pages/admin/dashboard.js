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
            _id: "new",
            slug: "",
            title: "",
            meta_description: "",
            name: "",
            text: "",
            img_url: "",
            img_alt: "",
            img_title: "",
            introduction: "",
            articles: [],
            value: "new article",
            workMode: false,
            messageToAuthor: ""
        };

        this.getNewPost = this.getNewPost.bind(this);
        this.publish = this.publish.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.workWithArticle = this.workWithArticle.bind(this);;
    }

    async componentDidMount() {
        const res = await fetch('http://localhost:3000/api/articles')
        const data = await res.json()
        this.setState({articles: data});
    }

    getNewPost() {
        var clone = Object.assign({}, this.state);
        delete clone.articles;
        delete clone.value;
        delete clone.workMode;
        delete clone.messageToAuthor;
        return clone;
    }

    publish = async () => {
        try {
            await axios.post("/admin/publish", this.getNewPost());
            this.setState({messageToAuthor: "You published it!"})
        } 
        catch {
            this.setState({messageToAuthor: "Could not publish"})
        }
    }

    update = async () => {
        try {
            await axios.post("/admin/update", this.getNewPost());
            this.setState({messageToAuthor: "You updated it!"})
        } 
        catch {
            this.setState({messageToAuthor: "Could not update"})
        }
    }

    workWithArticle() {
        const article = this.state.articles.filter(x => x.slug === this.state.value)[0];
        if (this.state.value === "new article") {
            this.setState({workMode: true});
            return true;
        }
        this.setState({
            _id: article._id,
            slug: article.slug,
            title: article.title,
            meta_description: article.meta_description,
            img_url: article.img_url,
            img_alt: article.img_alt,
            img_title: article.img_title,
            name: article.name,
            introduction: article.introduction,
            text: article.text,
        });
        this.setState({workMode: true});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSelectChange(event) {
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
                <p>{this.state.messageToAuthor}</p>

                {this.state.workMode == false &&
                <div>
                <select value={this.state.value} onChange={this.handleSelectChange}>
                    <option key={"new"}>new article</option>)
                    {this.state.articles.map(article => (<option key={article.slug}>{article.slug}</option>))}
                </select>

                <Button onSelect={this.workWithArticle}>work with option</Button>
                </div>}

                {this.state.workMode == true &&
                <div>
                    <p>Meta stuff:</p>
                    <InputForm name="slug" type={"input"} handleChange={this.handleChange} default={this.state.slug || ''} maxLength={""} >Slug</InputForm>
                    <InputForm name="title" type={"input"} handleChange={this.handleChange} default={this.state.title || ''} maxLength={""} >Title</InputForm>
                    <InputForm name="meta_description" type={"input"} handleChange={this.handleChange} default={this.state.meta_description || ''} maxLength={""} >Description</InputForm>

                    <p>Image stuff:</p>
                    <InputForm name="img_url" type={"input"} handleChange={this.handleChange} default={this.state.img_url || ''} maxLength={""}>img_url</InputForm>
                    <InputForm name="img_alt" type={"input"} handleChange={this.handleChange} default={this.state.img_alt || ''} maxLength={""}>img_alt</InputForm>
                    <InputForm name="img_title" type={"input"} handleChange={this.handleChange} default={this.state.img_title || ''} maxLength={""}>img_title</InputForm>

                    <p>Article:</p>
                    <InputForm name="name" type={"input"} handleChange={this.handleChange} default={this.state.name || ''} maxLength={""} >Name</InputForm>
                    <InputForm name="introduction" type={"input"} handleChange={this.handleChange} default={this.state.introduction || ''} maxLength={""} >introduction</InputForm>
                    <InputForm name="text" type={"textarea"} handleChange={this.handleChange} default={this.state.text || ''} maxLength={""} >Text</InputForm>

                    {this.state._id == "new" &&<Button onSelect={this.publish}>publish</Button>}
                    {this.state._id != "new" && <Button onSelect={this.update}>update</Button>}
                </div>}


            </ContentWrapper>
        </Layout>
        );
    }



export default AdminDashboard;
