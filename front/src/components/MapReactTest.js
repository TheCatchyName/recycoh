import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapReactTest = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [initialCenter] = useState({ lat: 1.2964202165603638, lng: 103.85188293457031 });
  const [initialZoom] = useState(15);
  const pageStyle = {
    backgroundColor: 'green'
  }
  const filterMenuStyle = {
    backgroundColor: 'green',
    padding: '10px',
    border: '1px solid #ccc',
    borderColor: 'green',
    color: 'white',
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
    const acceptedWaste = marker.type;
  
    const tooltipStyle = {
      position: 'absolute',
      background: 'white',
      padding: '5px',
      borderRadius: '5px',
      top: '80px',
      left: '10px',
      width: '200px', // Fixed width for consistency
      textAlign: 'left', // Left-align text
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      zIndex: 999, // Ensure the tooltip is above other elements
    };
  
    return (
      <div style={tooltipStyle}>
        <b>{marker.name}</b>
        <br></br><br></br>
        <b>Accepted Waste:</b>
        {acceptedWaste.length > 0 && (
          <ul>
            {acceptedWaste.map((waste, index) => (
              <li key={index}>{waste}</li>
            ))}
          </ul>
        )}
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
        position: [{ lat: 1.379091351, lng: 103.7728811 },
        { lat: 1.3386953096708119, lng: 103.6777614102782 },
        { lat: 1.3656713226433657, lng: 103.76629557309047 },
        { lat: 1.3329538706345716, lng: 103.90209367595459 },
        { lat: 1.3697464813698566, lng: 103.93781840621934 },
        { lat: 1.3605176234002316, lng: 103.98471658479635 },
        { lat: 1.3908731025517127, lng: 103.86963174803749 },
        { lat: 1.3495539517769997, lng: 103.77518234154424 },
        { lat: 1.3418903475430883, lng: 103.73589455457935 },
        { lat: 1.3849850529217018, lng: 103.73764316770892 },
        { lat: 1.2864280944626334, lng: 103.84518654985011 },
        { lat: 1.3015448380906685, lng: 103.863629732283 },
        { lat: 1.304929469975929, lng: 103.83403623884702 },
        { lat: 1.2941403299553784, lng: 103.85678953339759 },
        { lat: 1.3056592410537105, lng: 103.88229695500772 },
        { lat: 1.3128165988254057, lng: 103.90191847831191 },
        { lat: 1.3259053959383822, lng: 103.92423966074838 },
        { lat: 1.4362791860657502, lng: 103.79367580198402 },
        { lat: 1.4213599379687483, lng: 103.83347120559105 },
        { lat: 1.2653155662574533, lng: 103.8203383849596 }],
        name: "Battery-only Bin", type: ['Batteries'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/battery9bb6a94ee027494dac3f729c772dcc8a.tmb-thumb36.png" }
      },
      {
        position: [{ lat: 1.346115482, lng: 103.7201662 },
        { lat: 1.3141471946460848, lng: 103.85083975007579 },
        { lat: 1.317015944905543, lng: 103.85994339900608 },
        { lat: 1.3185426101759352, lng: 103.87946433333023 },
        { lat: 1.317634537343915, lng: 103.87960280946754 },
        { lat: 1.3274408895460936, lng: 103.92214620185256 },
        { lat: 1.3521848842450543, lng: 103.88046322299385 },
        { lat: 1.3443904996326967, lng: 103.8552130369349 },
        { lat: 1.297928884148601, lng: 103.8115631642321 },
        { lat: 1.3080237088561524, lng: 103.76233601446387 },
        { lat: 1.284348412200791, lng: 103.8111066459818 },
        { lat: 1.2832813878315894, lng: 103.82574497144715 },
        { lat: 1.286895138737623, lng: 103.83809333374639 },
        { lat: 1.353980086024887, lng: 103.72487843545089 },
        { lat: 1.3825219553652288, lng: 103.74607545891602 },
        { lat: 1.3954104378804562, lng: 103.7701927368518 },
        { lat: 1.3862042052062766, lng: 103.76661606409631 },
        { lat: 1.3430660470097475, lng: 103.7383023910668 },
        { lat: 1.3604029320534872, lng: 103.69208586531053 },
        { lat: 1.437866814082076, lng: 103.78177461910043 },
        { lat: 1.44068674215011, lng: 103.80007796225478 },
        { lat: 1.4422234189868959, lng: 103.83769492992181 },
        { lat: 1.4278536117970555, lng: 103.83516684364207 },
        { lat: 1.4340046570743594, lng: 103.84971563959415 },
        { lat: 1.3953456002123006, lng: 103.87100503902869 },
        { lat: 1.3980079065834583, lng: 103.89529567529165 },
        { lat: 1.360000868752651, lng: 103.94512255619247 },
        { lat: 1.307220577388897, lng: 103.91476445578849 }],
        name: "E-Waste Collection Drive", type: ['Regulated consumer products'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/edrive3b291104da544e2f9f6c5ae1d98fcadf.tmb-thumb36.png" }
      },
      {
        position: [{ lat: 1.290661046, lng: 103.8068437 },
        { lat: 1.3187838131613638, lng: 103.92623588746011 },
        { lat: 1.3344067889319815, lng: 103.88876149160501 },
        { lat: 1.3659019356534816, lng: 103.86768933738864 },
        { lat: 1.2903310863999533, lng: 103.81982886328278 },
        { lat: 1.310422289827546, lng: 103.78556794981549 },
        { lat: 1.3156858711003216, lng: 103.92634128585794 },
        { lat: 1.4490975372690453, lng: 103.78960892857249 },
        { lat: 1.4442286033216312, lng: 103.77469954636365 },
        { lat: 1.3707384061958603, lng: 103.844225864698 },
        { lat: 1.3555407784911155, lng: 103.94696835641263 },
        { lat: 1.3928791560594111, lng: 103.74673128167302 },
        { lat: 1.3541633518361171, lng: 103.7048910423688 }],
        name: "Non-Regulated E-Waste Bin", type: ['Non-regulated electronics'], icon: { url: "https://www.nea.gov.sg/images/default-source/our-serivces/waste-management/e-waste/1850.tmb-thumb36.png" }
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
    <div style={pageStyle}>
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
            value="Non-regulated electronics"
            checked={activeFilters.includes('Non-regulated electronics')}
            onChange={() => handleFilterChange('Non-regulated electronics')}
          />
          <span style={labelStyle}>Non-regulated electronics</span>
        </label>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCaiFYrSvV6tEk9ZqKToEXa2-orShEEuq4">
        <GoogleMap
          mapContainerStyle={{ height: '620px', width: '100%' }}
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
          {/* ... */}
          {filteredMarkers.map((marker, index) => {
            if (Array.isArray(marker.position)) {
              // Handle array of positions
              return marker.position.map((position, positionIndex) => (
                <Marker
                  key={`${index}-${positionIndex}`}
                  position={position}
                  icon={marker.icon}
                  onClick={() => handleMarkerClick(marker)}
                />
              ));
            } else {
              // Single position
              return (
                <Marker
                  key={index}
                  position={marker.position}
                  icon={marker.icon}
                  onClick={() => handleMarkerClick(marker)}
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

export default MapReactTest;