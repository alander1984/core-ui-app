Vue.component('roles', {

    template:  '<div>' +
                    '<h3>Roles</h3>' +
                    '<b-modal id="modalAdd" ref="modalAdd" title="Add Role" @ok="handleOk" @shown="clearName">' +
                      '<form @submit.stop.prevent="handleSubmit">' +
                        '<b-form-input type="text" placeholder="Enter role name" v-model="roleNameAdd" /><br />' +
                        '<b-form-input type="text" placeholder="Enter role code" v-model="roleCodeAdd" />' +
                      '</form>' +
                    '</b-modal>' +
                    '<b-modal id="modalEdit" ref="modalEdit" title="Edit Role" @ok="handleOkEdit" @shown="iRole">' +
                      '<form @submit.stop.prevent="handleSubmitEdit">' +
                        '<h5>Name:</h5>' +
                        '<b-form-input type="text"  v-model="roleNameAdd" />' +
                        '<h5>Code:</h5>' +
                        '<b-form-input type="text"  v-model="roleCodeAdd" />' +
                      '</form>' +
                    '</b-modal>' +
                    '<b-button id="add" variant="primary" v-b-modal.modalAdd>Add Role</b-button>' +
                    '<br /><br />' +
                        '<table class="table table-bordered" style="width: 70%">' +
                            '<tr v-for="(item, index) in rolesPermissions" :key=item.index >' +
                                '<td>{{ index + 1 }}</td>' +
                                //'<td width=10% style="color: red; text-align: center;">{{item.id}}</td>' +
                                '<td width=70% @click="permissions(index)" v-bind:style="{cursor: pointer, color:color}">{{item.name}}</td>' +
                                '<td><b-button variant="danger" v-on:click="deleteRole(index, item)">X</b-button></td>' +
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
                                        '<table style="border: 0; width: 100%;">' +
                                            '<tr v-for="(item, index) in listPermissionsForRole" :key=item.index style="color: green;">' +
                                                '<td>{{ index + 1 }}.</td>' +
                                                '<td wdth=wi70%>{{item.name}}</td>' +
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
                                            '<table style="border: 0; width: 100%;">' +
                                                '<tr v-for="(item, index) in allPermissions" :key=item.index style="color: navy;">' +
                                                    '<td>{{ index + 1 }}.</td>' +
                                                    '<td width=70% style="cursor: pointer" @click="addPermission(index)" >{{item.name}}</td>' +
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
                //listRoles: [],
                allPermissions: [],
                rolesPermissions: [],
                listPermissionsForRole: [],
                roleEdit: {},
                index: Number,
                role: '',
                roleNameAdd: '',
                roleCodeAdd: '',
                show: false,
                showPermissions: false,
                color: 'maroon',
                pointer: 'pointer'
            }
        },
    created(){
        //document.getElementById('routesToPages').style.display = "none";
        CDSAPI.Permissions.sendAllPermissions().then(permissions => {
            
                this.allPermissions = permissions;
                console.log("PERMISSIONS :  " + this.allPermissions.length);
            });
        CDSAPI.Roles.sendAllRoles().then(roles => {
                this.rolesPermissions = roles;
                console.log("ROLElistLength :  " + this.rolesPermissions.length);
            });
    },
    methods: {
        permissions(index){
            this.index = index;
            this.listPermissionsForRole = this.rolesPermissions[index].permissions;
            this.role = this.rolesPermissions[index].name;
            this.show = true;
            this.showPermissions = false;
        },
        
        deleteRole(index, item){
            CDSAPI.Roles.deleteRole(item.id.toString()).then(response => {
                console.log("Role deleted With id :  " + item.id + "/" + response);
            });
            this.rolesPermissions.splice(index, 1);
            this.show = false;
        },
        
        editRole(index){
            //alert("Редакт № " + index);
            this.show = false;
            this.roleNameAdd = this.rolesPermissions[index].name;
            this.roleCodeAdd = this.rolesPermissions[index].code;
            this.index = index;
        },
        
        clearName() {
            this.roleNameAdd = '';
            this.roleCodeAdd = '';
        },
        handleOk(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.roleNameAdd) {
              alert('Please enter role name');
            } else {
              if (!this.roleCodeAdd) {
                alert('Please enter role code');
              }else {
                  this.handleSubmit();
              }  
            }
        },
        handleSubmit() {
            r = new Object();
            r.name = this.roleNameAdd;
            r.code = this.roleCodeAdd;
            r.permissions = [];
            CDSAPI.Roles.createOrUpdateRole(r).then(id => {
                console.log("Role saved With id :  " + id);
                r.id = id;
                this.rolesPermissions.push(r);
                this.clearName();
            });
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modalAdd.hide();
            
            });
        },
        
        handleOkEdit(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.roleNameAdd) {
              alert('Please enter role name');
            } else {
              if (!this.roleCodeAdd) {
                alert('Please enter role code');
              }else {
                  this.handleSubmitEdit();
              }  
            }
        },
        handleSubmitEdit() {
            this.roleEdit.name = this.roleNameAdd;
            this.roleEdit.code = this.roleCodeAdd;
            this.roleEdit.id = this.rolesPermissions[this.index].id;
            this.roleEdit.permissions = this.rolesPermissions[this.index].permissions;
            //console.log("ROLE-EDIT: " + JSON.stringify(this.roleEdit));
            CDSAPI.Roles.createOrUpdateRole(this.roleEdit).then(response => {
                console.log("Role updated  :  " + response);
            });
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
            this.rolesPermissions[this.index].permissions.splice(index, 1);
            this.listPermissionsForRole = this.rolesPermissions[this.index].permissions;
            CDSAPI.Roles.createOrUpdateRole(this.rolesPermissions[this.index]).then(response => {
                console.log("Permissions deleted, Role saved  :  " + response);
            });
        },
        addPermission(index){
            //alert(this.allPermissions[index]);
            let pNames = [];
            let p =  this.rolesPermissions[this.index].permissions;   
            p.forEach(function(item, index, p){
                pNames.push(item.name);
            });
            if (pNames.indexOf(this.allPermissions[index].name) == -1){
                this.rolesPermissions[this.index].permissions.push(this.allPermissions[index]);
                this.listPermissionsForeRole = this.rolesPermissions[this.index].permissions;
            }else{
                alert(this.allPermissions[index].name + " - This permission has already been added.");
            }

            
        },
        showAllPermission(){
            this.showPermissions = true;
        },
        endShow(){
            CDSAPI.Roles.createOrUpdateRole(this.rolesPermissions[this.index]).then(response => {
                console.log("Role saved  :  " + response);
            });
            this.showPermissions = false;
        },
        closePermissions(){
            this.show = false;
        }
        

    }
});