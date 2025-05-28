import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { useGeneralContext } from "../../context/GeneralContext";

export const useSchoolData = () => {
  const { user } = useAuth();
  const { loading, setLoading } = useGeneralContext();

  const getSchoolStudents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/users/schools/${user.schoolId}/students`
      );
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching students");
      return error;
    } finally {
      setLoading(false);
    }
  };

  const getStudentProfile = async (studentId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/users/schools/${user.schoolId}/students/${studentId}`
      );
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching students");
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { getSchoolStudents, getStudentProfile, loading };
};
