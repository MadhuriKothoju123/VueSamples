<template>
        <div class="container">
        <div class="form-container">
            <div class="form-toggle">
            </div>
            <form @submit.prevent="validateUser" id="login-form" class="form">
                <h2>Login</h2>
                <input v-model="email" type="email" placeholder="email" required>
                <input v-model="password" type="password" placeholder="Password" required autocomplete="off">
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useUserStore } from '../piniaStore/user';
import router from '../router';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';

const email=ref('');
const password= ref('');
const userStore= useUserStore();
const validateUser= async()=>{
    const res= await  userStore.login(email.value, password.value);
    if(res){
    router.push('/createPost');

    }
//   const loginSuccessMessage = httpsCallable(functions, 'loginSuccessMessage');
 
//     const result = await loginSuccessMessage();
//     console.log(result.data.message);
//     alert(result.data.message);
// if(result?.data?.status){
//     alert(result.data.message)
//     router.push('/createPost');
    
// }
// else{
//     alert(result.data.message)
//     router.push('/');
// }
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