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

  const getAssessmentStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/assessments/stats?${user.schoolId}&${user.id}`
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

  const getMyAssessments = async (status) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/assessments/counselor/${user.id}?status=${status}&page=1&limit=10`
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching stats");
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { startAssessment, getAssessmentStats, getMyAssessments, loading };
};
