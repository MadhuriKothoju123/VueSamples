// src/plugins/myPlugin.js

export default {
  install: (app, options) => {
    // Register the MyHeader component globally

    // Register the v-font-size directive
    app.directive('font-size', {
      mounted(el, binding) {
        let size = 16;
        switch (binding.arg) {
          case 'small':
            size = 12;
            break;
          case 'large':
            size = 24;
            break;
          default:
            size = 18;
            break;
        }
        el.style.fontSize = size + 'px';
      }
    });
  }
};
