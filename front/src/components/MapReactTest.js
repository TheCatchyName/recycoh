import BlogFooter from "./BlogFooter";
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId)

    // inside the map instance you can call any google maps method
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
}

const MapReactTest = () => {
    const defaultProps = {
        center: {
            lat: 1.2964202165603638,
            lng: 103.85188293457031
        },
        zoom: 12,
    };

    return (
        <div style={{ height: '92vh', width: '80%' }}>
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
            >

                <AnyReactComponent
                    lat={1.346115482}
                    lng={103.72055}
                    text="My Marker"
                    
                />


            </GoogleMapReact>
        </div>

    );
};

export default MapReactTest;