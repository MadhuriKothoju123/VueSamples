<template>
  <div class="about">

    <GetUserData  :users="users" @deleteUser="deleteUser" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
import axios from 'axios';
import { ref } from 'vue';
import GetUserData from   '@/components/GetUserData.vue';
export default {
  data(){
    const users = ref([]);
     return {
     users
     }
  },
  components: {
    GetUserData
  },
  created(){
    this.fetchItems();
  },
  watch:{
       users(newusers){
      console.log(newusers);

       },
      immediate: true  // to reload the page when there is chnage in the reative data(users)
  },
  methods:{
    async fetchItems() {
try {

const response = await axios.get('http://localhost:8000/users');
console.log(response);
if(response.status=='200')this.users=response.data;
} catch (error) {
if (error.response.data.errors) {
this.errors = error.response.data.errors;
}
}
},
async deleteUser(user){
const response=await axios.delete('http://localhost:8000/users/'+user.id);
console.log(response);
if(response.status=='200'){
  this.users = this.users.filter(item => item.id !== response.data.id);
  alert('User Deleted Successfully');
}
else alert('User not Deleted')
   
    },
  }
}
</script>
