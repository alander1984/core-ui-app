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
      + '</option></select>'
      + '</form>'
      + '</b-modal>'
      + '<div id="main-info-content-header" className="row">'
      + '<b-button id="addR" variant="success" v-b-modal.modalAddRoute>Добавить машрут</b-button>'
      + '<b-button id="delR" variant="danger">Удалить машрут</b-button>'
      + '</div>'
      + '<div id = "main-info-content-wrapper" className = "row">'
      + '<div className = "col-md-12" >'
      + '<div role="tablist" v-for="(item, index) in stores">\n'
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
      + 'TK : {{route.tc_name}}'
      + '</div>'
      + '<div class="row">'
      + 'Транспорт: : {{route.ts_model}}'
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
      listAllDrivers: [
        {
          name: 'Иванов',
          surname: 'Иван',
          patronymic: 'Иванович'
        },
        {
          name: 'Петров',
          surname: 'Петр',
          patronymic: 'Петрович'
        },
      ],
      vehicle: '',
      selectedVehicles: [],
      listAllVehicles: [
        {
          model: 'Газ-3310'
        },
        {
          model: 'КАМАЗ-5390'
        }
      ],
      transportCompany: '',
      selectedTransportCompanies: [],
      listAllTransportCompanies: [
        {
          name: 'Nawinia'
        },
        {
          name: 'TransportINC'
        }
      ],
      stores: [
        {
          id: 1,
          name: 'Магазин 1',
          routes: [
            {
              id: 1,
              name: 'Маршрут 1',
              tc_name: 'Nowinia',
              ts_model: 'Газ-3310'
            },
            {
              id: 2,
              name: 'Маршрут 2',
              tc_name: 'TransportINC',
              ts_model: 'Камаз-5390'
            }

          ]
        },
        {
          id: 2,
          name: 'Магазин 2'
        }
      ]
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
  }
});
