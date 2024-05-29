<script setup>
import { RouterLink } from 'vue-router'

import { ref } from 'vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import { computed } from 'vue';
import { useAuthStore } from '@/piniastore/auth'

const dialog = ref(false)
const openAlert= ref( false);
const authStore= useAuthStore()

const isLoggedIn = computed(() => !!authStore.user);

console.log(store.getters.isLoggedIn);


const email =  computed(() => store.getters.getCurrentUser);
const password = ref('')

const setDialogOpen = () => {
  dialog.value = !dialog.value
}

const menu = ref(false)
const closeMenu = () => {
  menu.value = false
}

const logout = () => {
  // store.dispatch('logoutUser', { currentUser: null })
  authStore.logout();
   isLoggedIn.value=false;
  router.push('/login')
}
console.log(store.getters.getCurrentUser)
const updatePasswordByEmail = () => {
  return axios
    .get(`http://localhost:3000/users?email=${email.value}`)
    .then((response) => {
      const userToUpdate = response.data[0];
      console.log(userToUpdate);  

      if (!userToUpdate) {
        throw new Error('User not found')
      }

      userToUpdate.password = password.value

      return axios
        .put(`http://localhost:3000/users/${userToUpdate.id}`, userToUpdate)
        .then((response) => {
          openAlert.value= true;
          alert("you seccessfully registerd");

          return response.data;
        })
    })
    .catch((error) => {
      console.error('Error updating password:', error.message)
      throw new Error('Failed to update password')
    })
}

const items = ref([
  { text: 'Change Password', icon: 'mdi-key-variant', onClick: setDialogOpen },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Logout', icon: 'mdi-logout-variant', onClick: logout }
])
</script>

<template>
  <div>
    <v-toolbar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" dark prominent>
      <v-toolbar-title style="color: black">Todo App</v-toolbar-title>

      <v-spacer></v-spacer>
      <!--  using this router-link instead of anchor tag it will not reload the entire page   -->
      <RouterLink to="/registration">
        <v-btn fab dark large color="black">
          <v-icon size="large" dark left>mdi-hand-pointing-right</v-icon>Sign Up
        </v-btn>
      </RouterLink>

     
      <v-menu
        :close-on-content-click="false"
        open-on-click        
        v-model="menu"
        @mouseleave="closeMenu"
        v-if="isLoggedIn"
      >
        <template v-slot:activator="{ props }">
          <Transition name="fade">
          <v-btn icon v-bind="props" color="secondary">
            <v-icon size="large">mdi-account-circle</v-icon>
          </v-btn>
        </Transition>
        </template>
        <v-card min-width="300">
          <v-list>
            <v-list-item
           
             :title="'welcome'"
           :subtitle="email"
            >
              <template v-slot:append>
                <v-btn
                  :class="fav ? 'text-red' : ''"
                  icon="mdi-heart"
                  variant="text"
                  @click="fav = !fav"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              @click="item.onClick"
              v-for="(item, i) in items"
              :key="i"
              :value="item.text"
              :title="item.text"
              color="primary"
              :prepend-icon="item.icon"
            >
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>

    <v-dialog v-model="dialog" @onblur="setDialogOpen" max-width="500">
      <v-card>
        <v-card-title>Change Password</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
          <v-text-field
            v-model="password"
            label="Enter new password"
            outlined
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="setDialogOpen">Close</v-btn>
          <v-btn color="primary" @click="updatePasswordByEmail">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
