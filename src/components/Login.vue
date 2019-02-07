<template>
  <div class="accounts-container">
    <v-layout>
      <v-flex offset-sm-4 pl-3 pr-3 sm4>
        <v-card class="vue-card">
          <v-card-text row wrap align-center class="login-title">
            <v-flex class="login-center">
              <h1 class="mb-3">MSK LOGIN</h1>
              <h3>Hello there, Sign in and start managing your Account balance</h3>
            </v-flex>
          </v-card-text>

          <form class="pa-5">
            <v-text-field v-model="email" :rules="nameRules" label="Email" required></v-text-field>

            <v-text-field
              v-model="pwd"
              :rules="pwdRules"
              label="Password"
              :type="'password'"
              required
            ></v-text-field>

            <v-btn to="/register" class="register signin-btn">Register</v-btn>
            <v-btn class="login signin-btn" @click="checkLogin()">Login</v-btn>
          </form>

          <v-snackbar
            v-model="snackbar"
            color="#840909"
            :timeout="2000"
            :right="true"
            :top="true"
          >Invalid Login</v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      'userList'
    ])
  },
  data() {
    return {
      valid: false,
      email: "",
      pwd: "",
      nameRules: [v => !!v || "Email required"],
      pwdRules: [v => !!v || "Password required"],
      snackbar: false,
    };
  },
  methods: {
    checkLogin() {
      let obsData = this.$store.state.userList;
      let data = JSON.parse(JSON.stringify(obsData));
      let finalData = Object.entries(data);

      let check = finalData.filter((val)=>{
        return this.email == val[1].email && this.pwd == val[1].pwd;      
      })
            
      if(check.length == 0){
        this.snackbar = true;
      }else{
        this.$store.state.loggedinUserEmail = this.email;
        // let emailData = this.email;
        // this.$router.push({
        //   name : "home",
        //   params: {userName: this.email}
        // });
        this.$router.push("/home")
      }
    }
  },
  created: function() {
    // console.log("hai"+this.demo);
  }
};
</script>

<style>
.accounts-container {
  background: linear-gradient(rgba(7, 75, 78, 0.27), rgba(35, 34, 34, 0.92)),
    url(https://images.pexels.com/photos/938965/pexels-photo-938965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-title {
  height: 200px;
  padding: 0px;
  background: #2c2e6f;
  color: #fff;
}

.login-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.login-center h3 {
  font-weight: 100;
  font-size: 15px;
  line-height: 25px;
  padding: 0px 25px;
}

.login-center h1 {
  font-size: 23px;
  font-weight: bold;
}

.vue-card {
  border-radius: 6px !important;
}

.signin-btn {
  color: white !important;
  font-size: 12px !important;
  border-radius: 3px !important;
  margin-top: 25px !important;
  text-decoration: none !important;
}

.register {
  background-color: #9c1c1c !important;
}

.login {
  background-color: #2c2e6f !important;
}
</style>
