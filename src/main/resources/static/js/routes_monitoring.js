var routesmonitoring = Vue.component('routesmonitoring', {
   
   
   template : 
                
                '<div id="main" class="container-fluid row full-div h-100">' +
                '<div id="routes" class="col-md-2 full-div">' + 
                '<div id="route-settings" class="row full-div">' + 
                    '<div class="form-inline center-div">' + 
                    '<label>Дата:   </label>' +
                    '<input id="date" data-provide="datepicker" class="datepicker"/>' +
                    '</div>' + 
                '</div>' + 
                '<div id="route-statistics" class="row full-div">' +
                    '<div class="w-100">' +
                        '<table class="w-100">' +
                            '<tr>' +
                                '<th><i class="fas fa-shipping-fast"></i><label class="left-10">55</label></th>' +
                                '<th><i class="fas fa-audible"></i><label class="left-10">12</label></th>' +
                                '<th><i class="fas fa-bacon"></i><label class="left-10">5</label></th>' +
                            '</tr>' +
                            '<tr>' +
                                '<th><i class="fas fa-boxes"></i><label class="left-10">5.5</label></th>' +
                                '<th><i class="fas fa-building"></i><label class="left-10">90</label></th>' +
                                '<th><i class="fas fa-calendar-check"></i><label class="left-10">1.88</label></th>' +
                            '</tr>' +
                        '</table>' +
                    '</div>' +
                '</div>' +
                '<div id="route-list" class="h-100">' +
                
                    '<b-modal id="modalRouteInfo" :title="routeName" @hide="clearName">' + 
                        '<p>ТК : {{transportCompanyName}}</p>' + 
                        '<p>Машина : {{vehicleModel}}</p>' + 
                        '<p>Водитель : {{driverName}}</p><br/>' +
                        '<table class="table table-hover table-sm table-bordered">' + 
                            '<thead><tr><th scope="col">№</th><th scope="col">Время</th><th scope="col">Адрес</th><th scope="col">Вес</th><th scope="col">Объём</th><th scope="col">Этаж</th></tr></thead>' +    
                                '<tbody><tr v-for="(item, deliveryInfoIndex) in deliveriesInfoList">' + 
                                    '<td>{{item.number}}</td>' + 
                                    '<td>{{item.arrivalTime}}</td>' +
                                    '<td>{{item.address}}</td>' + 
                                    '<td>{{item.weight}}кг</td>' +
                                    '<td>{{item.volume}}м<sup><small>3</small></sup></td>' +
                                    '<td>{{item.floor}}</td>' +
                                '</tr></tbody>' + 
                        '</table>' +
                    '</b-modal>' + 
                    '<div v-for="(item, index) in routesList" :key=item.index class="card">' + 
                        '<div class="card-body">' + 
                            '<h5 class="mb-0">' +
                            '   <div class=" card-text"><p class="card-text float-left">{{item.name}}</p>' + 
                                    '<div class="float-right">' +
                                        '<b-button size="sm" v-on:click="drawRoute(index)" variant="outline-primary"><i class="fa fa-location-arrow fa-sm" aria-hidden="true"></i></b-button><br/>' +
                                        '<b-button size="sm" v-on:click="viewRouteInfo(index)" variant="outline-primary" v-b-modal.modalRouteInfo class="btn"><i class="fa fa-info fa-sm" aria-hidden="true"></i></b-button>' +
                                    '</div>' +
                                '</div>' +
                            '</h5>' +
                        '</div>' +
                    '</div>' + 
                    '</div>' + 
                    '</div>' +
                    '<div id="map-planning" class="col-md-10 full-div">' +
                        '<div id="map" class="h-100 full-div">' +
                            '<div id="YMapsID" style="width:100%;height:100%"></div>' +
                        '</div>' +
                    '</div>' +
                
                '</div>',
  //            '</div>',
   
   data() {
       return {
           routesList : [],
           index : Number,
           routeId : Number,
           routeName : '',
           driverName : '',
           vehicleModel: '',
           transportCompanyName: '',
           deliveriesInfoList: []
           
       };
   },
   
   methods : {
       getAllRoutes() {
           console.log('GET ALL MONITORING ROUTES');
//           this.routesList.push({id: 1, name: 'MARSHRUT1', vehicle: {model: 'Kalina'}, transportcompany: {name: 'TK1'}, 
//                routepoints :[
//                {id: 1, delivery: {id: 1, city: 'Samara', street: 'street', house: '55', entrance: '2', flat: '33', lon: 53.235087, lat: 50.196801}, arrivalTime: 20 },
//                {id: 2, delivery: {id: 2, city: 'Samara', street: 'street', house: '56', entrance: '2', flat: '34', lon: 53.241254, lat: 50.197461}, arrivalTime: 20 },
//                {id: 3, delivery: {id: 3, city: 'Samara', street: 'street', house: '57', entrance: '2', flat: '35', lon: 53.250664, lat: 50.214228}, arrivalTime: 20 },
//                {id: 4, delivery: {id: 4, city: 'Samara', street: 'street', house: '58', entrance: '2', flat: '36', lon: 53.258511, lat: 50.199428}, arrivalTime: 20 },
//                {id: 5, delivery: {id: 5, city: 'Samara', street: 'street', house: '59', entrance: '2', flat: '37', lon: 53.271279, lat: 50.238178}, arrivalTime: 20 }
//                ]});
//           this.routesList.push({id: 2, name: 'MARSHRUT2', vehicle: {model: 'Priora'}, transportcompany: {name: 'TK2'}, 
//                routepoints :[
//                {id: 6, delivery: {id: 6, city: 'Moscow', street: 'street', house: '11', entrance: '2', flat: '34', lon: 55.715519, lat: 37.599073}, arrivalTime: 20 },
//                {id: 7, delivery: {id: 7, city: 'Moscow', street: 'street', house: '12', entrance: '2', flat: '35', lon: 55.729976, lat: 37.695224}, arrivalTime: 20 },
//                {id: 8, delivery: {id: 8, city: 'Moscow', street: 'street', house: '13', entrance: '2', flat: '36', lon: 55.757676, lat: 37.701252}, arrivalTime: 20 },
//                {id: 9, delivery: {id: 9, city: 'Moscow', street: 'street', house: '14', entrance: '2', flat: '37', lon: 55.781367, lat: 37.627791}, arrivalTime: 20 },
//                {id: 10, delivery: {id: 10, city: 'Moscow', street: 'street', house: '15', entrance: '2', flat: '38', lon: 55.754455, lat: 37.463424}, arrivalTime: 20 }
//                ]});
            
//           console.log(this.routesList);
//           console.log(this.routesList[0].vehicle.model);
           
           CDSAPI.RouteService.sendAllRoutes().then (routes => {
               console.log('CDSAPI send all routes monitoring');
               this.routesList = routes;
           });
       },
       
       viewRouteInfo(index) {
           console.log('ITEM VIEW ROUTE INFO: ' + index);
           if(this.routesList[index].routepoints !== undefined) {
            this.deliveriesInfoList = this.getDeliveriesItemsByDeliveryId(this.routesList[index].routepoints);
           }

           this.vehicleModel = this.routesList[index].vehicle.model;
           this.transportCompanyName = this.routesList[index].transportcompany.name;
           this.routeName = this.routesList[index].name;
           this.driverName = this.routesList[index].driver.surname + ' ' + this.routesList[index].driver.name.charAt(0) + '. ' + this.routesList[index].driver.patronymic.charAt(0) + '.';
       },
       
       getDeliveriesItemsByDeliveryId(routePoints) {
           console.log('click get deliveries items by delivery id');
           let deliveriesInfo = [];
           routePoints.forEach(function(routePoint, i, arr) {
               console.log('DELIVERY ID: ' + routePoint.delivery.id);
               console.log('DELIVERY CITY: ' + routePoint.delivery.city);
               let deliveryInfo = new Object();
               let city = routePoint.delivery.city;
               let street = routePoint.delivery.street;
               let house = routePoint.delivery.house;
               let flat = routePoint.delivery.flat;
               
               deliveryInfo.address = city + ', ' + street + ', ' + house + ', ' + flat;
               deliveryInfo.floor = 10;
               deliveryInfo.number = routePoint.delivery.id;
               deliveryInfo.arrivalTime = routePoint.arrivalTime;
               deliveryInfo.lon = routePoint.delivery.lon;
               deliveryInfo.lat = routePoint.delivery.lat;
               
               
               let volume = 0;
               let weight = 0;
               
               
               let deliveryItems = [];
               CDSAPI.Deliveries.getItemsForDelivery(routePoint.delivery.id).then(list => {
                   console.log('GET DELIVERY ITEMS FOR DELIVERY ID: ' + routePoint.delivery.id);
                   deliveryItems = list;
                   console.log(deliveryItems);
                   deliveryItems.forEach(function(di, j, arrDI) {
                       console.log('WIDTH: ' + di.width);
                       volume = volume + di.width * di.length * di.height;
                       weight = weight + di.weight;
                       deliveryInfo.volume = volume;
                       deliveryInfo.weight = weight;
                       deliveriesInfo.push(deliveryInfo);
                   });
               });
               
               
               
               

               
           });
           return deliveriesInfo;
           
       },
       
       clearName() {
           console.log('CLEAR NAME');
           this.vehicleModel = '';
           this.transportCompanyName = '';
           this.deliveriesInfoList = [];
           this.routeName = '';
           this.driverName = '';
       }, 
       
       drawRoute(index) {
           console.log('DRAW ROUTE INDEX: ' + index);
           myMapMonitoring.geoObjects.removeAll();
           
           let storePlacemark = new ymaps.Placemark([this.routesList[index].store.lon, this.routesList[index].store.lat], 
                        { iconCaption: this.routesList[index].store.name },
                        { preset: 'islands#redIcon', draggable: false });
            myMapMonitoring.geoObjects.add(storePlacemark);
           
           if(this.routesList[index].routepoints !== undefined) {
               let lineCoordinats = [];
               lineCoordinats.push([this.routesList[index].store.lon, this.routesList[index].store.lat]);
               myMapMonitoring.setCenter([this.routesList[index].routepoints[0].delivery.lon, this.routesList[index].routepoints[0].delivery.lat]);
               this.routesList[index].routepoints.forEach(function(rp, i, arr) {
                  let routePoint = new ymaps.GeoObject({
                     geometry: {
                        type: "Point", 
                        coordinates: [rp.delivery.lon, rp.delivery.lat] 
                     }
                  });
                  myMapMonitoring.geoObjects.add(routePoint);
                  lineCoordinats.push([rp.delivery.lon, rp.delivery.lat]);
               });
               let routeLine = new ymaps.Polyline(lineCoordinats, {strokeColor: "#000000", strokeWidth: 2, strokeOpacity: 1});
               myMapMonitoring.geoObjects.add(routeLine);
           }    


       }
   },
   
   created() {
       this.getAllRoutes();
   }
   
   
   
   
   
   
   
});