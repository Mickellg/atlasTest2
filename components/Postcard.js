// import { usePosts } from '@wpengine/headless/next';

import Link from "next/link";


export default function PostCard ({post}){
  
    return (
        <Link href={post.uri} className="card">
            <h3>{post.title} </h3>
        </Link>


    )
}