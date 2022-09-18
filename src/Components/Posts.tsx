import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { Post as userPost } from "./Home";

interface Props {
  post: userPost;
}

interface Likes {
  userId: string;
  likeId: string;
}

const Posts = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const [likes, setLikes] = useState<Likes[] | null>(null);

  const getLikes = async () => {
    let data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const wasLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const deletedLike = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const deletedLikeData = await getDocs(deletedLike);
      const deleteLike = doc(db, "likes", deletedLikeData.docs[0].id);
      await deleteDoc(deleteLike);

      if (user) {
        setLikes(
          (prev) =>
            prev &&
            prev.filter((like) => like.likeId !== deletedLikeData.docs[0].id)
        );
      }
    } catch (error) {
      console.log(error);
    }
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
        <button onClick={wasLiked ? removeLike : addLike}>
          {wasLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes:{likes?.length}</p>}
      </div>
    </div>
  );
};

export default Posts;
