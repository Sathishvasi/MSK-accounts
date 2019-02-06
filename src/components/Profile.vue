<template>

<div class="apply-flex pt-5">
  <div class="col-7">
    <v-card class="">
      <p>Name : {{name}}</p>
      <p>Email : {{email}}</p>
      <p>Password : {{pwd}}</p>
      <p>Phone No : {{phno}}</p>
      <p>Balance : {{blnce}}</p>
    </v-card>
  </div>

  <div class="col-5 pl-0">
    <v-card class="">
      <p>Image content</p>
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
      blnce: ""
    };
  },
  created: function() {
    let obsData = this.$store.state.userList;
    let data = JSON.parse(JSON.stringify(obsData));
    let finalData = Object.entries(data);

    let loginUserName = finalData.filter(val => {
      return val[0] == this.$loginUserID[0];
    });

    this.name = loginUserName[0][1].name;
    this.email = loginUserName[0][1].email;
    this.phno = loginUserName[0][1].phno;
    this.pwd = loginUserName[0][1].pwd;
    this.blnce = loginUserName[0][1].blnce;
  },
  methods: {}
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
}
</style>