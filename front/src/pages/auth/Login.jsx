import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess, loginFailure, loginStart } from "../../redux/slices/authSlice.js";
import userApi from "../../redux/api/userApi.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(false);
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
      const response = isAdmin
        ? await userApi.adminLogin(formData)
        : await userApi.login(formData);
      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
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
              <h2 className="text-center mb-4">Login</h2>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="adminCheck"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="adminCheck">
                  Login as Admin
                </label>
              </div>
              <form onSubmit={handleSubmit}>
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
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? "Logging in…" : "Login"}
                </button>
              </form>
              <div className="mt-3 text-center">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="mt-2 text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
