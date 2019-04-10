//Объявлена глобальной для включения автоматического слежения за размером
// контейнера при слайде
var myMapStores, clickedCoords, clickedAddress, clickedPlacemark;

ymaps.ready(function () {
  myMapStores = new ymaps.Map("YMapsID", {
    center: [59.93, 30.31],
    zoom: 10
  });

      
    myMapStores.events.add('click', function(e) {
        clickedCoords = e.get('coords');
        if(clickedPlacemark) {
            clickedPlacemark.geometry.setCoordinates(clickedCoords);
        } else {
            clickedPlacemark = createPlacemark(clickedCoords);
            myMapStores.geoObjects.add(clickedPlacemark);
            clickedPlacemark.events.add('dragend', function() {
                clickedAddress = getAddress(clickedPlacemark.geometry.getCoordinates());
            });
            
        }
       clickedAddress = getAddress(clickedCoords);
        
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
        });
        
        
    }
    
    

});