import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/bookings">Bookings</a></li>
          <li><a href="/rooms">Rooms</a></li>
          <li><a href="/users">Users</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
