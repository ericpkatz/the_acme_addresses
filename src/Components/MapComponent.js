import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MapComponent = ()=> {
  const el = useRef();
  const { auth } = useSelector(state => state);
  const [map, setMap] = React.useState();

  useEffect(()=> {
    //must have map
    if(map){
       //create bounds based on addresses 
       const bounds = new google.maps.LatLngBounds();
       auth.addresses.forEach( address => {
         //see if marker is on the map
         if(!map.markers.find(marker => marker.id === address.id)){
           //marker is not on map, so add it to map
           const marker = new google.maps.Marker({
             map,
             position: address.data.geometry.location
           });
           marker.id = address.id;
           //add it to markers array for map 
           map.markers.push(marker);
         }
         //update bounds
         bounds.extend(address.data.geometry.location);
       });
      //set bounds
      map.fitBounds(bounds);

      //clean up, are there any markers which don't correspond to an address?
      //track the ids of the addresses which have been removed
      const markersToRemove = [];
      map.markers.forEach( marker => {
        //if we have  marker with no corresponding address, it needs to go
        if(!auth.addresses.find(address => address.id === marker.id)){
          //remove it from map
          marker.setMap(null);
          //add the id (same as address.id to the markers to remove)
          markersToRemove.push(marker.id);
        }
      });
      //clean up the map markers
      map.markers = map.markers.filter(marker => !markersToRemove.includes(marker.id));
    }
  }, [auth.addresses, map]);//our map is dictated by the auth.addresses and of course we need the map

  useEffect(()=> {
    if(el.current){
      const _map = new google.maps.Map(el.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      //we need to keep track of the markers on the map
      _map.markers = [];
      //setting this will allow us to know when map is ready
      setMap(_map);
    }
  }, [el]);
  return (
    <div ref={ el } style={{ height: '300px'}}/>
  );
};

export default MapComponent;
