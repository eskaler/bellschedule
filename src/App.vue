
<template>
  <div id="app">
    <router-view 
      @authenticated="setAuthenticated"
      @logout="logout"
      :api-info="apiInfo"
      :authenticated="authenticated"></router-view>
  </div>

</template>
<script>
let ApiInfo = require('./config.js');
console.log( `${ApiInfo.HOST}:${ApiInfo.PORT}/api/`);

export default {
  name: "App",
  data() {
    return {
      authenticated: false,      
      apiInfo: `${ApiInfo.HOST}:${ApiInfo.PORT}/${ApiInfo.POSTFIX}/`
    };
  },
  mounted() {
    console.log('mounted', this.apiInfo);
    if (!this.authenticated) {
      this.$router.replace({ name: "login" }).catch(err => {
        console.log('all good')
      });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
};
</script>


<style>
</style>
