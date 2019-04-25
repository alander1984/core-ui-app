Vue.component('deliveries-new', {
    template:  '<div>' +
        '<b-row class="mt-1 mb-1" style="width:100%"><b-button size="sm" variant="primary" class="mr-3 ml-3" @click="addUndistributedClaimsToRoute()">Добавить в маршрут</b-button><b-button size="sm" variant="primary">Отправить в автоматическое планирование</b-button></b-row>'
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
        '<tr draggable="true" @dragend="dragFinish(item, $event)" @dragstart="dragStart( $event)" v-for="(item, index) in listDeliveries" :key=item.index >' +
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

        document.querySelector('#new-orders-tab').addEventListener('click', e => {
          this.drawAllUnclaimedDeliveries();
        });

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
                        return id;
                    }).then(id => {

                      let request = {};
                      // Use 1 for set "APPROWED" status.
                      request.status = 1;
                      request.list = [];

                      selectedDeliveries.forEach(function (item) {
                        request.list.push(item.id);
                      });

                      CDSAPI.Deliveries.changeStatusDelivery(request).then( result =>  {
                        console.log("Changing deliveries status - " + result);
                      });
                      return id;
                    }).then(id => {

                      var i;
                      var tmp_list = this.listDeliveries;
                      for (i = tmp_list.length - 1; i >= 0; i -= 1) {
                        selectedDeliveries.forEach(function (itemS, indexS, objectS) {
                          if (tmp_list[i]!== undefined && tmp_list[i].id === itemS.id) {
                            tmp_list.splice(i, 1);
                          }
                        });
                      }
                      this.listDeliveries = tmp_list;
                      this.$forceUpdate();
                    });
                }
            }
        },

      addUndistributedClaimsToRouteByDD(tmp) {

        let _tmp = {};
        let routerPoints = [];
        let pos = 0;

        _tmp.id = tmp.route.id;
        _tmp.name = '';
        _tmp.deliveryDate = tmp.route.deliveryDate;

        tmp.route.routepoints.forEach(function (item) {
          if (pos <= item.pos)
            pos = item.pos + 1;
        });

        let _tmpRoutePoint = {};
        _tmpRoutePoint.deliveryId = this.draggableDelivery.id;
        //TODO Set "right" arrivalTime
        _tmpRoutePoint.arrivalTime = 1000000;
        _tmpRoutePoint.pos = pos;
        routerPoints.push(_tmpRoutePoint);

        _tmp.routerPoints = routerPoints;

        let currentDeliveryId = this.draggableDelivery.id;

        CDSAPI.RouteService.createOrUpdateRoute(_tmp).then(id => {

          let request = {};
          // Use 1 for set "APPROWED" status.
          request.status = 1;
          request.list = [];
          request.list.push(currentDeliveryId);

          CDSAPI.Deliveries.changeStatusDelivery(request).then(result => {
            console.log("Changing deliveries status - " + result);
          });
          return id;
        }).then(id => {
          return id;
        }).then(id => {
          this.listDeliveries.forEach(function (item, index, object) {
            if (item.id === currentDeliveryId) {
              object.splice(index, 1);
            }
          });
          this.$forceUpdate();
          let aft_ch_route = {};
          aft_ch_route.storeId = tmp.store.id;
          aft_ch_route.route = _tmp;
          Event.$emit('addRoutePointPos', aft_ch_route);
        });
      },
      dragFinish(item, ev) {
        this.draggableDelivery = item;
        ev.target.style.backgroundColor = "";
        Event.$emit('deliverySelect', );
      },
      dragStart(ev) {
          ev.target.style.backgroundColor = "#3ddb4a";
      },
      drawAllUnclaimedDeliveries (){
        console.log("In drawAllUnclaimedDeliveries method");

        routesPlacemarks.forEach( function(gp, i, arr) {
          myMap.geoObjects.remove(gp);
        });

        myMap.geoObjects.removeAll();
        routesPlacemarks = [];

        this.listDeliveries.forEach(function (del) {


          let sumWeight = 0;
          CDSAPI.Deliveries.getItemsForDelivery(del.id).then(items => {

            items.forEach(function (del_item) {
              sumWeight += del_item.weight;
            });
            return sumWeight;
          }).then(sumWeight => {

            let routePlacemark = new ymaps.Placemark([del.lon, del.lat],
                {
                  iconContent: del.id,
                  balloonContentHeader: "Информация о доставке",
                  balloonContent: "<button type=\"button\" class=\"btn btn-primary \">Добавить в маршрут</button>"
                },
            );

            if (sumWeight >= 300 && sumWeight < 1000) {
              routePlacemark.options.set('preset', 'islands#orangeIcon');
            }
            if (sumWeight > 1000) {
              routePlacemark.options.set('preset', 'islands#blackIcon');
            }

            routesPlacemarks.push(routePlacemark);
            myMap.geoObjects.add(routePlacemark);

            myMap.setBounds(myMap.geoObjects.getBounds(),{ checkZoomRange: true });
          });
      });
      },
    }
});