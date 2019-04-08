Vue.component('tcs', {
  template:
      '<div>'+
      '<h3>Транспортные компании (ТК)</h3>'+
      '<b-modal id="modalAddTC" ref="modal1" title="Добавить ТК" @ok="handleOk"'+
      '@shown="clearName">'+
      '<form @submit.stop.prevent="handleSubmit">'+
      '<b-form-input type="text" placeholder="Код" v-model="tcCode"/><br/>'+
      '<b-form-input type="text" placeholder="Название" v-model="tcName"/><br/>'+
      '</form>'+
      '</b-modal>'+
      '<b-modal id="modalEditTC" ref="modal" title="Редактирование ТК" @ok="handleOkEdit"'+
      '@shown="iDriver">'+
      '<form @submit.stop.prevent="handleSubmitEdit">'+
      '<h6>Код:</h6>'+
      '<b-form-input type="text" v-model="tcCode"/>'+
      '<h6>Название:</h6>'+
      '<b-form-input type="text" v-model="tcName"/>'+
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
      tcId: Number,
      tcCode: '',
      tcName: '',
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
        alert('Введите имя водителя');
      } else {
        if (!this.tcCode) {
          alert('Введите фамилию водителя');
        } else {
          this.handleSubmit();
        }
      }
    },
    handleSubmit() {
      temp = new Object();
      temp.code = this.tcCode;
      temp.name = this.tcName;
      CDSAPI.TransportCompanies.createOrUpdateTransportCompany(temp).then(id => {
        console.log("Created ID :  " + id);
        temp.id = id;
        this.listTCs.push(temp);
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
      //TODO Fix refresh bug 
      //Vue.set(this.listTCs, this.index, O);
      CDSAPI.TransportCompanies.createOrUpdateTransportCompany(temp).then(id => {
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
    allTCs() {
      CDSAPI.TransportCompanies.sendAllTransportCompanies().then(tcs => {
        this.listTCs = tcs;
        console.log("Transport Companies :  " + this.listTCs.length);
      });
    }
  },
  created() {
    this.allTCs();
  }
});