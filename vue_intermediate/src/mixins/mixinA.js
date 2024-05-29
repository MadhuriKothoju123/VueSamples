// mixin1.js
export const mixinA = {
    data() {
      return {
        sharedProperty: 'Mixin 1 Property'
      };
    },
    methods: {
      sharedMethod() {
        console.log('Mixin 1 Method');
      }
    }
  };
  