import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createAddress } from '../store';

const AddressCreate = ({ createAddress })=> {
  const input = useRef();
  useEffect(()=> {
    if(input.current){
      const autocomplete = new google.maps.places.Autocomplete(input.current, {
        fields: ["address_components", "geometry", "icon", "name", 'formatted_address']
      });
      autocomplete.addListener('place_changed', ()=> {
        createAddress(autocomplete.getPlace());
        input.current.value = '';
      });
    }
  }, [input]);
  return (
    <div>
      <input className='addressInput' ref={ input }/>
    </div>
  );
};

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const _createAddress = (data)=> {
    dispatch(createAddress(data));
  };
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
        <h2>Addresses ({ auth.addresses.length })</h2>
        <AddressCreate createAddress={ _createAddress }/>
        <ul>
          {
            auth.addresses.map( address => {
              return (
                <li key={ address.id} >
                  { address.data.formatted_address }
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Home;
