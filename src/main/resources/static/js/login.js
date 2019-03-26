/**
 * Created by Ilya on 26.03.2019.
 */
const login = Vue.component('login', {
        template:   '<div>' +
                        '<p>Логин:</p>' +
                        '<input v-model="loginUser">' +
                        '<p>Пароль:</p>' +
                        '<input type="password" v-model="password">' +
                        '<button v-on:click="doLogin">Войти</button>' +
                    '</div>',
    data(){
        return {
            loginUser: '',
            password: ''
        }
    },

    methods: {
        doLogin: function () {
            var token = CDSAPI.Token.getToken(this.loginUser, this.password, 'service-ui', 'client_credentials');
            //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3JBdXRoIjoidGVzdF9hdXRoIiwidXNyQ3JkIjoidGVzdF9hdXRoIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTU1Mjg4NTIyNCwianRpIjoiYzcxMDZjNWQtMTNhZi00YTFiLTllYzEtMTdhMTkyMGYzODZmIiwiY2xpZW50X2lkIjoic2VydmljZS11aSJ9.klfT9j2IVzN9tPtZR_aUb6MLH9Fbb2pvDs14IyLBE_U";
            if(token != null){
                localStorage.setItem('user-token', token);
                router.push('home');
            }else{
                alert("Non authentificate!!!")
            }
            console.log(this.login);
            console.log(this.password);
        }
    }
}
)