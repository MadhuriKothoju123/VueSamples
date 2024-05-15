<template>
    <form @submit.prevent="submitForm">
      <div class="container">
        <hr/>
      <label for="username"><b>User Name</b></label>
      <input type="text" v-model="username" required>
      <span v-if="errors.username" class="error">{{ errors.username }}</span>
  
      <label for="email"><b>Email</b></label>
      <input type="text" v-model="email" required>
      <span v-if="errors.email" class="error">{{ errors.email }}</span>

      <label for="country"><b>country</b></label>
      <select v-model="country" @change="successfully" class="custom-select">
      <option v-for="(option, index) in options" :value="option" :key="index" class="custom-option">
    {{ option }}
  </option>

</select>
  
      <label for="password">Password:</label>
      <input type="password" v-model="password" required>
      <span v-if="errors.password" class="error">{{ errors.password }}</span>


  <!-- Binding An Attribute to an expression Dynamically -->
      <button :disabled="!username || !password" type="submit" class="registerbtn">Register</button>
    </div>
    </form>

    <!--the Lazy update using 'lazy modifier' It will reduce number of DOM Updates -->
    <!-- <div>
    <input type="text" v-model="username" placeholder="Enter username">
    <input type="password" v-model.lazy="password" placeholder="Enter password"> 
    <button @click="login">Login</button>
  </div> -->
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        options: ['India', 'China','UK', 'USA','England','Japan'],
        username: '',
        email: '',
        country: 'India',
         password: '',
        errors: {}
      };
    },
    methods: {
      async submitForm() {  
             try {   
        const res= await axios.post('http://localhost:3000/users', {
            username: this.username,
            email: this.email,
            country: this.country,
            password: this.password
          });
         if(res?.status===201){
          alert("Succesfully registered");
          this.$router.push('/about');
         }
        } catch (error) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        }
      },
      login() {
      // Process login using this.username and this.password
      console.log('Username:', this.username);
      console.log('Password:', this.password);
    }
    }
  };
  </script>



<style>

.error {
    color: red;
  }
* {
  box-sizing: border-box;
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}


input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #fce1e1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

select {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #fce1e1;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}


.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
  