import { useState } from 'react';

const steps = [
  'Academic Data',
  'Behavioral Data',
  'Socio-emotional Data',
  'Review & Submit',
];

export default function NewAssessment() {
  const [step, setStep] = useState(0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Assessment</h1>
      <div className="flex items-center mb-8">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${idx === step ? 'bg-primary' : 'bg-gray-300'}`}>{idx + 1}</div>
            {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">{steps[step]}</h2>
        <div className="text-gray-600 mb-4">[Form fields for {steps[step]} go here]</div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              className="px-4 py-2 rounded bg-primary text-white"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              Next
            </button>
          ) : (
            <button className="px-4 py-2 rounded bg-green-600 text-white">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
} 