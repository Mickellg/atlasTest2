import Head from 'next/head';
import PostCard from '../components/Postcard';
import client from '../lib/apollo';
import { gql, useQuery } from '@apollo/client';

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
  
  const GET_POSTS = gql`
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

// const response = await client.query({
//     query: GET_POSTS
//   })
const response = useQuery(GET_POSTS)

const posts  = response?.data?.posts?.nodes
return {
    props: {
      posts
    }
  }
}

