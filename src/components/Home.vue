<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-dark bg-custom-1 shadow-sm">
      <div class="navbar-nav">
        <img class="navbar-brand" src="./../assets/logo.png" alt="feck">
        <router-link class="navbar-brand" to="#">
          
          Расписание звонков 0.3.0</router-link>
        <router-link class="nav-item nav-link" to="/schedule" active-class="active" active="isActive">Расписание</router-link>
        <router-link class="nav-item nav-link" to="/profiles" active-class="active">Профили</router-link>
        <router-link class="nav-item nav-link" to="/settings" active-class="active">Настройки</router-link>
      </div>

      <!-- <button class="btn btn-danger ml-4" @click="sendAlarm()">ТРЕВОГА</button> -->
      <div class="ml-auto navbar-brand">{{timestamp}}</div>
      <!-- <div class="navbar-brand">{{timestamp}}</div> -->
      <router-link to="/login" class="nav-item nav-link text-light" v-on:click.native="logout()" replace>Выход</router-link>
    </nav>

    <router-view v-if="loaded" :api-info="apiInfo" :profiles="profiles" :days="days" :settings="settings"></router-view>
  </div>
</template>

<script>
export default {
  props: ["authenticated", "apiInfo"],
  name: "App",
  data: function() {
    return {
      timestamp: "",
      profiles: null,
      days: null,
      settings: null,
      loaded: false
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" }).catch(err => {
        console.log("all good");
      });
    } else {

      this.axios.get(`${this.apiInfo}profiles`).then(response => {
        this.profiles = response.data;

        this.axios.get(`${this.apiInfo}days`).then(response => {
          this.days = response.data;

          this.axios.get(`${this.apiInfo}settings`).then(response =>{
            console.log("======================================");
            console.log(response.data);
            console.log("======================================");
            this.settings = response.data;
            this.loaded = true;
          })
        })
      });
    }
  },
  methods: {
    getNow: function() {
      const today = new Date();
      const date = `${today.getDate()}.${today.getMonth() +
        1}.${today.getFullYear()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const dateTime = `${time} ${date}`;
      this.timestamp = dateTime;
    },
    logout: function() {
      this.$emit();
      this.$emit("logout");
    },
    sendAlarm() {
      this.axios.get(`${this.apiInfo}alarm`);
    }
  }
};
</script>

<style>
.bg-custom-1 {
  background: #0074D9
  /* background: rgb(0,255,226);
  background: linear-gradient(90deg, rgba(0,255,226,1) 0%, rgba(9,9,121,1) 32%, rgba(0,255,226,1) 100%); */
}
</style>
