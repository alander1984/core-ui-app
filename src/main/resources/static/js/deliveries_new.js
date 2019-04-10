Vue.component('deliveries-new', {
    template:  '<div>' +
                    '<h3>Новая доставка</h3>' +
                    '<br /><br />' +
                        '<table class="table table-bordered" style="width: 100%">' +
                            '<tr>' +
                                '<th>№</th>' +
                                '<th>Временное окно</th>' +
                                '<th>Дата создания</th>' +
                                '<th>Клиент</th>' +
                                '<th>Адрес</th>' +
                                '<th>Заказы</th>' +
                                '<th>Отметить</th>' +
                            '</tr>' +
                            '<tr v-for="(item, index) in listDeliveries" :key=item.index >' +
                                '<td>{{ index + 1 }}</td>' +
                                //'<td width=10% style="color: red; text-align: center;">{{item.id}}</td>' +
                                '<td>{{item.timeWindow}}</td>' +
                                '<td>{{item.createdDate}}</td>' +
                                '<td>{{item.createUserName}}</td>' +
                                '<td>{{item.street + " " + item.house + " " + item.flat}}</td>' +
                                '<td>' +
                                    '<b-button id="showItems" variant="primary"  @click="showItemsForDelivery(item.id)">Показать перечень продуктов</b-button>' +
                                         
                                '</td>' +
                                '<td>' +
                                    '<input type="checkbox" id="checkbox1" v-model="selected[index]" v-on:change="check(index)" unchecked-value="not_accepted"/>' +
                                '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<div v-if="showItems == true">' +
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
                                '<tr v-for="(it, index2) in listItems" :key=it.index2 >' +
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
                showItems: false,
                color: 'black',
                checked: false
                
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
            this.showItems = true;
            //alert("Item " + id);
            CDSAPI.Deliveries.getItemsForDelivery(id).then(items => {
            
                this.listItems = items;
                console.log("Items :  " + this.listItems.length);
            });
        },
        closeShowItemsForDelivery(){
            this.showItems = false;
        },
        check(index){
                //alert("Index: " + index + " Checked " + this.selected);
        }
    }
})