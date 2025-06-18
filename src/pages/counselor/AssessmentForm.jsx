import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAssessment } from "../../api/counselors/useAssessments";
import Spinner from "../../components/Spinner";
import PhysicalDevelopment from "./assessment-form/PhysicalDevelopment";
import PhysicalDisabilities from "./assessment-form/PhysicalDisabilities";
import HealthRecords from "./assessment-form/HealthRecords";
import DisciplineRecords from "./assessment-form/DisciplineRecords";
import StandardizedTests from "./assessment-form/StandardizedTests";
import AcademicRecords from "./assessment-form/AcademicRecords";
import Observations from "./assessment-form/Observations";
import VocationalInterests from "./assessment-form/VocationalInterests";
import Remarks from "./assessment-form/Remarks";
import toast from "react-hot-toast";

const steps = [
  { id: "physicalDevelopment", title: "Physical Development" },
  { id: "physicalDisabilities", title: "Physical Disabilities" },
  { id: "healthRecords", title: "Health Records" },
  { id: "disciplineRecords", title: "Discipline Records" },
  { id: "standardizedTests", title: "Standardized Tests" },
  { id: "academicRecords", title: "Academic Records" },
  { id: "observations", title: "Observations" },
  { id: "vocationalInterests", title: "Vocational Interests" },
  { id: "overallRemark", title: "Overall Remark" },
];

export default function AssessmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const { getAssessment, updateAssessment } = useAssessment();
  const [studentName, setStudentName] = useState("");
  const [formData, setFormData] = useState({
    physicalDevelopment: {
      height: "",
      weight: "",
      otherFeatures: "",
    },
    physicalDisabilities: {
      status: false,
      partialDeafness: false,
      partialBlindness: false,
      shortSightedness: false,
      longSightedness: false,
      stammering: false,
      squinting: false,
      physicalImpairment: false,
      other: "",
    },
    healthRecords: {
      status: false,
      natureOfProblem: "",
      causes: "",
      referrals: "",
    },
    disciplineRecords: {
      status: false,
      records: [],
    },
    standardizedTests: {
      status: false,
      tests: [],
    },
    academicRecords: {
      status: false,
      classes: [],
    },
    observations: {
      status: false,
      punctuality: 1,
      attendance: 1,
      reliability: 1,
      politeness: 1,
      honesty: 1,
      relationshipWithStaff: 1,
      relationshipWithPeers: 1,
      selfControl: 1,
      cooperation: 1,
      attentiveness: 1,
      initiative: 1,
      organization: 1,
      perseverance: 1,
      senseOfLeadership: 1,
      respectForAuthority: 1,
      senseOfResponsibility: 1,
      industry: 1,
      games: 1,
      sports: 1,
      gymnastics: 1,
      handlingOfTools: 1,
      drawingPainting: 1,
      craft: 1,
      musicalSkills: 1,
      speechFluency: 1,
      handlingOfLaboratoryEquipment: 1,
    },
    vocationalInterests: {
      status: false,
      interests: [],
    },
    overallRemark: {
      remark: "",
    },
  });

  useEffect(() => {
    fetchAssessmentData();
  }, [id]);

  const fetchAssessmentData = async () => {
    try {
      setLoading(true);
      const response = await getAssessment(id);
      if (response.data) {
        setFormData(response.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch assessment data");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        await updateAssessment(id, { ...formData, status: "completed" });
        // navigate("/counselor/assessment-queue");
      } catch (err) {
        setError(err.message || "Failed to complete assessment");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    try {
      const currentSection = steps[currentStep].id;
      await updateAssessment(id, formData[currentSection], currentSection);
      // Show success message or handle as needed
    } catch (err) {
      setError(err.message || "Failed to save assessment");
    }
  };

  const handleEndAssessment = async () => {
    try {
      await updateAssessment(id, { ...formData, status: "completed" });
      toast.success("Assessment completed successfully");
      navigate("/counselor/assessment-queue");
    } catch (err) {
      setError(err.message || "Failed to complete assessment");
      toast.error("Failed to complete assessment");
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "physicalDevelopment":
        return (
          <PhysicalDevelopment
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );

      case "physicalDisabilities":
        return (
          <PhysicalDisabilities
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />
        );

      case "healthRecords":
        return (
          <HealthRecords
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />
        );

      case "disciplineRecords":
        return (
          <DisciplineRecords
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />
        );

      case "standardizedTests":
        return (
          <StandardizedTests
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />
        );

      case "academicRecords":
        return (
          <AcademicRecords
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            assessmentId={id}
          />
        );

      case "observations":
        return (
          <Observations
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />
        );

      case "vocationalInterests":
        return (
          <VocationalInterests
            formData={formData}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />
        );

      case "overallRemark":
        return (
          <Remarks formData={formData} handleInputChange={handleInputChange} />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <Link
          to="/counselor/assessment-queue"
          className="text-primary hover:font-bold"
        >
          🔙Back
        </Link>
        <br />
        <div className="flex justify-between items-center gap-6">
          <h1 className="text-lg md:text-2xl font-bold mb-2">
            {formData
              ? formData.studentId?.firstName + " " + formData.studentId?.lastName+"'s"
              : "Student"}{" "}
            Assessment
          </h1>
          <button 
            onClick={() => setShowEndModal(true)}
            className="btn-primary text-sm md:text-base py-2 px-3 rounded-md"
          >
            End Assessment
          </button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>•</span>
          <span>{steps[currentStep].title}</span>
        </div>
      </div>

      <div className="bg-[#ececf865] rounded-lg shadow-lg p-6">
        {renderStep()}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded btn-primary text-primary/90 disabled:opacity-30"
        >
          Previous
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded btn-secondary"
          >
            Update
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 rounded btn-primary text-white disabled:opacity-50"
          >
            {"Next"}
          </button>
        </div>
      </div>

      {/* End Assessment Confirmation Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">End Assessment</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end this assessment? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEndModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEndAssessment}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                End Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
