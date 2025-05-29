import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAssessment } from "../../api/counselors/useAssessments";
import Spinner from "../../components/Spinner";
import Switch from "../../components/Switch";

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
        navigate("/counselor/assessment-queue");
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
      await updateAssessment(id, formData);
      // Show success message or handle as needed
    } catch (err) {
      setError(err.message || "Failed to save assessment");
    }
  };

  const renderStep = () => {
    const currentSection = steps[currentStep].id;

    switch (currentSection) {
      case "physicalDevelopment":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                value={formData.physicalDevelopment.height}
                onChange={(e) =>
                  handleInputChange(
                    "physicalDevelopment",
                    "height",
                    e.target.value
                  )
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                value={formData.physicalDevelopment.weight}
                onChange={(e) =>
                  handleInputChange(
                    "physicalDevelopment",
                    "weight",
                    e.target.value
                  )
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Other Features
              </label>
              <textarea
                value={formData.physicalDevelopment.otherFeatures}
                onChange={(e) =>
                  handleInputChange(
                    "physicalDevelopment",
                    "otherFeatures",
                    e.target.value
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                rows={3}
              />
            </div>
          </div>
        );

      case "physicalDisabilities":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Has Physical Disabilities
              </span>
              <Switch
                enabled={formData.physicalDisabilities.status}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "status")
                }
              />
            </div>
            {formData.physicalDisabilities.status && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Partial Deafness
                  </span>
                  <Switch
                    enabled={formData.physicalDisabilities.partialDeafness}
                    onChange={() =>
                      handleSwitchChange(
                        "physicalDisabilities",
                        "partialDeafness"
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Partial Blindness
                  </span>
                  <Switch
                    enabled={formData.physicalDisabilities.partialBlindness}
                    onChange={() =>
                      handleSwitchChange(
                        "physicalDisabilities",
                        "partialBlindness"
                      )
                    }
                  />
                </div>
                {/* Add other disability switches */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Other Disabilities
                  </label>
                  <textarea
                    value={formData.physicalDisabilities.other}
                    onChange={(e) =>
                      handleInputChange(
                        "physicalDisabilities",
                        "other",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "healthRecords":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Has Health Records
              </span>
              <Switch
                enabled={formData.healthRecords.status}
                onChange={() => handleSwitchChange("healthRecords", "status")}
              />
            </div>
            {formData.healthRecords.status && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nature of Problem
                  </label>
                  <textarea
                    value={formData.healthRecords.natureOfProblem}
                    onChange={(e) =>
                      handleInputChange(
                        "healthRecords",
                        "natureOfProblem",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Causes
                  </label>
                  <textarea
                    value={formData.healthRecords.causes}
                    onChange={(e) =>
                      handleInputChange(
                        "healthRecords",
                        "causes",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Referrals
                  </label>
                  <textarea
                    value={formData.healthRecords.referrals}
                    onChange={(e) =>
                      handleInputChange(
                        "healthRecords",
                        "referrals",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "disciplineRecords":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Has Discipline Records
              </span>
              <Switch
                enabled={formData.disciplineRecords.status}
                onChange={() =>
                  handleSwitchChange("disciplineRecords", "status")
                }
              />
            </div>
            {formData.disciplineRecords.status && (
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Discipline Records</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newRecords = [
                        ...formData.disciplineRecords.records,
                      ];
                      newRecords.push({
                        date: new Date().toISOString().split("T")[0],
                        offence: "",
                        actionTaken: "",
                      });
                      handleInputChange(
                        "disciplineRecords",
                        "records",
                        newRecords
                      );
                    }}
                    className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
                  >
                    Add Record
                  </button>
                </div>
                {formData.disciplineRecords.records.map((record, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Record {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newRecords =
                            formData.disciplineRecords.records.filter(
                              (_, i) => i !== index
                            );
                          handleInputChange(
                            "disciplineRecords",
                            "records",
                            newRecords
                          );
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        value={record.date}
                        onChange={(e) => {
                          const newRecords = [
                            ...formData.disciplineRecords.records,
                          ];
                          newRecords[index].date = e.target.value;
                          handleInputChange(
                            "disciplineRecords",
                            "records",
                            newRecords
                          );
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Offence
                      </label>
                      <textarea
                        value={record.offence}
                        onChange={(e) => {
                          const newRecords = [
                            ...formData.disciplineRecords.records,
                          ];
                          newRecords[index].offence = e.target.value;
                          handleInputChange(
                            "disciplineRecords",
                            "records",
                            newRecords
                          );
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Action Taken
                      </label>
                      <textarea
                        value={record.actionTaken}
                        onChange={(e) => {
                          const newRecords = [
                            ...formData.disciplineRecords.records,
                          ];
                          newRecords[index].actionTaken = e.target.value;
                          handleInputChange(
                            "disciplineRecords",
                            "records",
                            newRecords
                          );
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      // Add other cases for remaining sections
      default:
        return <div>Section under development</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        {error}
        <button
          onClick={() => navigate("/counselor/assessment-queue")}
          className="block mx-auto mt-4 px-4 py-2 rounded bg-primary text-white"
        >
          Return to Queue
        </button>
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
