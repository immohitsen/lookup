interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center font-sans">
      <div className="w-12 h-12 rounded-2xl bg-[#E09F3E]/15 border border-[#E09F3E]/30 flex items-center justify-center text-xl text-[#E09F3E] mb-1">
        ✨
      </div>
      <h3 className="text-base font-bold text-[#540B0E]">{title}</h3>
      {description && <p className="text-[#766050] text-sm max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
