import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import Posts from "./Posts";

export interface Post {
  id: string;
  title: string;
  userid: string;
  username: string;
  description: string;
}

const Home = () => {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPost = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {postList?.map((post) => {
        return <Posts post={post} />;
      })}
    </div>
  );
};

export default Home;
