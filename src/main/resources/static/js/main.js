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

Vue.directive('select', {
  twoWay: true,
  bind: function (el, binding, vnode) {
    $(el).select2().on("select2:select", (e) => {
      // v-model looks for
      //  - an event named "change"
      //  - a value with property path "$event.target.value"
      el.dispatchEvent(new Event('change', { target: e.target }));
    });
  },
});

var app1 = new Vue({
    el: '#vue-app',
    store,
    data: {
        message : 'This is Vue.js !!!!'
    }
});
