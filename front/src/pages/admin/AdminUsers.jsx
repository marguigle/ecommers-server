import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import userApi from "../../redux/api/userApi.js";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [isAuthenticated, user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id, block) => {
    try {
      if (block) {
        await userApi.blockUser(id);
      } else {
        await userApi.unblockUser(id);
      }
      fetchUsers();
    } catch (error) {
      alert("Action failed");
    }
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Manage Users</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.firstname} {u.lastname}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <span className={`badge bg-${u.isBlocked ? "danger" : "success"}`}>
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td>
                  {u._id !== user?._id && (
                    <button
                      className={`btn btn-sm btn-${u.isBlocked ? "success" : "warning"}`}
                      onClick={() => handleBlock(u._id, !u.isBlocked)}
                    >
                      {u.isBlocked ? "Unblock" : "Block"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
