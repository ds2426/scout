import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import './header.scss';

export const Header = (props) => {
  const [activeItem, setActiveItem] = useState("waypoints");
  
  useEffect(() => {
    const location = window.location.href;
    if(location.includes("product")) {
      setActiveItem("product")
    }
    else if(location.includes("bin")) {
      setActiveItem("bin")
    }
    else if(location.includes("order")) {
      setActiveItem("order")
    }
    else if(location.includes("lines")) {
      setActiveItem("lines")
    }
  },[activeItem])
  const handleItemClick = (e, { name }) =>  setActiveItem(name);

  return (
    <>
    
    <Menu fixed="top">
          <Menu.Item
            name='product'
            active={activeItem === 'product'}
            onClick={handleItemClick}
            content="Product"
            as={Link} to="/product/"
          />
          <Menu.Item
            name='bin'
            active={activeItem === 'bin'}
            onClick={handleItemClick}
            content="Bins"
            as={Link} to="/bins"
          />
          <Menu.Item
              name='inventory'
              active={activeItem === 'inventory'}
              onClick={handleItemClick}
              content="Inventory"
              as={Link} to="/inventory"
            />
            <Menu.Item
              name='order'
              active={activeItem === 'order'}
              onClick={handleItemClick}
              content="Order"
              as={Link} to="/order"
          />
          <Menu.Item
              name='lines'
              active={activeItem === 'lines'}
              onClick={handleItemClick}
              content="Order Lines"
              as={Link} to="/lines"
          />
        </Menu>
      </>
    
  );
}

export default Header;
