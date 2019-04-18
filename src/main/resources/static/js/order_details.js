Vue.component('order-details', {
    template:  '<div>' +
                    '<h4>Адресные данные</h4>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="address">Адрес</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="address" v-model="address" type="text"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="metroStation">Станция метро</label>' + 
                         '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="metroStation" type="text" v-model="delivery.metroStation"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="entrance">Подъезд</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="entrance" type="text" v-model="delivery.entrance"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="floor">Этаж</label>' + 
                         '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="floor" type="text" v-model="delivery.floor"/>' +
                          '</b-col>' +
                        '</b-row>' +
                    '<h4>Информация о клиенте</h4>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="fioClient">ФИО клиента</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="fioClient" type="text" v-model="delivery.fullName"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="companyName">Наименование компании</label>' + 
                         '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="companyName" type="text" v-model="delivery.company"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="consignee">Грузополучатели</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="consignee" type="text" v-model="delivery.consignee"/>' +
                          '</b-col>' +
                        '</b-row>' +
                              '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="phones">Телефоны</label>' +
                          '</b-col>' +
                          '<b-col sm="4">' +
                            '<b-form-input id="phones" type="text" v-model="delivery.phone"/>' +
                          '</b-col>' +
                          '<b-col sm="4">' +
                            '<b-form-input id="phonesAdd" type="text" v-model="delivery.phoneSecondary" placeholder="Доп. номер телефона"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="email">E-mail</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="email" type="text" v-model="delivery.email"/>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="commentClient">Комментарии клиента</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-textarea id="commentClient" v-model="delivery.comment"/>' +
                          '</b-col>' +
                        '</b-row>' +
                    '<h4>Ограничения перевозки</h4>' +
                        '<b-row class="my-1">' +
                        '<b-col sm="2">' +
                            '<label for="unloadType">Тип разгрузки</label>' + 
                         '</b-col>' +
                          '<b-col sm="8">' +
                                '<b-form-select id="unloadType" v-model="delivery.unloadType"/>' + 
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="paper">Пропуск</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                            '<b-form-input id="paper" type="text" v-model="delivery.paper"/>' +
                          '</b-col>' +
                        '</b-row>' +
                    '<h4>Ограничения перевозки</h4>' +
                        '<b-row class="my-1">' +
                          '<b-col sm="2">' +
                            '<label for="paymentStatus">Состояние платежа</label>' +
                          '</b-col>' +
                          '<b-col sm="8">' +
                              '<div>' +
                                '<b-button-group>' +
                                  '<b-button variant="outline-secondary">Не оплачен</b-button>' +
                                  '<b-button variant="outline-secondary">Оплачен</b-button>' +
                                  '<b-button variant="outline-secondary">Предоплата</b-button>' +
                                '</b-button-group>' +
                              '</div>' +
                          '</b-col>' +
                        '</b-row>' +
                        '<b-row class="my-1">' +
                             '<b-col sm="7">' +
                             '</b-col>' +
                              '<b-col sm="5">' +
                                    '<div>' +
                                      '<b-button variant="warning">Далее</b-button>' +
                                      '<b-button variant="outline-primary">Сохранить</b-button>' +
                                    '</div>' +
                              '</b-col>' +
                        '</b-row>' + 
               '</div>',
   props: ['delivery'],
   data(){
       return {
           address: this.delivery.street + " д." + this.delivery.house + " кв." + this.delivery.flat
       }
       
   }
   
});