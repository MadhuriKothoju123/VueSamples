<template>
    <div class="card">
      <h2>
        <slot name="cardTitle"  :pTitle="postTitle" ></slot>
            <!-- Fallback Title</slot> -->
      </h2>
      <slot>Fallback content</slot>
      <button>Read more...</button>
    </div>
    
  </template>
  
  <style>
  .card {
    max-width:250px;text-align:center;
    margin:2rem auto;padding:.6rem .8rem;
    border: .1rem solid #94A3B8;color:#64748B;
  }
  </style>
  <script>
  export default {
    data() {
      return { postTitle: 'Post Title' }
    }
  }
  </script>