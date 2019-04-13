import Layout from '../components/Layout.js'
import ContentWrapper from '../components/ContentWrapper.js'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import ReactMarkdown from 'react-markdown';

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
  const input = props.data.text
  return (
        <Layout>
          <Head>
            <title>{props.data.title}</title>
            <meta name="description" content={props.data.meta_description}/>
          </Head>

          <ContentWrapper>
            <h1>{props.data.name}</h1>
            <div>
              <ReactMarkdown source={input} renderers={{image: Image, paragraph: renderParagraph}} />

            </div>
          </ContentWrapper>
        </Layout>
      )
}

Post.getInitialProps = async function(context) {
  const { slug } = context.query
  const res = await fetch(`http://localhost:3000/api/article/${slug}`)
  const data = await res.json()
  console.log(data)

  return { data }
}

export default Post