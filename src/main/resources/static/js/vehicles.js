Vue.component('vehicles', {
  template:
      '<div>'+
      '<h3>Транспортные средства</h3>'+
      '<b-modal id="modalAddVehicle" ref="modal1" title="Добавить ТС" @ok="handleOk"'+
      '@shown="clearName">'+
      '<form @submit.stop.prevent="handleSubmit">'+
      '<b-form-input type="text" placeholder="Регистрационный номер" v-model="vehicleReg"/><br/>'+
      '<b-form-input type="text" placeholder="Модель" v-model="vehicleModel"/><br/>'+
      '<b-form-input type="text" placeholder="Тоннаж" v-model="vehicleTonnage"/><br/>'+
      '<b-form-input type="text" placeholder="Объем" v-model="vehicleCapacity"/><br/>'+
      '<label for="createDriver">Водители</label>'+
      '<select id="createDriver" class="form-control" v-model="selectedDriver" style="width: 90%" v-select="createDriver">' + 
      '<option v-for="driver in listAllDrivers" v-bind:value="driver">'+
      '{{ driver.surname }}  {{ driver.name }}'+
      '</option></select>'+ '<span>&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id="checkbox" v-model="selected" v-on:change="addDrv()" unchecked-value="not_accepted"/>' +
      '<div v-if="this.selectedDrivers.length > 0">' +
      '<br/><br/>'+
      '<table class="table table-bordered">'+
      '<thead>'+
      '<tr>'+
      '<th>Водитель</th>'+
      '<th>Удалить</th>'+
      '</tr>'+
      '</thead>'+
      
      '<tr v-for="(item, index) in selectedDrivers" :key=item.index>'+
      '<td width=80%> {{ item.surname }}, Модель: {{ item.name }}</td>'+
      '<td width=20%>' +
        '<b-button variant="danger" @click="deleteDrv(index)">X</b-button>' +
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>' +
      '</form>'+
      '</b-modal>'+
      '<b-modal id="modalEditVehicle" ref="modal" title="Редактирование ТС" @ok="handleOkEdit"'+
      '@shown="iDriver">'+
      '<form @submit.stop.prevent="handleSubmitEdit">'+
      '<h6>Регистрационный номер:</h6>'+
      '<b-form-input type="text" v-model="vehicleReg"/>'+
      '<h6>Модель:</h6>'+
      '<b-form-input type="text" v-model="vehicleModel"/>'+
      '<h6>Тоннаж:</h6>'+
      '<b-form-input type="text" v-model="vehicleTonnage"/>'+
      '<h6>Объем</h6>'+
      '<b-form-input type="text" v-model="vehicleCapacity"/>'+
      '<label for="editDrv">Водители</label>'+
      '<select id="editDrv" class="form-control" v-model="selectedDriver" style="width: 90%" v-select="editDrv">' + 
      '<option v-for="driver1 in listAllDrivers" v-bind:value="driver1">'+
      '{{ driver1.surname }}  {{ driver1.name }}'+
      '</option></select>'+ '<span>&nbsp;&nbsp;&nbsp;</span>' +
      '<input type="checkbox" id="checkbox2" v-model="selected" v-on:change="editDrv()" unchecked-value="not_accepted"/>' +
      '<div v-if="this.selectedEditDrivers.length > 0">' +
        '<br/><br/>'+
      '<table class="table table-bordered">'+
      '<thead>'+
      '<tr>'+
      '<th>Водители</th>'+
      '<th>Удалить</th>'+
      '</tr>'+
      '</thead>'+
      
      '<tr v-for="(item, index) in selectedEditDrivers" :key=item.index>'+
      '<td width=80%> {{ item.surname }}  {{ item.name }}</td>'+
      '<td width=20%>' +
        '<b-button variant="danger" @click="deleteEditDrv(index)">X</b-button>' +
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>' +
      '</form>'+
      '</b-modal>'+
      '<b-button id="addV" variant="primary" v-b-modal.modalAddVehicle>Добавить ТС</b-button>'+
      '<br/><br/>'+
      '<table class="table table-bordered">'+
      '<thead>'+
      '<tr>'+
      '<th>#</th>'+
      '<th>Регистрационный номер</th>'+
      '<th>Модель</th>'+
      '<th>Тоннаж</th>'+
      '<th>Объем</th>'+
      '<th></th>'+
      '<th></th>'+
      '</tr>'+
      '</thead>'+
      '<tr v-for="(item, index) in listVehicles" :key=item.index>'+
      '<td>{{ index + 1 }}</td>'+
      '<td width=10%>{{item.registrationNumber}}</td>'+
      '<td width=10%>{{item.model}}</td>'+
      '<td width=50%>{{item.tonnage}}</td>'+
      '<td width=50%>{{item.capacity}}</td>'+
      '<td>'+
      '<b-button variant="danger" v-on:click="deleteVehicle(index, item)">X</b-button>'+
      '</td>'+
      '<td>'+
      '<b-button variant="success" v-b-modal.modalEditVehicle v-on:click="editVehicle(index)">'+
      'Редактировать'+
      '</b-button>'+
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>',
  data() {
    return {
      listVehicles: [],
      listAllDrivers: [],
      selectedEditDrivers: [],
      selectedDrivers: [],
      selectedDriver: {},
      selected: false,
      vehicleId: Number,
      vehicleReg: '',
      vehicleModel: '',
      vehicleTonnage: '',
      vehicleCapacity: '',
      index: Number
    }
  },
  methods: {
    deleteVehicle(index, item) {
      CDSAPI.Vehicles.deleteVehicle(item.id.toString()).then(response => {
        console.log("DELETE " + response);
      });
      this.listVehicles.splice(index, 1);

    },
    editVehicle(index) {
      this.vehicleId = this.listVehicles[index].id;
      this.vehicleModel = this.listVehicles[index].model;
      this.vehicleReg = this.listVehicles[index].registrationNumber;
      this.vehicleTonnage = this.listVehicles[index].tonnage;
      this.vehicleCapacity = this.listVehicles[index].capacity;
      this.selectedEditDrivers = this.listVehicles[index].drivers;
      this.index = index;
    },
    clearName() {
      this.vehicleModel = '';
      this.vehicleReg = '';
      this.vehicleModel = '';
      this.vehicleTonnage = '';
      this.vehicleCapacity = '';
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.vehicleModel) {
        alert('Введите модель ТС');
      } else {
        if (!this.vehicleReg) {
          alert('Введите рег.номер ТС');
        } else {
          this.handleSubmit();
        }
      }
    },
    handleSubmit() {
      temp = {};
      temp.registrationNumber = this.vehicleReg;
      temp.model = this.vehicleModel;
      temp.tonnage = this.vehicleTonnage;
      temp.capacity = this.vehicleCapacity;
      temp.drivers = this.selectedDrivers
      CDSAPI.Vehicles.createOrUpdateVehicle(temp).then(id => {
        console.log("Created ID :  " + id);
        temp.id = id;
        this.listVehicles.push(temp);
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
      if (!this.vehicleModel) {
        alert('Введите модель ТС');
      } else {
        if (!this.vehicleReg) {
          alert('м');
        } else {
          this.handleSubmitEdit();
        }
      }

    },
    handleSubmitEdit() {
      temp = {};
      temp.id = this.vehicleId;
      temp.registrationNumber = this.vehicleReg;
      temp.model = this.vehicleModel;
      temp.tonnage = this.vehicleTonnage;
      temp.capacity = this.vehicleCapacity;
      temp.drivers = this.selectedEditDrivers;
      //TODO Fix refresh bug
      Vue.set(this.listVehicles, this.index, temp);
      CDSAPI.Vehicles.createOrUpdateVehicle(temp).then(id => {
        console.log("Edited ID :  " + id);
      });

      this.clearName();
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
      });
    },
    iDriver() {

    },
    allVehicles() {
      CDSAPI.Vehicles.sendAllVehicles().then(vehicles => {
        this.listVehicles = vehicles;
        console.log("Vehices is - " + this.listVehicles);
        console.log("Vehicles length is -  " + this.listVehicles.length);
      });
    },
    allDrivers() {
      CDSAPI.Drivers.sendAllDrivers().then(drivers => {
        this.listAllDrivers = drivers;
        console.log("Drivers is - " + this.listAllDrivers);
      });
    },
    addDrv(){
        //console.log("ТРАНС СРЕДСТВА: " + this.selectedVehicle.model);
        var id = this.selectedDriver.id;
        let m = this.selectedDrivers.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedDrivers.push(this.selectedDriver);
        }
        this.selected = false;
    },
    deleteDrv(index){
        this.selectedDrivers.splice(index, 1);
        this.selected = false;
    },
    deleteEditDrv(index){
        this.selectedEditDrivers.splice(index, 1);
        this.selected = false;
    },
    editDrv(){
        //console.log("ТРАНС СРЕДСТВА: " + this.selectedVehicle.model);
        var id = this.selectedDriver.id;
        let m = this.selectedEditDrivers.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedEditDrivers.push(this.selectedDriver);
        }
        this.selected = false;
    }
  },
  created() {
    this.allVehicles();
    this.allDrivers();
  },
  mounted(){
      $.fn.modal.Constructor.prototype._enforceFocus = function() {};
      $("select").select2();
      $("div.modal-content").removeAttr("tabindex");
  }
});