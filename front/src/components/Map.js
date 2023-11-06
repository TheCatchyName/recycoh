import BlogFooter from "./BlogFooter";
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    var markers2 = [
        {
            type: "3-in-1 Bin",
            data: {
                accepted_waste: ["ICT equipment", "Batteries", "Lamps"],
                coordinates: [{ lat: 1.286331772, lng: 103.8275508 }],
                icon: {
                    url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/3in10ac5e8784cea41f8a1781468497aa9c1.tmb-thumb36.png",
                    scale: 0.5
                }
            }
        },
        {
            type: "In-store Counter Collection",
            data: {
                accepted_waste: ["ICT equipment", "Batteries"],
                coordinates: [{ lat: 1.283854644, lng: 103.8586749 }],
                icon: {
                    url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/manned.tmb-thumb36.png",
                    scale: 0.5
                }
            }
        },
        {
            type: "Battery & Bulb Bin",
            data: {
                accepted_waste: ["Batteries", "Lamps"],
                coordinates: [{ lat: 1.304853421, lng: 103.8238835 }],
                icon: {
                    url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/batterybulb.tmb-thumb36.png",
                    scale: 0.5
                }
            }
        },
        {
            type: "Battery-only Bin",
            data: {
                accepted_waste: ["Batteries"],
                coordinates: [{ lat: 1.379091351, lng: 103.7728811 }],
                icon: {
                    url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/battery9bb6a94ee027494dac3f729c772dcc8a.tmb-thumb36.png",
                    scale: 0.5
                }
            }
        },
        {
            type: "E-waste Collection Drive",
            data: {
                accepted_waste: ["<a target='_blank' href='https://sso.agc.gov.sg/SL/RSA2019-S900-2019?DocDate=20191231&ProvIds=Sc1-XX-Sc1-#Sc1-XX-Sc1-'>Regulated consumer products</a>"],
                coordinates: [{ lat: 1.346115482, lng: 103.7201662 }],
                icon: {
                    url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/edrive3b291104da544e2f9f6c5ae1d98fcadf.tmb-thumb36.png",
                    scale: 0.5
                }
            }
        },
        {
            type: "Non-regulated E-waste Bin",
            data: {
                accepted_waste: ["<a target='_blank' href='https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/e-waste-management/where-to-recycle-e-waste#non_regulated_products_metalo'>Non-regulated eletronics</a>"],
                coordinates: [{ lat: 1.290661046, lng: 103.8068437 }],
                icon: {
                    url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/1850.tmb-thumb36.png",
                    scale: 0.5
                }
            }
        }
    ]

    // Iterate through different types of bins
    for (var marker_type of markers2) {
        console.log(marker_type)
        console.log(marker_type.data)
        var marker_list = marker_type.data.coordinates
        var iconimg = marker_type.data.icon

        // Generate markers
        for (var i = 0; i < marker_list.length; i++) {
            var marker = new maps.Marker({
                position: marker_list[i],
                map,
                icon: iconimg,
                accepted_waste: marker_type.data.accepted_waste
            });

            // Write info window content
            var content_string = "<p><h3>" + marker_type.type + "</h3></p>" + "<p>Accepted e-waste:</p><ul>"
            for (i in marker_type.data.accepted_waste) {
                content_string += "<li>" + marker_type.data.accepted_waste[i] + "</li>"
            }
            content_string += "</ul>"
            // Generate info window
            const addInfoWindow = function (marker, message) {
                var infoWindow1 = new maps.InfoWindow({
                    content: message,
                    maxWidth: 250
                });
                marker.addListener('click', function () {
                    infoWindow1.setContent(message);
                    infoWindow1.open(map, marker);
                });
            }
            addInfoWindow(marker, content_string)

        }
    }


    // Generate current position marker
    const currentMark = "You are here!"
    let infoWindow = new maps.InfoWindow();
    const locationButton = document.createElement("button");
    var currentMarker = "";

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    // Creates or updates the marker for current position 
                    if (currentMarker == "") {
                        currentMarker = new maps.Marker({
                            position: pos,
                            map,
                            title: currentMark,
                        })
                    }
                    else {
                        currentMarker.setPosition(pos)
                    }

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    infoWindow.setPosition(map.getCenter());
                    infoWindow.setContent(
                        "Error: The Geolocation service failed."
                    );
                    infoWindow.open(map);
                },
            );
        } else {
            // Browser doesn't support Geolocation
            infoWindow.setPosition(map.getCenter());
            infoWindow.setContent(
                "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        }
    });



};

const Map = () => {
    const defaultProps = {
        center: {
            lat: 1.2964202165603638,
            lng: 103.85188293457031
        },
        zoom: 12,
    };

    return (
        <div style={{ height: '93vh', width: '80%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCaiFYrSvV6tEk9ZqKToEXa2-orShEEuq4" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    restriction: {
                        latLngBounds: {
                            north: 1.493,
                            south: 1.129,
                            west: 103.557,
                            east: 104.131,
                        },
                        strictBounds: true,
                    },
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
            <AnyReactComponent
            text="Filter Menu"
            />
        </div>

    );
};

export default Map;