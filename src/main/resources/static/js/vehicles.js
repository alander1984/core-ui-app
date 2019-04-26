Vue.component('vehicles', {
  template:
      '<div>'+
      '<h3>Транспортные средства</h3>'+
      '<b-modal id="modalAddVehicle" ref="modal1" title="Добавить ТС" @ok="handleOk" :no-close-on-backdrop="true" :no-close-on-esc="true"'+
      '@shown="clearName">'+
      '<form @submit.stop.prevent="handleSubmit">'+
          '<div class="form-label-group-lm">' +
            '<input id="regNumber" type="text" placeholder="Регистрационный номер" v-model="vehicleReg" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="regNumber">Регистрационный номер</label>' +
          '</div>' +
          '<div class="form-label-group-lm">' +
            '<input id="model" type="text" placeholder="Модель" v-model="vehicleModel" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="model">Модель</label>' +
          '</div>' +
          '<div class="form-label-group-lm">' +
            '<input id="tonnage" type="text" placeholder="Тоннаж" v-model="vehicleTonnage" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="tonnage">Тоннаж</label>' +
          '</div>' +
          '<div class="form-label-group-lm">' +
            '<input id="capacity" type="text" placeholder="Объем" v-model="vehicleCapacity" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="capacity">Объем</label>' +
          '</div>' +
          
          '<ul class="nav nav-tabs nav-justified" role="tablist">' +
            '<li class="nav-item">' +
                '<a class="nav-link active worktab" id="driver-tab-show" data-toggle="tab" href="#driver-show" role="tab" aria-controls="driver-div" aria-selected="true" data-tab="#driver-div">Водители</a>' +
            '</li>' +
            '<li class="nav-item">' +
                '<a class="nav-link worktab" id="tcm-tab" data-toggle="tab" href="#tcm" role="tab" aria-controls="tcm-div" aria-selected="false" data-tab="#tcm-div">Транспортные компании</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" style="width:100%;  overflow-y: auto;" id="mainTabContent">' +
            '<div class="workPanel" style="width:100%;" id="driver-div" aria-labelledby="driver-tab-show">' +
                '<table>' +
                    '<tr>' +
                        '<td width=90%>' +
                              '<label for="createDriver">Водители</label>'+ 
                              '<select id="createDriver" class="form-control" v-model="selectedDriver"  v-select="createDriver">' + 
                              '<option v-for="driver in listAllDrivers" v-bind:value="driver">'+
                              '{{ driver.surname }}  {{ driver.name }}'+
                              '</option></select>'+
                        '</td>' +
                        '<td width=10% style="vertical-align: bottom;">' +
                              '<span>&nbsp;&nbsp;&nbsp;</span><b-button class="btn-primary"  @click="addDrv()">+</b-button>' +
                        '</td>' +
                    '</tr>' +
                '</table>' +
                  '<div v-if="this.selectedDrivers.length > 0">' +
                      '<br/><br/>'+
                      '<table class="table-lm table-bordered" width=90%>'+
                      '<tr>'+
                      '<th>Водитель</th>'+
                      '<th>Удалить</th>'+
                      '</tr>'+
                      
                      '<tr v-for="(item, index) in selectedDrivers" :key=item.index>'+
                      '<td width=80%> {{ item.surname }}  {{ item.name }}</td>'+
                      '<td width=20%>' +
                        '<b-button variant="danger" @click="deleteDrv(index)">X</b-button>' +
                      '</td>'+
                      '</tr>'+
                      '</table>'+
                  '</div>' +
            '</div>' +
            '<div class="workPanel hidden" id="tcm-div" style="width:100%;" aria-labelledby="tcm-tab">' +
                //'Транспортные компании' +
                '<table>' +
                    '<tr>' +
                        '<td width=90%>' +
                            '<label for="createTC">Транспортные компании</label>'+
                          '<select id="createTC" class="form-control" v-model="selectedTC" v-select="createTC">' + 
                          '<option v-for="tc in listAllTC" v-bind:value="tc">'+
                          '{{ tc.name }}  Код: {{ tc.code }}'+
                          '</option></select>'+ 
                        '</td>' +
                        '<td width=10% style="vertical-align: bottom;">' +  
                          '<span>&nbsp;&nbsp;&nbsp;</span><b-button class="btn-primary"  @click="addTC()">+</b-button>' +
                        '</td>' +
                    '</tr>' +
               '</table>' +
                  '<div v-if="this.selectedTCs.length > 0">' +
                      '<br/><br/>'+
                      '<table class="table-lm table-bordered" width=90%>'+
                      '<tr>'+
                      '<th>Название ТК</th>'+
                      '<th>Удалить</th>'+
                      '</tr>'+
                      
                      '<tr v-for="(item, index) in selectedTCs" :key=item.index>'+
                      '<td width=80%> {{ item.name }}, Код: {{ item.code }}</td>'+
                      '<td width=20%>' +
                        '<b-button variant="danger" @click="deleteTC(index)">X</b-button>' +
                      '</td>'+
                      '</tr>'+
                      '</table>'+
                  '</div>' +
            '</div>' +
        '</div>' +
      '</form>'+
      '</b-modal>'+
      '<b-modal id="modalEditVehicle" ref="modal" title="Редактирование ТС" @ok="handleOkEdit" :no-close-on-backdrop="true" :no-close-on-esc="true"'+
      '@shown="iDriver">'+
      '<form @submit.stop.prevent="handleSubmitEdit">'+
          '<div class="form-label-group-lm">' +
            '<input id="regNumberEdit" type="text" placeholder="Регистрационный номер" v-model="vehicleReg" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="regNumberEdit">Регистрационный номер</label>' +
          '</div>' +
          '<div class="form-label-group-lm">' +
            '<input id="modelEdit" type="text" placeholder="Модель" v-model="vehicleModel" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="modelEdit">Модель</label>' +
          '</div>' +
          '<div class="form-label-group-lm">' +
            '<input id="tonnageEdit" type="text" placeholder="Тоннаж" v-model="vehicleTonnage" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="tonnageEdit">Тоннаж</label>' +
          '</div>' +
          '<div class="form-label-group-lm">' +
            '<input id="capacityEdit" type="text" placeholder="Объем" v-model="vehicleCapacity" class="form-control"/><br/>'+
            '<label class="pointer-event-none" for="capacityEdit">Объем</label>' +
          '</div>' +
          '<ul class="nav nav-tabs nav-justified" role="tablist">' +
            '<li class="nav-item">' +
                '<a class="nav-link active worktab" id="driver-tab-show-edit" data-toggle="tab" href="#driver-show" role="tab" aria-controls="driver-div-edit" aria-selected="true" data-tab="#driver-div-edit">Водители</a>' +
            '</li>' +
            '<li class="nav-item">' +
                '<a class="nav-link worktab" id="tcm-tab-edit" data-toggle="tab" href="#tcm" role="tab" aria-controls="tcm-div-edit" aria-selected="false" data-tab="#tcm-div-edit">Транспортные компании</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" style="width:100%;  overflow-y: auto;" id="mainTabContentEdit">' +
                '<div class="workPanel" style="width:100%;" id="driver-div-edit" aria-labelledby="driver-tab-show-edit">' +
                   '<table>' +
                        '<tr>' +
                            '<td width=90%>' +
                              '<label for="editDrv">Водители</label>'+
                              '<select id="editDrv" class="form-control" v-model="selectedDriver"  v-select="editDrv">' + 
                              '<option v-for="driver1 in listAllDrivers" v-bind:value="driver1">'+
                              '{{ driver1.surname }}  {{ driver1.name }}'+
                              '</option></select>'+ 
                            '</td>' +
                            '<td width=10% style="vertical-align: bottom;">' +   
                              '<span>&nbsp;&nbsp;&nbsp;</span>' +
                              '<b-button class="btn-primary"  @click="editDrv()">+</b-button>' +
                          '</td>' +
                        '</tr>' +
                  '</table>' +
                  '<div v-if="this.selectedEditDrivers.length > 0">' +
                        '<br/><br/>'+
                      '<table class="table-lm table-bordered" width=90%>'+
                      '<tr>'+
                      '<th>Водители</th>'+
                      '<th>Удалить</th>'+
                      '</tr>' +
                      '<tr v-for="(item, index) in selectedEditDrivers" :key=item.index>'+
                      '<td width=80%> {{ item.surname }}  {{ item.name }}</td>'+
                      '<td width=20%>' +
                        '<b-button variant="danger" @click="deleteEditDrv(index)">X</b-button>' +
                      '</td>'+
                      '</tr>'+
                      '</table>'+
                   '</div>' +
               '</div>' +
               '<div class="workPanel hidden" id="tcm-div-edit" style="width:100%;" aria-labelledby="tcm-tab-edit">' +
                //'Транспортные компании Edit' +
                    '<table>' +
                        '<tr>' +
                            '<td width=90%>' +
                                '<label for="editTC">Транспортные компании</label>'+
                              '<select id="editTC" class="form-control" v-model="selectedTC" v-select="editTC">' + 
                              '<option v-for="tc in listAllTC" v-bind:value="tc">'+
                              '{{ tc.name }}  Код: {{ tc.code }}'+
                              '</option></select>'+ 
                            '</td>' +
                            '<td width=10% style="vertical-align: bottom;">' +   
                              '<span>&nbsp;&nbsp;&nbsp;</span><b-button class="btn-primary"  @click="editTC()">+</b-button>' +
                            '</td>' +
                        '</tr>' +
                  '</table>' +            
                  '<div v-if="this.selectedEditTCs.length > 0">' +
                      '<br/><br/>'+
                      '<table class="table-lm table-bordered" width=90%>'+
                      '<tr>'+
                      '<th>Название ТК</th>'+
                      '<th>Удалить</th>'+
                      '</tr>'+
                      
                      '<tr v-for="(item, index) in selectedEditTCs" :key=item.index>'+
                      '<td width=80%> {{ item.name }}, Код: {{ item.code }}</td>'+
                      '<td width=20%>' +
                        '<b-button variant="danger" @click="deleteEditTC(index)">X</b-button>' +
                      '</td>'+
                      '</tr>'+
                      '</table>'+
                  '</div>' +
                '</div>' +
          '</div>' +
      '</form>'+
      '</b-modal>'+
      '<button id="addV" class="btn-primary" v-b-modal.modalAddVehicle>Добавить ТС</button>'+
      '<br/><br/>'+
      '<table class="table-lm table-bordered" width=70%>'+
      '<tr>'+
      '<th>#</th>'+
      '<th>Регистрационный номер</th>'+
      '<th>Модель</th>'+
      '<th>Тоннаж</th>'+
      '<th>Объем</th>'+
      '<th></th>'+
      '<th></th>'+
      '</tr>'+
      '<tr v-for="(item, index) in listVehicles" :key=item.index>'+
      '<td width=10%>{{ index + 1 }}</td>'+
      '<td width=20%>{{item.registrationNumber}}</td>'+
      '<td width=20%>{{item.model}}</td>'+
      '<td width=15%>{{item.tonnage}}</td>'+
      '<td width=15%>{{item.capacity}}</td>'+
      '<td>'+
      '<b-button variant="danger" v-on:click="deleteVehicle(index, item)">X</b-button>'+
      '</td>'+
      '<td>'+
      '<button class="btn-primary" v-b-modal.modalEditVehicle v-on:click="editVehicle(index)">'+
      'Редактировать'+
      '</button>'+
      '</td>'+
      '</tr>'+
      '</table>'+
      '</div>',
  data() {
    return {
      listVehicles: [],
      listAllDrivers: [],
      listAllTC: [],
      selectedEditTCs: [],
      selectedTCs: [],
      selectedEditDrivers: [],
      selectedDrivers: [],
      selectedDriver: {},
      selectedTC: {},
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
      this.selectedEditTCs = this.listVehicles[index].transportCompanies;
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
      temp.drivers = this.selectedDrivers;
      temp.transportCompanies = this.selectedTCs;
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
      temp.transportCompanies = this.selectedEditTCs;
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
    allTC(){
        CDSAPI.TransportCompanies.sendAllTransportCompanies().then(tc => {
            this.listAllTC = tc;
            console.log("TransportCompany is - " + this.listAllTC);
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
        console.log("ВОДИТЕЛИ: " + JSON.stringify(this.selectedDrivers));
    },
    deleteDrv(index){
        this.selectedDrivers.splice(index, 1);
        //this.selected = false;
    },
    addTC(){
        var id = this.selectedTC.id;
        let m = this.selectedTCs.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedTCs.push(this.selectedTC);
        }
        
    },
    deleteTC(index){
        this.selectedTCs.splice(index, 1);
        
    },
    deleteEditTC(index){
        this.selectedEditTCs.splice(index, 1);
    },
    deleteEditDrv(index){
        this.selectedEditDrivers.splice(index, 1);
    },
    editDrv(){
        var id = this.selectedDriver.id;
        let m = this.selectedEditDrivers.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedEditDrivers.push(this.selectedDriver);
        }
    },
   editTC(){
        var id = this.selectedTC.id;
        let m = this.selectedEditTCs.filter(function(o){
            return o.id == id 
        });
        if(m.length == 0) {
            
            this.selectedEditTCs.push(this.selectedTC);
        }
    } 
  },
  created() {
    this.allVehicles();
    this.allDrivers();
    this.allTC();
  },
  mounted(){
      $.fn.modal.Constructor.prototype._enforceFocus = function() {};
      $("select").select2();
      $("div.modal-content").removeAttr("tabindex");
  }
});