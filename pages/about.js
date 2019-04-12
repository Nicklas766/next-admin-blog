import React from 'react';
import Head from 'next/head'
import Layout from '../components/Layout.js'
import ContentWrapper from '../components/ContentWrapper.js'

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>about title</title>
                    <meta name="description" content="about description"/>
                </Head>

                <ContentWrapper>
                        <h1>Cicero in 45 BC</h1>
                        <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta 
                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora 
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                         Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
                         vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                        </p>
                        <h2>1. Cicero in 45 BC</h2>
                        <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia. 
                        </p>
                        <h2>2. Cicero in 45 BC</h2>
                        <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia. 
                        </p>
                </ContentWrapper>
            </Layout>
        );
    }
}

export default About;
