import React, { useEffect, useState } from "react";
import "../../../assets/styles/Chat.css"
import { useSelector } from "react-redux";
import UserList from "./components/UserList";
import { usersList } from "./services/api";
import Chat from "../../../components/chat/Chat";

function Messages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { access, user } = useSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      const response = await usersList(access);
      setUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [access]);



  return (
    <div className="mt-2 row mx-auto">
      <UserList
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <div className="col-8">
        <Chat selectedUser={selectedUser} admin={true} />
      </div>
      
    </div>
  );
}

export default Messages;
