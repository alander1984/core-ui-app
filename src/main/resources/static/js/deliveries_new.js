Vue.component('deliveries-new', {
    template:  '<div>' +
        '<b-row class="mt-1 mb-1" style="width:100%"><b-button size="sm" variant="success" class="mr-3 ml-3" @click="addUndistributedClaimsToRoute()">Добавить в маршрут</b-button><b-button size="sm" variant="success">Отправить в автоматическое планирование</b-button></b-row>'
        + '<table class="table table-lm" style="width: 100%">' +
        '<tr>' +
        '<th><input type="checkbox" disabled/></th>' +
        '<th>№ заявки</th>' +
        '<th>Время план</th>' +
        '<th>Время факт</th>' +
        '<th>Адрес</th>' +
        '<th>Вес</th>' +
        '<th>Объём</th>' +
        '<th>Район</th>' +
        '<th></th>' +
        '</tr>' +
        '<tr draggable="true" @dragend="dragFinish(item, $event)" v-for="(item, index) in listDeliveries" :key=item.index >' +
        '<td>' +
        '<input type="checkbox" id="checkbox1" v-model="selected[index]" v-on:change="check(index)" unchecked-value="not_accepted"/>' +
        '</td>' +
        '<td>{{item.id }}</td>' +
        '<td>{{item.deliveryDateMin + " -- " + item.deliveryDateMax}}</td>' +
        '<td></td>' +
        '<td>{{item.street + " " + item.house + " " + item.flat}}</td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>' +
        //'<b-button id="showItems" variant="primary"  @click="showItemsForDelivery(item.id)">Показать перечень продуктов</b-button><i class="fa fa-caret-down fa-lg"></i>' +
        '<i class="fa fa-location-arrow fa-lg compact_i w-50" style="cursor: pointer; padding-inline-start:5px; padding-inline-end:10px"></i>' +
        '<i class="fa fa-clipboard-list fa-lg compact_i w-50" style="cursor: pointer; padding-inline-start:10px; padding-inline-end:5px" @click="showDetailsForDelivery(item)"></i>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '<div v-if="showInlineItems == true">' +
        //'<delivery-details-new></delivery-details-new>' +
        '</div>' +
        '</div>',
    data(){
        return {
            listDeliveries: [],
            listItems: [],
            selected: [],
            delivery: {},
            selectedRoute: {},
            selectedStoreId: '',
            draggableDelivery: {},
            showInlineItems: false,
            colorRow: 'black',
            checked: false,
            weight: ''

        }
    },
    created(){
        CDSAPI.Deliveries.sendNewDeliveries().then(deliveries => {

            this.listDeliveries = deliveries;
            this.delivery = this.listDeliveries[0];
            console.log("Deliveries :  " + this.listDeliveries.length);
        });
    },
    mounted() {
        Event.$on('changeRoute', (tmp) => {
            console.log("In changeRoute event ");
            this.selectedRoute = tmp.route;
            this.selectedStoreId = tmp.storeId;
        });
      Event.$on('addDeliveryByDD', (tmp) => {
        // console.log("In addDeliveryByDD event.Selected Delivery id is - " + tmp);
        this.addUndistributedClaimsToRouteByDD(tmp);
      });
    },
    methods: {
        showDetailsForDelivery(item){
            this.delivery = item;
            console.log("Id --> " + this.delivery.id);

            this.$store.commit('loadDelivery', this.delivery);
            this.showInlineItems = true;

            //this.showInlineItems = true;
            Event.$emit('showDelivery', this.delivery);
            /*alert("Item " + id);
            CDSAPI.Deliveries.getItemsForDelivery(id).then(items => {
            
                this.listItems = items;
                console.log("Items :  " + this.listItems.length);
            });
            */
        },
        closeShowItemsForDelivery(){
            this.showInlineItems = false;
        },
        check(index){
            //alert("Index: " + index + " Checked " + this.selected);
        },
        addUndistributedClaimsToRoute () {
            let somethingSelect = false;

            this.selected.forEach(function (item) {
                if (item){
                    somethingSelect = item;
                }
            });

            if (this.selectedRoute.id === undefined){
                alert("Выберите маршрут");
            } else {
                if (!somethingSelect) {
                    alert("Выберите заявки для добавления");
                } else {
                    let selectedDeliveries = [];
                    let listDeliveries = this.listDeliveries;
                    this.selected.forEach(function (item, index) {
                        listDeliveries.forEach(function (itemD, indexD) {
                            if (index === indexD) {
                                selectedDeliveries.push(itemD);
                            }
                        });
                    });


                    let tmp = {};
                    tmp.id = this.selectedRoute.id;
                    tmp.name = '';
                    tmp.deliveryDate = this.selectedRoute.deliveryDate;

                    let routerPoints = [];

                    selectedDeliveries.forEach(function (item, index) {
                        let _tmpRoutePoint = {};
                        _tmpRoutePoint.deliveryId = item.id;
                        //TODO Set "right" arrivalTime
                        _tmpRoutePoint.arrivalTime = 1000000;
                        _tmpRoutePoint.pos = index;

                        routerPoints.push(_tmpRoutePoint);
                    });

                    tmp.routerPoints = routerPoints;

                    CDSAPI.RouteService.createOrUpdateRoute(tmp).then(id => {
                        console.log("Updated Route ID :  " + id);
                        return id;
                    });
                }
            }
        },

      addUndistributedClaimsToRouteByDD(tmp) {
        // console.log("I'm ready to adding delivery!");

        let _tmp = {};
        let routerPoints = [];

        _tmp.id = tmp.route.id;
        _tmp.name = '';
        _tmp.deliveryDate = tmp.route.deliveryDate;

        let _tmpRoutePoint = {};
        _tmpRoutePoint.deliveryId = this.draggableDelivery.id;
        //TODO Set "right" arrivalTime
        _tmpRoutePoint.arrivalTime = 1000000;
        //TODO Set "right" pos
        _tmpRoutePoint.pos = 1;
        routerPoints.push(_tmpRoutePoint);

        _tmp.routerPoints = routerPoints;

        CDSAPI.RouteService.createOrUpdateRoute(_tmp).then(id => {
          console.log("Updated Route ID :  " + id);
          return id;
        });

      },

      dragFinish(item, ev) {
        this.draggableDelivery = item;
        Event.$emit('deliverySelect', );
      },
    }
});