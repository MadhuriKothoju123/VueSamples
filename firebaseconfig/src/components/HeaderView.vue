<template>
  <nav>
    <RouterLink  to="/"> <button id="header-login-btn" >Login</button></RouterLink>
   <RouterLink  to="/registration"> <button id="header-register-btn">Register</button></RouterLink>
 <button @click="logout" id="header-register-btn">Logout</button>

  </nav>
</template>
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../piniaStore/user";

const router = useRouter();

const logout = () => {
  const userStore= useUserStore().logout();
};


const navigateToRegistrationPage = () => {
  router.push('/registration');
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

header {
  background-color: #007bff;
  padding: 10px 0;
  text-align: center;
}

nav button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

nav button:hover {
  background-color: #0056b3;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
}

.form-container {
  width: 400px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
