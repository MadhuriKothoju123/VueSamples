<template>
  <ChangePasswordResuable :dialog="dialog" @setOpenDialog="setDialogOpen" />
  {{ isProfileDialogOpen }}
<UserProfile @setProfileDialogOpen="setProfileDialogOpen"  :isProfileDialog="isProfileDialogOpen"    />
  <v-toolbar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" dark prominent>
    <v-toolbar-title style="color: aquamarine">Ride Finder</v-toolbar-title>

    <v-spacer></v-spacer>
    <RouterLink to="/register">
      <v-btn style="color: aquamarine;" fab dark large>
        <v-icon style="color: aquamarine;" size="large" dark left>mdi-hand-pointing-right</v-icon>Sign Up
      </v-btn>
    </RouterLink>

    <v-btn style="color: aquamarine;" @click="handleUser">{{ user ? 'Logout' : 'LogIn' }}</v-btn>

    <v-menu   v-model="menu"  v-if="isLoggedIn">
      <template v-slot:activator="{ props }">
        <Transition name="fade">
          <v-btn icon v-bind="props" color="secondary">
            <v-icon size="large">mdi-account-circle</v-icon>
          </v-btn>
        </Transition>
      </template>
      <v-card min-width="300">
        <v-list>
          <v-list-item :title="'Welcome user'">
            <template v-slot:append>
              <v-btn icon="mdi-heart" variant="text"></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item.text"
            :title="item.text"
            color="primary"
            :prepend-icon="item.icon"
            @click="item.onClick"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/userRegister'
import router from '../router'
import ChangePasswordResuable from './ChangePasswordResuable.vue'
import { storeToRefs } from 'pinia'
import UserProfile from './UserProfile.vue'

const userStore = useAuthStore()
const { user } = storeToRefs(userStore)

const menu = ref(false)
const isLoggedIn = computed(() => !!user.value)
const dialog = ref(false);
const isProfileDialogOpen= ref(false)

const setDialogOpen = (data) => {
  dialog.value = data
}
const setProfileDialogOpen=async(data)=>{
  isProfileDialogOpen.value= await data
}


const handleUser = () => {
  if (isLoggedIn) {
    const res = userStore.logout()
    if (res) {
      router.push('/')
    }
  }
  else{
    router.push('/')
  }
}

const items = ref([
  { text: 'Change Password', icon: 'mdi-key-variant', onClick: () => setDialogOpen(true) },
  { text: 'Profile', icon: 'mdi-account', onClick: () => setProfileDialogOpen(true) },
  { text: 'Logout', icon: 'mdi-logout-variant', onClick: handleUser }
])


</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
