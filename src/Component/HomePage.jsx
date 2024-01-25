import { Button } from "bootstrap";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteuser } from "../Reducers/UserReducer";

function Homepage() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handledelete = (id) => {
    dispatch(deleteuser({ id: id }));
  };

  return (
    <div>
      <div className="container">
        <h1> Welcome To Signal</h1>
        <Link to="/createuser" className="btn btn-success my-3">
          Create Post
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>
                  <Link
                    to={`/update/${user.id}`}
                    className="btn btn-sm btn-success"
                    type="button"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-sm btn-danger ms4"
                    type="button"
                    onClick={() => {
                      handledelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Homepage;
