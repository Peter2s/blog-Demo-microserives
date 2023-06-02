import {useState} from "react";
import axios from "axios";

export const CreateComment = ({postId}) => {
	const [content,setContent] = useState("");
	const createComment = async (e) => {
		e.preventDefault();
		await axios.post(`http://localhost:4000/posts/${postId}/comments`,{content})
		setContent("")
	}
	return (
		<>
			<form onSubmit={createComment}>
				<div className="form-group">
					<input type="text" placeholder="enter your comment"
						   className="form-control mt-2" value={content}
						   onChange={e=>setContent(e.target.value)} />
					<button	type="submit" className="btn btn-success mt-2"> Add Comment</button>
				</div>
			</form>
		</>
	)
}