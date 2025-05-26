import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useStudentProfile = (studentId = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profileStatus, setProfileStatus] = useState({
    profileComplete: false,
    completedSections: {
      personalData: false,
      familyBackground: false,
      familyStructure: false,
      educationalBackground: false,
      notes: false,
    },
  });

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = studentId 
        ? `/student-profile/${studentId}`
        : '/student-profile';
      const response = await axiosInstance.get(url);
      setProfileData(response.data.data);
      setProfileStatus({
        profileComplete: response.data.data.profileStatus.profileComplete,
        completedSections: response.data.data.profileStatus.completedSections,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching profile");
      toast.error(error.response?.data?.message || "Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  // Update personal data
  const updatePersonalData = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/personal-data", data);
      setProfileData(prev => ({
        ...prev,
        personalData: response.data.data,
      }));
      setProfileStatus(prev => ({
        ...prev,
        completedSections: {
          ...prev.completedSections,
          personalData: true,
        },
      }));
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

  // Update family background
  const updateFamilyBackground = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/family-background", data);
      setProfileData(prev => ({
        ...prev,
        familyBackground: response.data.data,
      }));
      setProfileStatus(prev => ({
        ...prev,
        completedSections: {
          ...prev.completedSections,
          familyBackground: true,
        },
      }));
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

  // Update family structure
  const updateFamilyStructure = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/family-structure", data);
      setProfileData(prev => ({
        ...prev,
        familyStructure: response.data.data,
      }));
      setProfileStatus(prev => ({
        ...prev,
        completedSections: {
          ...prev.completedSections,
          familyStructure: true,
        },
      }));
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

  // Update educational background
  const updateEducationalBackground = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/educational-background", data);
      setProfileData(prev => ({
        ...prev,
        educationalBackground: response.data.data,
      }));
      setProfileStatus(prev => ({
        ...prev,
        completedSections: {
          ...prev.completedSections,
          educationalBackground: true,
        },
      }));
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

  // Update notes
  const updateNotes = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put("/student-profile/notes", data);
      setProfileData(prev => ({
        ...prev,
        notes: response.data.data,
      }));
      setProfileStatus(prev => ({
        ...prev,
        completedSections: {
          ...prev.completedSections,
          notes: true,
        },
        profileComplete: response.data.profileComplete,
      }));
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

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, [studentId]);

  return {
    loading,
    error,
    profileData,
    profileStatus,
    fetchProfile,
    updatePersonalData,
    updateFamilyBackground,
    updateFamilyStructure,
    updateEducationalBackground,
    updateNotes,
  };
}; 