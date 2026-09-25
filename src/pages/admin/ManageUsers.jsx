import { useEffect, useState } from "react";
import axios from "axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.fullName?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.phone?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        👥 Manage Users
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-hover align-middle">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>

                      <td>{user.fullName}</td>

                      <td>{user.email}</td>

                      <td>{user.phone}</td>

                      <td>{user.role}</td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ManageUsers;