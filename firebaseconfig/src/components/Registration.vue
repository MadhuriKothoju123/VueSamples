<template>
  <div class="container">
    <div class="form-container">
      <form @submit.prevent="saveUser" id="register-form" class="form">
        <h2>Register</h2>
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          autocomplete="off"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {useUserStore} from "../piniaStore/user";
import router from "../router";
const userStore = useUserStore();
const username = ref("");
const email = ref("");
const password = ref("");
const saveUser = async() => {
  const res=  userStore.signUp(email.value, password.value, username.value);
  if(res){
  router.push('/') 
  }
else   { router.push('/registration')
}

};
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.container {
  margin-top: 30px;
  width: 400px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-container {
  width: 100%;
}

.form-toggle {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.form-toggle button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.form-toggle button:hover {
  background-color: #0056b3;
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

.form button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.form button:hover {
  background-color: #218838;
}

.hidden {
  display: none;
}
</style>
