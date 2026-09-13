export const analyticsEvents = [
  "hero_cta_clicked",
  "room_selected",
  "style_selected",
  "material_selected",
  "project_viewed",
  "visualizer_started",
  "photo_uploaded",
  "visualization_created",
  "quote_requested",
  "measurement_requested",
  "whatsapp_clicked",
  "phone_clicked",
  "service_selected",
  "custom_requested",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type AnalyticsAdapter = (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;

const adapters: AnalyticsAdapter[] = [];

export function registerAnalyticsAdapter(adapter: AnalyticsAdapter) {
  adapters.push(adapter);
}

function emitToWindow(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  const detail = { event, payload, timestamp: Date.now() };

  window.dispatchEvent(new CustomEvent("spacecraft:analytics", { detail }));

  const w = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer?.push({ event, ...payload });
  w.gtag?.("event", event, payload);
}

export function track(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  emitToWindow(event, payload);
  adapters.forEach((adapter) => adapter(event, payload));
}
