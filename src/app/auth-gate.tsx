import * as React from 'react';

import { Spinner } from '@/components/ui/spinner';
import { AuthLoader } from '@/lib/auth';

/**
 * Charge la session avant de rendre les routes authentifiees.
 *
 * Volontairement place sur la branche `/app` et non dans `AppProvider` : la
 * landing publique ne doit declencher aucun appel `/auth/me`. Sinon chaque
 * visiteur attend un spinner plein ecran, recoit une notification d'erreur si
 * l'API est injoignable, et se fait rediriger vers la page de connexion sur un
 * 401 (voir l'intercepteur de `lib/api-client`).
 */
export const AuthGate = ({ children }: { children: React.ReactNode }) => (
  <AuthLoader
    renderLoading={() => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    )}
  >
    {children}
  </AuthLoader>
);
