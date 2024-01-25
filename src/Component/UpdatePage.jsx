import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateuser } from "../Reducers/UserReducer";

const UpdatePage = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existuser = users.filter((curid) => curid.id == id);
  const { name, description } = existuser[0];
  const [updatname, setname] = useState(name);
  const [updatedescription, setdescription] = useState(description);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateuser({
        id: id,
        name: updatname,
        description: updatedescription,
      })
    );
    navigate("/");
  };
  return (
    <div className="container">
      <h1>Update Post</h1>

      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Id:
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Your Id"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="exampleFormControlInput1"
            placeholder="Enter Your Name"
            value={updatname}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            name="description"
            rows="3"
            value={updatedescription}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
