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



Vue.directive('sortable', {
    inserted: function (el) {
        var sortable = new Sortable(el, {
            
        });
        if (this.arg && !this.app1.sortable) {
            this.app1.sortable = {}
        }
    
                    //  Throw an error if the given ID is not unique
        if (this.arg && this.app1.sortable[this.arg]) {
            console.warn('[vue-sortable] cannot set already defined sortable id: \'' + this.arg + '\'')
        } else if( this.arg ) {
            this.app1.sortable[this.arg] = sortable;
        }
    },
    bind: function (el, binding) {
        this.options = binding.value || {};
    }
    
//    update: function(el, binding) {
//        var that = this,
//      key = this.arg;
//        var app1 = that.app1,
//        array = app1[ key ],
//        target = array[ el.oldIndex ];
//        array.$remove( target );
//        array.splice( el.newIndex, 0, target );
//        app1.$emit( "sort", target, el.oldIndex, el.newIndex );
//    }
});

var app1 = new Vue({
    el: '#vue-app',
    store,
    data: {
        message : 'This is Vue.js !!!!'
    }
});
