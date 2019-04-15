const store = new Vuex.Store({
    state: {
        delivery: {}
    }
})
var app = new Vue({
    el: '#admin-app',
    store,
    data: {
        message : 'This is Vue.js !!!!'
    }
});

