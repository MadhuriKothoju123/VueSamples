<script setup >
import BuiltInComponents from '@/components/BuiltInComponents.vue';

import keepAliveCompo1 from '@/components/keepAliveCompo1.vue';
import keepAliveCompo2 from '@/components/keepAliveCompo2.vue';
import { shallowRef, ref, watchEffect } from 'vue';
const current = shallowRef(keepAliveCompo1)

const items = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]);

    const addItem = () => {
      const newItem = { id: items.value.length + 1, name: `Item ${items.value.length + 1}` };
      items.value.push(newItem);
    };

    // Use v-memo to memoize items based on their IDs
    const memoizedItems = ref([]);
    memoizedItems.value = items.value;

    // Log every time the setup function runs
    console.log('Setup function executed');

    // Log every time memoizedItems changes
    watchEffect(() => {
      console.log('Memoized items changed:', memoizedItems.value);
    });
</script>

<template>
  <div class="about" style="display: table; flex-direction: column; margin: 10px;  column-gap: 20px ">

    <BuiltInComponents />


    <div class="demo">
    <label><input type="radio" v-model="current" :value="keepAliveCompo1" /> A</label>
    <label><input type="radio" v-model="current" :value="keepAliveCompo2" /> B</label>
  
      <component :is="current"></component>

  </div>


      <h2 v-font-size:large>This is a large text</h2>
    <p v-font-size:small>This is a small text</p>
    <p v-font-size>This is a default-sized text</p>

    <div>
    <h1>Item List</h1>
    <ul>
      <li v-for="item in memoizedItems" :key="item.id" >
        {{ item.name }}
        {{ console.log(item.id) }}
      </li>
    </ul>
    <button @click="addItem">Add Item</button>
  </div>
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
