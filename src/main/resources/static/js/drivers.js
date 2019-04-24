Vue.component('drivers', {
  template:
      '<div>'+
      '<h3>Водители</h3>'+
          '<b-modal id="modalAddDriver" ref="modal1" title="Добавить водителя" @ok="handleOk"'+
      '@shown="clearName">'+
      '<form @submit.stop.prevent="handleSubmit">'+
      '<b-form-input type="text" placeholder="Фамилия" v-model="driverSurname"/><br/>'+
      '<b-form-input type="text" placeholder="Имя" v-model="driverName"/><br/>'+
      '<b-form-input type="text" placeholder="Отчество" v-model="driverPatronymic"/><br/>'+
      '<b-form-input type="text" placeholder="Дата рождения ГГГГ-ММ-ДД" v-model="driverBirthday"/><br/>'+
      '<b-form-input type="text" placeholder="Логин" v-model="driverLogin"/><br/>'+
      '<b-form-input type="text" placeholder="Пароль" v-model="driverPassword"/>'+
      '<label for="createVeh">Транспортные средства</label>'+
      '<select id="createVeh" class="form-control" v-model="selVehicle" style="width: 90%" v-select="createVeh">'+
      '<option v-for="vehicle in listAllVehicles" v-bind:value="vehicle">'+
      'Номер: {{ vehicle.registrationNumber }}, Модель: {{ vehicle.model }}'+
      '</option></select>'+ '<span>&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id="checkbox" v-model="selected" v-on:change="addVeh()" unchecked-value="not_accepted"/>' +
      '<br/><br/>'+
      '<div v-if="this.selectedVehicles.length > 0">' +
      '<table class="table table-bordered">'+
      '<thead>'+
      '<tr>'+
      '<th>Транспортное средство</th>'+
      '<th>Удалить</th>'+
      '</tr>'+
      '</thead>'+
      
      '<tr v-for="(item, index) in selectedVehicles" :key=item.index>'+
      '<td width=80%> Номер: {{ item.registrationNumber }}, Модель: {{ item.model }}</td>'+
      '<td width=20%>' +
        '<b-button variant="danger" @click="deleteVeh(index)">X</b-button>' +
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>'+
          '</form>'+
      '</b-modal>'+
          '<b-modal id="modalEditDriver" ref="modal" title="Редактирование водителя" @ok="handleOkEdit"'+
      '@shown="iDriver">'+
          '<form @submit.stop.prevent="handleSubmitEdit">'+
      '<h6>Фамилия:</h6>'+
          '<b-form-input type="text" v-model="driverSurname"/>'+
          '<h6>Имя:</h6>'+
      '<b-form-input type="text" v-model="driverName"/>'+
          '<h6>Отчество:</h6>'+
      '<b-form-input type="text" v-model="driverPatronymic"/>'+
          '<h6>Дата рождения:</h6>'+
      '<b-form-input type="text" v-model="driverBirthday"/>'+
          '<h6>Логин:</h6>'+
      '<b-form-input type="text" v-model="driverLogin"/>'+
          '<h6>Пароль:</h6>'+
      '<b-form-input type="text" v-model="driverPassword"/>'+
      '<label for="editVeh">Транспортные средства</label>'+
      '<select id="editVeh" class="form-control" v-model="selVehicle" style="width: 90%" v-select="editVeh">'+
      '<option v-for="vehicle1 in listAllVehicles" v-bind:value="vehicle1">'+
      'Номер: {{ vehicle1.registrationNumber }}, Модель: {{ vehicle1.model }}'+
      '</option></select>'+ '<span>&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id="checkbox2" v-model="selected" v-on:change="sel()" unchecked-value="not_accepted"/>' +
      '<div v-if="this.selectedEditVehicles.length > 0">' +
      '<br/><br/>'+
      '<table class="table table-bordered">'+
      '<thead>'+
      '<tr>'+
      '<th>Транспортное средство</th>'+
      '<th>Удалить</th>'+
      '</tr>'+
      '</thead>'+
      
      '<tr v-for="(item, index) in selectedEditVehicles" :key=item.index>'+
      '<td width=80%> Номер: {{ item.registrationNumber }}, Модель: {{ item.model }}</td>'+
      '<td width=20%>' +
        '<b-button variant="danger" @click="deleteEditVeh(index)">X</b-button>' +
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>'+
          '</form>'+
      '</b-modal>'+
          '<b-button id="addD" variant="primary" v-b-modal.modalAddDriver>Добавить водителя</b-button>'+
      '<br/><br/>'+
          '<table class="table table-bordered">'+
          '<thead>'+
            '<tr>'+
                '<th>#</th>'+
                '<th>Фамилия</th>'+
                '<th>Имя</th>'+
                '<th>Отчество</th>'+
                '<th>Дата рождения</th>'+
                '<th>Логин</th>'+
                '<th>Пароль</th>'+
                '<th></th>'+
                '<th></th>'+
            '</tr>'+
        '</thead>'+
      '<tr v-for="(item, index) in listDrivers" :key=item.index>'+
          '<td>{{ index + 1 }}</td>'+
      '<td width=10%>{{item.surname}}</td>'+
          '<td width=10%>{{item.name}}</td>'+
      '<td width=50%>{{item.patronymic}}</td>'+
          '<td width=50%>{{item.birthday}}</td>'+
      '<td width=50%>{{item.login}}</td>'+
      '<td width=50%>{{item.password}}</td>'+
          '<td>'+
      '<b-button variant="danger" v-on:click="deleteDriver(index, item)">X</b-button>'+
          '</td>'+
      '<td>'+
          '<b-button variant="success" v-b-modal.modalEditDriver v-on:click="editDriver(index)">'+
      'Редактировать'+
          '</b-button>'+
      '</td>'+
          '</tr>'+
      '</table>'+
  '</div>',
  data() {
    return {
      listDrivers: [],
      selectedVehicles: [],
      selectedEditVehicles: [],
      selVehicle: {},
      selected: false,
      listAllVehicles: [],
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
    deleteDriver(index, item) {
      CDSAPI.Drivers.deleteDriver(item.id.toString()).then(response => {
        console.log("DELETE " + response);
      });
      this.listDrivers.splice(index, 1);

    },
    editDriver(index) {
      this.driverId = this.listDrivers[index].id;
      this.driverName = this.listDrivers[index].name;
      this.driverSurname = this.listDrivers[index].surname;
      this.driverPatronymic = this.listDrivers[index].patronymic;
      this.driverBirthday = this.listDrivers[index].birthday;
      this.driverLogin = this.listDrivers[index].login;
      this.driverPassword = this.listDrivers[index].password;
      this.selectedEditVehicles = this.listDrivers[index].vehicles;
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
        alert('Введите имя водителя');
      } else {
        if (!this.driverSurname) {
          alert('Введите фамилию водителя');
        } else {
          this.handleSubmit();
        }
      }
    },
    handleSubmit() {
      temp = new Object();
      temp.surname = this.driverSurname;
      temp.name = this.driverName;
      temp.patronymic = this.driverPatronymic;
      temp.birthday = this.driverBirthday;
      temp.login = this.driverLogin;
      temp.password = this.driverPassword;
        console.log("Осталось :  " + this.selectedVehicles.length);
      temp.vehicles = this.selectedVehicles;
      CDSAPI.Drivers.createOrUpdateDriver(temp).then(id => {
        console.log("Created ID :  " + id);
        temp.id = id;
        this.listDrivers.push(temp);
        this.clearName();
      });
     // this.selectedVehicles.splice(1, this.selectedVehicles.length);
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
        alert('Введите имя водителя');
      } else {
        if (!this.driverSurname) {
          alert('Введите фамилию водителя');
        } else {
          this.handleSubmitEdit();
        }
      }

    },
    handleSubmitEdit() {
      temp = new Object();
      temp.id = this.driverId;
      temp.surname = this.driverSurname;
      temp.name = this.driverName;
      temp.patronymic = this.driverPatronymic;
      temp.birthday = this.driverBirthday;
      temp.login = this.driverLogin;
      temp.password = this.driverPassword;
        console.log("Осталось :  " + this.selectedEditVehicles.length);
      temp.vehicles = this.selectedEditVehicles;
      //TODO Fix refresh bug 
      Vue.set(this.listDrivers, this.index, temp);
      CDSAPI.Drivers.createOrUpdateDriver(temp).then(id => {
        console.log("Edited ID :  " + id);
      });
     // this.selectedEditVehicles.splice(1, this.selectedEditVehicles.length);
      this.clearName();
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
      });
    },
    iDriver() {

    },
    allDrivers() {
      CDSAPI.Drivers.sendAllDrivers().then(drivers => {
        this.listDrivers = drivers;
        console.log("Drivers is - " + this.listDrivers);
      });
    },
    allVehicles() {
      CDSAPI.Vehicles.sendAllVehicles().then(vehicles => {
        this.listAllVehicles = vehicles;
      });
    },
    deleteVeh(index){
        this.selectedVehicles.splice(index, 1);
        this.selected = false;
    },
    deleteEditVeh(index){
        this.selectedEditVehicles.splice(index, 1);
        this.selected = false;
    },
    sel(){
        //console.log("ТРАНС СРЕДСТВА: " + this.selectedVehicle.model);
        var id = this.selVehicle.id;
        let m = this.selectedEditVehicles.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            this.selectedEditVehicles.push(this.selVehicle);
        }
        this.selected = false;
    },
    addVeh(){
        //console.log("ТРАНС СРЕДСТВА: " + this.selectedVehicle.model);
        var id = this.selVehicle.id;
        let m = this.selectedVehicles.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            this.selectedVehicles.push(this.selVehicle);
        }
        this.selected = false;
    }

  },
  created() {
    this.allDrivers();
    this.allVehicles();
  },
  mounted(){
      $.fn.modal.Constructor.prototype._enforceFocus = function() {};
    $("select").select2();
    $("div.modal-content").removeAttr("tabindex");
  }
});