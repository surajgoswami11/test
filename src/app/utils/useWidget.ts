import { useEffect, useMemo, useState } from "react";
import { fetchWidget } from "./widgetClient";
import type { WidgetId } from "../types/widget.types";

export function useWidget<TData = any, TInputs = any>(
  widgetId: WidgetId,
  inputs: TInputs
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stableInputs = useMemo(() => JSON.stringify(inputs), [inputs]);

  useEffect(() => {
    let mounted = true;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchWidget<TData, TInputs>({ widgetId, inputs });

        if (!mounted) return;

        if (!res.ok) {
          setError(res.error || "Something went wrong");
          setData(null);
          return;
        }

        setData((res.data as TData) || null);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || "Request failed");
        setData(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    run();

    return () => {
      mounted = false;
    };
  }, [widgetId, stableInputs]);

  return { data, loading, error };
}
