import React, { useState } from "react";
import { adduser } from "../Reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const handleSumbit = (event) => {
    event.preventDefault();
    dispatch(
      adduser({ id: users[users.length - 1].id + 1, name, description })
    );
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <h1>Add Post</h1>

        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              Id:
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Your Id"
              onChange={(e) => {
                setid(e.target.value);
              }}
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
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </>
  );
}
export default CreatePage;
