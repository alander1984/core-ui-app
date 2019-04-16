const store = new Vuex.Store({
    state: {
        delivery: {}
    },
    mutations: {
        loadDelivery(state, payload){
           state.delivery = payload 
        }
    }
});


var app1 = new Vue({
    el: '#vue-app',
    store,
    data: {
        message : 'This is Vue.js !!!!'
    }
});
