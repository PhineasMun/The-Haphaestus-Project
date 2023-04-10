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

var locations = [
         [{lat: 10.682716795748851, lng: -61.634263777173025}, {area: 'Chaguaramas'}], //
         [{lat: 10.643028974974573, lng: -61.39991522930899}, {area: 'UWI'}], //
         [{lat: 10.557596334748027, lng: -61.373316914394444}, {area: 'Cunupia'}], //
         [{lat: 10.457291721420905, lng:-61.410887875422766}, {area: 'Freeport'}], //a
         [{lat: 10.282128818991369, lng: -61.46708001064193}, {area: 'San Fernando'}], //
         [{lat: 10.238417795702365, lng: -61.61852558887784}, {area: 'La Brea'}], //
         [{lat: 10.174514222080873, lng: -61.68236069639586}, {area: 'Point Fortin'}], //
         [{lat: 10.760456662778234, lng: -61.440619707022684}, {area: 'Maracas'}], //a
         [{lat: 10.58669082131912, lng: -61.13312221327746}, {area: 'Sangre Grande'}], //a
         [{lat: 10.27479893584664, lng: -61.437593548877715}, {area: 'C3'}], //
         [{lat: 10.66117163159793, lng: -61.50870416894999}, {area: 'Port Of Spain'}], //
      ]

      let currLoc = locations[Math.floor(Math.random() * (locations.length))]
      let currCoords = currLoc[0]
      let currArea = currLoc[1].area

      let panorama;
      function initialize() {
          panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: currCoords,
            pov: { heading: 100, pitch: 10 },
            addressControl: false,
            enableCloseButton: false,
            linksControl: false,
            showRoadLabels: false,
          }
        );
      }

      function guess() {
        let guess = window.prompt("What is the name of this area?");

        if (guess.toLowerCase() === currArea.toLocaleLowerCase()) {
          alert("correct");
        }
        else {
          alert(currArea);
        }
      }

  /*  PUT THIS IN HTML FILE
      <div id="pano"></div>
    <div id="panel"><input type="button" value="My guess" onclick="guess()"/></div>

    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASL9aRFVFYXQ-F3PeLpS6bkpQGBQCcBho=&callback=initialize" defer></script> */
