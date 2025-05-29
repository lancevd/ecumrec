import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { useGeneralContext } from "../../context/GeneralContext";

export const useAssessment = () => {
  const { user } = useAuth();
  const { loading, setLoading } = useGeneralContext();

  const startAssessment = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/assessments`, data);
      toast.success(response.data.message);
      console.log(response.data);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error starting assessment");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAssessmentStats = async (schoolId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/assessments/stats?${schoolId}&${user.id}`
      );
      setLoading(false)
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching stats");
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { startAssessment, getAssessmentStats, loading };
};
