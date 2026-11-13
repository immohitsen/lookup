'use client';
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none font-sans">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-[#E09F3E]' : 'bg-[#540B0E]/20'}`}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5.5' : 'translate-x-0.5'}`}
        />
      </div>
      {label && <span className="text-sm font-semibold text-[#540B0E]">{label}</span>}
    </label>
  );
}
