var locations = [
         [{lat: 10.682716795748851, lng: -61.634263777173025}], //
         [{lat: 10.643028974974573, lng: -61.39991522930899}], //
         [{lat: 10.557596334748027, lng: -61.373316914394444}], //
         [{lat: 10.33628956761469, lng: -60.997484418079736}], //
         [{lat: 10.282128818991369, lng: -61.46708001064193}], //
         [{lat: 10.238417795702365, lng: -61.61852558887784}], //
         [{lat: 10.174514222080873, lng: -61.68236069639586}], //
         [{lat: 10.15891357592163, lng: -61.45596156935724}], //
         [{lat: 10.218097373961612, lng: -61.575823790475695}], //
         [{lat: 10.27479893584664, lng: -61.437593548877715}], //
         [{lat: 10.66117163159793, lng: -61.50870416894999}], //
         [{lat: 10.308562323577021, lng: -61.089189471796665}], //
         [{lat: 10.388482454674609, lng: -61.299064609092156}], //
         [{lat: 10.456569301497481, lng: -61.40796723926439}], //
         [{lat: 10.528128254156721, lng: -61.40820427221135}], //
         [{lat: 10.566704327344238, lng: -61.38294025726236}], //
         [{lat: 10.637414075283388, lng: -61.285285014298196}], //
         [{lat: 10.75904419643288, lng: -61.44175492947573}], //
         [{lat: 10.741260343008715, lng: -61.318359593061395}], //
         [{lat: 10.649196125756767, lng: -61.451591356905574}], //
         [{lat: 10.554021487431495, lng: -61.37308244926017}], //
         [{lat: 10.402363094455637, lng: -61.47173732599875}], //
         [{lat: 10.505062867720607, lng: -61.404663974683984}], //
         [{lat: 10.051136956273853, lng: -61.910030215223564}], //

      ]

      let currLoc = locations[Math.floor(Math.random() * (locations.length))]
      let currCoords = currLoc[0]

      points = 0;

      function distance() {
        
        var coords1Lat = marker.position.lat();
        var coords1Lng = marker.position.lng();
        var coords2Lat = currCoords.lat;
        var coords2Lng = currCoords.lng;
        var dist = Math.pow(coords2Lat - coords1Lat, 2) + Math.pow(coords2Lng - coords1Lng, 2);
        dist = (Math.sqrt(dist));
        return dist;
      }

      let panorama;
      function initialize() {
        pointsTotal = document.getElementById("score");
        pointsTotal.innerHTML = "Score: " + points;

          panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: currCoords,
            pov: { heading: 100, pitch: 10 },
            addressControl: false,
            enableCloseButton: false,
            linksControl: false,
            showRoadLabels: false,
            zoomControl: false,
          }
        );

        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 10.459699331252484, lng: -61.248305001604706},
            zoom: 10,
            minZoom: 8,
            mapTypeId: "roadmap",
            mapTypeControl: false,
            streetViewControl: false,

          }
        );
        
        infoCoords = new google.maps.LatLng(10.459699331252484, -61.248305001604706);

        info = new google.maps.InfoWindow({
          position: infoCoords,
          content: "Double click to make a guess!",
        })
        
        info.open(map);
        map.addListener("dblclick", (setMarker) => {

            guess = new google.maps.LatLng(setMarker.latLng.lat(), setMarker.latLng.lng());

            marker = new google.maps.Marker({
              position: setMarker.latLng,

            })

            marker.setMap(map);
            
            
            answer = new google.maps.LatLng(currCoords.lat, currCoords.lng);
            answerMarker = new google.maps.Marker({
              position: answer,

            });

            answerMarker.setMap(map);
           
            dist = 1.0 - distance();

            if (dist <= 0) 
              points += 0;
            else
              points += Math.floor(dist * 50);
            pointsTotal.innerHTML = "Score: " + points;

            line = [guess, answer];

            poly = new google.maps.Polyline({
              path: line,
              geodesic: true,
              strokeColor: "#FFFFFF",
            })

            poly.setMap(map);
            reset();
        });
      }
      
      function gameOver(){
        pointsTotal.innerHTML = "Score: " + points;
        alert("Your final score is " + points);
        points = 0;
        count = -1;
        reset();
      }

      count = 0;
      function reset() {
        count++;
          
        if (count > 2) {
          gameOver();
        }

        setTimeout(function(){
        currLoc = locations[Math.floor(Math.random() * (locations.length))]
        currCoords = currLoc[0]
        initialize();
        }, 2000);  
 }  

  /*  PUT THIS IN HTML FILE
      <div id="pano"></div>
    <div id="map"></div>
    <div id="score"></div>
    <button id="next" onclick="reset()">NEXT</button>

    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASL9aRFVFYXQ-F3PeLpS6bkpQGBQCcBho=&callback=initialize" defer></script> */

/* PUT THIS IN CSS FILE AND EDIT STYLE IF YOU WANT
  html, body {
        height: 100%;
        padding: 0;
        margin: 0;
      }

       #pano {
          float: left;
          width: 100%;
          height: 100%;  
        }

         #pano {
          //filter: invert(1);
        } 
        
        #map {
          position: absolute;
          top: 2%;
          left: 1%;
          z-index: 5;
          padding: 5px;
          border: 5px solid #bbd48f;
          height: 45%;
          width: 30%;
        }

        #score {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 5;
          border: 5px solid salmon;
          height: 10%;
          width: 20%;
          justify-content: center;
          text-align: center;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          font-size: 50px;
          background-color: #bbd48f;
        }

        #next {
          position: fixed;
          top: 50%;
          left: 1%;
          z-index: 5;
          border: 3px solid blanchedalmond;
          height: 3%;
          width: 4%;
          justify-content: center;
          text-align: center;
          font-family: Georgia, 'Times New Roman', Times, serif;
          font-size: 15px;
          background-color: aliceblue;
        }
*/
