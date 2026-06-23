type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function AdminHeader({ title, description, action }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-light text-ag-black">{title}</h1>
        {description && (
          <p className="font-sans text-sm text-ag-muted mt-2 max-w-xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export const adminInputClass =
  'w-full border border-ag-border bg-white px-4 py-3 font-sans text-sm text-ag-black placeholder:text-ag-muted focus:outline-none focus:border-ag-gold transition-colors';

export const adminLabelClass =
  'block font-sans text-[11px] tracking-[0.2em] uppercase text-ag-muted mb-2';

export const adminButtonPrimary =
  'inline-flex items-center justify-center font-sans text-xs tracking-[0.25em] uppercase bg-ag-gold text-white px-6 py-3 hover:bg-ag-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-ag-gold';

export const adminButtonSecondary =
  'inline-flex items-center justify-center font-sans text-xs tracking-[0.25em] uppercase border border-ag-border text-ag-charcoal px-6 py-3 hover:border-ag-gold hover:text-ag-gold transition-colors';

export const adminButtonDanger =
  'inline-flex items-center justify-center font-sans text-xs tracking-[0.25em] uppercase border border-red-200 text-red-600 px-6 py-3 hover:bg-red-50 transition-colors';
