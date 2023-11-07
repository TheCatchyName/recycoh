import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapWithFilter = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
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
      { position: { lat: 1.286331772, lng: 103.8275508 }, type: ['ICT equipment', 'Batteries', 'Lamps'], icon: {url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/3in10ac5e8784cea41f8a1781468497aa9c1.tmb-thumb36.png"} 
        },
      { position: { lat: 1.283854644, lng: 103.8586749 }, type: ['ICT equipment', 'Batteries'], icon: {url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/manned.tmb-thumb36.png"}
      },
      { position: { lat: 1.304853421, lng: 103.8238835 }, type: ['Batteries', 'Lamps'], icon: {url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/batterybulb.tmb-thumb36.png"}
      },
      { position: { lat: 1.379091351, lng: 103.7728811 }, type: ['Batteries'], icon: {url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/battery9bb6a94ee027494dac3f729c772dcc8a.tmb-thumb36.png"}
      },
      { position: { lat: 1.346115482, lng: 103.7201662 }, type: ['Regulated consumer products'], icon: {url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/edrive3b291104da544e2f9f6c5ae1d98fcadf.tmb-thumb36.png"}
      },
      { position: { lat: 1.290661046, lng: 103.8068437 }, type: ['Non-regulated electronics'], icon: {url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/1850.tmb-thumb36.png"}
      },
      // Add more markers with positions and types
    ];

    setMarkers(markerData);
    setFilteredMarkers(markerData);
  }, []);

  useEffect(() => {
    // Filter markers based on activeFilters
    const filtered = markers.filter((marker) => {
      // If the marker has an array of types, check if any type is in activeFilters
      if (Array.isArray(marker.type)) {
        return marker.type.some((type) => activeFilters.includes(type));
      }
      // For a single type, check if it's in activeFilters
      return activeFilters.includes(marker.type);
    });
    setFilteredMarkers(filtered);
    if (map) {
      map.fitBounds(
        new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(1.493, 103.557),
          new window.google.maps.LatLng(1.129, 104.131)
        )
      );
      map.center = {userLocation}
      map.zoom = 12
    }

  }, [activeFilters, markers]);

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

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
          <span style={labelStyle}>Non-regulated eletronics</span>
        </label>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCaiFYrSvV6tEk9ZqKToEXa2-orShEEuq4">
        <GoogleMap
          mapContainerStyle={{ height: '600px', width: '100%' }}
          center={{ lat: 1.2964202165603638, lng: 103.85188293457031 }}
          zoom={15}
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
          {filteredMarkers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={marker.icon} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithFilter;