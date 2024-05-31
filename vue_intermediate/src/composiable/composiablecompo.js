// useShared.js
import { ref } from 'vue';

export function useShared() {
  const sharedData = ref('This is shared data');

  function sharedMethod() {
    console.log('This is a shared method');
  }

  return {
    sharedData,
    sharedMethod
  };
}
