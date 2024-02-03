// components/custom-navigation/custom-navigation.js

Component({
  properties: {
    title: {
      type: String,
      value: 'Default Title',
    },
  },

  methods: {
    onCustomNavLeftBtnClick() {
      this.triggerEvent('customNavLeftBtnClick');
    },
  },
});
