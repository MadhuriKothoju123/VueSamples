<template>
   <div class="container">
        <div class="form-container">
<form ref="form" @submit.prevent="createPost" class="form">
    <div style="display: flex; justify-content: center;" >
   <RouterLink to="/postsList"> <button @click="" style="color: white; background-color: dodgerblue;" class="getPosts">Get Posts</button></RouterLink>
</div>
    <h3>Create a new post</h3>
    <input v-model="title" placeholder="Title" />
    <textarea v-model="content" placeholder="Content"></textarea>
    <button type="submit" class="submitButton" >Add Post</button>
  </form>
</div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "../piniaStore/user";
import { usePostStore } from "../piniaStore/posts";
import { storeToRefs } from "pinia";
const title= ref('');
const content= ref('');
const userStore = useUserStore();
const postsStore= usePostStore();
const { postId } = storeToRefs(postsStore)
const form= ref(null);
const createPost =async()=>{
   await postsStore.incrementPostId();
   console.log(userStore?.user?.uid, postId.value)
await postsStore.addPost(userStore?.user?.uid, postId.value,   title.value, content.value);

  form.value.reset();
}


</script>
<style scoped>
.container {
    width: 400px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-top: 30px;
}

.form-container {
    width: 100%;
}



.form {
    display: flex;
    flex-direction: column;
}

.form h2 {
    margin-bottom: 20px;
    text-align: center;
}

.form input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.form textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submitButton   {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}
.getPosts{
       width: 200px;
}

/* .form button:hover {
    background-color: #218838;
} */

.hidden {
    display: none;
}
</style>
