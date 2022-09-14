import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const intialState = {
  lecturer: "",
};
const AddEdit = () => {
  const [state, setState] = useState(intialState);
  const { lecturer } = state;

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/teacher/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lecturer ) {
      toast.error("Kõik väljad peavad olema täidetud");
    } else {
      if (!id) {
        axios
          .post("http://localhost:3000/teachers/", {
            lecturer,
          })
          .then(() => {
            setState({ lecturer: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Õppeaine edukalt lisatud");
      } else {
        axios
          .put(`http://localhost:3000/teachers/${id}`, {
            lecturer,
          })
          .then(() => {
            setState({ lecturer: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Õppejõud edukalt uuendatud");
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="lecturer">Õppejõud</label>
        <input
          type="text"
          id="lecturer"
          name="lecturer"
          placeholder="Õppejõu nimi..."
          value={lecturer || ""}
          onChange={handleInputChange}
        ></input>
        <input type="submit" value={id ? "Uuenda" : "Salvesta"} />
        <Link to="/">
          <input type="button" value="Tagasi" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
