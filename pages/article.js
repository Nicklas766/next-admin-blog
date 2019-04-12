import Layout from '../components/Layout.js'
import ContentWrapper from '../components/ContentWrapper.js'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import ReactMarkdown from 'react-markdown';

const Post = (props) => {
  const input = props.data.text
  return (
        <Layout>
          <Head>
            <title>{props.data.title}</title>
            <meta name="description" content={props.data.metaDescription}/>
          </Head>

          <ContentWrapper>
            <h1>{props.data.name}</h1>
            <div>
              <ReactMarkdown source={input} />
            </div>
          </ContentWrapper>
        </Layout>
      )
}

Post.getInitialProps = async function(context) {
  const { slug } = context.query
  const res = await fetch(`http://localhost:3000/fetch/${slug}`)
  const data = await res.json()

  return { data }
}

export default Post