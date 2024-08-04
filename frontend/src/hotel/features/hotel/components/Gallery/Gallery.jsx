import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Api from "../../services/Api";

function Gallery({ slug, token }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgPreview, setSelectedImgPreview] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [slug]);

  const fetchImages = async () => {
    const response = await Api.fetchGallery(token, slug);
    setImages(response.data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      Swal.fire({
        title: "Error",
        text: "Please select an image to upload.",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImg);
    formData.append("hotel", slug);

    await Api.addGallery(token, formData)
    setSelectedImg(null);
    setSelectedImgPreview(null);
    fetchImages();
  };

  const handleDelete = async (imageId) => {
      await Api.deleteGallery(token, imageId, slug)
      fetchImages();
  };

  return (
    <React.Fragment>
      <div className="container-fluid row">
        <div className="col-12 col-md-6 mx-auto">
          <div className="card p-3">
            <h3 className="p-2">Add Images</h3>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload any file image files"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex">
          <h5>Preview:</h5>
          {selectedImgPreview && (
            <img
              src={selectedImgPreview}
              alt="Preview..."
              className="img-fluid mx-3"
              style={{ height: "200px" }}
            />
          )}
        </div>
      </div>
      <hr />
      <table className="table  text-center">
        <thead>
          <tr>
            <th>Sl.No:</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {images &&
            images.map((image, index) => (
              <tr key={image.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={image.image}
                    alt="Gallery Image"
                    className="img-fluid"
                    style={{ height: "70px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Gallery;
