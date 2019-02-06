import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '../src/services/database';

Vue.use(Vuex);
Vue.use(firebase);

var userCollection = firebase.ref('users');


const store = new Vuex.Store({
    state: {
        userList: {},
        historyData: {},
        loggedinUserEmail: "",
        // loggedInID: ""
    },
    getters: {
        getUser: function (state) {
            return state.userList;
        },
        getHistory: function(state){
            return state.historyData;
        }
    },
    mutations: {
        signUp: function (state, payload) {
            const userObj = {
                blnce: payload.blnce,
                email: payload.email,
                name: payload.name,
                phno: payload.phno,
                pwd: payload.pwd,
                history: []
            }
            userCollection.push(userObj);
        },
        // storeUserID: function (state, ID) {
        //     state.loggedInID = ID[0];
        // },
        updateMoney: function (state, val) {
            userCollection.child(state.loggedInID).update({
                blnce: val
            });
        },
        addHistory: function (state, val) {
            userCollection.child(state.loggedInID).child('history').push(val);
        },
        getFirebaseDatabase: function (state) {
            userCollection.on("value", function (snap) {
                state.userList = snap.val()
            })
        },
        getHistoryData: function (state) {
            userCollection.child(state.loggedInID).child('history').on("value", function (snap) {
                state.historyData = snap.val();
            })
        },
        clearAllHistory(state){
            userCollection.child(state.loggedInID).child('history').remove();
        }
    },
    actions: {

    }
})

export default store;