import { useState } from "react";
import axios from "axios";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const createPost = async (e) => {
    e.preventDefault();
    await axios.post("http://blog-app.com/posts/create", { title });
  };
  return (
    <>
      <form className="w-50" onSubmit={createPost}>
        <div className="h2"> Create Post</div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-2 " type="submit">
          Add Post
        </button>
      </form>
    </>
  );
};
