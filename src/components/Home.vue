<template>
  <div class="back-color">
    <v-app>
      <!-- confirmation dialog-->
      <v-dialog v-model="confirmation" max-width="430">
        <v-card>
          <v-card-text
            style="font-size: 21px;padding-top:30px;"
          >Are your sure want to clear the amount!</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="confirmation = false">cancel</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="clearBalance()">ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- end confirmation -->
      <!-- Money transaction dialog -->
      <v-dialog v-model="dialog1" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Please take your amount</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-dialog
                    ref="dialog1"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="Pick your date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog1.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="takeAmount" type="number" label="Amount*" required></v-text-field>
                </v-flex>

                <v-alert :value="takeError" type="error" outline>{{error}}</v-alert>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog1 = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="takeMethod()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Please add your amount</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-dialog
                    ref="dialog2"
                    v-model="modal2"
                    :return-value.sync="date2"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date2"
                      label="Pick your date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date2" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog2.save(date2)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="addAmount" type="number" label="Amount*" required></v-text-field>
                </v-flex>

                <v-alert :value="addError" type="error" outline>{{error}}</v-alert>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog2 = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addMethod()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End money transaction dialog -->
      <div class="transaction">
        <v-layout class="align-layout">
          <v-flex xs12 sm6 offset-sm3 pl-2 pr-2>
            <h5 class="mt-3 mb-4 pl-6 pr-6 desc">Simple and Convenient way to manage funds coming in
              <br>(deposits) and those going out (withdrawals)
            </h5>
            <v-card>
              <v-img
                class="white--text"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">Calculate your current availability balance</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-title>
                <div style="width:100%">
                  <p>Available Balance</p>
                  <p style="font-weight:bold">${{balance}}</p>
                </div>
              </v-card-title>
              <v-card-actions class="apply-flex pb-3">
                <v-btn
                  class="flex-box"
                  flat
                  slot="activator"
                  color="blue"
                  @click="takeMoney()"
                >Take Money</v-btn>
                <v-btn
                  class="flex-box"
                  flat
                  slot="activator"
                  color="blue"
                  @click="addMoney()"
                >Add Money</v-btn>
              </v-card-actions>
            </v-card>

            <v-btn color="info mt-4 mb-3" @click="confirmation = true">Clear Amount</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      balance: 10000,
      takeAmount: "",
      addAmount: "",
      dialog1: false,
      dialog2: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      modal: false,
      modal2: false,
      error: "",
      addError: false,
      takeError: false,
      confirmation: false,
      localObj: {}
    };
  },
  created: function() {
    let obsData = this.$store.state.userList;
    let data = JSON.parse(JSON.stringify(obsData));
    let finalData = Object.entries(data);

    let loginUser = finalData.filter(val => {
      return val[1].email === this.$store.state.loggedinUserEmail;
    });

    // Stored ID to vuex
    this.$store.commit("storeUserID", loginUser[0]);

    // Making userID as global
    Vue.prototype.$loginUserID = loginUser[0];

    this.balance = Number(loginUser[0][1].blnce);
  },
  methods: {
    addMethod() {
      if (this.addAmount != "") {
        this.balance = parseInt(this.balance) + parseInt(this.addAmount);
        this.dialog2 = false;

        this.localObj = {
          date: this.date2,
          amount: this.addAmount,
          action: "added"
        };
        
        // Updating money and history in database
        this.$store.commit("updateMoney", this.balance);
        this.$store.commit("addHistory", this.localObj);

        this.addAmount = "";
      } else {
        this.addError = true;
        this.error = "Amount Required!";
      }
    },
    takeMethod() {
      if (this.takeAmount != "") {
        if (this.balance - parseInt(this.takeAmount) > 0) {
          this.balance = parseInt(this.balance) - parseInt(this.takeAmount);
          this.dialog1 = false;

          this.localObj = {
            date: this.date,
            amount: this.takeAmount,
            action: "taken"
          };

          // Updating money and history in database
          this.$store.commit("updateMoney", this.balance);
          this.$store.commit("addHistory", this.localObj);

          this.takeAmount = "";
        } else {
          this.takeError = true;
          this.error = "Insufficient amount!";
        }
      } else {
        this.takeError = true;
        this.error = "Amount Required!";
      }
    },
    clearBalance() {
      this.balance = 0;
      this.confirmation = false;

      this.localObj = {
        date: new Date().toISOString().substr(0, 10),
        amount: 0,
        action: "cleared"
      };

      // Updating money and history in database
      this.$store.commit("updateMoney", this.balance);
      this.$store.commit("addHistory", this.localObj);
    },
    takeMoney() {
      this.dialog1 = true;
      this.takeError = false;
    },
    addMoney() {
      this.dialog2 = true;
      this.addError = false;
    }
  }
};
</script>


<style scoped>
.balance {
  margin-top: 15px;
}
.apply-flex {
  display: flex;
  align-items: center;
}
.flex-box {
  flex: 1;
}

.transaction {
  display: flex;
  width: 100%;
  background: #d8e2f1;
  min-height: 91vh;
  /* background: #ddf0ff; */
}

.align-layout {
  align-items: center;
}

.desc {
  line-height: 1.8rem;
}
</style>
