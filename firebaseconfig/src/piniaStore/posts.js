import { defineStore } from 'pinia';
import { ref } from 'vue';
import { database } from '../firebase';
import { ref as dbRef, push, set, onValue, query, orderByChild, equalTo, update, remove } from 'firebase/database';

export const usePostStore = defineStore('post', () => {
  const posts = ref([]);
  const postId=ref(0);
const incrementPostId=()=>{
  postId.value++;
}
  const fetchPosts = (userId) => {
    const postsRef = query(dbRef(database, 'posts'), orderByChild('userId'), equalTo(userId));
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        posts.value = data ? Object.values(data) : [];
      });
  };

   const editPost= async(postId, title, content)=> {
    const postRef = dbRef(database, `posts/${postId}`);
    
    await update(postRef, { title, content });
  }
 const deletePost=async(postId)=> {
    const postRef = dbRef(database, `posts/${postId}`);
    
    await remove(postRef);
  }

  const addPost = async (userId, postId, title, content) => {
    // const newPostRef = push(dbRef(database, 'posts'));
    set(dbRef(database, 'posts/' + postId),{ userId, postId, title, content, timestamp: Date.now() })
    // await set(newPostRef, { userId, postId, title, content, timestamp: Date.now() });
  };

  return { posts, fetchPosts, addPost, postId, incrementPostId,deletePost, editPost };
},


{
    persist: true
  }
);
