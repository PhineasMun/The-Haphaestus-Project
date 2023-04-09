var slideIndex=1;
showDivs(slideIndex);

function control(n){
  showDivs(slideIndex+=n);
}

function showDivs(n){
  var i;
  var x = document.getElementsByClassName("homeSlides");
  if (n > x.length) {slideIndex = 1}
  for (i = 0; i <x.length;i++){
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

let map;
      function initMap(){
          let tdad = {lat: 10.52299, lng:-61.27558};
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10, 
            center: tdad,
            disableDefaultUI: false,
            zoomControl: false,
            styles: [    
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
      });
            
      addMarker({lat: 10.52299, lng: -61.27558});
      addMarker({lat: 10.66043426739283, lng: -61.51246341723815});
      addMarker({lat: 10.443972705204382, lng: -61.45050099115099});
      addMarker({lat: 10.282112331842258, lng: -61.46359416415093})

      function addMarker(coords){
          let marker = new google.maps.Marker({
            position: coords, 
            map: map
          });
      }
      }
