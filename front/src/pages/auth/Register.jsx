import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess, loginFailure, loginStart } from "../../redux/slices/authSlice.js";
import userApi from "../../redux/api/userApi.js";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setIsLoading(true);
    try {
      const response = await userApi.register(formData);
      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input
                      id="firstname"
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input
                      id="lastname"
                      type="text"
                      className="form-control"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    spellCheck={false}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    id="mobile"
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? "Registering…" : "Register"}
                </button>
              </form>
              <div className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
