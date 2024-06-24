<!-- <script setup >
import BuiltInComponents from '@/components/BuiltInComponents.vue';

import keepAliveCompo1 from '@/components/keepAliveCompo1.vue';
import keepAliveCompo2 from '@/components/keepAliveCompo2.vue';
import { shallowRef, ref, watchEffect } from 'vue';
import { useShared } from '@/composiable/composiablecompo';
import { useShared2 } from '@/composiable/composiablecompo2';
const { sharedData, sharedMethod } = useShared();
// const { sharedData, sharedMethod } = useShared2();



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
  <div>
    {{ sharedData }}
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
</style> -->


<template>
  <div>
    <quill-editor v-model:content="editorContent" ref="editor"  contentType="html" />
    <button @click="submitContent">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const editorContent = ref('<p>hello</P>');
const editorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, false] }],
      ['clean'],
    ],
  },
  formats: ['bold', 'italic', 'underline', 'list', 'header'],
};

const submitContent = () => {
console.log(editorContent.value)
var decodedStr = decodeHTMLEntities(editorContent.value);
  console.log(decodedStr);
  const cleanHTML = DOMPurify.sanitize(decodedStr, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'br', 'p', 'span'],
    ALLOWED_ATTR: ['style'],
  });
  // Send cleanHTML to your server
 

  // console.log('Sanitized HTML:', cleanHTML);
  // const formattedHtml=removeEmptyParagraphs(cleanHTML);
  // console.log(formattedHtml)

 
  // editorContent.value= formattedHtml;
 


  if (cleanHTML === '<p></p>') {
    console.log('Sanitized HTML is an empty paragraph and is allowed');
    editorContent.value = cleanHTML;
  } else {
    const formattedHtml = removeEmptyParagraphs(cleanHTML);
    console.log('Formatted HTML:', formattedHtml);
    editorContent.value = formattedHtml;
  }

};



function decodeHTMLEntities(text) {
 var txt = document.createElement('textarea');
  txt.innerHTML = text;

  return txt.value;
}

function removeEmptyParagraphs(html) {
// Create a temporary container element
//   const container = document.createElement('textarea');
//   container.innerHTML = html;

//   // Select and remove empty paragraphs
//   container.querySelectorAll('p').forEach(paragraph => {
//     if (!paragraph.textContent.trim()) {
//       paragraph.remove();
//     }
//   });

//   return container.innerHTML;
return html.replace(/<p>\s*<\/p>/g, '');
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>