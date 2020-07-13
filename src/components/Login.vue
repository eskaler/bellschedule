<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-10 offset-sm-1 text-center">
          <h1>Авторизация</h1>
          <div class="info-form">
            <form action="" class="form-inline justify-content-center">
              <div class="form-group m-2">
                <label class="sr-only">Логин</label>
                <input type="text" class="form-control" name="username" v-model="input.username" placeholder="Логин" />
              </div>
              <div class="form-group m-2">
                <label class="sr-only">Пароль</label>
                <input type="password" class="form-control" name="password" v-model="input.password" placeholder="Пароль" />
              </div>
              <button class="btn btn-success m-2" type="button" v-on:click="login()">Вход</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    
    
    
  </div>
</template>

<script>
export default {
  props: ["apiInfo"],
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log(this.apiInfo);
      console.log(this.$route);
      if (this.input.username != "" && this.input.password != "") {
        this.axios
          .post(`${this.apiInfo}login`, { "login" : this.input.username, "password" : this.input.password})
          .then(response => {
            console.log('response', response.data);
            if(response.data.length == 0){
              console.log("The username and / or password is incorrect");
            } else {
              console.log('logged id', response.data.id);
              this.$emit("authenticated", true);
              this.$router.replace({ name: 'schedule'});
            }
          })
          .catch(error => {
            if(error.response.status==404){
              alert("wrong login or password");
            };
          })
        
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>