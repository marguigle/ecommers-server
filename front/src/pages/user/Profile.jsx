import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, logout } from "../../redux/slices/authSlice.js";
import userApi from "../../redux/api/userApi.js";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        mobile: user.mobile || "",
        address: user.address || "",
      });
    }
  }, [isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.updateProfile(formData);
      dispatch(updateUser(response.data));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await userApi.logout();
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container-xxl py-5">
      <div className="row">
        <div className="col-md-8">
          <h2>My Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="tel"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Account Actions</h5>
              <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
