import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapWithFilter = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [initialCenter] = useState({ lat: 1.2964202165603638, lng: 103.85188293457031 });
  const [initialZoom] = useState(15);
  const filterMenuStyle = {
    backgroundColor: '#f7f7f7',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    marginRight: '20px',
  };

  const filterHeaderStyle = {
    fontSize: '20px',
    marginBottom: '10px',
  };

  const filterOptionStyle = {
    marginBottom: '5px',
  };

  const labelStyle = {
    fontWeight: '500',
    marginLeft: '5px',
    marginRight: '10px',
  };

  const [activeMarker, setActiveMarker] = useState(null);

  const Tooltip = ({ marker }) => {
    const position = marker.position;

    const tooltipStyle = {
      position: 'absolute',
      background: 'white',
      padding: '5px',
      borderRadius: '5px',
      top: '80px',
      left: '10px',
    };

    return (
      <div style={tooltipStyle}>
        {marker.name}
      </div>
    );
  };

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker === activeMarker ? null : marker);
  };

  const handleFilterChange = (filter) => {
    if (Array.isArray(filter)) {
      // For array filters, add each type to the activeFilters
      setActiveFilters((prevFilters) => [...prevFilters, ...filter]);
    }
    else {
      if (activeFilters.includes(filter)) {
        // For a single string filter, remove it from activeFilters
        setActiveFilters(activeFilters.filter((item) => item !== filter));
      } else {
        setActiveFilters([...activeFilters, filter]);
      }
    }
  };

  useEffect(() => {
    // Your marker data goes here
    const markerData = [
      {
        position: [{ lat: 1.286331772, lng: 103.8275508 },
        { lat: 1.312290161236786, lng: 103.90481880983111 },
        { lat: 1.3448050487758139, lng: 103.94926319740844 },
        { lat: 1.3838674835726419, lng: 103.934507293052 },
        { lat: 1.3908422744196434, lng: 103.89714340545356 },
        { lat: 1.3758543300029509, lng: 103.86485611471429 },
        { lat: 1.339159372857266, lng: 103.84112251030635 },
        { lat: 1.3518801781995031, lng: 103.6823442253675 },
        { lat: 1.4176335881739013, lng: 103.75929701060345 },
        { lat: 1.4300734733771143, lng: 103.79355602127745 },
        { lat: 1.4529199130895931, lng: 103.82326715734955 },
        { lat: 1.2767613670863402, lng: 103.82506496180038 },
        { lat: 1.3032421147706623, lng: 103.85421534654236 }],
        name: "3-in-1 Bin", type: ['ICT equipment', 'Batteries', 'Lamps'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/3in10ac5e8784cea41f8a1781468497aa9c1.tmb-thumb36.png" }
      },
      {
        position: [{ lat: 1.283854644, lng: 103.8586749 },
        { lat: 1.321790821531891, lng: 103.84379180580409 },
        { lat: 1.339748105830236, lng: 103.77828353209907 },
        { lat: 1.3249389100901663, lng: 103.89410863712217 },
        { lat: 1.400109239334972, lng: 103.89548350089622 },
        { lat: 1.3245366711485158, lng: 103.84480650573872 },
        { lat: 1.340177141908926, lng: 103.77879851618107 }],
        name: "Counter Collection", type: ['ICT equipment', 'Batteries'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/manned.tmb-thumb36.png" }
      },
      {
        position: [{ lat: 1.304853421, lng: 103.8238835 },
        { lat: 1.342581051639659, lng: 103.79429218037004 },
        { lat: 1.3466629469903602, lng: 103.75564644121395 },
        { lat: 1.3510290482284835, lng: 103.69850633340378 },
        { lat: 1.3131801805303056, lng: 103.76889401477244 },
        { lat: 1.3202554135493936, lng: 103.93675795370218 },
        { lat: 1.2946464494518617, lng: 103.84107584209805 },
        { lat: 1.3256852669826862, lng: 103.81428517786044 },
        { lat: 1.2971049598846294, lng: 103.78417187586894 },
        { lat: 1.3936599371829983, lng: 103.74391167549483 }],
        name: "Battery & Bulb Bin", type: ['Batteries', 'Lamps'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/batterybulb.tmb-thumb36.png" }
      },
      {
        position: { lat: 1.379091351, lng: 103.7728811 }, name: "Battery-only Bin", type: ['Batteries'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/battery9bb6a94ee027494dac3f729c772dcc8a.tmb-thumb36.png" }
      },
      {
        position: { lat: 1.346115482, lng: 103.7201662 }, name: "E-Waste Collection Drive", type: ['Regulated consumer products'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/edrive3b291104da544e2f9f6c5ae1d98fcadf.tmb-thumb36.png" }
      },
      {
        position: { lat: 1.290661046, lng: 103.8068437 }, name: "Non-Regulated E-Waste Bin", type: ['Non-regulated electronics'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/1850.tmb-thumb36.png" }
      },
    ];

    setMarkers(markerData);
    setFilteredMarkers(markerData);
  }, []);

  useEffect(() => {
    // Filter markers based on activeFilters
    const filtered = markers.filter((marker) => {
      if (Array.isArray(marker.type)) {
        // Check if any type is in activeFilters
        return marker.type.some((type) => activeFilters.includes(type));
      } else {
        // For a single type or array of positions, check if it's in activeFilters
        return activeFilters.includes(marker.type) || (
          Array.isArray(marker.position) &&
          marker.position.some((pos) => activeFilters.some((type) => type === marker.type))
        );
      }
    });
    setFilteredMarkers(filtered);

  }, [activeFilters, markers]);

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the user's location
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // Set the map center to the user's location
          if (map) {
            map.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, [map]);


  return (
    <div>
      <div id="filterMenu" style={filterMenuStyle}>
        <div id="filterHeader" style={filterHeaderStyle}>Filter Menu</div>
        <label style={filterOptionStyle}>
          <input
            type="checkbox"
            value="Batteries"
            checked={activeFilters.includes('Batteries')}
            onChange={() => handleFilterChange('Batteries')}
          />
          <span style={labelStyle}>Batteries</span>
        </label>
        <label style={filterOptionStyle}>
          <input
            type="checkbox"
            value="Lamps"
            checked={activeFilters.includes('Lamps')}
            onChange={() => handleFilterChange('Lamps')}
          />
          <span style={labelStyle}>Lamps</span>
        </label>
        <label style={filterOptionStyle}>
          <input
            type="checkbox"
            value="ICT equipment"
            checked={activeFilters.includes('ICT equipment')}
            onChange={() => handleFilterChange('ICT equipment')}
          />
          <span style={labelStyle}>ICT equipment</span>
        </label>
        <label style={filterOptionStyle}>
          <input
            type="checkbox"
            value="Regulated consumer products"
            checked={activeFilters.includes('Regulated consumer products')}
            onChange={() => handleFilterChange('Regulated consumer products')}
          />
          <span style={labelStyle}>Regulated consumer products</span>
        </label>
        <label style={filterOptionStyle}>
          <input
            type="checkbox"
            value="Non-regulated eletronics"
            checked={activeFilters.includes('Non-regulated electronics')}
            onChange={() => handleFilterChange('Non-regulated electronics')}
          />
          <span style={labelStyle}>Non-regulated electronics</span>
        </label>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCaiFYrSvV6tEk9ZqKToEXa2-orShEEuq4">
        <GoogleMap
          mapContainerStyle={{ height: '600px', width: '100%' }}
          center={initialCenter}
          zoom={initialZoom}
          onLoad={(map) => setMap(map)}
          options={{
            restriction: {
              latLngBounds: {
                north: 1.493,
                south: 1.129,
                west: 103.557,
                east: 104.131,
              },
            },
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
            ],
          }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                // You can customize the marker icon here
                scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
              }}
            />
          )}
          {filteredMarkers.map((marker, index) => {
            if (Array.isArray(marker.position)) {
              // Handle array of positions
              return marker.position.map((position, positionIndex) => (
                <Marker
                  key={`${index}-${positionIndex}`}
                  position={position}
                  icon={marker.icon}
                  onClick={() => handleMarkerClick({ position, name: marker.name })}
                />
              ));
            } else {
              // Single position
              return (
                <Marker
                  key={index}
                  position={marker.position}
                  icon={marker.icon}
                  onClick={() => handleMarkerClick({ position: marker.position, name: marker.name })}
                />
              );
            }
          })}
          {activeMarker && <Tooltip marker={activeMarker} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithFilter;