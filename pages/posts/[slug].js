// import { gql } from "@apollo/client";
import Head from "next/head";


export default function Pages(data) {
  const post = data.post
  return(

    <div>
      <Head>
        <title>Headless cont</title>
      </Head>

      <main>
        <div className="siteHeader">
          <h1 className="title">{post.title}</h1>
          <img src={post.featuredImage}></img>
          <p>{post.content}</p>

        </div>
      </main>
    </div>
  )
  
}

export async function getStaticProps(context) {
  
  const res = await fetch('http://127.0.0.1:10014/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          query: `
          query getPostBySlug($id: ID = "") {
            post(id: $id, idType: SLUG) {
              title
              slug
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }`,
          variables: {
            id: context.params.slug,
            idType: 'SLUG'
          }
      })
})

const json = await res.json();

return{
  props:{
      post: json.data.post
},
}
}

export async function getStaticPaths(){
  
  const res = await fetch('http://127.0.0.1:10014/graphql',{
    method: 'POST', 
    headers: { 'Content-type': "application/json"}, 
    body: JSON.stringify({query: `query MyQuery2 {
      posts {
        nodes {
          slug
          content
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    `
  })

})

    const json = await res.json()
    const posts = json.data.posts.nodes;

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }

}
 