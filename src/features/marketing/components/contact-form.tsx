import { Form } from '@/components/ui/form';
import { cn } from '@/utils/cn';

import { contactInputSchema, useSubmitContact } from '../api/submit-contact';
import { contactInfo } from '../data/contact-info';
import { CONTACT_FIRST_FIELD_ID } from '../utils/focus-contact-form';

import { ContactField, contactControlClassName } from './contact-field';

const SUBJECTS = [
  { value: 'evenementiel', label: 'Événementiel' },
  { value: 'branding', label: 'Communication & Branding' },
  { value: 'audiovisuel', label: 'Production Audiovisuelle' },
  { value: 'digital', label: 'Digital & Réseaux Sociaux' },
  { value: 'autre', label: 'Autre' },
] as const;

export const ContactForm = () => {
  const submitContact = useSubmitContact();

  if (submitContact.isSuccess) {
    return (
      <div
        role="status"
        className="border border-kora-copper p-[clamp(1.5rem,4vw,2.25rem)]"
      >
        <p className="font-display text-quote-lg italic text-kora-sand">
          Message reçu. Nous revenons vers vous sous 48 heures ouvrées.
        </p>
        <button
          type="button"
          onClick={() => submitContact.reset()}
          className="mt-6 min-h-[44px] border-b border-kora-copper text-xs tracking-[0.16em] text-kora-copper"
        >
          ENVOYER UN AUTRE MESSAGE
        </button>
      </div>
    );
  }

  return (
    <Form
      schema={contactInputSchema}
      className="flex flex-col gap-6 space-y-0"
      onSubmit={(values) => submitContact.mutate({ data: values })}
    >
      {({ register, formState }) => (
        <>
          <ContactField
            id={CONTACT_FIRST_FIELD_ID}
            label="Nom complet *"
            error={formState.errors.nom?.message}
          >
            <input
              id={CONTACT_FIRST_FIELD_ID}
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(formState.errors.nom)}
              className={contactControlClassName}
              {...register('nom')}
            />
          </ContactField>

          <ContactField
            id="contact-email"
            label="E-mail *"
            error={formState.errors.email?.message}
          >
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(formState.errors.email)}
              className={contactControlClassName}
              {...register('email')}
            />
          </ContactField>

          <ContactField id="contact-organisation" label="Organisation">
            <input
              id="contact-organisation"
              type="text"
              autoComplete="organization"
              className={contactControlClassName}
              {...register('organisation')}
            />
          </ContactField>

          <ContactField id="contact-sujet" label="Votre besoin">
            <select
              id="contact-sujet"
              defaultValue="evenementiel"
              className={cn(contactControlClassName, 'bg-kora-bark')}
              {...register('sujet')}
            >
              {SUBJECTS.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </ContactField>

          <ContactField
            id="contact-message"
            label="Votre projet *"
            error={formState.errors.message?.message}
          >
            <textarea
              id="contact-message"
              rows={3}
              aria-invalid={Boolean(formState.errors.message)}
              className={cn(
                contactControlClassName,
                'resize-y leading-relaxed',
              )}
              {...register('message')}
            />
          </ContactField>

          {submitContact.isError ? (
            <p role="alert" className="text-[13.5px] text-kora-copper">
              {submitContact.error instanceof Error
                ? submitContact.error.message
                : "L'envoi a échoué. Réessayez dans un instant."}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitContact.isPending}
            className="min-h-[56px] w-full rounded-sm bg-kora-copper text-[15px] font-medium text-kora-ink transition-colors duration-200 ease-out-expo hover:bg-kora-ember disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitContact.isPending ? 'Envoi en cours…' : 'Envoyer ma demande'}
          </button>

          <p className="text-[13.5px] leading-relaxed text-kora-sand/65">
            Ou écrivez-nous directement à{' '}
            <a
              href={`mailto:${contactInfo.email}`}
              className="border-b border-kora-copper/40 text-kora-copper"
            >
              {contactInfo.email}
            </a>
          </p>
        </>
      )}
    </Form>
  );
};
