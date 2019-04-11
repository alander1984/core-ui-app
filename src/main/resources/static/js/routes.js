Vue.component('routes', {
  template:
      '<div>'
      + '<b-modal id="modalAddRoute" ref="modal1" title="Добавить маршрут" @ok="handleOk">'
      + '<form @submit.stop.prevent="handleSubmit">'
      + '<label for="createName"  class="col-form-label">Название</label>'
      + '<b-form-input id="createName" type="text" v-model="routeName"/><br/>'
      + '<label for="createDate"  class="col-form-label">Время</label>'
      + '<b-form-input id="createDate" type="select" v-model="routeDate"/><br/>'
      + '<label for="createTC">ТК</label>'
      + '<select id="createTC" class="form-control" v-model="selectedTransportCompanies">\'+\n'
      + '<option v-for="transportCompany in listAllTransportCompanies" v-bind:value="transportCompany">'
      + '{{ transportCompany.name }}'
      + '</option></select>'
      + '<label for="createVeh">ТC</label>'
      + '<select id="createVeh" class="form-control" v-model="selectedVehicles">\'+\n'
      + '<option v-for="vehicle in listAllVehicles" v-bind:value="vehicle">'
      + '{{ vehicle.model }}'
      + '</option></select>'
      + '<label for="createDriver">Водитель</label>'
      + '<select id="createDriver" class="form-control" v-model="selectedDrivers">\'+\n'
      + '<option v-for="driver in listAllDrivers" v-bind:value="driver">'
      + '{{ driver.surname }}  {{driver.name.charAt(0)}}.{{driver.patronymic.charAt(0)}}.'
      + '</option></select><br/>'
      + '<div class="form-row">'
      + '<div class="form-group col-md-6">'
      + '<b-button id="clearAllModal"  variant="danger">Очистить все</b-button>'
      + '</div>'
      + '<div class="form-group col-md-3">'
      + '<b-button id="addRouteModal" variant="success">Добавить</b-button>'
      + '</div>'
      + '<div class="form-group col-md-3">'
      + '<b-button id="deleteRouteModal"  variant="danger">Удалить</b-button>'
      + '</div>'
      + '</div>'
      + '</form>'
      + '</b-modal>'
      + '<div id="main-info-content-header" className="row">'
      + '<div class="form-row">'
      + '<div class="form-group col-md-4">'
      + '<b-button id="addR" variant="success" v-b-modal.modalAddRoute>Добавить машрут</b-button>'
      + '</div>'
      + '<div class="form-group col-md-4">'
      + '<b-button id="delR" variant="danger">Удалить машрут</b-button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<div id = "main-info-content-wrapper" className = "row">'
      + '<div className = "col-md-12" >'
      + '<div role="tablist" v-for="(item, index) in listAllStores">\n'
      + '  <b-card no-body class="mb-1">\n'
      + '    <b-card-header header-tag="header" class="p-1" role="tab">\n'
      + '      <b-button block href="#" v-b-toggle="\'accordion-\'+index\" variant="outline-primary">{{item.name}}</b-button>\n'
      + '    </b-card-header>\n'
      + '    <b-collapse :id="\'accordion-\'+ index"  role="tabpanel">\n'
      + '      <b-card-body>\n'
      + '        <div role="tablist" v-for="(route, index) in item.routes">'
      + ' <b-card no-body class="mb-1">\n'
      + '    <b-card-header header-tag="header" class="p-1" role="tab">\n'
      + '      <b-button block href="#" v-b-toggle="\'accordion_nested-\'+index\" variant="outline-primary">{{route.name}}</b-button>\n'
      + '    </b-card-header>\n'
      + '    <b-collapse :id="\'accordion_nested-\'+ index"  role="tabpanel">\n'
      + '      <b-card-body>\n'
      + '<div class="row">'
      + 'Время : {{route.deliveryDate}}'
      + '</div>'
      + '<div class="row">'
      + 'ТК: : {{route.transportcompany.name}}'
      + '</div>'
      + '<div class="row">'
      + 'Транспорт: : {{route.vehicle.model}}'
      + '</div>'
      + '<div class="row">'
      + 'Водитель: : {{route.vehicle.drivers[0].surname}} {{route.vehicle.drivers[0].name.charAt(0)}}.{{route.vehicle.drivers[0].patronymic.charAt(0)}}'
      + '</div>'
      + '</b-card-body>'
      + '</b-collapse>'
      + '</b-card>'
      + '</div>'
      + '</b-card-body>'
      + '</b-collapse>'
      + '</b-card>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>',
  data() {
    return {
      text: ``,
      routeName: '',
      routeDate: '',
      driver: '',
      selectedDrivers: [],
      listAllDrivers: [],
      vehicle: '',
      selectedVehicles: [],
      listAllVehicles: [],
      transportCompany: '',
      selectedTransportCompanies: [],
      listAllTransportCompanies: [],
      listAllRoutes: [],
      listAllStores: [],

    }
  },
  methods: {
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      alert('Введите название ТК');
    },
    handleSubmit (evt) {

    },
    clearName() {
    },
    allRoutesAndStores() {

      Promise.all([
        CDSAPI.RouteService.sendAllRoutes().then(routes => {
          this.listAllRoutes = routes;
          // console.log("listAllRoutes length is -  " + this.listAllRoutes.length);
        }),
        CDSAPI.Stores.getAllStore().then(stores => {
          this.listAllStores = stores;
          // console.log("listAllStores length is -  " + this.listAllStores.length);
        })

      ]).then(result => {

        let _listAllStores = this.listAllStores;
        let _listAllRoutes = this.listAllRoutes;

        _listAllStores.forEach(function (items, index, str) {
          // console.log("Stores item - " + items.id + " " + items.name);
          items.routes = [];
          _listAllRoutes.forEach(function (itemr, index, rt) {
            // console.log("Route item - " + itemr.id + " " + itemr.name);
            if (items.id === itemr.store.id){
              items.routes.push(itemr);
            }
          });
        });

        this.listAllStores = _listAllStores;
        console.log("After Promisse all");
      });

    },
    allDrivers() {
      CDSAPI.Drivers.sendAllDrivers().then(drivers => {
        this.listAllDrivers = drivers;
        // console.log("Drivers is - " + this.listAllDrivers);
      });
    },
    allVehicles() {
      CDSAPI.Vehicles.sendAllVehicles().then(vehicles => {
        this.listAllVehicles = vehicles;
      });
    },
    allTCs() {
      CDSAPI.TransportCompanies.sendAllTransportCompanies().then(tcs => {
        this.listAllTransportCompanies = tcs;
        // console.log("Transport Companies :  " + this.listTCs.length);
      });
    }
  },
  created() {
    this.allRoutesAndStores();
    this.allDrivers();
    this.allVehicles();
    this.allTCs();
  }
});
