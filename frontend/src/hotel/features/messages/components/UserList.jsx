import React from "react";

function UserList({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="col-4">
      <div className="bg-white shadow-sm rounded p-3 user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`d-flex user-div align-items-center p-2 my-2 rounded ${
              selectedUser && selectedUser.id === user.id
                ? "bg-secondary text-white"
                : "bg-light"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.photo} alt="user-photo" className="user-image" />
            <p className="m-0 ml-3 text-capitalize">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
