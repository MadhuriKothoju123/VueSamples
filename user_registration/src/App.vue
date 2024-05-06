<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  

    <div class="wrapper">

      <nav>
        <button>
        <RouterLink to="/">Home</RouterLink>
      </button>
      <button>
        <RouterLink to="/about">About</RouterLink>
      </button>
      <button>
        <RouterLink to="/registration">Register</RouterLink>
      </button>
      <button>
        <RouterLink to="/lifecycleHooks">hooks</RouterLink>
      </button>
      <button>
        <RouterLink to="/slots">Slots</RouterLink>
      </button>

      <button>
        <RouterLink to="/provider">provider</RouterLink>
      </button>
      </nav>
    </div>


  <RouterView />
</template>

<style scoped>

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
button {
  background-color: #04AA6D; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

button a {
  color: aliceblue;
  
}
nav {

  font-size: 12px;
 
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
 
  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
