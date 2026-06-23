type Props = {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export function SectionHeader({ label, title, subtitle, center = false }: Props) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        <div className="w-8 h-px bg-ag-gold" />
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-ag-gold">
          {label}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-ag-black leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-sm text-ag-muted mt-4 max-w-md leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
