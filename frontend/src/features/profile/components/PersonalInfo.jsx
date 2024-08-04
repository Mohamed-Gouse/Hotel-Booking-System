import React, { useEffect, useState, useRef } from "react";
import Api from "../services/Api";

function PersonalInfo({ profile, token, fetchProfile }) {
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [full_name, setFull_name] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null)

  const fileInputRef = useRef();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setFull_name(profile.full_name);
      setPhoto(profile.photo);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        username,
        full_name,
      };
      const res = await Api.editProfile(token, formData);
      console.log(res);
      setEditProfile(false);
      fetchProfile();
      setError(null)
    } catch (error) {
      setError(error)
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("photo", selectedImage);

    try {
      const res = await Api.changeProfilePic(token, formData);
      console.log(res);
      fetchProfile();
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="col-md-5 col-12 my-1">
      <div className="bg-white shadow-sm p-3 rounded">
        <p className="h3 font-weight-bold">Personal Details</p>
        <hr />
        <div className="row m-0">
          <div className="col-8 p-0">
            {!editProfile ? (
              <React.Fragment>
                <p className="font-weight-bold">
                  Username:{" "}
                  <small className="text-capitalize">{profile?.username}</small>
                </p>
                <p className="font-weight-bold">
                  Full Name:{" "}
                  <small className="text-capitalize">
                    {profile?.full_name}
                  </small>
                </p>
                <p className="font-weight-bold">
                  Email ID:{" "}
                  <small className="text-lowercase">{profile?.email}</small>
                </p>
              </React.Fragment>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-inline">
                  <div className="form-group my-1">
                    <label htmlFor="username" className="font-weight-bold mr-1">
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                    {error && error.username && (
                    <small className="text-danger">{error.username}</small>
                    )}
                  <div className="form-group my-1">
                    <label
                      htmlFor="full_name"
                      className="font-weight-bold mr-1"
                    >
                      Full Name:
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="form-control"
                      value={full_name}
                      onChange={(e) => setFull_name(e.target.value)}
                    />
                  </div>
                  {error && error.full_name && (
                    <small className="text-danger">{error.full_name}</small>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            )}
          </div>
          <div className="col-4 d-flex justify-content-end p-0">
            <img
              src={photo}
              className="img-fluid rounded"
              style={{ height: 140 }}
              alt="Profile"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditProfile(!editProfile)}
          >
            {editProfile ? "Cancel Edit" : "Edit Profile"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={triggerFileInput}>
            Change Profile Pic
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        {selectedImage && (
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleImageSubmit}
            >
              Upload Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;
