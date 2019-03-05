//import roles from '../../templates/components/roles.vue'
//import Roles from "./Roles.vue";

var app = new Vue({
    el: '#app',
    template: '<div>' + 
                    '<table style="border: 0; width: 60%; margin-left: 20%;">' + 
                        '<tr>' +
                            '<td><roles /></td>' +
                            '<td><permissions /></td>' +
                        '</tr>' +
                   '</table>' +
             '</div>',
    data: {
        message : 'This is Vue.js !!!!'
    }
});