/**
 * Created by Ilya on 26.03.2019.
 */
const routes = [
    { path: '/login',name: 'login'},
    { path: '/', name:'home'},
];

const router = new VueRouter({
    routes
});

const login = new Vue({
        router,
        el: '#loginPanel',
        data : {
            loginUser: '',
            password: ''
        },
        methods: {
                doLogin: function () {
                    var tokenPr = CDSAPI.Token.getToken(this.loginUser, this.password, 'service-ui', 'client_credentials');
                    tokenPr.then(tokenResponce => {
                                console.log(tokenResponce);
                        console.log(tokenResponce.getToken());
                        console.log(tokenResponce.getJti());

                        if(tokenResponce.getToken()){
                            localStorage.setItem('user-token', tokenResponce.getToken());
                            //router.push('home');
                            console.log("Auth!!!!")
                        }else{
                            alert("Non authentificate!!!")
                        }
                    });
                }
        }
});
