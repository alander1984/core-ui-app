Vue.component('delivery-details-new', {
    template:  '<div>' +
                    '<div width="100%">' +
                        '<b-button-group>' +
                          '<b-button :pressed="pressed" variant="warning" @click="common()">Общее</b-button>' +
                          '<b-button variant="warning" @click="details()">Детали</b-button>' +
                          '<b-button variant="warning" @click="showItemsForDelivery()">Состав</b-button>' +
                          '<b-button variant="warning" @click="history()">История</b-button>' +
                          '<b-button variant="warning" @click="confirm()">Подтверждение</b-button>' +
                        '</b-button-group>' +
                    '</div><br />' +
                    '<div id="infoDelivery" v-if="showItems == false">' +
                        '<b-row>' +
                          '<b-col lg="6" class="pb-2"><b-button size="sm" variant="success">Статус заказа</b-button></b-col>' +
                          '<b-col lg="6" class="pb-2"><b-button size="sm" variant="warning">Смена статуса</b-button></b-col>' +
                        '</b-row>' +
                        '<h4>{{"Заказ № " + this.delivery.id}}</h4>' +
                        '<hr color="black" size="2">' +
                        '<h6>Детальная информация</h6>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="numberDelivery">Номер  заказа</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="numberDelivery" type="text" v-model="delivery.id" disabled/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="external">Внешний</label>' + 
                         '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="external" type="text" />' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="delret">Тип</label>' + 
                         '</b-col>' +
                          '<b-col sm="4">' +
                            '<div class="mt-3">' +
                                '<b-button-group size="sm" id="delret">' +
                                  '<b-button>Доставка</b-button>' +
                                  '<b-button>Возврат</b-button>' +
                                '</b-button-group>' +
                              '</div>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="timeload">Время погрузки</label>' + 
                         '</b-col>' +
                          '<b-col sm="10">' +
                            '<div class="mt-3">' +
                                '<input id="timeload" data-provide="datepicker" class="datepicker"/><span>{{" "}}</span>' +
                                '<input data-provide="datepicker" class="datepicker"/>' +
                            '</div>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="timedeliv">Время доставки</label>' + 
                         '</b-col>' +
                          '<b-col sm="10">' +
                            '<div class="mt-3">' +
                                '<input id="timedeliv" data-provide="datepicker" class="datepicker"/><span>{{" "}}</span>' +
                                '<input data-provide="datepicker" class="datepicker"/>' +
                              '</div>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="zone">Зона</label>' + 
                         '</b-col>' +
                          '<b-col sm="8">' +
                                '<b-form-select id="zone"/>' + 
                          '</b-col>' +
                        '</b-row>' + 
                    '</div>' +
                    '<div id="infoItems" v-if="showItems == true">' +
                        '<table class="table table-bordered" style="width: 100%">' +
                            '<tr>' +
                                '<th>№ пп.</th>' +
                                '<th>Название</th>' +
                                '<th>Вес</th>' +
                                '<th>Oбъём</th>' +
                                '<th>Количество</th>' +
                            '</tr>' +
                            '<tr v-for="(item, index) in listItems" :key=item.index>' +
                                '<td>{{index + 1}}</td>' +
                                '<td>{{item.productlmname}}</td>' +
                                '<td>{{item.weight}}</td>' +
                                '<td>{{item.volume}}</td>' +
                                '<td>{{item.quantity}}</td>' +
                            '</tr>' +
                        '</table>' + 
                        //'<b-button id="closeShowItems" variant="primary"  @click="closeShowItemsForDelivery()">Close</b-button>' +
                    '</div>' +
               '</div>',
    props: ['delivery'],
    data(){
            return {
                listItems: [],
                pressed: true,
                showItems: true,
                item: {},
                indexItem: 0,
                listItemsLength: 0
                
            }
        },
    created(){
        console.log("DETAILS FOR ID " + this.delivery.id);
    },
    mounted() {
        Event.$on('showDelivery', (id) => {
            this.showItemsForDelivery(id);
            this.$forceUpdate();
        })
    },
    methods: {
        forceRerender() {
        // Remove my-component from the DOM
            this.renderComponent = false;
        
            this.$nextTick(() => {
          // Add the component back in
              this.renderComponent = true;
            });
        },
        showItemsForDelivery(id){
            this.pressed = false;
            this.showItems = true;
            CDSAPI.Deliveries.getItemsForDelivery(id).then(items => {
            
                this.listItems = items;
                this.listItemsLength = this.listItems.length;
                console.log("Items :  " + this.listItemsLength);
               // if (this.listItemsLength != 0){
               //     this.item = this.listItems[this.indexItem];
               // }
            });
        },
        common(){
            this.pressed = true;
            this.showItems = false;
        },
        details(){
            this.pressed = false;
        },
        history(){
            this.pressed = false;
        },
        confirm(){
            this.pressed = false;
        },
        closeShowItemsForDelivery(){
            this.showItems = false;
        },
        nextItemShow(){
            if(this.indexItem + 1 < this.listItemsLength){
                this.indexItem++;
                this.item = this.listItems[this.indexItem];
            }
        }
    }
})
/* 15-я стр pdf
 
 '<h4>Продукт {{this.indexItem + 1}}</h4>' +
                            '<b-row class="my-1">' +
                                  '<b-col sm="2">' +
                                    '<label for="itemProductlmname">Наименование</label>' +
                                  '</b-col>' +
                                  '<b-col sm="8">' +
                                    '<b-form-input id="itemProductlmname" type="text" v-model="item.productlmname"/>' +
                                  '</b-col>' +
                            '</b-row>' +
                            '<b-row class="my-1">' +
                                  '<b-col sm="2">' +
                                    '<label for="itemQuantity">Количество</label>' + 
                                  '</b-col>' +
                                  '<b-col sm="8">' +
                                    '<b-form-input id="itemQuantity" type="text" v-model="item.quantity"/>' +
                                  '</b-col>' +
                            '</b-row>' +
                            '<b-row class="my-1">' +
                                  '<b-col sm="2">' +
                                    '<label for="vendorCode">Количество</label>' + 
                                  '</b-col>' +
                                  '<b-col sm="8">' +
                                    '<b-form-input id="vendorCode" type="text"/>' +
                                  '</b-col>' +
                            '</b-row>' +
                            '<h4>Дополнительно</h4>' +
                            '<b-row class="my-1">' +
                                  '<b-col sm="2">' +
                                    '<label for="itemWeight">Вес</label>' +
                                  '</b-col>' +
                                  '<b-col sm="8">' +
                                    '<b-form-input id="itemWeight" type="text" v-model="item.weight"/>' +
                                  '</b-col>' +
                            '</b-row>' +
                            '<b-row class="my-1">' +
                                  '<b-col sm="2">' +
                                    '<label for="itemPrice">Цена</label>' + 
                                  '</b-col>' +
                                  '<b-col sm="8">' +
                                    '<b-form-input id="itemPrice" type="text"/>' +
                                  '</b-col>' +
                            '</b-row>' +
                            
                        '<b-row class="my-1">' +
                             '<b-col sm="7">' +
                             '</b-col>' +
                              '<b-col sm="5">' +
                                    '<div>' +
                                      '<b-button variant="warning" @click="nextItemShow()" :disabled="indexItem + 1 == listItemsLength">Далее</b-button>' +
                                      '<b-button variant="outline-primary">Сохранить</b-button>' +
                                    '</div>' +
                              '</b-col>' +
                        '</b-row>' + 
 
 */

/*
  
 '<table class="table table-bordered" style="width: 100%">' +
                            '<tr>' +
                                '<th>№ пп.</th>' +
                                '<th>Название</th>' +
                                '<th>Вес</th>' +
                                '<th>Oбъём</th>' +
                                '<th>Количество</th>' +
                            '</tr>' +
                            '<tr v-for="(item, index) in listItems" :key=item.index>' +
                                '<td>{{index + 1}}</td>' +
                                '<td>{{item.productlmname}}</td>' +
                                '<td>{{item.weight}}</td>' +
                                '<td>{{item.volume}}</td>' +
                                '<td>{{item.quantity}}</td>' +
                            '</tr>' +
                        '</table>' + 
                        '<b-button id="closeShowItems" variant="primary"  @click="closeShowItemsForDelivery()">Close</b-button>' +
 */