import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const work_Data = async () => {
    const response = await axios.get("http://localhost:3000/teachers");
    setData(response.data);
  };

  useEffect(() => {
    work_Data();
  }, []);

  const deleteSubject = (id) => {
    if (window.confirm("Kinnita kustutamine?")) {
      axios.delete(`http://localhost:3000/teachers/${id}`);
      toast.success("Õppejõud kustutatud");
      setTimeout(() => work_Data(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}></th>
            <th style={{ textAlign: "center" }}>Õppejõud</th>
            <th style={{ textAlign: "center" }}>Muuda</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.subject}</td>
                <td>{item.lecturer}</td>
                <td>{item.work_load}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Muuda</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteSubject(item.id)}
                  >
                    Kustuta
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">Vaata</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/addSubject">
        <button className="btn btn-subject">Lisa</button>
      </Link>
    </div>
  );
};

export default Home;
