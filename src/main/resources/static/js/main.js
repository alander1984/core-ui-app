//const Foo = { template: '<div>Foo</div'};
//const Bar = { template: '<div>Bar</div'};

const routes = [
    { path: '/roles', component: roles},
    { path: '/permissions', component: permissions}
];

const router = new VueRouter({
    routes
});

var app = new Vue({
    router,
    el: '#app',
    data: {
        message : 'This is Vue.js !!!!'
    }
});

/*
'<div>' + 
        '<table style="border: 0; width: 60%; margin-left: 20%;">' + 
            '<tr>' +
                '<td><roles /></td>' +
                '<td><permissions /></td>' +
            '</tr>' +
       '</table>' +
 '</div>',
 */