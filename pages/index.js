import Head from 'next/head';
import PostCard from '../components/Postcard';
// import client from '../lib/apollo';
// import { gql } from '@apollo/client';


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

        <div className="grid">
          {
            posts.nodes.map(post => {
              return (
                <ul>
            <PostCard  key={post.slug} post={post}>{post.title}</PostCard>
                </ul>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps(){

  const res = await fetch('http://127.0.0.1:10014/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          query: `
          query getAllPosts {
            posts {
              nodes {
                title
                content
                uri
              }
            }
          }
          `,
      })
  })
  
//   const GET_POSTS = gql  `
//     query getAllPosts {
//       posts {
//         nodes {
//           title
//           content
//           date
//           uri
//       }
//     }
//   }
// `
  

  // const response = await client.query(GET_POSTS)

  // fetch('http://127.0.0.1:10014/graphql', {
  //   method: 'POST', 
  //   body: JSON.stringify({
  //     GET_POSTS
  //   })
  // })

  const json = await res.json()
// const {loading, error, response} = await client.query({
//     query: GET_POSTS
//   })

// if (loading) return 'Loading...';
// if (error) return `Error! ${error.message}`;

// const posts  = response?.data?.posts?.node;

  return {
      props: {
        posts: json.data.posts,
      }, 
    }
}

