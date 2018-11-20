var backgroundImage = document.getElementsByClassName('header')[0];
var map;
var infoWindow;
var pos;

     function initMap() {
        // Create the map.
        var pyrmont = {lat: -33.866, lng: 151.196};
        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 17
        });
		infoWindow = new google.maps.InfoWindow;
		if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
			
			 var service = new google.maps.places.PlacesService(map);
        var getNextPage = null;
        var moreButton = document.getElementById('more');
        moreButton.onclick = function() {
          moreButton.disabled = true;
          if (getNextPage) getNextPage();
        };

        // Perform a nearby search.
        service.nearbySearch(
            {location: pos, radius: 500, type: ['store']},
            function(results, status, pagination) {
              if (status !== 'OK') return;

              createMarkers(results);
              moreButton.disabled = !pagination.hasNextPage;
              getNextPage = pagination.hasNextPage && function() {
                pagination.nextPage();
              };
            });
          });
        } 

        // Create the places service.
       
      }

      function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('places');

        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });
			

          var li = document.createElement('li');
		  var p = document.createElement('p')
          li.textContent = place.name;
		  p.textContent = place.vicinity;
          placesList.appendChild(li);
		  placesList.appendChild(p);

          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }
	  
    
     

      
function generateBackground() {
  fetch("https://source.unsplash.com/1600x900/?frustration")
    .then((background) => {
      backgroundImage.setAttribute('style','background-image: url(' + background.url + ');')
      // $("body").css("background-color","yellow");
	 

    })
}


var myInit = {
  method: 'GET',
  headers: {
    'X-Theysaidso-Api-Secret': 'mpXOyYeB88rAr24Lm7pjsQeF'
  }
}


function getTampaWeather() {
    fetch('http://quotes.rest/quote/search?category=inspire&minlength=100&maxlength=300&private=false', myInit).then((response) => {return response.json();
    }).then((data) => {
        console.log(data.contents.quotes);
		
		
	  const displayQuote = document.getElementById('quote');
	  const displayAuthor = document.getElementById('author');
        
	  displayQuote.innerHTML = data.contents.quote;
      displayAuthor.innerHTML = data.contents.author;
        

    })
}



     
 

generateBackground();
getTampaWeather();
