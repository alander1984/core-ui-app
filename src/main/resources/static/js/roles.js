const roles = Vue.component('roles', {

    template:  '<div>' +
                    '<h3>Roles</h3>' +
                    '<div v-for="(item, index) in rolesPermissions" :key=item.index @click="permissions(index)" v-bind:style="{cursor: pointer, color:color}">' +
                        '{{ index + 1}}. {{item.role}}' +
                    '<br /></div>' +
                    '<br />' +
                    '<br />' +
                    '<h4 v-if="show == true">Permissions for <span style="color: red;">{{role}}</span></h4>' +
                    '<div v-for="(item, index) in listPermissions" :key=item.index style="color: green;">' +
                        '{{ index + 1 }}. {{item}}' +
                    '</div>' +
                '</div>',
    data(){
            return {
                listPermissions: [],
                rolesPermissions: [
                    {
                        role: String,
                        permissionsForRole: []
                    }
                ],
                role: '',
                show: false,
                color: 'maroon',
                pointer: 'pointer'
            }
        },
    created(){
       /* this.listRoles = null; *//* Здесь запрос по списку ролей */
        this.rolesPermissions = [{role:'admin', permissionsForRole:['perm1', 'perm2', 'perm4', 'perm5']},
                                 {role:'user', permissionsForRole:['perm1', 'perm3', 'perm4']},
                                 {role:'boss', permissionsForRole:['perm3', 'perm4']}];
    },
    methods: {
        permissions(index){
            this.listPermissions = this.rolesPermissions[index].permissionsForRole;
            this.role = this.rolesPermissions[index].role;
            this.show = true;
        }

    }
});