//Объявлена глобальной для включения автоматического слежения за размером
// контейнера при слайде

var deliveriesPlacemarks = [];
var routesPlacemarks = [];

ymaps.ready(function () {
  myMap = new ymaps.Map("YMapsID", {
    center: [59.93, 30.31],
    zoom: 10
  });

  // Добавление маркера
  //     var myGeoObject = new ymaps.GeoObject({
  //       geometry: {
  //         type: "Point", // тип геометрии - точка
  //         coordinates: [59.94, 30.32] // координаты точки
  //       }
  //     });
  //
  //     // Размещение геообъекта на карте.
  //     myMap.geoObjects.add(myGeoObject);
  //
  // // Добавление линии
  //     var myPolyline = new ymaps.GeoObject({
  //       geometry: {
  //         type: "LineString",
  //         coordinates: [
  //           [59.91, 30.33],
  //           [59.95, 30.45]
  //         ]
  //       }
  //     });
  //     myMap.geoObjects.add(myPolyline);
  //
  // // Добавление полигона
  //
  //     var myPolygon = new ymaps.Polygon([
  //       [[59.75, 30.50], [59.75, 31.71], [59.70, 31.70]],
  //       [[59.73, 31.58], [59.72, 31.70], [59.70, 31.70]]
  //     ]);
  //     myMap.geoObjects.add(myPolygon);
  //
  //
  // //Добавление balloon popup c заданным содержанием
  //
  //     var placemark = new ymaps.Placemark(myMap.getCenter(), {
  //       // Зададим содержимое заголовка балуна.
  //       balloonContentHeader: '<a href = "#">Рога и копыта</a><br>' +
  //           '<span class="description">Сеть кинотеатров</span>',
  //       // Зададим содержимое основной части балуна.
  //       balloonContentBody: '<br/> ' +
  //           '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
  //           '<b>Ближайшие сеансы</b> <br/> Сеансов нет.',
  //       // Зададим содержимое нижней части балуна.
  //       balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
  //       // Зададим содержимое всплывающей подсказки.
  //       hintContent: 'Рога и копыта'
  //     });
  //     // Добавим метку на карту.
  //     myMap.geoObjects.add(placemark);
  //     // Откроем балун на метке.
  //     //placemark.balloon.open();
      

});