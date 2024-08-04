import React from "react";

function Menu({ onMenuClick, activePage }) {
  const getClassName = (menu) => {
    return `btn ${activePage === menu ? 'text-warning' : 'text-secondary'}`;
  };

  return (
    <div className="container my-3 py-2 rounded shadow-sm border bg-white d-flex justify-content-around">
      <button onClick={() => onMenuClick('general')} className={getClassName('general')}>General</button>
      <button onClick={() => onMenuClick('gallery')} className={getClassName('gallery')}>Gallery</button>
      <button onClick={() => onMenuClick('features')} className={getClassName('features')}>Features</button>
      <button onClick={() => onMenuClick('room-types')} className={getClassName('room-types')}>Room Types</button>
      <button onClick={() => onMenuClick('rooms')} className={getClassName('rooms')}>Rooms</button>
      <button onClick={() => onMenuClick('faqs')} className={getClassName('faqs')}>FAQs</button>
    </div>
  );
}

export default Menu;
