<template>
  <div class="accounts-container register-page">
    <v-layout>
      <v-flex offset-sm-4 pl-3 pr-3 sm4>
        <v-card class="vue-card mt-3 mb-3" transition="scale-transition" origin="center center">
          <v-card-text row wrap align-center class="login-title register-title">
            <v-flex class="login-center">
              <h1>Register your account</h1>
            </v-flex>
          </v-card-text>

          <v-form>
            <v-container>
              <v-layout row wrap>
                <form id="form" class="form-inline" v-on:submit.prevent="addUser">
                  <v-flex xs12 pl-4 pr-4>
                    <v-text-field v-model="newUser.name" label="Name"></v-text-field>
                  </v-flex>

                  <v-flex xs12 pl-4 pr-4>
                    <v-text-field v-model="newUser.email" label="E-mail"></v-text-field>
                  </v-flex>

                  <v-flex xs12 pl-4 pr-4>
                    <v-text-field v-model="newUser.pwd" label="Password" :type="'password'"></v-text-field>
                  </v-flex>

                  <v-flex xs12 pl-4 pr-4>
                    <v-text-field v-model="newUser.phno" label="Phone No" type="number"></v-text-field>
                  </v-flex>

                  <v-flex xs12 pl-4 pr-4>
                    <v-text-field v-model="newUser.blnce" label="Available Balance" type="number"></v-text-field>
                  </v-flex>

                  <v-flex xs12 pl-4 pr-4>
                    <v-btn to="/" class="mb-4 mt-3 register signin-btn">Home</v-btn>
                    <v-btn type="submit" class="mb-4 mt-3 login signin-btn mt-0 submit-btn">Submit</v-btn>
                  </v-flex>

                  <!-- <v-btn class="login signin-btn" @click="checkLogin()">Login</v-btn> -->
                </form>
              </v-layout>
            </v-container>
          </v-form>

          <v-snackbar
            v-model="snackbar"
            :color="color"
            :timeout="timeout"
            :right="true"
            :top="true"
          >{{ snackbartext | initcap }}</v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import database from "@/services/database";

export default {
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        pwd: "",
        phno: "",
        blnce: ""
      },
      snackbartext: "",
      snackbar: false,
      timeout: 3000,
      color: ""
    };
  },
  methods: {
    addUser() {
      if (this.newUser.name != "" &&this.newUser.email != "" &&this.newUser.pwd != "" &&this.newUser.phno != "" &&this.newUser.blnce != "") {
        // new database().signUp(this.newUser)
        this.$store.commit('signUp',this.newUser);
    
        this.snackbartext = this.newUser.name+" User Registered Successfully";

        this.newUser.name = "";
        this.newUser.email = "";
        this.newUser.pwd = "";
        this.newUser.phno = "";
        this.newUser.blnce = "";
        this.color = "#155a18";
        
      } else {
        this.color = "#840909";
        this.snackbartext = "Fill all the fields";
      }
      this.snackbar = true;
    }
  },
  created: function() {
    // this.$store.commit('demofunction');
    // console.log(this.$store.state.categories);
  },
};
</script>


<style scoped>
.register-title {
  height: 120px !important;
}

.register-page {
  background: #d8e2f1 !important;
}
</style>
