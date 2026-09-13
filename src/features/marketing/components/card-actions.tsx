type CardActionsProps = {
  onDownload: () => void;
  onExchange: () => void;
  onShare: () => void;
  shareMessage: string;
  /** Ce que telecharge le bouton principal : « la vCard », « mes contacts »… */
  downloadLabel: string;
};

/** Les trois actions du verso, communes a toutes les cartes. */
export const CardActions = ({
  onDownload,
  onExchange,
  onShare,
  shareMessage,
  downloadLabel,
}: CardActionsProps) => (
  <>
    <div className="flex w-full flex-col items-center gap-3">
      <button
        type="button"
        onClick={onDownload}
        className="min-h-[48px] w-full max-w-72 rounded-sm bg-kora-copper px-5 text-sm font-medium text-kora-ink transition-colors duration-200 ease-out-expo hover:bg-kora-ember"
      >
        {downloadLabel}
      </button>
      <button
        type="button"
        onClick={onExchange}
        className="min-h-[48px] w-full max-w-72 rounded-sm border border-kora-copper/50 px-5 text-sm text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper hover:bg-kora-copper/10"
      >
        Partager mes coordonnées
      </button>
      <button
        type="button"
        onClick={onShare}
        className="min-h-[44px] text-sm text-kora-sand/70 underline-offset-4 transition-colors duration-200 ease-out-expo hover:text-kora-sand hover:underline"
      >
        Envoyer cette carte à quelqu&apos;un
      </button>
    </div>

    <p
      role="status"
      aria-live="polite"
      className="min-h-5 text-[13.5px] text-kora-sand/80"
    >
      {shareMessage}
    </p>
  </>
);
