const store = new Vuex.Store({
    state: {
        delivery: {}
    },
    mutations: {
        loadDelivery(state, payload){
           state.delivery = payload 
        }
    }
})
var app = new Vue({
    el: '#admin-app',
    store,
    data: {
        message : 'This is Vue.js !!!!'
    }
});


var app1 = new Vue({
    el: '#vue-app',
    data: {
        message : 'This is Vue.js !!!!'
    }
});
