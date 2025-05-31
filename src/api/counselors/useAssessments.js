import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { useGeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import axios from "axios";

export const useAssessment = () => {
  const { user } = useAuth();
  const { loading, setLoading } = useGeneralContext();
  const [error, setError] = useState(null);

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

  const getAssessments = async (page = 1, status = "ongoing") => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/assessments/${user.id}?page=${page}&status=${status}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch assessments");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAssessment = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/assessments/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch assessment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAssessment = async (id, formData, sectionName) => {
    const data = {
      ...formData.sectionName,
      section: sectionName,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/assessments/${id}/section`, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update assessment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    startAssessment,
    getAssessmentStats,
    getMyAssessments,
    getAssessments,
    getAssessment,
    updateAssessment,
  };
};
