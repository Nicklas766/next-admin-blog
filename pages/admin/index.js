import React from 'react';
import Head from 'next/head'
import Layout from '../../components/Layout.js'
import Link from 'next/link'
import ContentWrapper from '../../components/ContentWrapper.js'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import InputForm from '../../components/InputForm';
import Button from '../../components/Button';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async login() {
        const response = await axios.post("/admin/login", {username: this.state.username, password: this.state.password});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render = () => (
        <Layout>
            <Head>
                <title>title here</title>
                <meta name="robots" content="noindex"/>
                <meta name="description" content="description here"/>
             </Head>

            <ContentWrapper>
                <h1>Admin page</h1>
                <p>Please leave this page if not authorized</p>
                <InputForm name="username" type={"input"} handleChange={this.handleChange} maxLength={"100"} >Username</InputForm>
                <InputForm name="password" type={"input"} handleChange={this.handleChange} maxLength={"100"} >Password</InputForm>
                <Button onSelect={this.login}>login</Button>
            </ContentWrapper>
        </Layout>
        );
    }



export default Admin;
