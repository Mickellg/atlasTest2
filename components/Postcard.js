import { usePosts } from '@wpengine/headless/next';

export default function PostCard (){
  const post = usePosts();
  return (
      <Link href={post.uri} className={"card"}>
          <a className="card">
              <h3>{post.title} </h3>
          </a>
      </Link>
  )
}