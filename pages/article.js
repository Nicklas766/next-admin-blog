import Layout from '../components/Layout.js'
import ContentWrapper from '../components/ContentWrapper.js'
import CodeBlock from '../components/CodeBlock'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import ReactMarkdown from 'react-markdown';

import Error from './_error';

function Image(props) {
  return <img {...props} style={{width: '100%'}} />
}

function renderParagraph(props) {
  const { children } = props;

  if (children && children[0]
    && children.length === 1
    && children[0].props
    && children[0].props.src) { // rendering media without p wrapper

    return children;
  }

  return <p>{children}</p>;
}


const Post = (props) => {
  if (!props.data) 
    return <Error statusCode={404}/>;
  
  const input = props.data.text

  return (
        <Layout>
          <Head>
            <title>{props.data.title}</title>
            <meta name="description" content={props.data.meta_description}/>
          </Head>

          <ContentWrapper>
              <h1>{props.data.name}</h1>
              <ReactMarkdown source={input} renderers={{image: Image, paragraph: renderParagraph, code: CodeBlock}} />
          </ContentWrapper>
        </Layout>
      )
}


Post.getInitialProps = async function(context) {
  const { slug } = context.query
  const res = await fetch(process.env.API_URL + `/api/article/${slug}`);

  if (res.status == 404)
    return {data: false}

  const data = await res.json()

  

  return { data }
}

export default Post