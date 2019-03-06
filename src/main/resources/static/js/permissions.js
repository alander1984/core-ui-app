Vue.component('permissions', {
    
    template: '<div>' +
                '<h3>Permissions</h3>' +
                '<b-modal id="modalAdd" ref="modal1" title="Add Permission" @ok="handleOk" @shown="clearName">' +
                  '<form @submit.stop.prevent="handleSubmit">' +
                    '<b-form-input type="text" placeholder="Enter permission" v-model="permission" />' +
                  '</form>' +
                '</b-modal>' +
                '<b-modal id="modalEdit" ref="modal" title="Edit Permission" @ok="handleOkEdit" @shown="iPermission">' +
                          '<form @submit.stop.prevent="handleSubmitEdit">' +
                            '<b-form-input type="text"  v-model="permission" />' +
                          '</form>' +
                        '</b-modal>' +
                '<b-button id="add" variant="primary" v-b-modal.modalAdd>Add Permission</b-button>' +
                '<br /><br />' +
                '<div v-for="(item, index) in listPermissions" :key=item.index>' +
                        '{{ index + 1 }}. {{item}} <b-button variant="danger" v-on:click="deletePermission(index)" >X</b-button>&nbsp;&nbsp;' +
                        '<b-button variant="success" v-b-modal.modalEdit v-on:click="editPermission(index)" >EDIT</b-button>' +
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
                ],
                permission: '',
                index: Number
            }
        },
    methods: {
        deletePermission(index){
            //alert("Удалить  № " + index);
            this.listPermissions.splice(index, 1);
        },
        editPermission(index){
            //alert("Редактировать  № " + index);
            this.permission = this.listPermissions[index];
            this.index = index;
        },
        clearName() {
            this.permission = '';
        },
        handleOk(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.permission) {
              alert('Please enter permission');
            } else {
              this.handleSubmit();
            }
        },
        handleSubmit() {
            this.listPermissions.push(this.permission);
            this.clearName();
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
            if (this.permission === '') {
              alert('Please enter permission');
            } else {
              this.handleSubmitEdit();
            }
        },
        handleSubmitEdit() {
            Vue.set(this.listPermissions, this.index, this.permission);
            this.clearName();
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modal.hide();
            });
        },
        iPermission(){
            
        }        
    },
    created(){
       /* this.listPermissions = null; *//* Здесь запрос по списку Permissions */
    }
    
});