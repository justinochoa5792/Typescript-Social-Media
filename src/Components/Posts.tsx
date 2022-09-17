import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { Post as userPost } from "./Home";

interface Props {
  post: userPost;
}

const Posts = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");

  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, postId: post.id });
  };

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>

      <div className="footer">
        @{post.username}
        <button onClick={addLike}>&#128077;</button>
        <p>Likes:</p>
      </div>
    </div>
  );
};

export default Posts;
