var driverApp = new Vue({
  el: '#driver-app',
  data(){
    return {
      listDrivers: [],
      driverId: Number,
      driverSurname: '',
      driverName: '',
      driverPatronymic: '',
      driverBirthday: '',
      driverLogin: '',
      driverPassword: '',
      index: Number
    }
  },
  methods: {
    deleteDriver(index, item){
      alert("Удалить  № " + index);
      CDSAPI.Driver.deleteDriver(item.id.toString()).then(response => {
        console.log("DELETE " + response);
      });
      this.listDrivers.splice(index, 1);

    },
    editDriver(index){
      alert("Редактировать  № " + index);
      this.driverId = this.listDrivers[index].id;
      this.driverName = this.listDrivers[index].name;
      this.driverSurname = this.listDrivers[index].surname;
      this.driverPatronymic = this.listDrivers[index].patronymic;
      this.driverBirthday = this.listDrivers[index].birthday;
      this.driverLogin = this.listDrivers[index].login;
      this.driverPassword = this.listDrivers[index].password;


      this.index = index;
    },
    clearName() {
      this.driverName = '';
      this.driverSurname = '';
      this.driverSurname = '';
      this.driverPatronymic = '';
      this.driverBirthday = '';
      this.driverLogin = '';
      this.driverPassword = '';
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.driverName) {
        alert('Please enter permission name');
      } else {
        if (!this.driverSurname) {
          alert('Please enter permission code');
        }else {
          this.handleSubmit();
        }
      }
    },
    handleSubmit() {
      O = new Object();
      O.code = this.driverSurname;
      O.name = this.driverName;
      CDSAPI.Driver.createOrUpdateDriver(O).then(id =>{
        console.log("Created ID :  " + id);
        O.id = id;
        this.listDrivers.push(O);
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
      if (!this.driverName) {
        alert('Please enter permission name');
      } else {
        if (!this.driverSurname) {
          alert('Please enter permission code');
        }else {
          this.handleSubmitEdit();
        }
      }

    },
    handleSubmitEdit() {
      O = new Object();
      O.id = this.driverId;
      O.code = this.driverSurname;
      O.name = this.driverName;
      Vue.set(this.listDrivers, this.index, O);
      CDSAPI.Permissions.createOrUpdateDriver(O).then(id =>{
        console.log("Edited ID :  " + id);
      });

      this.clearName();
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
      });
    },
    iDriver(){

    },
    allDrivers(){
      CDSAPI.Drivers.sendAllDrivers().then(drivers => {
        this.listDrivers = drivers;
        console.log("Drivers is - " + this.listDrivers);
        console.log("DRIVERS length is -  " + this.listDrivers.length);
      });
    }
  },
  created(){
    this.allDrivers();
  }
});