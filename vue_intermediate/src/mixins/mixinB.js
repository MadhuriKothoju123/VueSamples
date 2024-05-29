// mixin2.js
export const mixinB = {
    data() {
      return {
        sharedProperty: 'Mixin 2 Properties'
        
      };
    },
    methods: {
      sharedMethod() {
        console.log('Mixin 2 Method');
      }
    }
  };
  