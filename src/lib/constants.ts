export const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://throbbing-mouse-98cf.seannotpdiddyjohnson.workers.dev";

export const POLL_INTERVAL_MS = 30_000;
export const STALE_THRESHOLD_MS = 120_000;
