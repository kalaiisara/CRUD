import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [pos, setpos] = useState("");
  useEffect(() => {
    setName(localStorage.getItem("name"));
    setpos(localStorage.getItem("pos"));
    setId(localStorage.getItem("id"));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://62304886f113bfceed4cc1d6.mockapi.io/kalai/${id}`, {
        name,
        pos,
      })
      .then(() => {
        alert("data is updated");
        navigate("/");
      });
  };
  return (
    <>
      <div>
        <h1 className="text-center "> Update the application </h1>
        <div className="form-box mt-5">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                className="form-control"
                placeholder="position"
                value={pos}
                onChange={(e) => setpos(e.target.value)}
              />
            </div>
            <div className="d-grid text-center mt-3">
              <button className="btn btn-lg btn-primary" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
