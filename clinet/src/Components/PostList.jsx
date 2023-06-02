import {useEffect, useState} from "react";
import axios, {post} from "axios";
import {CreateComment} from "./CreateComment";
import {CommentsList} from "./CommentsList";

export const PostList = () => {
	const [posts,setPosts] = useState({});
	useEffect(()=> {
		const res = getPosts()},[]);
	const getPosts = async () => {
		const res = await axios.get("http://localhost:4002/posts")
		setPosts(res.data.posts);
		console.log(res.data.posts);
	}
	const renderPosts = Object.values(posts).map( post =>
		(
			<div key={post.id} className="card w-50 mb-2 p-3 border border-2">
				<div className="card-body">{post.title}</div>
				<CommentsList comments={post.comments} />
				<CreateComment postId={post.id} />
			</div>
		)
	)
	return (
			<>
				<div className="h1"> Posts </div>
					<div className="d-flex justify-content-start flex-wrap mt-3  ">
					{renderPosts}
				</div>
			</>

	)
}