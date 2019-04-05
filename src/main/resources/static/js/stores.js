const stores = Vue.component ('stores', {
    
    
    template: '<div>'
	+ '<h3>Магазины</h3>'
	+ '<b-modal id="modalAddStore" ref="modal_add_store" title="Добавить магазин"  @ok="handleOkAddStore" @shown="clearName">'
	+	'<form @submit.stop.prevent="handleSubmitAddStore">'
	+		'<b-form-input type="text" placeholder="Тип магазина" v-model="storeType" /><br/>'
	+		'<b-form-input type="text" placeholder="Название магазина" v-model="storeName" /><br/>'
	+		'<b-form-input type="text" placeholder="Адрес" v-model="storeAddress" /><br/>'
	+		'<b-form-input type="text" placeholder="Код" v-model="storeCode" /><br/>'
	+		'<b-form-input type="number" placeholder="Долгота" v-model="storeLon" /><br/>'
	+		'<b-form-input type="number" placeholder="Широта" v-model="storeLat" /><br/>'
	+		'<b-form-input type="text" placeholder="Комментарий" v-model="storeComment" /><br/>'
	+	'</form>'
	+ '</b-modal>'
	+ '<b-modal id="modalEditStore" ref="modal_edit_store" title="Редактирование магазина" @ok="handleOkEditStore">'
	+	'<form @submit.stop.prevent="handleSubmitEditStore">'
	+		'<b-form-input type="number"  v-model="storeId" style="display: none;"/><br/>'
	+		'<b-form-input type="text" placeholder="Тип магазина" v-model="storeType" /><br/>'
	+		'<b-form-input type="text" placeholder="Название магазина" v-model="storeName" /><br/>'
	+		'<b-form-input type="text" placeholder="Адрес" v-model="storeAddress" /><br/>'
	+		'<b-form-input type="text" placeholder="Код" v-model="storeCode" /><br/>'
	+		'<b-form-input type="number" placeholder="Долгота" v-model="storeLon" /><br/>'
	+		'<b-form-input type="number" placeholder="Широта" v-model="storeLat" /><br/>'
	+		'<b-form-input type="text" placeholder="Комментарий" v-model="storeComment" /><br/>'
	+   '</form>'
	+   '<section id="map-wrapper" layout:fragment="map-wrapper">'
    +        '<div id="YMapsID" style="width: 100%; height: 100%;"></div>'
    +       '<i id="slide-left" class="fas fa-caret-left fa-3x"></i>'
    +    '</section>'
	+ '</b-modal>'

	+ '<b-button id="addStoreButton" variant="primary" v-b-modal.modalAddStore>Добавить</b-button>'
	+ '<br/>'
	
	+ '<table style="border: 2px solid black; width: 60%;">'
	+   '<tr style="border: 1px solid black;"><td>№</td><td>Тип</td><td>Название</td><td>Адрес</td><td>Код</td><td>Долгота</td><td>Широта</td><td>Комментарий</td><td></td><td></td></tr>'
	+   '<tr v-for="(item, index) in storesList" :key=item.index style="border: 1px solid black;">'
	+		'<td>{{ index + 1 }}</td>'
	+		'<td>{{item.type}}</td>'
	+		'<td>{{item.name}}</td>'
	+		'<td>{{item.address}}</td>'
	+		'<td>{{item.code}}</td>'
	+		'<td>{{item.lon}}</td>'
	+		'<td>{{item.lat}}</td>'
	+		'<td>{{item.comment}}</td>'
	+		'<td><b-button variant="danger" v-on:click="deleteStore(index, item)">X</b-button></td>'
	+		'<td><b-button variant="success" v-b-modal.modalEditStore v-on:click="editStore(index)">Изменить</b-button></td>'
	+	'</tr>'
	+ '</table>'
    + '</div>',
    
    
    data() {
        return {
            storesList: [],
            storeId: Number,
            storeType: '',
            storeName: '',
            storeAddress: '',
            storeCode: '',
            storeLon: Number,
            storeLat: Number,
            storeComment: '',
            index: Number
        }
    },
    
    
    methods: {
        deleteStore(index, item) {
            console.log("DELETE STORE")
            CDSAPI.Stores.deleteStoreById(item.id.toString()).then(response => {
                console.log("DELETE RESPONSE " + response);
            });
            this.storesList.splice(index, 1);
            
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
        },
        handleOkAddStore(evt) {
            evt.preventDefault();
            //обработка пустых полей
            this.handleSubmitAddStore();
        },
        handleSubmitAddStore() {
            console.log("ADD STORE");
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
            });
            this.$nextTick(() => {          
              this.$refs.modal_add_store.hide();
            });          
        },
        clearName() {
            this.type = '';
            this.name = '';
            this.address = '';
            this.code = '';
            this.lon = 0;
            this.lat = 0;
            this.comment = '';
            console.log("!!!!!!!!!!CLEAR NAME");
            
        },
        handleOkEditStore(evt) {
            evt.preventDefault();
            //обработка пустых полей
            this.handleSubmitEditStore();
        },
        handleSubmitEditStore() {
            console.log("EDIT STORE!")
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
            this.$nextTick(() => {
              // Wrapped in $nextTick to ensure DOM is rendered before closing
              this.$refs.modal_edit_store.hide();
            });
        },
        getAllStores() {
            console.log("GET ALL STORES!");
            CDSAPI.Stores.getAllStore().then(stores => {
                this.storesList = stores;
            });
                
        }
         
        
    },
    
    created() {
        this.getAllStores();
    }
});

