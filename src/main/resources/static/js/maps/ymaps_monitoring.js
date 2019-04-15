//Объявлена глобальной для включения автоматического слежения за размером
// контейнера при слайде
var myMapMonitoring;

ymaps.ready(function () {
  myMapMonitoring = new ymaps.Map("YMapsID", {
    center: [59.93, 30.31],
    zoom: 10
  });
});
  
  