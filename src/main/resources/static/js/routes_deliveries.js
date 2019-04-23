var routesdeliveries = Vue.component('routesdeliveries', {
    
    
    template : 
    
    '<div>' +
        '<b-row class="mt-1 mb-1"><b-button size="sm" variant="success" class="mr-3 ml-3" @click="deleteDeliveries()">Удалить из маршрута</b-button></b-row>' +
        '<table id="sortable" class="table table-hover table-sm table-bordered" style="width: 100%;">' + 
            '<thead><tr><th><input type="checkbox" disabled/></th><th scope="col">№</th><th scope="col">Адрес</th><th scope="col">Вес(кг)</th><th scope="col">Объём(м3)</th><th scope="col">ТК</th><th scope="col">Район</th><th scope="col">Маршрут</th><th scope="col"></th></tr></thead>' + 
            '<tbody>' + 
                '<tr v-for="(item, index) in route.routepoints" :key = item.index>' + 
                    '<td><input type="checkbox" id="checkbox2"/></td>' +
                    '<td>{{item.delivery.id}}</td>' + 
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
            deliveriesCoordinates : []
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
            
            
            
        }
    },
    
    mounted() {
        Event.$on('changeRoute', (tmp) => {
            console.log("In changeRoute event ");
            this.route = tmp.route;
            console.log(this.route);
            this.selectedStoreId = tmp.storeId;
            this.deliveriesCoordinates = [];
            if(tmp.route.routepoints !== undefined) {
                this.drawDeliveries(tmp.route.routepoints);
            }
            
            
        })
    },
    
    created() {
        console.log('ROUTES-DELIVERY COMPONENT CREATED');
    }
    
    
});

$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );