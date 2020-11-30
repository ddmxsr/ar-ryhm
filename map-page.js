let map;
let infoWindow;

// Hiljem on mõttekas XMLRequestiga asendada - hetkel las jääda nii
var json = JSON.parse(`
    {
        "spots": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        58.375443,
                        26.771305
                    ]
                },
                "properties": {
                    "name": "Annelinna's Parkour Park",
                    "description": "Tartu's first official parkour park, offers a lot of different exercise opportunities and typically has a few people there already practising.",
                    "imageUrl": "https://lh3.googleusercontent.com/AgxpK7DHa3qbVoc85poyl_rhX6W6WphXO8YkS2MKg8RKDhkWZbR8i6ceyrw967ih-89PTwb3m0Ey_G6xlryC_JrEXTwA5UrKLyV-MuxQEZZJ__cxwzQjBhaIYru_IObHFd5aY6Vkxw=w2400"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        58.373833,
                        26.758389
                    ]
                },
                "properties": {
                    "name": "Underground parking lot at Anne 59a",
                    "description": "The top of an underground parking lot, is great for a flat stone ground, opportunities to wall run, precision jump and test height drops (DON'T DROP FROM HEIGHTS BEFORE YOU ARE READY!)",
                    "imageUrl": "https://lh3.googleusercontent.com/Wc67TJjmfdal-varphb_1rdMHz0laQBt97kxwrxy2IAQuUp5PWQbWd3F6u4UXsTSGMJ7y6fFxZb2Barwb2z9ZU9YA2TuqGLPYiI2WhpDsi4SgPyNg9OkQ_OUHxiGMPb4yOaKtPTx1A=w2400"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        58.373196,
                        26.72589
                    ]
                },
                "properties": {
                    "name": "PRIA's staircase",
                    "description": "The staircase leading down to PRIA's parking lot is a great place for coming up with your own tricks (be sure to try a turn vault), and the walls surrounding the parking lot itself are great for wall runs at different wall heights.",
                    "imageUrl": "https://lh3.googleusercontent.com/qrYj7sN20OWchcf8rVEkHpQKAv1I3skjixogVXkVMchzXVXm3BvipRhGHgDJ1daW7BeI_ZfkL56daYFgAHMrF5tFkQ5T_r6zHz9uKP2X3p66D6A3xTbzQZhaX59WHXq0HuuOTKSDzg=w2400"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        58.375584,
                        26.724028
                    ]
                },
                "properties": {
                    "name": "Area behind the bigger house of Vanemuise",
                    "description": "A staircase leading up from an alley sounds like a perfect place for parkour, and it is, it holds a great place to practise the wall run, with railings for vaults and more.",
                    "imageUrl": "https://lh3.googleusercontent.com/0qfWPqI5HciWw1_I3Tc6lOdGK71PaewjYQlXdpIgerLFwpG-Zpk0GBTMS9z8iRSZ3UzlmOXVqASl-l_54tIuMu7-X42fqCy3lDcGc9TtjPZ8MSwyV4fX_8N7nsslA-K8WifxDVofkQ=w2400"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        58.364223,
                        26.688528
                    ]
                },
                "properties": {
                    "name": "Tartu Tamme Gymnasium",
                    "description": "Tartu Tamme Gymnasium's courtyard offers great opportunities for exercises on railings, from precision jumps to general balance.",
                    "imageUrl": "https://lh3.googleusercontent.com/9oyUFhqslGhAmvq1YOiwGaSDQU1_nd7IltoRjb6CTMV-Fjy7nqmx86VgQM13oznWNI57XO0s6psfBmntLjwmBwrm4ynUd4eiSGMoQD_HcBgP5lfQXRfN5xrwgzbXgp6UlkJ6YDu11A=w2400"
                }
            }
        ]
    }
    `);

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(58.378025, 26.728493),
        zoom: 14,
    };

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    loadMarkers();
    //     $.each(json, function (key, data) {
    //         var icon = data.properties.imageUrl;

    //         var latLng = new google.maps.LatLng(data.geometry.coordinates[0], data.geometry.coordinates[1]);

    //         var marker = new google.maps.Marker({
    //             position: latLng,
    //             map: map,
    //             icon: icon,
    //             title: data.title
    //         });

    //         var details = data.properties.description;

    //         bindInfoWindow(marker, map, infowindow, details);

    //     });
    //     google.maps.event.addDomListener(window, 'load', initMap);

    // }
}

function loadMarkers() {

    for (var i = 0, length = json.spots.length; i < length; i++) {
        var data = json.spots[i];
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.geometry.coordinates[0], data.geometry.coordinates[1]),
            map: map,
            title: data.properties.name
        });

        bindInfoWindow(marker, '<b style = "font-size:25px">'+ data.properties.name +"</b></br>" + data.properties.description + "</br>" + "<img height = 350px width = auto src =" + data.properties.imageUrl +">");
        marker.setMap(map);
    }
}

function bindInfoWindow(marker, strDescription) {
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(strDescription);
        infowindow.open(map, marker);
    });
}
