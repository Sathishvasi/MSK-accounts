<template>
  <v-card height="100vh" flat @click="drawer = false">
    <div class="headline text-xs-center">

      <v-toolbar color="cyan" dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">MSK Accounts</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>

      <v-layout wrap>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../assets/sathish.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{userName | initcap}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile class="list-item-top" v-for="item in items" :key="item.title" @click="drawer = !drawer">
              <router-link class="router-style" :to="item.url">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              
                <v-list-tile-content>
                <v-list-tile-title>
                  
                    {{ item.title }}
                  
                </v-list-tile-title>
                </v-list-tile-content>
              </router-link>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>

      <!-- <router-view/> -->
      <router-view></router-view>

    </div>

  </v-card>
</template>

<script>
export default {
  name: "NavDrawer",
  data() {
    return {
      // bottomNav: "recent",
      drawer: null,
      items: [
        { title: "Home", icon: "home",url: "/home" },
        { title: "Profile", icon: "info",url: "home/profile" },
        { title: "History", icon: "chat",url: "home/history" },
        { title: "Logout", icon: "present_to_all",url: "/" }
      ]
    };
  },
  created: function() {
    
    
    let obsData = this.$store.state.userList;
    let data = JSON.parse(JSON.stringify(obsData));
    let finalData = Object.entries(data);



    let loginUserName = finalData.filter((val)=>{
      return val[1].email == this.$store.state.loggedinUserEmail;
    })

    this.userName = loginUserName[0][1].name;

    // console.log(this.userName);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.router-style{
  text-decoration: none !important;
  display: -webkit-inline-box;
  /* margin-top: 25px; */
}

.list-item-top{
  margin-top:10px;
}
</style>
