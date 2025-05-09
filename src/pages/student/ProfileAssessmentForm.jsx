import { useForm } from 'react-hook-form';
import { useState } from 'react';

const steps = [
  {
    title: "Student's personal data",
    fields: [
      { name: 'surname', label: 'Surname', type: 'text', required: true },
      { name: 'first_name', label: 'First Name', type: 'text', required: true },
      { name: 'sex', label: 'Sex', type: 'select', options: ['Male', 'Female'], required: true },
      { name: 'admission_no', label: 'Admission No', type: 'text', required: true },
      { name: 'year_of_admission', label: 'Year of Admission', type: 'number', required: true },
      { name: 'college_house', label: 'College House', type: 'text', required: false },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { name: 'place_of_birth', label: 'Place of Birth', type: 'text', required: true },
      { name: 'permanent_address', label: 'Permanent Home Address', type: 'text', required: true, description: 'P.O Box, PMB not acceptable' },
      { name: 'contact_address', label: 'Contact Address', type: 'text', required: true },
      { name: 'state_of_origin', label: 'State of Origin', type: 'text', required: true },
      { name: 'languages_spoken', label: 'Languages Spoken', type: 'text', required: false },
      { name: 'countries_visited', label: 'Countries Visited', type: 'text', required: false },
      { name: 'religion', label: 'Religion', type: 'text', required: false },
      { name: 'nationality', label: 'Nationality', type: 'text', required: true },
      { name: 'change_of_name', label: 'Change of Name (if any)', type: 'text', required: false },
      { name: 'change_of_name_date', label: 'Date', type: 'date', required: false },
      { name: 'change_of_name_evidence', label: 'Evidence', type: 'file', required: false },
    ],
  },
  {
    title: 'Family background',
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

export default function ProfileAssessmentForm() {
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
  } = useForm({ mode: 'onTouched' });

  const onSave = (data) => {
    alert('Saved! (Simulated)');
  };

  const onNext = () => {
    if (steps[step].dynamicFamily) {
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
          <form onSubmit={handleSubmit(onSave)}>
            {currentStep.dynamicFamily ? (
              <>
                <div className="flex gap-4 mb-6">
                  {familyRoles.map(({ key, label }) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => toggleRole(key)}
                      className={`px-4 py-2 rounded-lg font-semibold border ${activeRoles.includes(key) ? 'bg-[#184C85] text-white' : 'bg-white text-[#184C85] border-[#184C85]'}`}
                    >
                      {activeRoles.includes(key) ? `Remove ${label}` : `Add ${label}`}
                    </button>
                  ))}
                </div>
                {activeRoles.length === 0 && (
                  <div className="text-red-500 mb-4">Please add at least one family member.</div>
                )}
                {familyError && <div className="text-red-500 mb-4">{familyError}</div>}
                {activeRoles.map((role) => (
                  <div key={role} className="border rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-[#184C85] mb-2">{familyRoles.find(r => r.key === role).label}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {familyFields.map((field) => {
                        const fieldName = `${role}_${field.suffix}`;
                        return (
                          <div key={fieldName} className="mb-2">
                            <label className="block mb-1 font-medium text-gray-700" htmlFor={fieldName}>
                              {field.label}
                            </label>
                            {field.type === 'select' ? (
                              <select
                                id={fieldName}
                                {...register(fieldName)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                              >
                                <option value="">Select</option>
                                {field.options.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                id={fieldName}
                                type={field.type}
                                {...register(fieldName)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                              />
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
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        {...register(field.name, { required: field.required })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                        onChange={(e) => setValue(field.name, e.target.files[0])}
                      />
                    ) : (
                      <input
                        id={field.name}
                        type={field.type}
                        {...register(field.name, { required: field.required })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
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
              <button
                type="button"
                onClick={onPrev}
                disabled={step === 0}
                className="px-3 md:px-6 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-3 md:px-6 py-2 rounded-lg font-semibold bg-[#184C85] text-white hover:bg-[#123a69] transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="px-3 md:px-6 py-2 rounded-lg font-semibold bg-[#184C85] text-white hover:bg-[#123a69] transition"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 