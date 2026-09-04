/** Id du premier champ du formulaire de contact. */
export const CONTACT_FIRST_FIELD_ID = 'contact-nom';

/**
 * Laisse le scroll fluide atteindre la section contact avant de poser le focus.
 * `preventScroll` evite un second saut de scroll concurrent.
 */
export const focusContactForm = () => {
  window.setTimeout(() => {
    const field = document.getElementById(CONTACT_FIRST_FIELD_ID);
    field?.focus({ preventScroll: true });
  }, 700);
};
