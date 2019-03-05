Vue.component('permissions', {
    
    template: '<div>' +
                '<h3>Permissions</h3>' +
                '<b-button id="add" variant="primary" v-on:click="addPermission">Add Permission</b-button>' +
                '<br /><br />' +
                '<div v-for="(item, index) in listPermissions" :key=item.index>' +
                        '{{ index }}. {{item}} <b-button variant="danger" v-on:click="deletePermission(index)" >X</b-button>&nbsp;&nbsp;' +
                        '<b-button variant="success" v-on:click="editPermission(index)" >EDIT</b-button>' +
                    '</div>' +
              '</div>',
    data(){
            return {
                listPermissions: ['perm-one', 'perm-two', 'perm-three', 'perm-four'],
                
                rolesPermissions: [
                    {
                        role: String,
                        permissionsForRole: []
                    }
                ]
            }
        },
    methods: {
        addPermission(){
            alert("Добавить");
        },
        deletePermission(index){
            alert("Удалить  № " + index);
        },
        editPermission(index){
            alert("Редактировать  № " + index);
        }
    }
    
});