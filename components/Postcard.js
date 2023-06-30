// import { usePosts } from '@wpengine/headless/next';

import Link from "next/link";


export default function PostCard ({post}){
  
    console.log(post.uri)
    return (
        <Link href={`/posts${post.uri}`} className="card">{post.title}
        </Link>


    )
}