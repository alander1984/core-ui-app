/**
 * Created by Ilya on 26.03.2019.
 */

const login = new Vue({
        el: '#loginPanel',
        data : {
            loginUser: '',
            password: '',
            authErrorMessage: ''
        },
        methods: {
                doLogin: function () {
                   // this.loginUser ='Ilya Kuznetsov'
                   // this.password = ''
                    CDSAPI.Token.getToken(this.loginUser, this.password, 'service-ui', 'client_credentials').then(tokenResponce => {
                                console.log(tokenResponce);

                        if(tokenResponce.getToken()){
                            localStorage.setItem('user-token', tokenResponce.getToken());
                            window.location.replace(_ctx);
                        }else{
                            this.authErrorMessage = tokenResponce.getError().getErrormessage();
                        }
                    });
                }
        }
});
