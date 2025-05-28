import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useProfileAssessment } from "../../api/useProfileAssessment";
import toast from "react-hot-toast";

const steps = [
  {
    title: "Student's personal data",
    fields: [
      { name: "lastName", label: "Surname", type: "text", required: true },
      { name: "firstName", label: "First Name", type: "text", required: true },
      {
        name: "gender",
        label: "Sex",
        type: "select",
        options: ["Male", "Female"],
        required: true,
      },
      {
        name: "admissionNumber",
        label: "Admission No",
        type: "text",
        required: true,
      },
      {
        name: "yearOfAdmission",
        label: "Year of Admission",
        type: "number",
        required: true,
      },
      {
        name: "collegeHouse",
        label: "College House",
        type: "text",
        required: false,
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
        required: true,
      },
      {
        name: "placeOfBirth",
        label: "Place of Birth",
        type: "text",
        required: true,
      },
      {
        name: "address",
        label: "Permanent Home Address",
        type: "text",
        required: true,
        description: "P.O Box, PMB not acceptable",
      },
      {
        name: "contactAddress",
        label: "Contact Address",
        type: "text",
        required: true,
      },
      {
        name: "stateOfOrigin",
        label: "State of Origin",
        type: "text",
        required: true,
      },
      {
        name: "languagesSpoken",
        label: "Languages Spoken",
        type: "text",
        required: false,
      },
      {
        name: "countriesVisited",
        label: "Countries Visited",
        type: "text",
        required: false,
      },
      { name: "religion", label: "Religion", type: "text", required: false },
      {
        name: "nationality",
        label: "Nationality",
        type: "text",
        required: true,
      },
      {
        name: "changeOfName",
        label: "Change of Name (if any)",
        type: "text",
        required: false,
      },
      {
        name: "changeOfNameDate",
        label: "Date",
        type: "date",
        required: false,
      },
      { name: "evidence", label: "Evidence", type: "file", required: false },
    ],
  },
  {
    title: "Family background",
    dynamicFamily: true,
  },
  {
    title: "Family Structure",
    fields: [
      {
        name: "fatherWives",
        label: "Father's Number of Wives",
        type: "number",
        required: true,
        min: 1,
      },
      {
        name: "motherPosition",
        label: "Mother's Position",
        type: "select",
        options: [
          "First Wife",
          "Second Wife",
          "Third Wife",
          "Fourth Wife",
          "other",
        ],
        required: true,
      },
      {
        name: "totalSiblings",
        label: "Total Number of Siblings",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "maleSiblings",
        label: "Number of Male Siblings",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "femaleSiblings",
        label: "Number of Female Siblings",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "positionAmongSiblings",
        label: "Position Among Siblings",
        type: "number",
        min: 1,
        required: true,
      },
      {
        name: "parentsStatus",
        label: "Parents' Status",
        type: "select",
        options: ["Living Together", "Living Apart", "Separated", "Divorced"],
        required: true,
      },
    ],
  },
  {
    title: "Educational Background",
    dynamicEducation: true,
  },
  {
    title: "Additional Information",
    fields: [
      {
        name: "notes",
        label: "Additional Information",
        type: "textarea",
        required: false,
      },
    ],
  },
];

const familyRoles = [
  { key: "father", label: "Father" },
  { key: "mother", label: "Mother" },
  { key: "guardian", label: "Guardian" },
];

const familyFields = [
  { suffix: "Name", label: "Name", type: "text", required: true },
  {
    suffix: "ContactAddress",
    label: "Contact Address",
    type: "text",
    required: true,
  },
  {
    suffix: "ResidentialAddress",
    label: "Residential Address",
    type: "text",
    required: true,
  },
  { suffix: "Phone", label: "Phone", type: "text", required: true },
  { suffix: "State", label: "State", type: "text", required: true },
  { suffix: "Nationality", label: "Nationality", type: "text", required: true },
  { suffix: "Religion", label: "Religion", type: "text", required: true },
  {
    suffix: "EducationLevel",
    label: "Education Level",
    type: "text",
    required: true,
  },
  { suffix: "Occupation", label: "Occupation", type: "text", required: true },
  {
    suffix: "Deceased",
    label: "Deceased?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  { suffix: "Dob", label: "Date of Birth", type: "date", required: true },
];

const educationLevels = [
  { key: "primary", label: "Primary School" },
  { key: "junior", label: "Junior Secondary School" },
  { key: "senior", label: "Senior Secondary School" },
];

const educationFields = [
  { suffix: "SchoolName", label: "School Name", type: "text" },
  { suffix: "AdmissionYear", label: "Year of Admission", type: "number" },
  { suffix: "GraduationYear", label: "Year of Graduation", type: "number" },
  { suffix: "LeavingReason", label: "Reason for Leaving", type: "text" },
  { suffix: "CertificateNumber", label: "Certificate Number", type: "text" },
];

export default function ProfileAssessmentForm() {
  const [step, setStep] = useState(0);
  const [activeRoles, setActiveRoles] = useState(["father"]);
  const [activeEducationLevels, setActiveEducationLevels] = useState([
    "primary",
  ]);
  const [familyError, setFamilyError] = useState("");
  const [educationError, setEducationError] = useState("");
  const [editing, setEditing] = useState(false);

  const {
    loading,
    error,
    profileData,
    updatePersonalData,
    updateFamilyBackground,
    updateFamilyStructure,
    updateEducationalBackground,
    updateNotes,
  } = useProfileAssessment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm({ mode: "onTouched" });

  // Set form values when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      const data = profileData.data;
      console.log("Profile Data:", data);

      // Personal Data
      if (data.personalData) {
        Object.entries(data.personalData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            setValue(key, value);
          }
        });
      }

      // Family Background
      if (data.familyBackground) {
        const roles = [];
        
        if (data.familyBackground.father?.name) {
          roles.push("father");
          Object.entries(data.familyBackground.father).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              setValue(`father${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
            }
          });
        }

        if (data.familyBackground.mother?.name) {
          roles.push("mother");
          Object.entries(data.familyBackground.mother).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              setValue(`mother${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
            }
          });
        }

        if (data.familyBackground.guardian?.name) {
          roles.push("guardian");
          Object.entries(data.familyBackground.guardian).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              setValue(`guardian${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
            }
          });
        }

        setActiveRoles(roles);
      }

      // Family Structure
      if (data.familyStructure) {
        Object.entries(data.familyStructure).forEach(([key, value]) => {
          if (value !== null && value !== undefined && !['completed', '_id', 'createdAt', 'updatedAt', 'siblings'].includes(key)) {
            setValue(key, value);
          }
        });
      }

      // Educational Background
      if (data.educationalBackground) {
        const levels = [];

        if (data.educationalBackground.schools?.primarySchoolName) {
          levels.push("primary");
          Object.entries(data.educationalBackground.schools).forEach(
            ([key, value]) => {
              if (
                key.startsWith("primary") &&
                value !== null &&
                value !== undefined
              ) {
                setValue(key, value);
              }
            }
          );
        }

        if (data.educationalBackground.schools?.juniorSecondarySchoolName) {
          levels.push("junior");
          Object.entries(data.educationalBackground.schools).forEach(
            ([key, value]) => {
              if (
                key.startsWith("juniorSecondary") &&
                value !== null &&
                value !== undefined
              ) {
                const newKey = key.replace("juniorSecondary", "junior");
                setValue(newKey, value);
              }
            }
          );
        }

        if (data.educationalBackground.schools?.seniorSecondarySchoolName) {
          levels.push("senior");
          Object.entries(data.educationalBackground.schools).forEach(
            ([key, value]) => {
              if (
                key.startsWith("seniorSecondary") &&
                value !== null &&
                value !== undefined
              ) {
                const newKey = key.replace("seniorSecondary", "senior");
                setValue(newKey, value);
              }
            }
          );
        }

        setActiveEducationLevels(levels);
      }

      // Notes
      if (data.notes) {
        setValue("notes", data.notes);
      }
    }
  }, [profileData, setValue]);

  const onSave = async (data) => {
    try {
      switch (step) {
        case 0:
          await updatePersonalData(data);
          break;
        case 1:
          await updateFamilyBackground(data);
          break;
        case 2:
          const parsedData = { ...data };

          const numberFields = [
            "fatherWives",
            "totalSiblings",
            "maleSiblings",
            "femaleSiblings",
            "positionAmongSiblings",
          ];

          numberFields.forEach((key) => {
            if (parsedData[key] !== undefined && parsedData[key] !== "") {
              parsedData[key] = Number(parsedData[key]);
            }
          });

          await updateFamilyStructure(parsedData);
          break;

        case 3:
          await updateEducationalBackground(data);
          break;
        case 4:
          await updateNotes(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const onNext = async () => {
    if (steps[step].dynamicFamily) {
      const values = getValues();
      const hasAtLeastOne = activeRoles.some(
        (role) => values[`${role}_name`] && values[`${role}_name`].trim() !== ""
      );
      // if (!hasAtLeastOne) {
      //   setFamilyError('Please fill at least one family member name.');
      //   return;
      // }
      setFamilyError("");
    }

    if (steps[step].dynamicEducation) {
      const values = getValues();
      const hasPrimarySchool =
        activeEducationLevels.includes("primary") &&
        values["primarySchoolName"] &&
        values["primarySchoolName"].trim() !== "";

      if (!hasPrimarySchool) {
        setEducationError("Please fill in the Primary School information.");
        return;
      }
      setEducationError("");
    }

    try {
      const data = getValues();
      // await onSave(data);

      if (step === steps.length - 1) {
        toast.success("Profile assessment completed successfully!");
      } else {
        setStep((s) => Math.min(steps.length - 1, s + 1));
      }
    } catch (error) {
      console.error("Error proceeding to next step:", error);
    }
  };

  const onPrev = () => setStep((s) => Math.max(0, s - 1));

  const toggleRole = (role) => {
    setActiveRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleEducationLevel = (level) => {
    if (level === "primary") return;
    setActiveEducationLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const currentStep = steps[step];

  return (
    <div className="h-[100vh] overflow-y-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 py-4 bg-white border-b border-gray-100">
        {steps.map((s, idx) => (
          <div key={s.title || idx} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white text-sm transition-colors
              ${idx === step ? "bg-[#184C85]" : "bg-gray-300"}`}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-300 mx-1 rounded" />
            )}
          </div>
        ))}
      </div>
      {/* Scrollable Form Container */}
      <div className="flex-1 flex justify-center items-center bg-[#f6f8fa]">
        <div className="max-w-[90%] w-full bg-white rounded-xl shadow p-8 my-8">
          <h2 className="text-2xl font-bold mb-6 text-[#184C85]">
            {currentStep.title}
          </h2>
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#184C85] mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSave)}>
            {currentStep.dynamicFamily ? (
              <>
                <div className="flex gap-4 mb-6">
                  {familyRoles.map(({ key, label }) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => toggleRole(key)}
                      className={`px-4 py-2 rounded-lg font-semibold border ${
                        activeRoles.includes(key)
                          ? "bg-[#184C85] text-white"
                          : "bg-white text-[#184C85] border-[#184C85]"
                      }`}
                    >
                      {activeRoles.includes(key)
                        ? `Remove ${label}`
                        : `Add ${label}`}
                    </button>
                  ))}
                </div>
                {activeRoles.length === 0 && (
                  <div className="text-red-500 mb-4">
                    Please add at least one family member.
                  </div>
                )}
                {familyError && (
                  <div className="text-red-500 mb-4">{familyError}</div>
                )}
                {activeRoles.map((role) => (
                  <div key={role} className="border rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-[#184C85] mb-2">
                      {familyRoles.find((r) => r.key === role).label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {familyFields.map((field) => {
                        const fieldName = `${role}${field.suffix}`;
                        return (
                          <div key={fieldName} className="mb-2">
                            <label
                              className="block mb-1 font-medium text-gray-700"
                              htmlFor={fieldName}
                            >
                              {field.label}
                              {field.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {field.type === "select" ? (
                              <select
                                id={fieldName}
                                {...register(fieldName, {
                                  required: field.required,
                                })}
                                disabled={!editing}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                                  !editing ? "bg-gray-100 text-gray-500" : ""
                                }`}
                              >
                                <option value="">Select</option>
                                {field.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                id={fieldName}
                                type={field.type}
                                {...register(fieldName, {
                                  required: field.required,
                                })}
                                disabled={!editing}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                                  !editing ? "bg-gray-100 text-gray-500" : ""
                                }`}
                              />
                            )}
                            {errors[fieldName] && (
                              <span className="text-xs text-red-500">
                                This field is required
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            ) : currentStep.dynamicEducation ? (
              <>
                <div className="flex gap-4 mb-6">
                  {educationLevels.map(({ key, label }) => (
                    <button
                      type="button"
                      key={key}
                      disabled={!editing}
                      onClick={() => toggleEducationLevel(key)}
                      className={`px-4 py-2 rounded-lg font-semibold border ${
                        activeEducationLevels.includes(key)
                          ? "bg-[#184C85] text-white"
                          : "bg-white text-[#184C85] border-[#184C85]"
                      }`}
                    >
                      {activeEducationLevels.includes(key)
                        ? `Remove ${label}`
                        : `Add ${label}`}
                    </button>
                  ))}
                </div>
                {educationError && (
                  <div className="text-red-500 mb-4">{educationError}</div>
                )}
                {activeEducationLevels.map((level) => (
                  <div key={level} className="border rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-[#184C85] mb-2">
                      {educationLevels.find((l) => l.key === level).label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {educationFields.map((field) => {
                        const fieldName = `${level}${field.suffix}`;
                        return (
                          <div key={fieldName} className="mb-2">
                            <label
                              className="block mb-1 font-medium text-gray-700"
                              htmlFor={fieldName}
                            >
                              {field.label}
                              {field.suffix !== "certificate_number" && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            <input
                              id={fieldName}
                              type={field.type}
                              {...register(fieldName, {
                                required: field.suffix !== "certificate_number",
                              })}
                              disabled={!editing}
                              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${!editing ? "bg-gray-100 text-gray-500" : ""}`}
                            />
                            {errors[fieldName] && (
                              <span className="text-xs text-red-500">
                                This field is required
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentStep.fields.map((field) => (
                  <div key={field.name} className="mb-2">
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor={field.name}
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {field.description && (
                      <div className="text-xs text-gray-500 mb-1">
                        {field.description}
                      </div>
                    )}
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        {...register(field.name, { required: field.required })}
                        disabled={!editing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] min-h-[100px] ${
                          !editing ? "bg-gray-100 text-gray-500" : ""
                        }`}
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        {...register(field.name, { required: field.required })}
                        disabled={!editing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                          !editing ? "bg-gray-100 text-gray-500" : ""
                        }`}
                      >
                        <option value="">Select</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "file" ? (
                      <input
                        id={field.name}
                        type="file"
                        disabled={!editing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                          !editing ? "bg-gray-100 text-gray-500" : ""
                        }`}
                        onChange={(e) =>
                          setValue(field.name, e.target.files[0])
                        }
                      />
                    ) : (
                      <input
                        id={field.name}
                        type={field.type}
                        {...register(field.name, { required: field.required })}
                        disabled={!editing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                          !editing ? "bg-gray-100 text-gray-500" : ""
                        }`}
                      />
                    )}
                    {errors[field.name] && (
                      <span className="text-xs text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between mt-8">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={step === 0 || loading}
                  className="px-3 md:px-6 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(!editing)}
                  className="px-3 md:px-6 py-2 rounded-lg font-semibold border border-gray-300 bg-[#184C85] hover:bg-[#224b77] text-white disabled:opacity-50"
                >
                  {editing ? "Preview" : "Edit"}
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !editing}
                  className="px-3 md:px-6 py-2 rounded-lg font-semibold bg-[#184C85] text-white hover:bg-[#123a69] transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={loading}
                  className="px-3 md:px-6 py-2 rounded-lg font-semibold bg-[#184C85] text-white hover:bg-[#123a69] transition disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : step === steps.length - 1
                    ? "Submit"
                    : "Next"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
