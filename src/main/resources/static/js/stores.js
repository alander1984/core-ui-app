var Stores = Vue.component ('stores', {
    
    
    template: '<div>'
	+ '<h3>Магазины</h3>'
	+ '<b-modal id="modalAddStore" ref="modal_add_store" title="Добавить магазин"  @ok="handleOk" @shown="clearName">'
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
	+		'<td><b-button variant="danger" v-on:click="deleteStore(index, item)">X</b-button></td>'
	+		'<td><b-button variant="success" v-b-modal.modalAddStore v-on:click="editStore(index)">Изменить</b-button></td>'
	+	'</tr></tbody>'
	+ '</table>'
    + '</div>',
    
    
    data() {
        return {
            storesList: [],
            storeId: 0,
            storeType: '',
            storeName: '',
            storeAddress: '',
            storeCode: '',
            storeLon: 0,
            storeLat: 0,
            storeComment: '',
            index: Number,
            storeTypeOptions: [
               { value: null, text: 'Тип магазина'},
               { value: 'OFFLINE', text: 'Офлайн' },
               { value: 'ONLINE', text: 'Онлайн' }
            ]
        };
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
        
        handleOk(evt) {
            evt.preventDefault();
            //обработка пустых полей
            this.handleSubmit();
        },
        
        handleSubmit() {
            console.log('###B-MODAL:' + this.storeId);
            if(this.storeId == 0) {
                this.addStore();
            } else {
                this.updateStore();
            }            
        },
        
        clearName() {
            console.log("CLEAR NAME ID: " + this.storeId);
            if(this.storeId == 0) {
                this.storeId = 0;
                this.storeType = '';
                this.storeName = '';
                this.storeAddress = '';
                this.storeCode = '';
                this.storeLon = 0;
                this.storeLat = 0;
                this.storeComment = '';
            }   
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
            console.log('add store ' + newStore.lon);
            CDSAPI.Stores.createOrUpdateStore(newStore).then(id => {
                console.log("STORE CREATED WITH ID: " + id);
                newStore.id = id.array[0];
                this.storesList.push(newStore);
                this.clearName();
            });
            this.$nextTick(() => {          
              this.$refs.modal_add_store.hide();
            });
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
            });               
        },
        
        setCoords() {
            this.storeLon = clickedCoords[0];
            this.storeLat = clickedCoords[1];
        }
    },
    
    created() {
        this.getAllStores();
    }
});



