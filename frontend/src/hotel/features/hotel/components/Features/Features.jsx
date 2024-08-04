import React, { useEffect, useState } from "react";
import Api from "../../services/Api";

function Features({ slug, token }) {
  const [feature, setFeature] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await Api.fetchFeature(token, slug);
    setFeature(response.data);
    console.log(response.data);
  };

  const handleChange = (e) => {
    setFeatureInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      hotel: slug,
      name: featureInput,
    };
    const response = await Api.addFeature(token, data);
    setFeatureInput("");
    fetchData();
  };

  const handleDelete = async (featureId) => {
    await Api.deleteFeature(token, featureId, slug)
    fetchData();
  };

  return (
    <React.Fragment>
      <div className="container-fluid row">
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h4 className="text-center">Add Features</h4>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="feature"
                  name="feature"
                  className="form-control"
                  value={featureInput}
                  onChange={handleChange}
                />
                <label htmlFor="feature">Feature</label>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary mx-1 btn-block"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Feature</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feature.map((feature, index) => (
                <tr key={feature.id}>
                  <td>{index + 1}</td>
                  <td>{feature.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(feature.id)}
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
    </React.Fragment>
  );
}

export default Features;
