import Head from 'next/head';
import PostCard from '../components/Postcard';
import client from '../lib/apollo';
import { gql } from '@apollo/client';

export default function Home({posts}) {
  

  return (
    <div className="container">
      <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <h1 className="title">
          Headless WordPress Next.js Starter
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.uri} post={post}/>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps(){

//   const client = new ApolloClient({
//     link: new createHttpLink({

//       uri: 'http://localhost:10005/graphql'}), 
//       cache: new InMemoryCache(),
   
// })
  
  const {loading, error, response} = await client.query({
   query: gql`
    query getAllPosts {
      posts {
        nodes {
          title
          content
          date
          uri
      }
    }
  }
`
  })
console.log(GET_POSTS)

// const {loading, error, response} = await client.query({
//     query: GET_POSTS
//   })

if (loading) return 'Loading...';
if (error) return `Error! ${error.message}`;

const posts  = response.data.posts.nodes
return {
    props: {
      posts
    }
  }
}

