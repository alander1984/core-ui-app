/*globals ymaps */
var Stores = Vue.component ('stores', {
    
    
    template: '<div>'
	+ '<h3>Магазины</h3>'
	+ '<b-modal id="modalAddStore" size="xl" ref="modal_add_store" title="Добавить магазин"  @ok="handleOk" @hide="clearName">'
	+	'<form @submit.stop.prevent="handleSubmit">'
	+		'<b-form-input type="number"  v-model="storeId" style="display: none;"/>'
	+		'<b-form-select :options="storeTypeOptions" v-model="storeType"></b-form-select><br/><br/>'
	+		'<b-form-input type="text" placeholder="Название магазина" v-model="storeName" /><br/>'
	+		'<b-form-input type="text" placeholder="Адрес" v-model="storeAddress" /><br/>'
	+		'<b-form-input type="text" placeholder="Код" v-model="storeCode" /><br/>'
	+		'<b-form-input type="number" placeholder="Долгота" v-model="storeLon" /><br/>'
	+		'<b-form-input type="number" placeholder="Широта" v-model="storeLat" /><br/>'
	+		'<b-form-input type="text" placeholder="Комментарий" v-model="storeComment" /><br/>'
	+       '<div id="addModalMapContainer" @click="setCoords"><div id="YMapsID" style="width:100%;height:300px;"></div></div>'
	+	'</form>'
	+ '</b-modal>'
	+   '<b-modal id="modalConfirmationDeleteStore" ref="modal_confirmation_delete_store" centered title="Подтверждение удаления магазина" @ok="handleDeleteStore" @hide="clearName">'
	+      '<form @submit.stop.prevent="handleSubmitDeleteStore">'
    +           '<p>Подтвердите удаление магазина</p>'
    +       '</form>'
    +   '</b-modal>'

	+ '<b-button id="addStoreButton" variant="primary" v-b-modal.modalAddStore>Добавить</b-button>'
	+ '<br/><br/>'
	
	+ '<table class="table table-hover table-sm table-bordered">'
	+   '<thead><tr><th scope="col">№</th><th scope="col">Тип</th><th scope="col">Название</th><th scope="col">Адрес</th><th scope="col">Код</th><th scope="col">Долгота</th><th scope="col">Широта</th><th scope="col">Комментарий</th><th scope="col"></th><th scope="col"></th></tr></thead>'
	+   '<tbody><tr v-for="(item, index) in storesList" :key=item.index>'
	+		'<th scope="row">{{ index + 1 }}</th>'
	+		'<td>{{item.type}}</td>'
	+		'<td>{{item.name}}</td>'
	+		'<td>{{item.address}}</td>'
	+		'<td>{{item.code}}</td>'
	+		'<td>{{item.lon}}</td>'
	+		'<td>{{item.lat}}</td>'
	+		'<td>{{item.comment}}</td>'
	+		'<td><b-button variant="danger" v-b-modal.modalConfirmationDeleteStore v-on:click="setDeletedStore(index, item)">X</b-button></td>'
	+		'<td><b-button variant="success" v-b-modal.modalAddStore v-on:click="editStore(index)">Изменить</b-button></td>'
	+	'</tr></tbody>'
	+ '</table>'
    + '</div>',
    
    
    data() {
        return {
            storesList: [],
            storeId: 0,
            storeType: 'OFFLINE',
            storeName: '',
            storeAddress: '',
            storeCode: '',
            storeLon: 0,
            storeLat: 0,
            storeComment: '',
            index: Number,
            selectedStoreTypeOption: ['OFFLINE'],
            storeTypeOptions: [
               { value: 'OFFLINE', text: 'Офлайн' },
               { value: 'ONLINE', text: 'Онлайн' }
            ],
            storePlacemark : Object
        };
    },
    methods: {
        deleteStore(index, id) {
            console.log("DELETE STORE")
            CDSAPI.Stores.deleteStoreById(id.toString()).then(response => {
                console.log("DELETE RESPONSE " + response);
            });
            this.storesList.splice(index, 1);
            this.$nextTick(() => {          
              this.$refs.modal_confirmation_delete_store.hide();
            });
        },
        
        editStore(index) {
            this.storeId = this.storesList[index].id;
            this.storeType = this.storesList[index].type;
            this.storeName = this.storesList[index].name;
            this.storeAddress = this.storesList[index].address;
            this.storeCode = this.storesList[index].code;
            this.storeLon = this.storesList[index].lon;
            this.storeLat = this.storesList[index].lat;
            this.storeComment = this.storesList[index].comment;
            this.index = index; 
            
            this.storePlacemark = new ymaps.Placemark([this.storeLon, this.storeLat], {
                        iconCaption: this.storeName,
                        balloonContentHeader : '<a href="#">' + this.storeName + '</a>',
                        balloonContentBody : 'Название магазина: '  + this.storeName +
                            '<br/>Тип магазина: ' + this.storeType + 
                            '<br/>Адрес: ' + this.storeAddress +
                            '<br/>Код магазина: ' + this.storeCode + 
                            '<br/>Примечание: ' + this.storeComment
                    }, {
                        preset: 'islands#nightIcon',
                        draggable: false
                    });
                myMapStores.geoObjects.add(this.storePlacemark);
            
            
            myMapStores.setCenter([this.storeLon, this.storeLat], 15);
        },
        
        handleOk(evt) {
            evt.preventDefault();
            //обработка пустых полей
            this.handleSubmit();
        },
        
        handleSubmit() {
            if(this.storeId == 0) {
                this.addStore();
            } else {
                this.updateStore();
            } 
            this.clearName();
        },
        
        clearName() {
            console.log('CLEAR NAME WITH ID: ' + this.storeId);
                this.storeId = 0;
                this.storeType = 'OFFLINE';
                this.storeName = '';
                this.storeAddress = '';
                this.storeCode = '';
                this.storeLon = 0;
                this.storeLat = 0;
                this.storeComment = '';
                myMapStores.geoObjects.remove(this.storePlacemark);
                myMapStores.geoObjects.remove(clickedPlacemark);
                clickedPlacemark = null;
               
        },
        
        addStore() {
            console.log('###ADD STORE');
            newStore = new Object();
            newStore.type = this.storeType;
            newStore.name = this.storeName;
            newStore.address = this.storeAddress;
            newStore.code = this.storeCode;
            newStore.lon = this.storeLon;
            newStore.lat = this.storeLat;
            newStore.comment = this.storeComment;
            CDSAPI.Stores.createOrUpdateStore(newStore).then(id => {
                console.log("STORE CREATED WITH ID: " + id);
                newStore.id = id.array[0];
                this.storesList.push(newStore);
                this.clearName();
            });
            this.$nextTick(() => {          
              this.$refs.modal_add_store.hide();
            });
            this.clearName();
        },
        
        updateStore() {
            console.log('###UPDATE STORE ' + this.storeId);
            editableStore = new Object();
            editableStore.id = this.storeId;
            editableStore.type = this.storeType;
            editableStore.name = this.storeName;
            editableStore.address = this.storeAddress;
            editableStore.code = this.storeCode;
            editableStore.lon = this.storeLon;
            editableStore.lat = this.storeLat;
            editableStore.comment = this.storeComment;
            Vue.set(this.storesList, this.index, editableStore);
            CDSAPI.Stores.createOrUpdateStore(editableStore).then(id => {
                console.log("STORE UPDATED WITH ID: " + id);
            });
            this.clearName();
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modal_add_store.hide();
            });
        },
       
        getAllStores() {
            console.log("GET ALL STORES!");
            CDSAPI.Stores.getAllStore().then(stores => {
                this.storesList = stores;
//                this.storesList.forEach(function(item, i, sl) {
//                    console.log('COORDS :' + item.lon + ',' + item.lat);
//                    let storePlacemark = new window.ymaps.Placemark([item.lon, item.lat], {
//                         iconCaption : item.name
//                      });
//                      myMapStores.geoObjects.add(storePlacemark);
//                 });
            });
            
        },
        
        setCoords() {
            if(clickedCoords) {
                this.storeLon = clickedCoords[0].toFixed(6);
                this.storeLat = clickedCoords[1].toFixed(6);
            }

        },
        
        handleDeleteStore(evt) {
            evt.preventDefault();
            this.handleSubmitDeleteStore();
        },
        
        handleSubmitDeleteStore() {
            console.log('INDEX: ' + this.index);
            console.log('ID: ' + this.storeId);
            this.deleteStore(this.index, this.storeId);
        },
        
        setDeletedStore(index ,item) {
            console.log('SET DELETED STORE INDEX: ' + index);
            console.log('SET DELETED STORE ID: ' + item.id);
            this.index = index;
            this.storeId = item.id;
        }
    },
    
    created() {
        this.getAllStores();
    }
});



