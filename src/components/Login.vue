<template >
  <div>
    <link rel="stylesheet" type="text/css" href="/static/css/style_login.css">
    <div>
      <div class="form">
        <form class="login" @submit.prevent="doLogin">
        <div class="forceColor"></div>
        <div class="topbar">
          <div class="spanColor"></div>
          <input type="text" v-model="username" class="input" id="username" placeholder="Username"/>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password"/>
        </div>
        <button class="submit" id="submit" >Login</button>
        </form>
      </div>

    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import sha256 from 'sha256'
  import $cookies from 'vue-cookie'

  // axios.defaults.baseURL = "http://127.0.0.1:9080"
  axios.defaults.baseURL = "https://api.craftsoft.eu"

  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
        errors: []
      }

    },

    watch: {
      '$route' (to, from) {

      }
    },

    created() {

    },

    methods: {

      doLogin: function (event) {
        let jsonLogin = "{ \"username\":\"" + this.username  + "\", \"password\" : \"" + sha256(this.password) + "\" }"
        console.log(jsonLogin);
        axios.post("/login", jsonLogin)
          .then(response => {
            let data0 = response.data;
            // $cookies.set('auth_token', data0.auth_token);
            localStorage.setItem('auth_token', data0.auth_token);
            this.$route.params.username="";
            this.$route.params.password="";
            this.$router.push("/");
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
            event.preventDefault();
            // return false;
          });
      }

    }

  }

</script>

<style scoped>

</style>
