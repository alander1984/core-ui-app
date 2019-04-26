function init1() {
    var myMap = new ymaps.Map("map1", {
        center: [55.73, 37.75],
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем многоугольник без вершин.
    var myPolygon1 = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: "crosshair",
        // Максимально допустимое количество вершин.
        editorMaxPoints: 51,
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Ширина обводки.
        strokeWidth: 5
    });
    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon1);

    // В режиме добавления новых вершин меняем цвет обводки многоугольника.
    var stateMonitor = new ymaps.Monitor(myPolygon1.editor.state);
    stateMonitor.add("drawing", function (newValue) {
        myPolygon1.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
    });

    // Включаем режим редактирования с возможностью добавления новых вершин.
    myPolygon1.editor.startDrawing();
}

Vue.component('delivery-zone', {
    template:
        '<div class="row">' +
        '   <div class="col">' +
        '       ' +
        '   </div>' +
        '   <div id="map1" class="col h-600-px w-600-px"></div>' +
        '</div>',
    data() {
        return {}
    },
    created() {
        ymaps.ready(init1);
    },
    mounted() {
    },
    methods: {}
});