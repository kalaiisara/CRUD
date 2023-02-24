import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pos, setpos] = useState("");

  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://62304886f113bfceed4cc1d6.mockapi.io/kalai", { name, pos })
      .then(() => window.location.reload());
  };

  useEffect(() => {
    axios
      .get("https://62304886f113bfceed4cc1d6.mockapi.io/kalai")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleDelete = (id, name) => {
    axios
      .delete(`https://62304886f113bfceed4cc1d6.mockapi.io/kalai/${id}`)
      .then(() => {
        alert(`are you sure want to delete ${name}`);
        var newData = data.filter((item) => {
          return item.id !== id;
        });
        setData(newData);
      });
  };
  const handleUpdate = (id, name, pos) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("pos", pos);
    navigate("/update");
  };
  return (
    <>
      <div className="con">
        <h1 className="text-center "> React CRUD application </h1>
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
              <button className="btn btn-lg" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="sec">
        <div className="row container main-rows">
          {data.map(({ id, name, pos }) => (
            <div key={id} className="col-4 mb-" id="col">
              <div className="modal-body">
                <div className="card-body" id="col">
                  <div className="icon">
                    <button onClick={() => handleDelete(id, name)}>
                      <i className="fa fa-trash"></i>
                    </button>
                    <button onClick={() => handleUpdate(id, name, pos)}>
                      <i className="fa fa-edit"></i>
                    </button>
                  </div>
                  <h4>{id}</h4>
                  <h3>{name}</h3>
                  <h5>{pos}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
