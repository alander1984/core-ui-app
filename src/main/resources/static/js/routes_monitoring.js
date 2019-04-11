var routesmonitoring = Vue.component('routesmonitoring', {
   
   
   template : 
   
            '<div>' + 
                '<b-modal id="modalRouteInfo" title="Маршрут" @hide="clearName">' + 
                    '<p>ТК : {{transportCompanyName}}</p>' + 
                    '<p>Машина : {{vehicleModel}}</p>' + 
                    '<p>Водитель : </p><br/>' +
                    '<table class="table table-hover table-sm table-bordered">' + 
                        '<thead><tr><th scope="col">№</th><th scope="col">Время</th><th scope="col">Адрес</th><th scope="col">Вес</th><th scope="col">Объём</th><th scope="col">Этаж</th></tr></thead>' +    
                            '<tbody><tr v-for="(item, deliveryInfoIndex) in deliveriesInfoList">' + 
                                '<td>{{item.number}}</td>' + 
                                '<td>{{item.arrivalTime}}</td>' +
                                '<td>{{item.address}}</td>' + 
                                '<td>{{item.weight}}кг</td>' +
                                '<td>{{item.volume}}м3</td>' +
                                '<td>{{item.floor}}</td>' +
                            '</tr></tbody>' + 
                    '</table>' +
                '</b-modal>' + 
                '<div v-for="(item, index) in routesList" :key=item.index class="card">' + 
                    '<div class="card-body">' + 
                        '<h5 class="mb-0">' +
                        '   <div class=" card-text"><p class="card-text float-left">{{item.name}}</p>' + 
                                '<div class="float-right">' +
                                    '<b-button size="sm" v-on:click="drawRoute(index)" variant="outline-primary" class="btn"><i class="fa fa-location-arrow fa-sm" aria-hidden="true"></i></b-button><br/>' +
                                    '<b-button size="sm" v-on:click="viewRouteInfo(index)" variant="outline-primary" v-b-modal.modalRouteInfo class="btn"><i class="fa fa-info fa-sm" aria-hidden="true"></i></b-button>' +
                                '</div>' +
                            '</div>' +
                        '</h5>' +
                    '</div>' +
                '</div>' + 
              '</div>',
   
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
           this.routesList.push({id: 1, name: 'MARSHRUT1', vehicle: {model: 'Kalina'}, transportcompany: {name: 'TK1'}, 
                routepoints :[
                {id: 1, delivery: {id: 1, city: 'Samara', street: 'street', house: '55', entrance: '2', flat: '33', lon: 53.235087, lat: 50.196801}, arrivalTime: 20 },
                {id: 2, delivery: {id: 2, city: 'Samara', street: 'street', house: '56', entrance: '2', flat: '34', lon: 53.241254, lat: 50.197461}, arrivalTime: 20 },
                {id: 3, delivery: {id: 3, city: 'Samara', street: 'street', house: '57', entrance: '2', flat: '35', lon: 53.250664, lat: 50.214228}, arrivalTime: 20 },
                {id: 4, delivery: {id: 4, city: 'Samara', street: 'street', house: '58', entrance: '2', flat: '36', lon: 53.258511, lat: 50.199428}, arrivalTime: 20 },
                {id: 5, delivery: {id: 5, city: 'Samara', street: 'street', house: '59', entrance: '2', flat: '37', lon: 53.271279, lat: 50.238178}, arrivalTime: 20 }
                ]});
           this.routesList.push({id: 2, name: 'MARSHRUT2', vehicle: {model: 'Priora'}, transportcompany: {name: 'TK2'}, 
                routepoints :[
                {id: 6, delivery: {id: 6, city: 'Moscow', street: 'street', house: '11', entrance: '2', flat: '34', lon: 55.715519, lat: 37.599073}, arrivalTime: 20 },
                {id: 7, delivery: {id: 7, city: 'Moscow', street: 'street', house: '12', entrance: '2', flat: '35', lon: 55.729976, lat: 37.695224}, arrivalTime: 20 },
                {id: 8, delivery: {id: 8, city: 'Moscow', street: 'street', house: '13', entrance: '2', flat: '36', lon: 55.757676, lat: 37.701252}, arrivalTime: 20 },
                {id: 9, delivery: {id: 9, city: 'Moscow', street: 'street', house: '14', entrance: '2', flat: '37', lon: 55.781367, lat: 37.627791}, arrivalTime: 20 },
                {id: 10, delivery: {id: 10, city: 'Moscow', street: 'street', house: '15', entrance: '2', flat: '38', lon: 55.754455, lat: 37.463424}, arrivalTime: 20 }
                ]});
           console.log(this.routesList);
           console.log(this.routesList[0].vehicle.model);
           
//           CDSAPI.RouteService.sendAllRoutes().then (routes => {
//               console.log('CDSAPI send all routes monitoring');
//               this.routesList = routes;
//           });
       },
       
       viewRouteInfo(index) {
           console.log('ITEM VIEW ROUTE INFO: ' + index);
           this.deliveriesInfoList = this.getDeliveriesItemsByDeliveryId(this.routesList[index].routepoints);
           this.vehicleModel = this.routesList[index].vehicle.model;
           this.transportCompanyName = this.routesList[index].transportcompany.name;
           
           
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
               deliveryInfo.volume = 10;
               deliveryInfo.weight = 10;
               deliveryInfo.address = city + ', ' + street + ', ' + house + ', ' + flat;
               deliveryInfo.floor = 10;
               deliveryInfo.number = routePoint.delivery.id;
               deliveryInfo.arrivalTime = routePoint.arrivalTime;
               deliveryInfo.lon = routePoint.delivery.lon;
               deliveryInfo.lat = routePoint.delivery.lat;
               deliveriesInfo.push(deliveryInfo);
//               let deliveryItems = [];
//               CDSAPI.DeliveryService.getItemsForDelivery(routePoint.delivery.id).then(list => {
//                   deliveryItems = list;
//               });
//               let volume = 0; //?
//               let weight = 0;
//               deliveryItems.forEach(deliveryItem, i , diArr) {
//                   weight += deliveryItem.weight;
//               };
//               console.log('TOTAL VOLUME: ' + volume);
//               let deliveryIfo = Object();
//               deliveryInfo.volume = volume;
//               deliveryInfo.weight = weight;
//               deliveryInfo.number = routePoint.delivery.id;
//               deliveryInfo.address = routePoint.delivery.city + ', ' + routePoint.delivery.street + ', ' + routePoint.delivery.house + ', ' + routePoint.delivery.flat;
//               deliveryInfo.floor = routePoint.delivery.entrance;
//               deliveryInfo.arrivalTime = routePoint.arrivalTime;
//               this.deliveriesInfoList.push(deliveryInfo);
//                this.deliveriesInfoList.push({volume: 5, weight: 5, number: routePoint.delivery.id, 
//                address: routePoint.delivery.city + ', ' + routePoint.delivery.street + ', ' + routePoint.delivery.house + ', ' + routePoint.delivery.flat, 
//                floor: 10, arrivalTime: routePoint.arrivalTime});
           });
           return deliveriesInfo;
           
       },
       
       clearName() {
           console.log('CLEAR NAME');
           this.vehicleModel = '';
           this.transportCompanyName = '';
           this.deliveriesInfoList = [];
       }, 
       
       drawRoute(index) {
           console.log('DRAW ROUTE INDEX: ' + index);
           console.log('YMAPS: ' + ymaps);
           myMapMonitoring.geoObjects.removeAll();
           let lineCoordinats = [];
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
   },
   
   created() {
       this.getAllRoutes();
   }
   
   
   
   
   
   
   
});