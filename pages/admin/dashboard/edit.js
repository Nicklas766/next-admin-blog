import React from 'react';
import Head from 'next/head'
import Layout from '../../../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../../../components/ContentWrapper.js'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Button';


class AdminEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            value: "new article",
            workMode: false,
            messageToAuthor: ""
        };

        this.publish = this.publish.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getInitialProps({query}) {
        return {query}
      }

    async componentDidMount() {
        const res = await fetch(process.env.API_URL + `/api/article/${this.props.query.article}`)
        
        if (res.status == 404) {
            this.setState({
                article: {
                    _id: "",
                    slug: "",
                    title: "",
                    meta_description: "",
                    img_url: "",
                    img_alt: "",
                    img_title: "",
                    name: "",
                    introduction: "",
                    text: "",
                }
            });
            return;
        }

        const data = await res.json()
        this.setState({article: data});
    }

    publish = async () => {
        try {
            await axios.post("/admin/publish", this.state.article);
            this.setState({messageToAuthor: "You published it!"})
        } 
        catch {
            this.setState({messageToAuthor: "Could not publish"})
        }
    }

    update = async () => {
        try {
            await axios.post("/admin/update", this.state.article);
            this.setState({messageToAuthor: "You updated it!"})
        } 
        catch {
            this.setState({messageToAuthor: "Could not update"})
        }
    }

    handleChange(event) {
        const updatedArticle = this.state.article;
        updatedArticle[event.target.name] = event.target.value;
        this.setState({article: updatedArticle});
    }

    render = () => (
        <Layout>
            <Head>
                <title>Admin Dashboard | Edit</title>
                <meta name="robots" content="noindex"/>
                <meta name="description" content="description here"/>
             </Head>

            <ContentWrapper>
                <h1>{this.state.article.name}</h1>
                <p>{this.state.messageToAuthor}</p>

                
                <div>
                    <p>Meta stuff:</p>
                    <InputForm name="slug" type={"input"} handleChange={this.handleChange} default={this.state.article.slug || ''} maxLength={""} >Slug</InputForm>
                    <InputForm name="title" type={"input"} handleChange={this.handleChange} default={this.state.article.title || ''} maxLength={""} >Title</InputForm>
                    <InputForm name="meta_description" type={"input"} handleChange={this.handleChange} default={this.state.article.meta_description || ''} maxLength={""} >Description</InputForm>

                    <p>Image stuff:</p>
                    <InputForm name="img_url" type={"input"} handleChange={this.handleChange} default={this.state.article.img_url || ''} maxLength={""}>img_url</InputForm>
                    <InputForm name="img_alt" type={"input"} handleChange={this.handleChange} default={this.state.article.img_alt || ''} maxLength={""}>img_alt</InputForm>
                    <InputForm name="img_title" type={"input"} handleChange={this.handleChange} default={this.state.article.img_title || ''} maxLength={""}>img_title</InputForm>

                    <p>Article:</p>
                    <InputForm name="name" type={"input"} handleChange={this.handleChange} default={this.state.article.name || ''} maxLength={""} >Name</InputForm>
                    <InputForm name="introduction" type={"input"} handleChange={this.handleChange} default={this.state.article.introduction || ''} maxLength={""} >introduction</InputForm>
                    <InputForm name="text" type={"textarea"} handleChange={this.handleChange} default={this.state.article.text || ''} maxLength={""} >Text</InputForm>

                    {this.state.article._id == "" &&<Button onSelect={this.publish}>publish</Button>}
                    {this.state.article._id != "" && <Button onSelect={this.update}>update</Button>}
                </div>


            </ContentWrapper>
        </Layout>
        );
    }




export default AdminEdit;
