import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { useGeneralContext } from "../../context/GeneralContext";

const { user } = useAuth;
const { loading, setLoading } = useGeneralContext();
export const getSchoolStudents = async () => {
  try {
    loading;
    const response = await axiosInstance.get(`/users/students/${user.id}`);
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message || "Error fetching stundents");
    return error;
  } finally {
    setLoading(false);
  }
};

export const getSchoolCounselors = () => {
  try {
    const response = axiosInstance.get(`/users/counselors/${user.id}`);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Error fetching counselors");

    return error;
  }
};
