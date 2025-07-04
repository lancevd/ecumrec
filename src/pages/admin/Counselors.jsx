import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import Spinner from "../../components/Spinner";

const Counselors = () => {
  const { user } = useAuth();
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialization: "",
    status: "",
  });

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/schools/${user.id}/counselors`
        );
        setCounselors(response.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching counselors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, [user.schoolId]);

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      !filters.specialization ||
      counselor.specialization === filters.specialization;

    const matchesStatus =
      !filters.status || counselor.status === filters.status;

    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const handleEdit = (counselorId) => {
    // Implement edit functionality
    console.log("Edit counselor:", counselorId);
  };

  const handleDelete = (counselorId) => {
    // Implement delete functionality
    console.log("Delete counselor:", counselorId);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#184C85]">Counselors</h2>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search counselors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <select
                  value={filters.specialization}
                  onChange={(e) =>
                    setFilters({ ...filters, specialization: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                >
                  <option value="">All Specializations</option>
                  <option value="Academic Counseling">
                    Academic Counseling
                  </option>
                  <option value="Career Counseling">Career Counseling</option>
                  <option value="Personal Counseling">
                    Personal Counseling
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {loading ? <Spinner /> : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCounselors.map((counselor) => (
                  <tr key={counselor._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {counselor.firstName} {counselor.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {counselor.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {counselor.specialization}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          counselor.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {counselor.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          // Handle view details
                        }}
                        className="text-[#184C85] hover:text-[#123a69] mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          // Handle edit
                        }}
                        className="text-[#184C85] hover:text-[#123a69]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filteredCounselors.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No counselors found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Counselors;
