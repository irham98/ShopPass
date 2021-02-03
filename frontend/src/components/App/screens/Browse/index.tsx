import * as React from 'react';
import ItemSearch from './ItemSearch';
import Navbar from '../../components/Navbar';

function Browse() {

    return (
        <>
        <Navbar/>

          <h2>BROWSE ITEMS</h2>
          
        <ItemSearch />
          
          <hr />
        </>
      );
}

export default Browse;