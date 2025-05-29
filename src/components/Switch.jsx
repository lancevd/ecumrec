export default function Switch({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`${
        enabled ? "bg-primary" : "bg-gray-200"
      } relative inline-flex h-6 w-11 border-blue-950 border-2 flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-5" : "translate-x-0"
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#6e687c] shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
} 