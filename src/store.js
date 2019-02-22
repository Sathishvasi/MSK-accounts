import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '../src/services/database';
import Fire from 'firebase';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
Vue.use(firebase);

var userCollection = firebase.ref('users');


const store = new Vuex.Store({
    state: {
        userList: {},
        historyData: {},
        loggedinUserEmail: "",
        loggedInID: ""
    },
    plugins: [createPersistedState()],
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
        storeUserID: function (state, ID) {
            state.loggedInID = ID[0];
        },
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
                state.userList = snap.val();
                localStorage.setItem("userList",JSON.stringify(snap.val()))
            })
        },
        getHistoryData: function (state) {
            userCollection.child(state.loggedInID).child('history').on("value", function (snap) {
                state.historyData = snap.val();
            })
        },
        clearAllHistory(state){
            userCollection.child(state.loggedInID).child('history').remove();
        },
        updateProfile: function(state,newObj){
            userCollection.child(state.loggedInID).update({
                blnce: newObj.blnce,
                email: newObj.email,
                name: newObj.name,
                phno: newObj.phno,
                pwd: newObj.pwd
            });
        },
        
    },
    actions: {
        uploadImage: function ({commit,getters}, imageObj) {
            let imageUrl, key;


            userCollection.child(this.state.loggedInID).push(imageObj)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = imageObj.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    
                    var task = Fire.storage().ref(this.state.loggedInID + '/' + key + ext).put(imageObj);
                    return task;
                })
                .then(fileData => {

                    fileData.task.snapshot.ref.getDownloadURL().then((url)=>{

                        // Storing image url in real time db
                        return firebase.ref('users').child(this.state.loggedInID).update({
                            imageUrl: url
                        })

                    })
                    
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
})

export default store;