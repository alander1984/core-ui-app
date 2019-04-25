Vue.component('routes', {
  template:
      '<div>'
      + '<b-modal id="modalAddRoute" ref="modal1" :title="\'Добавить маршрут для \'+this.selectedStore.name" @ok="handleOk" @show="submitPrevent($event)">'
      + '<form @submit.stop.prevent="handleOk">'
      + '<label for="createDate"  class="col-form-label">Дата</label>'
      + '<b-form-input id="createDate"  v-model="routeDate" type="date"/><br/>'
      + '<label for="createTC">ТК</label>'
      + '<select id="createTC" class="form-control" v-model="selectedTransportCompanies" @change="onChangeTC($event)">\'+\n'
      + '<option v-for="transportCompany in listAllTransportCompanies" v-bind:value="transportCompany">'
      + '{{ transportCompany.name }}'
      + '</option></select>'
      + '<label for="createVeh">ТC</label>'
      + '<select id="createVeh" class="form-control" v-model="selectedVehicles" @change="onChangeVehicle($event)">\'+\n'
      + '<option v-for="vehicle in tc_vehicles" v-bind:value="vehicle">'
      + '{{ vehicle.model }}'
      + '</option></select>'
      + '<label for="createDriver">Водитель</label>'
      + '<select id="createDriver" class="form-control" v-model="selectedDrivers">\'+\n'
      + '<option v-for="driver in vehicle_drivers" v-bind:value="driver">'
      + '{{ driver.surname }}  {{driver.name.charAt(0)}}.{{driver.patronymic.charAt(0)}}.'
      + '</option></select><br/>'
      + '<div class="form-row">'
      + '<div class="form-group col-md-6">'
      + '<b-button id="clearAllModal"  variant="danger" @click.prevent="clearModal()">Очистить все</b-button>'
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
      + '<div class="form-group" style="margin-top:10px">'
      + '<b-button id="addR" variant="primary" v-b-modal.modalAddRoute>Добавить машрут {{getfullname}}</b-button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<div id = "main-info-content-wrapper" className = "row">'
      + '<div className = "col-md-12" >'
      + '<div role="tablist" v-for="(item, index) in listAllStores">\n'
      + '  <b-card no-body class="mb-1">\n'
      + '    <b-card-header header-tag="header" class="p-1" role="tab">\n'
      + '      <b-button block  v-b-toggle="\'accordion-\'+index\" variant="outline-primary" @click.prevent="storeChange(item)">{{item.name}}</b-button>\n'
      + '    </b-card-header>\n'
      + '    <b-collapse :id="\'accordion-\'+ index"  role="tabpanel">\n'
      + '      <b-card-body>\n'
      + '        <div role="tablist" v-for="(route, index_n) in item.routes">'
      + ' <b-card no-body class="mb-1">\n'
      + '    <b-card-header header-tag="header" class="p-1" role="tab">\n'
      + '      <b-button block v-b-toggle="\'accordion_nested-\'+index_n\" variant="outline-primary" @click.prevent="routeChange(route)">{{route.vehicle.model}} {{route.vehicle.registrationNumber}}</b-button>\n'
      + '    </b-card-header>\n'
      + '    <b-collapse :id="\'accordion_nested-\'+ index_n"  role="tabpanel">\n'
      + '      <b-card-body>\n'
      + '<div class="row">'
      + 'Дата : {{route.deliveryDate}}'
      + '</div>'
      + '<div class="row">'
      + 'ТК: : {{route.transportcompany.name}}'
      + '</div>'
      + '<div class="row">'
      + 'Транспорт: : {{route.vehicle.model}}'
      + '</div>'
      + '<div class="row">'
      + 'Водитель: : {{route.driver.surname}} {{route.driver.name.charAt(0)}}.{{route.driver.patronymic.charAt(0)}}'
      + '</div>'
      + '<div class="text-right">'
      + '<b-button :id="\'delroute-\'+ index" v-on:click="deleteRoute(index_n, item, route)" variant="danger" size="sm">Удалить машрут</b-button>'
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
      routeDate: '',
      driver: '',
      selectedDrivers: [],
      listAllDrivers: [],
      vehicle: '',
      store: '',
      selectedStore: '',
      selectedVehicles: [],
      selectedRoute: '',
      listAllVehicles: [],
      transportCompany: '',
      tc_vehicles: [],
      vehicle_drivers: [],
      selectedTransportCompanies: [],
      listAllTransportCompanies: [],
      listAllRoutes: [],
      listAllStores: [],
      email : "",
      emailBlured : false,
      valid : false,
      submitted : false

    }
  },
  computed :{
    getfullname : function(){
      if (this.selectedStore !== ''){
        return " для " + this.selectedStore.name;
      } else {
        return "";
      }
    }
  },
  methods: {
    deleteRoute(index, item, route) {
      CDSAPI.RouteService.deleteRoute(route.id.toString()).then(response => {
        console.log("Route deleted With id :  " + route.id + "/" + response);
      });
      item.routes.splice(index, 1);
      this.$forceUpdate();

    },
    submitPrevent (bvEvt) {
      if (!this.selectedStore){
        alert("Выберите магазин для добавления маршрута");
        bvEvt.preventDefault();
      }
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (this.routeDate === ''){
        alert("Выберите дату");
      } else {
        if (this.selectedTransportCompanies.length === 0){
          alert("Выберите ТК");
        } else {
          if (this.selectedVehicles.length === 0){
            alert("Выберите ТС");
          } else {
            if (this.selectedDrivers.length === 0){
              alert("Выберите водителя");
            } else {
              this.handleSubmit();
            }
          }
        }
      }

    },
    handleSubmit() {
      console.log("In handle submit");
      let tmp = {};
      tmp.name = '';
      tmp.deliveryDate = this.routeDate;
      tmp.vehicleId = this.selectedVehicles.id;
      tmp.transportcompanyId = this.selectedTransportCompanies.id;
      tmp.driverId = this.selectedDrivers.id;

      let tmpRoute = {};
      tmpRoute.driver = this.selectedDrivers;
      tmpRoute.vehicle = this.selectedVehicles;
      tmpRoute.transportcompany = this.selectedTransportCompanies;
      tmpRoute.store = this.selectedStore;
      tmp.storeid = this.selectedStore.id;

      CDSAPI.RouteService.createOrUpdateRoute(tmp).then(id => {
        console.log("Created Route ID :  " + id);
        this.clearModal();
        return id;
      }).then(new_id => {
        this.listAllStores.forEach(function (item_s, index, str) {
          if (item_s.id === tmp.storeid) {
            let _tmp = {};
            _tmp.deliveryDate = tmp.deliveryDate;
            _tmp.id = new_id;
            _tmp.name =  tmp.name;
            _tmp.store = tmpRoute.store;
            _tmp.transportcompany = tmpRoute.transportcompany;
            _tmp.vehicle = tmpRoute.vehicle;
            _tmp.driver = tmpRoute.driver;
            item_s.routes.push(_tmp);
          }
        });

      }).then(result => {
            this.$forceUpdate();
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modal1.hide();
            });
          }
      );
    },
    storeChange(item) {
      this.selectedStore = item;
      // console.log("In storeChange");
      Event.$emit('changeStore', );
    },
    routeChange(route) {
      // console.log("In routeChange");

      this.selectedRoute = route;

      let tmp = {};
      tmp.route = route;
      tmp.storeId = this.selectedStore.id;
      Event.$emit('changeRoute', tmp);
    },
    onChangeTC(event) {
      this.tc_vehicles = this.selectedTransportCompanies.vehicles;
      // console.log("In  onChangeTC event");
    },
    onChangeVehicle(event) {
      this.vehicle_drivers = this.selectedVehicles.drivers;
      // console.log("In  onChangeVehicle event");
    },
    clearModal() {
      this.routeName = '';
      this.routeDate = '';
      this.selectedTransportCompanies = '';
      this.selectedVehicles = '';
      this.selectedDrivers = '';
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
            if (items.id === itemr.store.id) {
              items.routes.push(itemr);
            }
          });
        });

        this.listAllStores = _listAllStores;
        this.$forceUpdate();
      });

    },
    allTCs() {
      CDSAPI.TransportCompanies.sendAllTransportCompanies().then(tcs => {
        this.listAllTransportCompanies = tcs;
      });
    },
  },
  mounted(){

    Event.$on('deliverySelect', () => {
      // console.log("In deliverySelect event ");

      //Check the store and route is selected
      if (this.selectedRoute === '' || this.selectedStore === ''){
        alert("Выберите магазин и маршрут");
      } else {
        let tmp = {};
        tmp.route = this.selectedRoute;
        tmp.store = this.selectedStore;

        Event.$emit('addDeliveryByDD', tmp);
      }

    });
    //Обновляем список RoutePoint после добавление в delivery-new
    Event.$on('addRoutePointPos', (tmp) => {
      let tmp_routePoint = tmp.route.routepoints[0];

      this.listAllStores.forEach(function (item) {
        if (item.id === tmp.storeId){
          item.routes.forEach(function (item_r, index_r) {
            if (item_r.id === tmp.route.id) {
              //TODO Prevent undefinded value
              if (item.routes[index_r].routepoints === undefined){
                item.routes[index_r].routepoints = [];
                item.routes[index_r].routepoints.push(tmp_routePoint);
              } else {
                item.routes[index_r].routepoints.push(tmp_routePoint);
              }
            }
          });
        }
      });

      this.$forceUpdate();

    });
  },
  created() {
    this.allRoutesAndStores();
    this.allTCs();
  }
});
