<template>

<div class="apply-flex pt-4 make-column">
  <div class="col-md-7 pl-md-5 pr-md-5">
    <v-card class="">
      <h3 class="pt-3">{{name | initcap}} profile</h3>
      <v-form>
        <v-container>
          <v-layout row wrap>
            <form id="form" class="form-inline" v-on:submit.prevent="submitDetails">
              <v-flex xs12 pl-4 pr-4>
                <v-text-field v-model="name" label="Name"></v-text-field>
              </v-flex>

              <v-flex xs12 pl-4 pr-4>
                <v-text-field v-model="email" label="E-mail"></v-text-field>
              </v-flex>

              <v-flex xs12 pl-4 pr-4>
                <v-text-field v-model="pwd" label="Password" :type="'password'"></v-text-field>
              </v-flex>

              <v-flex xs12 pl-4 pr-4>
                <v-text-field v-model="phno" label="Phone No" type="number"></v-text-field>
              </v-flex>

              <v-flex xs12 pl-4 pr-4>
                <v-text-field v-model="blnce" label="Available Balance" type="number"></v-text-field>
              </v-flex>

              <v-flex xs12 pl-4 pr-4>
                <v-btn type="submit" class="mb-4 mt-3 login signin-btn mt-0 br-btn">Submit Details</v-btn>
              </v-flex>

            </form>
          </v-layout>
        </v-container>
      </v-form>

          <v-snackbar
            v-model="snackbar"
            color='#155a18'
            :timeout= '3000'
            :right="true"
            :bottom="true"
          >Profile Updated successfully</v-snackbar>

    </v-card>
  </div>

  <div class="col-md-5 pl-md-0 pr-md-5 mb-4">
    <v-card class="pb-3 pt-3">
      <div class="profile-img">
        <!-- <img class="d-none base64url" src=""/> -->
        <img class="loadImg" :src="imageUrl"/>
      </div>
      <v-btn raised type="submit" class="mb-1 mt-3 login signin-btn mt-0 br-btn" @click="pickImage">Upload Image</v-btn>
      <input type="file" class="d-none" ref="filePicker" accept="image/*" @change="onFilePicked">
    </v-card>
  </div>
</div>

</template>


<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      phno: "",
      pwd: "",
      blnce: "",
      snackbar: false,
      imageUrl: "",
      image: null
    };
  },
  created: function() {
    // console.log(document.getElementsByClassName("base64url")[0].src);
    // this.imageUrl = document.getElementsByClassName("base64url")[0].src;
    let obsData = this.$store.state.userList;
    let data = JSON.parse(JSON.stringify(obsData));
    let finalData = Object.entries(data);

    console.log(finalData);
    
    let loginUserName = finalData.filter(val => {
      return val[0] == this.$store.state.loggedInID;
    });

    this.name = loginUserName[0][1].name;
    this.email = loginUserName[0][1].email;
    this.phno = loginUserName[0][1].phno;
    this.pwd = loginUserName[0][1].pwd;
    this.blnce = loginUserName[0][1].blnce;
    this.imageUrl = loginUserName[0][1].imageUrl != null ? loginUserName[0][1].imageUrl : '../assets/profile-avatar.png';

  },
  methods: {
    submitDetails(){
      var localObj = {
        name: this.name,
        email: this.email,
        phno: this.phno,
        pwd: this.pwd,
        blnce: this.blnce
      }
      this.$store.commit('updateProfile',localObj);
      this.snackbar = true;
    },
    pickImage(){
      this.$refs.filePicker.click()
    },
    onFilePicked(event){
      const files = event.target.files
      this.image = files[0];
      
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        // this.imageUrl = fileReader.result
        document.getElementsByClassName("loadImg")[0].src = fileReader.result
      })

      fileReader.readAsDataURL(files[0])
      
      this.$store.dispatch('uploadImage',this.image)
    }
  }
};
</script>


<style scoped>
.headline {
  text-align: center;
  font-size: 18px !important;
}

.headline + span {
  font-size: 21px;
}

.content {
  width: 100%;
}

.br-btn{
  border-radius: 20px !important
}

.no-img {
  height: 183px;
}

.white--text {
  border-radius: 5px;
}

.clear-btn {
  position: absolute !important;
  top: 10px;
  right: 40px;
}

.history-head {
  font-weight: bold;
  margin-top: 9px;
}

.apply-flex{
  display: flex;
  background: #d8e2f1; 
  padding-bottom: 54px;
}

.profile-img{
  margin: 0 auto;
}

.profile-img img{
    object-fit: cover;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border: 5px solid #6d6d6d;
}
@media screen and (max-width: 760px){
  .make-column{
    flex-direction: column-reverse;
  }
}
</style>