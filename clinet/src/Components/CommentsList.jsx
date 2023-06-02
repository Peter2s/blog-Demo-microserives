import {useEffect, useState} from "react";
import axios from "axios";

export const CommentsList = ({comments}) => {
		const commentStatus = (comment)=>{
			if(comment.status === 'pending') return "this comment is still pending "
			else if (comment.status === 'rejected') return "this rejected comment "
			else return comment.content
		}
	const renderComments = comments.map(comment =>(
		<li key={comment.id} >
			{commentStatus(comment)}
		</li>
	))
	return (
		<>
			{comments.length > 0 ? renderComments : null}
		</>
	)
}