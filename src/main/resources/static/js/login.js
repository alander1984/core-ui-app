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
                    CDSAPI.Token.getToken(this.loginUser, this.password, 'service-ui', 'client_credentials').then(tokenResponce => {
                                console.log(tokenResponce);

                        if(tokenResponce.getToken()){
                            localStorage.setItem('user-token', tokenResponce.getToken());
                            window.location.replace(_ctx);
                        }else{
                            alert("Permission denied...")
                        }
                    });
                }
        }
});
