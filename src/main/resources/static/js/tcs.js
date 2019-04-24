Vue.component('tcs', {
  template:
      '<div>'+
      '<h3>Транспортные компании (ТК)</h3>'+
      '<b-modal id="modalAddTC" ref="modal1" title="Добавить ТК" @ok="handleOk"'+
      '@shown="clearName">'+
      '<form @submit.stop.prevent="handleSubmit">'+
      '<b-form-input id="createCode" type="text" placeholder="Код" v-model="tcCode"/><br/>'+
      '<b-form-input id="createName"  type="text" placeholder="Название" v-model="tcName"/>'+
      '<label for="createVeh">Транспортные средства</label>'+
      '<select id="createVeh" class="form-control" v-model="selectedVehicle" style="width: 90%" v-select="createVeh">' + // v-on:change="addVeh()">'+
      '<option v-for="vehicle in listAllVehicles" v-bind:value="vehicle">'+
      'Номер: {{ vehicle.registrationNumber }}, Модель: {{ vehicle.model }}'+
      '</option></select>'+ '<span>&nbsp;&nbsp;&nbsp;</span><input type="checkbox" id="checkbox" v-model="selected" v-on:change="addVeh()" unchecked-value="not_accepted"/>' +
      //'<input type="checkbox" id="checkbox" v-model="selected" v-on:change="addVeh()" unchecked-value="not_accepted"/>' +
      '<div v-if="this.selectedVehicles.length > 0">' +
      '<br/><br/>'+
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
      '</div>' +
      '</form>'+
      '</b-modal>'+
      '<b-modal id="modalEditTC" ref="modal" title="Редактирование ТК" @ok="handleOkEdit"'+
      '@shown="iDriver">'+
      '<form @submit.stop.prevent="handleSubmitEdit">'+
      '<h6>Код:</h6>'+
      '<b-form-input type="text" v-model="tcCode"/>'+
      '<h6>Название:</h6>'+
      '<b-form-input type="text" v-model="tcName"/><br/>'+
      '<label for="editVeh">Транспортные средства</label>'+
      '<select id="editVeh" class="form-control" v-model="selectedVehicle" style="width: 90%" v-select="editVeh">' + // v-on:change="sel()">'+
      '<option v-for="vehicle1 in listAllVehicles" v-bind:value="vehicle1">'+
      'Номер: {{ vehicle1.registrationNumber }}, Модель: {{ vehicle1.model }}'+
      '</option></select>'+ '<span>&nbsp;&nbsp;&nbsp;</span>' +
      '<input type="checkbox" id="checkbox2" v-model="selected" v-on:change="sel()" unchecked-value="not_accepted"/>' +
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
      '</div>' +
      '</form>'+
      '</b-modal>'+
      '<b-button id="addD" variant="primary" v-b-modal.modalAddTC>Добавить ТК</b-button>'+
      '<br/><br/>'+
      '<table class="table table-bordered">'+
      '<thead>'+
      '<tr>'+
      '<th>#</th>'+
      '<th>Код</th>'+
      '<th>Название</th>'+
      '<th></th>'+
      '<th></th>'+
      '</tr>'+
      '</thead>'+
      '<tr v-for="(item, index) in listTCs" :key=item.index>'+
      '<td>{{ index + 1 }}</td>'+
      '<td width=10%>{{item.code}}</td>'+
      '<td width=10%>{{item.name}}</td>'+
      '<td>'+
      '<b-button variant="danger" v-on:click="deleteTC(index, item)">X</b-button>'+
      '</td>'+
      '<td>'+
      '<b-button variant="success" v-b-modal.modalEditTC v-on:click="editTC(index)">'+
      'Редактировать'+
      '</b-button>'+
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>',
  data() {
    return {
      listTCs: [],
      selectedVehicles: [],
      selectedEditVehicles: [],
      selected: false,
      selectedVehicle: {},
      listAllVehicles: [],
      tcId: Number,
      tcCode: '',
      tcName: '',
      // tcVehicles: [],
      index: Number
    }
  },
  methods: {
    deleteTC(index, item) {
      CDSAPI.TransportCompanies.deleteTransportCompany(item.id.toString()).then(response => {
        console.log("DELETE " + response);
      });
      this.listTCs.splice(index, 1);

    },
    editTC(index) {
      this.tcId = this.listTCs[index].id;
      this.tcName = this.listTCs[index].name;
      this.tcCode = this.listTCs[index].code;
      this.selectedEditVehicles = this.listTCs[index].vehicles;
      console.log("ТС-ва: " + this.selectedEditVehicles.length + "---" + this.listTCs[index].vehicles.length);
      this.index = index;
    },
    clearName() {
      this.tcName = '';
      this.tcCode = '';
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.tcName) {
        alert('Введите название ТК');
      } else {
        if (!this.tcCode) {
          alert('Введите код ТК');
        } else {
          this.handleSubmit();
        }
      }
    },
    handleSubmit() {
      temp = new Object();
      temp.code = this.tcCode;
      temp.name = this.tcName;
        console.log("Осталось :  " + this.selectedVehicles.length);
      temp.vehicles = this.selectedVehicles;
      CDSAPI.TransportCompanies.createOrUpdateTransportCompany(temp).then(id => {
        console.log("Created ID :  " + id);
        temp.id = id;
        this.listTCs.push(temp);
        this.clearName();
      });
      //this.selectedVehicles.splice(1, this.selectedVehicles.length);
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
      if (!this.tcName) {
        alert('Введите имя водителя');
      } else {
        if (!this.tcCode) {
          alert('Введите фамилию водителя');
        } else {
          this.handleSubmitEdit();
        }
      }

    },
    handleSubmitEdit() {
      temp = new Object();
      temp.id = this.tcId;
      temp.code = this.tcCode;
      temp.name = this.tcName;
        //console.log("Осталось :  " + this.selectedEditVehicles.length);
      temp.vehicles = this.selectedEditVehicles;
      //TODO Fix refresh bug 
      Vue.set(this.listTCs, this.index, temp);
      console.log("Машины :  " + this.listTCs[this.index].vehicles.length);
      CDSAPI.TransportCompanies.createOrUpdateTransportCompany(temp).then(id => {
        console.log("Edited ID :  " + id);
      }); 
    //  this.selectedEditVehicles.splice(1, this.selectedEditVehicles.length);
      this.clearName();
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
      });
    },
    iDriver() {

    },
    allTCs() {
      CDSAPI.TransportCompanies.sendAllTransportCompanies().then(tcs => {
        this.listTCs = tcs;
        console.log("Transport Companies :  " + this.listTCs.length);
      });
    },
    allVehicles() {
      CDSAPI.Vehicles.sendAllVehicles().then(vehicles => {
        this.listAllVehicles = vehicles;
        console.log("Vehices is - " + this.listAllVehicles);
        console.log("Vehicles length is -  " + this.listAllVehicles.length);
      });
    },
    check(){
        //alert(" Checked " + this.selectedVehicle.id + " --- " + this.selected);
        this.selectedVehicles.push(this.selectedVehicle);
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
        var id = this.selectedVehicle.id;
        let m = this.selectedEditVehicles.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedEditVehicles.push(this.selectedVehicle);
        }
        this.selected = false;
    },
    addVeh(){
        //console.log("ТРАНС СРЕДСТВА: " + this.selectedVehicle.model);
        var id = this.selectedVehicle.id;
        let m = this.selectedVehicles.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedVehicles.push(this.selectedVehicle);
        }
        this.selected = false;
    }
  },
  created() {
    this.allTCs();
    this.allVehicles();
  },
  mounted(){
      $.fn.modal.Constructor.prototype._enforceFocus = function() {};
      $("select").select2();
      $("div.modal-content").removeAttr("tabindex");
  }
  });