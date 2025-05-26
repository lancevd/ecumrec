import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useProfileAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/student-profile");
      setProfileData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching profile data");
      toast.error(error.response?.data?.message || "Error fetching profile data");
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalData = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/personal-data", data);
      toast.success("Personal data updated successfully");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error updating personal data");
      toast.error(error.response?.data?.message || "Error updating personal data");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateFamilyBackground = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/family-background", data);
      toast.success("Family background updated successfully");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error updating family background");
      toast.error(error.response?.data?.message || "Error updating family background");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateFamilyStructure = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/family-structure", data);
      toast.success("Family structure updated successfully");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error updating family structure");
      toast.error(error.response?.data?.message || "Error updating family structure");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEducationalBackground = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/educational-background", data);
      toast.success("Educational background updated successfully");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error updating educational background");
      toast.error(error.response?.data?.message || "Error updating educational background");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateNotes = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/notes", data);
      toast.success("Notes updated successfully");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error updating notes");
      toast.error(error.response?.data?.message || "Error updating notes");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    profileData,
    fetchProfileData,
    updatePersonalData,
    updateFamilyBackground,
    updateFamilyStructure,
    updateEducationalBackground,
    updateNotes,
  };
}; 