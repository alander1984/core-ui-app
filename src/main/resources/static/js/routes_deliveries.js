var routesdeliveries = Vue.component('routesdeliveries', {
    
    //v-sortable:route.routepoints
    template : 
    
    '<div>' +
        '<b-row class="mt-1 mb-1"><b-button size="sm" variant="success" class="mr-3 ml-3" @click="deleteDeliveries()">Удалить из маршрута</b-button></b-row>' +
        '<table id="routes_deliveries_table"  class="table table-lm" style="width: 100%;">' + 
            '<thead><th><input type="checkbox" disabled/></th><th scope="col">№</th><th scope="col">Адрес</th><th scope="col">Вес(кг)</th><th scope="col">Объём(м3)</th><th scope="col">ТК</th><th scope="col">Район</th><th scope="col">Маршрут</th><th scope="col"></th></thead>' + 
            '<tbody v-sortable:routepoints>' + 
            // '<tbody>' + 
                '<tr  draggable="true" v-on:dragstart="dragstart(item, $event, index)" v-on:dragend="dragend(item, $event, index)" v-for="(item, index) in routepoints" :key = item.index>' + 
                    '<td><input type="checkbox" id="checkbox2"/></td>' +
                    '<td>{{item.delivery.id}} </td>' + 
                    '<td>{{item.delivery.street + " " + item.delivery.house + " " + item.delivery.flat}}</td>' + 
                    '<td>Вес</td>' + 
                    '<td>Объём</td>' + 
                    '<td>{{route.transportcompany.name}}</td>' + 
                    '<td>{{item.delivery.zone}}</td>' + 
                    '<td>{{route.vehicle.model}} - {{route.vehicle.registrationNumber}}</td>' +
                    '<td><i class="fa fa-clipboard-list fa-lg compact_i w-50" @click="showDetailsForDelivery(item)" style="cursor: pointer; padding-inline-start:10px; padding-inline-end:5px"></i></td>' +
                '</tr>' + 
            '</tbody>' + 
        '</table>' +
    '</div>'
    
    ,data() {
        return {
            deliveriesList : [],
            route : {},
            storeId : 0,
            checked : false,
            delivery : {},
            deliveriesCoordinates : [],
            routepoints : []
        };
    },
    
    methods: {
        showDetailsForDelivery(item){
            this.delivery = item.delivery;
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
        
        deleteDeliveries() {
            console.log('DELETE DELIVERIES');
        },
        
        drawDeliveries(routepoints) {
            console.log('DRAW DELIVERIES ON MAP');
            deliveriesPlacemarks.forEach( function(gp, i, arr) {
                myMap.geoObjects.remove(gp);
            });
            deliveriesPlacemarks = [];
            myMap.setCenter([routepoints[0].delivery.lon, routepoints[0].delivery.lat]);
            routepoints.forEach(function(rp, i, arr) {
                
                let deliveryPlacemark = new ymaps.Placemark([rp.delivery.lon, rp.delivery.lat], 
                            { iconCaption: 'dlvr' },
                            { preset: 'islands#blueDeliveryIcon', draggable: false });
                deliveriesPlacemarks.push(deliveryPlacemark);
                myMap.geoObjects.add(deliveryPlacemark);
                
            } );
            
            
            
            
            
        },
        
        dragstart: function(item, e, index) {
            console.log('DRAGSTART');
            $('#routes_deliveries_table tr').each(function(){
                 
                 var tdcontent=$(this).text(); //get content
                  
                 console.log('content='+tdcontent);  
            }) ;
            e.target.style.backgroundColor = "#3ddb4a";
            console.log(this.routepoints);
        },
        
        dragend: function(item, e, index) {
            e.target.style.backgroundColor = "";
            let deliveriesIdList = []
            console.log('DRAGEND');
            $('#routes_deliveries_table tr').each(function(){
                var tdcontent=$(this).text(); //get content
                let properties = tdcontent.split(' ');
                deliveriesIdList.push(properties[0]);   
                
            });
            
            let rPoints = this.routepoints;
            deliveriesIdList.forEach(function(item, i, arr) {
                let rp = rPoints.filter(obj => {
                    return obj.delivery.id === Number(item);
                    
                })
                console.log('RRRRPPPP');
                console.log(rp);
                rp[0].pos = i + 1;
            });
            
            console.log('AFTER CHANGING POSITIONS');
            console.log(this.routepoints);
            console.log(this.route.routepoints);
            CDSAPI.RouteService.createOrUpdateRoute(this.route).then( id => {
                console.log("ROUTES-DELIVERIES COMPONENT ROUTE UPDATED WITH ID = " + id);
            });
            
            
        }
    },
    
    
    
    mounted() {
        Event.$on('changeRoute', (tmp) => {
            this.route = tmp.route;
            this.routepoints = tmp.route.routepoints;
            console.log(this.route);
            this.selectedStoreId = tmp.storeId;
            this.deliveriesCoordinates = [];
            if(tmp.route.routepoints !== undefined) {
                this.drawDeliveries(tmp.route.routepoints);
            }
//            $('tbody').sortable( {
//                sort: function(e, item) {
//                    
//                },
//                update: function(e, item) {
//                    console.log('ON UPDATE');
//                    console.log(e);
//                    console.log(item);
//                    app1.$refs.rd.helloW();
//                }
//            });
            console.log('MOUNTED_ROUTE_POINTS');
            this.routepoints.forEach(function(rp, i ,arr) {
                console.log('ID: ' + rp.id + ' STREET' + rp.delivery.street);
            });
            console.log('MOUNTED_ROUTE_POINTS');
        })
    },
    
   
    
    created() {
        console.log('ROUTES-DELIVERY COMPONENT CREATED');
    }
    
    
});

 

