<template>
  <div id="e3">
    <v-app>
      <!-- confirmation dialog-->
      <v-dialog v-model="confirmation" max-width="430">
        <v-card>
          <v-card-text
            style="font-size: 21px;padding-top:30px;"
          >Are your sure want to clear all the history</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="confirmation = false">cancel</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="clearHistory()">ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- end confirmation -->
      <v-container>
        <div class="row">
          <h4 class="history-head col-xl offset-lg-4">Account history</h4>
          <div class="col-xl">
            <v-btn color="warning" @click="confirmation = true">
              <v-icon dark left>remove_circle</v-icon>Clear
            </v-btn>
          </div>
        </div>
        <v-layout row wrap v-for="items in historyData">
          <v-flex xs12 pa-4>
            <v-card color="blue-grey" class="white--text">
              <v-card-title>
                <div class="content">
                  <div class="headline">Date: {{items.date}}</div>
                  <span>${{items.amount}} Money {{items.action}}</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-if="historyData.length == 0" class="pt-5" style="justify-content:center">
          <v-flex xs12>
            <img class="no-img" src="../assets/no_result.png">
          </v-flex>
          <v-flex xs12>
            <p style="font-size: 18px;">No history found</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>


<script>
export default {
  data() {
    return {
      historyData: [],
      confirmation: false
    };
  },
  created: function() {
    this.initHistory();
  },
  methods: {
    clearHistory(){
      this.$store.commit("clearAllHistory");
      this.initHistory();
      this.confirmation = false;
    },
    call(){
      alert("hraa");
    },
    initHistory(){
      this.$store.commit("getHistoryData");

      let data,finalData,history;
      
      data = JSON.parse(JSON.stringify(this.$store.getters.getHistory));

      if(data == null){
        this.historyData.length = 0;
      }else{
        finalData = Object.entries(data);
        history = new Array();
        finalData.filter(function(val) {
          history.push(val[1]);
        });
        this.historyData = JSON.parse(JSON.stringify(history));
      }
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

.history-head{
      font-weight: bold;
    margin-top: 9px;
}
</style>