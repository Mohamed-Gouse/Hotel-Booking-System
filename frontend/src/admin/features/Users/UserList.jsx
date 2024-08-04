import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userlist, userStatus } from "./services/api";

function UserList() {
  const { access } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await userlist(access);
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatus = async (userId, is_active) => {
    try {
      const data = await userStatus(access, userId, { is_active: !is_active });
      fetchUsers();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-3 bg-white p-3">
      <div className="">
        <h1 className="h2">Hotels</h1>
      </div>
      <hr />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.full_name}</td>
                <td>
                  <img src={user.photo} alt="" style={{ height: "70px" }} />
                </td>
                <td>{user.email}</td>
                <td>{user.is_active ? "Active" : "Not Active"}</td>
                <td>
                  {user.is_active ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatus(user.id, user.is_active)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatus(user.id, user.is_active)}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
