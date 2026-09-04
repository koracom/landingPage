import * as React from 'react';

/**
 * Champ du formulaire de contact, decline pour le theme sombre de la landing.
 * Les primitives de `components/ui/form` restent utilisees pour la validation ;
 * seule la presentation est locale a la feature marketing.
 */
export const contactControlClassName =
  'min-h-[48px] w-full rounded-none border-0 border-b border-kora-sand/30 bg-transparent px-0 py-2 text-base text-kora-sand transition-colors duration-200 ease-out-expo placeholder:text-kora-sand/40 focus:border-kora-copper focus:outline-none focus-visible:outline-none';

type ContactFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const ContactField = ({
  id,
  label,
  error,
  children,
}: ContactFieldProps) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={id}
      className="text-[11px] uppercase tracking-[0.18em] text-kora-sand/75"
    >
      {label}
    </label>
    {children}
    {error ? (
      <span role="alert" className="text-[13.5px] text-kora-copper">
        {error}
      </span>
    ) : null}
  </div>
);
