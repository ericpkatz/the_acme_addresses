import React, { useRef, useEffect } from 'react';

const AddressCreate = ({ createAddress })=> {
  const input = useRef();
  useEffect(()=> {
    if(input.current){
      const autocomplete = new google.maps.places.Autocomplete(input.current, {
        fields: ["address_components", "geometry", "icon", "name", 'formatted_address']
      });
      autocomplete.addListener('place_changed', ()=> {
        const place = autocomplete.getPlace();
        if(place.address_components){
          createAddress(place);
          input.current.value = '';
        }
      });
    }
  }, [input]);
  return (
    <div>
      <input className='addressInput' ref={ input }/>
    </div>
  );
};

export default AddressCreate;

