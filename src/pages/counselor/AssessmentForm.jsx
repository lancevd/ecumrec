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
  const { getAssessment, updateAssessment } = useAssessment();
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
    console.log(formData.physicalDevelopment)
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
      await updateAssessment(
        id,
        formData.steps[currentStep].id,
        steps[currentStep].id
      );
      // Show success message or handle as needed
    } catch (err) {
      setError(err.message || "Failed to save assessment");
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
            handleInputChange={handleInputChange}
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
        <h1 className="text-2xl font-bold mb-2">Student Assessment</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>•</span>
          <span>{steps[currentStep].title}</span>
        </div>
      </div>

      {error ? (
        <p className="text-red-600">
          {error} <br />{" "}
        </p>
      ) : null}
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
    </div>
  );
}
