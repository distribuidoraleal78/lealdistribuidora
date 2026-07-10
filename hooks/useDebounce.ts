import { useEffect, useState } from "react";

/** Atrasa a atualização de um valor — usado na busca do catálogo para não disparar
 * uma consulta a cada tecla digitada. */
export function useDebounce<T>(value: T, delayMs = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
