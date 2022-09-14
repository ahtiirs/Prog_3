import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [subject, setSubject] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/teachers/${id}`)
      .then((resp) => setSubject({ ...resp.data[0] }));
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Õppeaine vaade</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Õppeaine: </strong>
          <span>{subject.subject}</span>
          <br />
          <br />
          <strong>Õppejõud: </strong>
          <span>{subject.lecturer}</span>
          <br />
          <br />
          <strong>Maht(EAP): </strong>
          <span>{subject.work_load}</span>
          <br />
          <br />
          <Link to="/ ">
            <div className="btn btn-edit">Tagasi</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
