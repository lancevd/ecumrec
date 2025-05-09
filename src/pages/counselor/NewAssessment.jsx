import { useForm } from "react-hook-form";
import { useState } from "react";

const steps = [
  {
    title: "Student's personal data",
    fields: [
      { name: "surname", label: "Surname", type: "text", required: true },
      { name: "first_name", label: "First Name", type: "text", required: true },
      {
        name: "sex",
        label: "Sex",
        type: "select",
        options: ["Male", "Female"],
        required: true,
      },
      {
        name: "admission_no",
        label: "Admission No",
        type: "text",
        required: true,
      },
      {
        name: "year_of_admission",
        label: "Year of Admission",
        type: "number",
        required: true,
      },
      {
        name: "college_house",
        label: "College House",
        type: "text",
        required: false,
      },
      { name: "dob", label: "Date of Birth", type: "date", required: true },
      {
        name: "place_of_birth",
        label: "Place of Birth",
        type: "text",
        required: true,
      },
      {
        name: "permanent_address",
        label: "Permanent Home Address",
        type: "text",
        required: true,
        description: "P.O Box, PMB not acceptable",
      },
      {
        name: "contact_address",
        label: "Contact Address",
        type: "text",
        required: true,
      },
      {
        name: "state_of_origin",
        label: "State of Origin",
        type: "text",
        required: true,
      },
      {
        name: "languages_spoken",
        label: "Languages Spoken",
        type: "text",
        required: false,
      },
      {
        name: "countries_visited",
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
        name: "change_of_name",
        label: "Change of Name (if any)",
        type: "text",
        required: false,
      },
      {
        name: "change_of_name_date",
        label: "Date",
        type: "date",
        required: false,
      },
      {
        name: "change_of_name_evidence",
        label: "Evidence",
        type: "file",
        required: false,
      },
    ],
  },
  {
    title: "Family background",
    dynamicFamily: true,
  },
  // ...other steps
];

const familyRoles = [
  { key: 'father', label: 'Father' },
  { key: 'mother', label: 'Mother' },
  { key: 'guardian', label: 'Guardian' },
];

const familyFields = [
  { suffix: 'name', label: 'Name', type: 'text' },
  { suffix: 'contact_address', label: 'Contact Address', type: 'text' },
  { suffix: 'residential_address', label: 'Residential Address', type: 'text' },
  { suffix: 'phone', label: 'Phone', type: 'text' },
  { suffix: 'state', label: 'State', type: 'text' },
  { suffix: 'nationality', label: 'Nationality', type: 'text' },
  { suffix: 'religion', label: 'Religion', type: 'text' },
  { suffix: 'education_level', label: 'Education Level', type: 'text' },
  { suffix: 'occupation', label: 'Occupation', type: 'text' },
  { suffix: 'deceased', label: 'Deceased?', type: 'select', options: ['Yes', 'No'] },
  { suffix: 'dob', label: 'Date of Birth', type: 'date' },
];

export default function NewAssessment() {
  const [step, setStep] = useState(0);
  const [activeRoles, setActiveRoles] = useState(['father']);
  const [familyError, setFamilyError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm({ mode: "onTouched" });

  const onSave = (data) => {
    // Simulate save to database
    alert("Saved! (Simulated)");
    // Here you would call your API
  };

  const onNext = () => {
    if (steps[step].dynamicFamily) {
      // Validate at least one name is filled
      const values = getValues();
      const hasAtLeastOne = activeRoles.some(role => values[`${role}_name`] && values[`${role}_name`].trim() !== '');
      if (!hasAtLeastOne) {
        setFamilyError('Please fill at least one family member name.');
        return;
      }
      setFamilyError('');
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const onPrev = () => setStep((s) => Math.max(0, s - 1));

  const toggleRole = (role) => {
    setActiveRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const currentStep = steps[step];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8 text-center">
      <h2 className="text-2xl font-bold mb-6 text-[#184C85]">New Assessment</h2>
      <p className="text-gray-600">A new assessment form will be added here soon.</p>
    </div>
  );
}
