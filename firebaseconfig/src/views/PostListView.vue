<template>
  <div>
    <div>
      <button @click="getUserComments">Get User Comments</button>
    </div>
    <h1>User Posts</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.content }}</td>
          <td>
            <button @click="editPost(post)">Edit</button>
            <button @click="deletePost(post.postId)">Delete</button>
            <button @click="addComment(post)">Add Comment</button>

          </td>
        </tr>
      </tbody>
    </table>


    <div v-if="isCommentsList" >
    <h3>Comments</h3>
    <ul>
      <li v-for="(comment, index) in commentList" :key="index">
        <strong>{{ comment.userId }}</strong>: {{ comment.content }} <br />
        <small>{{ new Date(comment.timestamp).toLocaleString() }}</small>
      </li>
    </ul>
  </div>
    <form v-if="isEditing"  @submit.prevent="handleOrUpdatePost">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="currentPost.title">
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="currentPost.content"></textarea>
      </div>
      <button type="submit">{{ isEditing ? 'Update' : 'Add' }} Post</button>
    </form>


    <form v-if="isCommentNeed"  @submit.prevent="addCommentData">
      <div>
        <label for="comment">comment:</label>
        <input type="text" id="comment" v-model="comment">
      </div>
      
      <button type="submit"> Add Comments</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';

import { useUserStore } from "../piniaStore/user";
import { usePostStore } from "../piniaStore/posts";
import { useCommentStore } from '../piniaStore/comments';
import axios from 'axios';
const userPostsStore = usePostStore();
const userCommentsStore = useCommentStore();

      const posts= computed(()=> userPostsStore?.posts)
 const currentPost = reactive({ id: 0, title: '', content: '',userId: '' });
 
 
const isEditing = ref(false);
const comment= ref('');
const isCommentNeed= ref(false);
const isCommentsList= ref(false);
// const commentList= computed(()=> userCommentsStore?.comments)   
const commentList= ref([]);
watch(commentList,  (newCommentList) => {
  commentList.value =  newCommentList;
});
const handleOrUpdatePost = async () => {
  // const userId = useUserStore?.user?.uid; // Replace with actual user ID
  if (isEditing.value) {
    await userPostsStore.editPost(currentPost.id, currentPost.title, currentPost.content);
 
 
  }
  resetForm();
};
 const addComment=(post)=>{
  isEditing.value = false;

  currentPost.id = post.postId;
  currentPost.title = post.title;
  currentPost.content = post.content;
  currentPost.userId= post.userId
  isCommentNeed.value=true;
 }

 const addCommentData=async()=>{



  const response = await fetch('http://localhost:5001/dataaccess-7c490/us-central1/addComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: currentPost.userId,
      postId: currentPost.id,
      comment: comment.value
    })
  });
    // await userCommentsStore.addComment(currentPost.userId, currentPost.id, comment.value)
 }

const editPost = (post) => {
  isCommentNeed.value=false;

  currentPost.id = post.postId;
  currentPost.title = post.title;
  currentPost.content = post.content;
  isEditing.value = true;
};

const deletePost = async (postId) => {
  await userPostsStore.deletePost(postId);
};

const resetForm = () => {
  currentPost.id = 0;
  currentPost.title = '';
  currentPost.content = '';
  isEditing.value = false;
};


  
 
 
  
      onMounted(() => {
        userPostsStore?.fetchPosts(useUserStore()?.user?.uid);
       posts.value= userPostsStore?.posts;
      });

      const getUserComments= async()=>{



        const response = await axios.get('http://localhost:5001/dataaccess-7c490/us-central1/getPostComments', {
      params: {
        userId: useUserStore()?.user?.uid
      }
    });
    console.log(response)
    commentList.value= response.data;


    
      //  await userCommentsStore?.getComments(useUserStore()?.user?.uid);
// console.log(useCommentStore?.comments);

       isCommentsList.value=true;
      }

</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  margin-right: 5px;
}
</style>
