//Объявлена глобальной для включения автоматического слежения за размером
// контейнера при слайде
var myMap, clickedCoords, clickedAddress;

ymaps.ready(function () {
  let clickedPlacemark;
  myMap = new ymaps.Map("YMapsID", {
    center: [59.93, 30.31],
    zoom: 10
  });

  // Добавление маркера
      var myGeoObject = new ymaps.GeoObject({
        geometry: {
          type: "Point", // тип геометрии - точка
          coordinates: [59.94, 30.32] // координаты точки
        }
      });

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myGeoObject);

  // Добавление линии
      var myPolyline = new ymaps.GeoObject({
        geometry: {
          type: "LineString",
          coordinates: [
            [59.91, 30.33],
            [59.95, 30.45]
          ]
        }
      });
      myMap.geoObjects.add(myPolyline);

  // Добавление полигона

      var myPolygon = new ymaps.Polygon([
        [[59.75, 30.50], [59.75, 31.71], [59.70, 31.70]],
        [[59.73, 31.58], [59.72, 31.70], [59.70, 31.70]]
      ]);
      myMap.geoObjects.add(myPolygon);


  //Добавление balloon popup c заданным содержанием

      var placemark = new ymaps.Placemark(myMap.getCenter(), {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader: '<a href = "#">Рога и копыта</a><br>' +
            '<span class="description">Сеть кинотеатров</span>',
        // Зададим содержимое основной части балуна.
        balloonContentBody: '<br/> ' +
            '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
            '<b>Ближайшие сеансы</b> <br/> Сеансов нет.',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
        // Зададим содержимое всплывающей подсказки.
        hintContent: 'Рога и копыта'
      });
      // Добавим метку на карту.
      myMap.geoObjects.add(placemark);
      // Откроем балун на метке.
      placemark.balloon.open();
      
    myMap.events.add('click', function(e) {
        clickedCoords = e.get('coords');
        if(clickedPlacemark) {
            clickedPlacemark.geometry.setCoordinates(clickedCoords);
        } else {
            clickedPlacemark = createPlacemark(clickedCoords);
            myMap.geoObjects.add(clickedPlacemark);
            clickedPlacemark.events.add('dragend', function() {
                getAddress(clickedPlacemark.geometry.getCoordinates());
            });
            
        }
       getAddress(clickedCoords);
        
    });    
    
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }
    
    function getAddress(coords) {
        clickedPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            clickedPlacemark.properties
                .set({
                    iconCaption: [
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    balloonContent: firstGeoObject.getAddressLine()
                });
                clickedAddress = firstGeoObject.getAddressLine();
        });
        
        
    }

});