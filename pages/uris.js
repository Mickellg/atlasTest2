// import { gql } from "@apollo/client";
import Head from "next/head";


export default function Pages({post}) {
  return (
    <div>
      <Head>
        <title>Headless cont</title>
      </Head>

      <main>
        <div className="siteHeader">
          
          <p>Place Holder</p>
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
          query getPostByUri($id: ID = "") {
            post(id: $id, idType: URI) {
              title
              content
              uri
              date
              author {
                node {
                  firstName
                  lastName
                }
              }
            }
          }
          `,
          variables: {
            id: context.params.uri
          }
      })
})

const json = await res.json();

return{
  props:{
      post: json.data.post
}
}
}
