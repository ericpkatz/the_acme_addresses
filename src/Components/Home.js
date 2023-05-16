import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, createAddress, deleteAddress } from '../store';
import MapComponent from './MapComponent';
import AddressCreate from './AddressCreate';

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
                  <button onClick={ ()=> dispatch(deleteAddress(address))}>x</button>
                </li>
              );
            })
          }
        </ul>
        <MapComponent />
      </div>
    </div>
  );
};

export default Home;
