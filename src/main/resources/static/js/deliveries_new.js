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
                                    '<i class="fa fa-clipboard-list fa-lg compact_i w-50" style="cursor: pointer; padding-inline-start:10px; padding-inline-end:5px" @click="showItemsForDelivery(item.id)"></i>' +                  
                                '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<div v-if="showInlineItems == true">' +
                            '<h4>Список продуктов</h4>' +
                            '<br /><br />' +
                            '<table class="table table-bordered" style="width: 100%">' +
                                '<tr>' +
                                    '<th>№</th>' +
                                    '<th>Наименование продукта</th>' +
                                    '<th>Вес</th>' +
                                    '<th>Ширина</th>' +
                                    '<th>Высота</th>' +
                                    '<th>Длина</th>' +
                                    '<th>Количество</th>' +
                                '</tr>' +
                                '<tr v-for="(it, index2) in listItems" :key=it.index2 v-bind:style="{color: colorRow}">' +
                                    '<td>{{index2 + 1}}</td>' +
                                    '<td>{{it.productlmname}}</td>' +
                                    '<td>{{it.weight}}</td>' +
                                    '<td>{{it.width}}</td>' +
                                    '<td>{{it.height}}</td>' +
                                    '<td>{{it.length}}</td>' +
                                    '<td>{{it.quantity}}</td>' +
                                    '<td>{{it.quantity}}</td>' +
                                '</tr>' +
                            '</table>' + 
                            '<b-button id="closeShowItems" variant="primary"  @click="closeShowItemsForDelivery()">Close</b-button>' +
                        '</div>' +
               '</div>',
    data(){
            return {
                listDeliveries: [],
                listItems: [],
                selected: [],
                showInlineItems: false,
                colorRow: 'black',
                checked: false,
                weight: ''
                
            }
        },
    created(){
        CDSAPI.Deliveries.sendNewDeliveries().then(deliveries => {
            
                this.listDeliveries = deliveries;
                console.log("Deliveries :  " + this.listDeliveries.length);
            });
    },
    methods: {
        showItemsForDelivery(id){
            //alert("Item " + id);
            CDSAPI.Deliveries.getItemsForDelivery(id).then(items => {
            
                this.listItems = items;
                console.log("Items :  " + this.listItems.length);
            });
        },
        closeShowItemsForDelivery(){
            this.showInlineItems = false;
        },
        check(index){
                //alert("Index: " + index + " Checked " + this.selected);
        }
    }
})