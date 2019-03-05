Vue.component('roles', {

    template:  '<div>' +
                    '<h3>Roles</h3>' +
                    '<div v-for="(item, index) in listRoles" :key=item.index>' +
                        '{{ index }}. {{item}}' +
                    '</div>' +
                '</div>',
    data(){
            return {
                listRoles: ['admin', 'user', 'driver']
            }
        },
    created(){
       /* this.listRoles = null; *//* Здесь запрос по списку ролей */
    }
});