<template>
    <div>
      <div v-for="(user, index) in users" :key="index">{{ user.name }}</div>
    </div>

    
            <section>
                    <section>
                        <h1>Users List</h1>
                    </section>
                    <section>
                        <table id="users">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>DeleteUser</th>
                                </tr>
                            </thead>
                            <tbody  v-for="(user, index) in users" :key="index">
                              
                                    <tr key={user.id}>
                                        <td>
                                          <p>{{ user.username }}</p>
                                        </td>

                                        <td>
                                            <p>{{user.email}}</p>
                                        </td>
                                        <td>
                                            <p>{{user.country}}</p>
                                        </td>

                                      
                                        <td>
                                            <button  @click="handleClick(user)">Delete User</button>
                                        </td>


                                    </tr>
                             
                            </tbody>
                        </table>
                    </section>
            </section>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
   
        savedScrollPosition: 0 
      };
    },
    props: ['users'],
   
  
    
    mounted() {
      window.addEventListener('scroll', this.saveScrollPosition);
    
      
    },
    beforeUpdate() {
      // Save the current scroll position before the component updates
      this.savedScrollPosition = window.scrollY;
    },
    updated() {
      // Restore the saved scroll position after the component updates
      window.scrollTo(0, this.savedScrollPosition);
    },
    beforeUnmount() {
      // Clean up the scroll listener before the component is unmounted
      window.removeEventListener('scroll', this.saveScrollPosition);
    },

   
    methods: {
   
        handleClick(user) {
      // Emitting a click event to the parent component
      this.$emit('deleteUser', user);
    },
      saveScrollPosition() {
    //     // Update the saved scroll position when scrolling occurs
        this.savedScrollPosition = window.scrollY;
      }
    }
  };
  </script>
  <style scoped>

#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#users td, #users th {
  border: 1px solid #ddd;
  padding: 8px;
}

#users tr:nth-child(even){background-color: #f2f2f2;}

#users tr:hover {background-color: #ddd;}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>
  