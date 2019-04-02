const permissions = Vue.component('permissions', {
    
    template: '<div>' +
                '<h3>Permissions</h3>' +
                '<b-modal id="modalAdd" ref="modal1" title="Add Permission" @ok="handleOk" @shown="clearName">' +
                  '<form @submit.stop.prevent="handleSubmit">' +
                    '<b-form-input type="text" placeholder="Enter permission name" v-model="permissionName" /><br />' +
                    '<b-form-input type="text" placeholder="Enter permission code" v-model="permissionCode" />' +
                  '</form>' +
                '</b-modal>' +
                '<b-modal id="modalEdit" ref="modal" title="Edit Permission" @ok="handleOkEdit" @shown="iPermission">' +
                          '<form @submit.stop.prevent="handleSubmitEdit">' +
                            '<h5>Name:</h5>' +
                            '<b-form-input type="text"  v-model="permissionName" /><br />' +
                            '<h5>Code:</h5>' +
                            '<b-form-input type="text"  v-model="permissionCode" />' +
                          '</form>' +
                        '</b-modal>' +
                '<b-button id="add" variant="primary" v-b-modal.modalAdd>Add Permission</b-button>' +
                '<br /><br />' +
                '<table class="table table-bordered">' +
                    '<tr v-for="(item, index) in listPermissions" :key=item.index >' +
                        '<td>{{ index + 1 }}</td>' +
                        '<td width=10% style="color: red; text-align: center;">{{item.id}}</td>' +
                        '<td width=60%>{{item.name}}</td>' +
                        '<td><b-button variant="danger" v-on:click="deletePermission(index, item)">X</b-button></td>' +
                        '<td><b-button variant="success" v-b-modal.modalEdit v-on:click="editPermission(index)">EDIT</b-button></td>' +
                    '</tr>' +
                '</table>' +
                '<br /><br />' +
                '<button type="button" class="btn btn-outline-info" @click="returnToAdminPages">Вернуться</button>' +
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
                permissionId: Number,
                permissionName: '',
                permissionCode: '',
                index: Number
            }
        },
    methods: {
        deletePermission(index, item){
            //alert("Удалить  № " + index);
            CDSAPI.Permissions.deletePermission(item.id.toString()).then(response => {
                    console.log("DELETE " + response);
                });
            this.listPermissions.splice(index, 1);
            
        },
        editPermission(index){
            //alert("Редактировать  № " + index);
            this.permissionId = this.listPermissions[index].id;
            this.permissionName = this.listPermissions[index].name;
            this.permissionCode = this.listPermissions[index].code;
            this.index = index;
        },
        clearName() {
            this.permissionName = '';
            this.permissionCode = '';
        },
        handleOk(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.permissionName) {
              alert('Please enter permission name');
            } else {
                if (!this.permissionCode) {
                    alert('Please enter permission code');
                }else {
                    this.handleSubmit();
                }
            }
        },
        handleSubmit() {
            O = new Object();
            O.code = this.permissionCode;
            O.name = this.permissionName;
            CDSAPI.Permissions.createOrUpdatePermission(O).then(id =>{
                console.log("Created ID :  " + id);
                O.id = id;
                this.listPermissions.push(O);
                this.clearName();
            });
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              console.log("********   " + this.$refs.modal);
              this.$refs.modal1.hide();
             // document.getElementById('modalAdd').style.display= 'none';
            });
        },
        handleOkEdit(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.permissionName) {
              alert('Please enter permission name');
            } else {
                if (!this.permissionCode) {
                    alert('Please enter permission code');
                }else {
                    this.handleSubmitEdit();
                }
            }
            
        },
        handleSubmitEdit() {
            O = new Object();
            O.id = this.permissionId;
            O.code = this.permissionCode;
            O.name = this.permissionName;
            Vue.set(this.listPermissions, this.index, O);
            CDSAPI.Permissions.createOrUpdatePermission(O).then(id =>{
                console.log("Edited ID :  " + id);
            });
            
            this.clearName();
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modal.hide();
            });
        },
        iPermission(){
            
        },
        allPermissions(){
            CDSAPI.Permissions.sendAllPermissions().then(permissions => {
            /*
             var s = permissions.toString().split(',');
             console.log("PERMISSION:  " + s);
             
             for(var i=0; i < s.length; i += 3){
                 var permission = new Object();
                 permission.id = s[i];
                 permission.code = s[i+1];
                 permission.name = s[i+2];
                 this.listPermissions.push(permission);
             }
             */
                this.listPermissions = permissions;
                console.log("PERMISSIONS :  " + this.listPermissions.length);
            });
            
        },
        returnToAdminPages(){
            document.getElementById('routesToPages').style.display = "block";
            router.push({ path: 'home' });
        }

    },
    created(){
         document.getElementById('routesToPages').style.display = "none";
         this.allPermissions();
    }

    
});