
const routesTs = [
  { path: '/drivers', component: drivers},
  { path: '/vehicles', component: vehicles},
  { path: '/tcs', component: tcs},
  { path: '/', name:'home'},
];

const routerT = new VueRouter({
  routesTs
});

var transports = new Vue({
  routerT,
  el: '#ts-app',
  data: {
    message : 'This is Vue.js !!!!'
  }
});

