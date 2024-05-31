<script setup>
import { ref } from 'vue';
import { db } from './firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

// Reactive variables for form inputs
const userName = ref('');
const userEmail = ref('');
const userId = ref('');
const postTitle = ref('');
const postContent = ref('');
const postId = ref('');
const commentAuthor = ref('');
const commentText = ref('');

const updateUserId = ref('');
const updateUserName = ref('');
const updateUserEmail = ref('');
const updatePostUserId = ref('');
const updatePostId = ref('');
const updatePostTitle = ref('');
const updatePostContent = ref('');
const updateCommentPostId = ref('');
const updateCommentId = ref('');
const updateCommentAuthor = ref('');
const updateCommentText = ref('');

const addUser = async () => {
  const usersRef = collection(db, 'users');
  const userDocRef = await (usersRef, {
    name: userName.value,
    email: userEmail.value,
  });
  userId.value = userDocRef.id; // Save user ID for adding posts
  console.log('User added with ID:', userDocRef.id);
};

const addPost = async () => {
  if (!userId.value) {
    alert('Please add a user first.');
    return;
  }
  const userPostsRef = collection(db, `users/${userId.value}/posts`);
  const postDocRef = await addDoc(userPostsRef, {
    title: postTitle.value,
    content: postContent.value,
  });
  postId.value = postDocRef.id; // Save post ID for adding comments
  console.log('Post added with ID:', postDocRef.id);
};

const addComment = async () => {
  if (!postId.value) {
    alert('Please add a post first.');
    return;
  }
  const postCommentsRef = collection(db, `users/${userId.value}/posts/${postId.value}/comments`);
  await addDoc(postCommentsRef, {
    author: commentAuthor.value,
    text: commentText.value,
  });
  console.log('Comment added');
};

const updateUser = async () => {
  const userDocRef = doc(db, 'users', updateUserId.value);
  await updateDoc(userDocRef, {
    name: updateUserName.value,
    email: updateUserEmail.value,
  });
  console.log('User updated');
};

const deleteUser = async () => {
  const userDocRef = doc(db, 'users', updateUserId.value);
  await deleteDoc(userDocRef);
  console.log('User deleted');
};

const updatePost = async () => {
  const postDocRef = doc(db, `users/${updatePostUserId.value}/posts`, updatePostId.value);
  await updateDoc(postDocRef, {
    title: updatePostTitle.value,
    content: updatePostContent.value,
  });
  console.log('Post updated');
};

const deletePost = async () => {
  const postDocRef = doc(db, `users/${updatePostUserId.value}/posts`, updatePostId.value);
  await deleteDoc(postDocRef);
  console.log('Post deleted');
};

const updateComment = async () => {
  const q = query(collection(db, `users/${updatePostUserId.value}/posts/${updateCommentPostId.value}/comments`), where("author", "==", updateCommentAuthor.value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    const commentDocRef = doc.ref;
    await updateDoc(commentDocRef, {
      author: updateCommentAuthor.value,
      text: updateCommentText.value,
    });
    console.log('Comment updated');
  });
};

const deleteComment = async () => {
  const commentDocRef = doc(db, `users/${updatePostUserId.value}/posts/${updateCommentPostId.value}/comments`, updateCommentId.value);
  await deleteDoc(commentDocRef);
  console.log('Comment deleted');
};
</script>


<template>
  <div>
    <h1>Firestore Example</h1>
    
    <!-- Add User -->
    <div>
      <h2>Add User</h2>
      <input v-model="userName" placeholder="User Name" />
      <input v-model="userEmail" placeholder="User Email" />
      <button @click="addUser">Add User</button>
    </div>

    <!-- Add Post -->
    <div>
      <h2>Add Post</h2>
      <input v-model="userId" placeholder="User ID" />
      <input v-model="postTitle" placeholder="Post Title" />
      <input v-model="postContent" placeholder="Post Content" />
      <button @click="addPost">Add Post</button>
    </div>

    <!-- Add Comment -->
    <div>
      <h2>Add Comment</h2>
      <input v-model="postId" placeholder="Post ID" />
      <input v-model="commentAuthor" placeholder="Comment Author" />
      <input v-model="commentText" placeholder="Comment Text" />
      <button @click="addComment">Add Comment</button>
    </div>

    <!-- Update and Delete User -->
    <div>
      <h2>Update or Delete User</h2>
      <input v-model="updateUserId" placeholder="User ID to Update/Delete" />
      <input v-model="updateUserName" placeholder="New User Name" />
      <input v-model="updateUserEmail" placeholder="New User Email" />
      <button @click="updateUser">Update User</button>
      <button @click="deleteUser">Delete User</button>
    </div>

    <!-- Update and Delete Post -->
    <div>
      <h2>Update or Delete Post</h2>
      <input v-model="updatePostUserId" placeholder="User ID of the Post" />
      <input v-model="updatePostId" placeholder="Post ID to Update/Delete" />
      <input v-model="updatePostTitle" placeholder="New Post Title" />
      <input v-model="updatePostContent" placeholder="New Post Content" />
      <button @click="updatePost">Update Post</button>
      <button @click="deletePost">Delete Post</button>
    </div>

    <!-- Update and Delete Comment -->
    <div>
      <h2>Update or Delete Comment</h2>
      <input v-model="updateCommentPostId" placeholder="Post ID of the Comment" />
      <input v-model="updateCommentId" placeholder="Comment ID to Update/Delete" />
      <input v-model="updateCommentAuthor" placeholder="New Comment Author" />
      <input v-model="updateCommentText" placeholder="New Comment Text" />
      <button @click="updateComment">Update Comment</button>
      <button @click="deleteComment">Delete Comment</button>
    </div>
  </div>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
