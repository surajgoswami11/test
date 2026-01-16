import type { WidgetRequest, WidgetResponse } from "../types/widget.types";
import { buildWidgetPrompt } from "../widget/widgetPrompt";
import { transformWidget } from "../widget/widgetTransformers";

export async function fetchWidget<TData = any, TInputs = any>(
  payload: WidgetRequest<TInputs>
): Promise<WidgetResponse<TData>> {
  try {
    const prompt = buildWidgetPrompt(payload.widgetId, payload.inputs);

    const res = await fetch(
      `https://mify-ai-backend-640370259730.asia-south1.run.app/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: "tenantId",
          text: prompt,
          history: [],
        }),
      }
    );

    const raw = await res.json();

    console.log(raw,"this is ai resposne")

    // 🔥 Frontend middle layer transforms raw → stable JSON
    const transformed = transformWidget(payload.widgetId, raw, payload.inputs);

    return {
      ok: true,
      widgetId: payload.widgetId,
      data: transformed as TData,
      meta: {
        sources: raw?.sources || [],
        stepsUsed: raw?.stepsUsed,
        toolsUsed: raw?.toolsUsed,
      },
    };
  } catch (err: any) {
    return {
      ok: false,
      widgetId: payload.widgetId,
      error: err?.message || "Request failed",
    };
  }
}
