Vue.component('deliveries-new', {
    template:  '<div>' +
                        '<table class="table table-bordered" style="width: 100%">' +
                            '<tr bgcolor="gray">' +
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
                            '<tr v-for="(item, index) in listDeliveries" :key=item.index>' +
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
        }
    }
})