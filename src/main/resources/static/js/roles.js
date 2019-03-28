const roles = Vue.component('roles', {

    template:  '<div>' +
                    '<h3>Roles</h3>' +
                    '<b-modal id="modalAdd" ref="modalAdd" title="Add Role" @ok="handleOk" @shown="clearName">' +
                      '<form @submit.stop.prevent="handleSubmit">' +
                        '<b-form-input type="text" placeholder="Enter role" v-model="roleAdd" />' +
                      '</form>' +
                    '</b-modal>' +
                    '<b-modal id="modalEdit" ref="modalEdit" title="Edit Role" @ok="handleOkEdit" @shown="iRole">' +
                      '<form @submit.stop.prevent="handleSubmitEdit">' +
                        '<b-form-input type="text"  v-model="roleAdd" />' +
                      '</form>' +
                    '</b-modal>' +
                    '<b-button id="add" variant="primary" v-b-modal.modalAdd>Add Role</b-button>' +
                    '<br /><br />' +
                    '<table class="table table-bordered" style="width: 70%">' +
                        '<tr v-for="(item, index) in rolesPermissions" :key=item.index >' +
                            '<td>{{ index + 1 }}</td>' +
                            '<td width=70% @click="permissions(index)" v-bind:style="{cursor: pointer, color:color}">{{item.role}}</td>' +
                            '<td><b-button variant="danger" v-on:click="deleteRole(index)">X</b-button></td>' +
                            '<td><b-button variant="success" v-b-modal.modalEdit v-on:click="editRole(index)">EDIT</b-button></td>' +
                        '</tr>' +
                    '</table>' +
                    '<br />' +
                    '<br />' +
                    '<div v-if="show == true">' +
                        '<table class="table table-bordered">' +
                            '<tr>' + 
                                '<td width=55% valign="top">' +
                                    '<h4>Permissions for <span style="color: red;">{{role}}</span></h4>' +
                                    '<b-button id="addPermission" variant="primary"  @click="showAllPermission">Add Permission</b-button>' +
                                    '<br /><br />' +
                                    '<table style="border: 0; width: 40%;">' +
                                        '<tr v-for="(item, index) in listPermissions" :key=item.index style="color: green;">' +
                                            '<td>{{ index + 1 }}.</td>' +
                                            '<td width=70%>{{item}}</td>' +
                                            '<td><b-button variant="danger" v-on:click="deletePermission(index)">X</b-button></td>'+
                                        '</tr>' +
                                    '</table>' +
                                    '<br /><br />' +
                                        '<b-button id="closePermissions" variant="primary"  @click="closePermissions">Close</b-button>' +
                                '</td>' +
                                '<td width=45% valign="top">' +
                                    '<div v-if="showPermissions == true">' +
                                        '<h4>Select permissions</h4>' +
                                        '<br /><br />' +
                                        '<table style="border: 0; width: 40%;">' +
                                            '<tr v-for="(item, index) in allPermissions" :key=item.index style="color: navy;">' +
                                                '<td>{{ index + 1 }}.</td>' +
                                                '<td width=70% style="cursor: pointer" @click="addPermission(index)" >{{item}}</td>' +
                                            '</tr>' +
                                        '</table>' +
                                        '<br /><br />' +
                                        '<b-button id="endShowPermission" variant="primary"  @click="endShow">Ok</b-button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>' +
                        '</table>' +
                    '</div>' +
                    '<br /><br />' +
                '</div>',
    data(){
            return {
                listPermissions: [],
                allPermissions: [],
                rolesPermissions: [
                    {
                        role: String,
                        permissionsForRole: []
                    }
                ],
                roleEdit: {
                    role: '',
                    permissionsForRole: []
                },
                index: Number,
                role: '',
                roleAdd: '',
                show: false,
                showPermissions: false,
                color: 'maroon',
                pointer: 'pointer'
            }
        },
    created(){
       /* this.listRoles = null; *//* Здесь запрос по списку ролей */
        this.rolesPermissions = [{role:'admin', permissionsForRole:['perm1', 'perm2', 'perm4', 'perm5']},
                                 {role:'user', permissionsForRole:['perm1', 'perm3', 'perm4']},
                                 {role:'boss', permissionsForRole:['perm3', 'perm4']}];
        this.allPermissions = ['aaaa', 'ddddd', 'zzzzz', 'ggggg'];
    },
    methods: {
        permissions(index){
            this.index = index;
            this.listPermissions = this.rolesPermissions[index].permissionsForRole;
            this.role = this.rolesPermissions[index].role;
            this.show = true;
            this.showPermissions = false;
        },
        
        deleteRole(index){
            this.rolesPermissions.splice(index, 1);
            this.show = false;
        },
        
        editRole(index){
            //alert("Редакт № " + index);
            this.show = false;
            this.roleAdd = this.rolesPermissions[index].role;
            this.index = index;
        },
        
        clearName() {
            this.roleAdd = '';
        },
        handleOk(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.roleAdd) {
              alert('Please enter role');
            } else {
              this.handleSubmit();
            }
        },
        handleSubmit() {
            this.rolesPermissions.push({role:this.roleAdd, permissionsForRole: []});
            this.clearName();
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modalAdd.hide();
             // document.getElementById('modalAdd').style.display= 'none';
            });
        },
        
        handleOkEdit(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (this.roleAdd === '') {
              alert('Please enter role');
            } else {
              this.handleSubmitEdit();
            }
        },
        handleSubmitEdit() {
            this.roleEdit.role = this.roleAdd;
            this.role = this.roleAdd;
            this.roleEdit.permissionsForRole = this.rolesPermissions[this.index].permissionsForRole;
            Vue.set(this.rolesPermissions, this.index, this.roleEdit);
            this.clearName();
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modalEdit.hide();
            });
        },
        iRole(){
            
        },
        deletePermission(index){
            //this.listPermissions.splice(index, 1);
            this.rolesPermissions[this.index].permissionsForRole.splice(index, 1);
            this.listPermissions = this.rolesPermissions[this.index].permissionsForRole;
        },
        addPermission(index){
            //alert(this.allPermissions[index]);
            if (this.rolesPermissions[this.index].permissionsForRole.indexOf(this.allPermissions[index]) == -1){
                this.rolesPermissions[this.index].permissionsForRole.push(this.allPermissions[index]);
                this.listPermissions = this.rolesPermissions[this.index].permissionsForRole;
            }else{
                alert(this.allPermissions[index] + " - This permission has already been added.");
            }

            
        },
        showAllPermission(){
            this.showPermissions = true;
        },
        endShow(){
            this.showPermissions = false;
        },
        closePermissions(){
            this.show = false;
        }
        

    }
});