import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import UserDeleteButton from "./deleteBtn";
import axios from "axios";
import NavBarSuper from "./navBarSuper";
import "./UserList.css"; 

const baseUrl = "http://localhost:3000";

const UserList = () => {
  const [user, setUser] = useState([]);

  const getAllUser = async () => {
    try {
      const url = `${baseUrl}/super/all-user`;
      const response = await axios.get(url);
      console.log("this is the API response", response);
      setUser(response.data);
      return response;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <NavBarSuper />

      <div className="userlist-container">
        {user.length ? (
          <table className="userlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((oneUser, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{oneUser.name}</td>
                  <td>{oneUser.email}</td>
                  <td>{oneUser.role}</td>
                  <td>
                    <UserDeleteButton
                      AdminId={oneUser._id}
                      getAllUsers={getAllUser}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="loader-container">
            <ClipLoader color="#2575fc" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
