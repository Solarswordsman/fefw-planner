export const STATE_KEY = "fw_state";
export const DONE_KEY = "fw_done";
export const GOT_KEY = "fw_got";
export const DATA_KEY = "fw_data";
export function load<T>(k: string, def: T): T { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : def; } catch { return def; } }
export function save(k: string, v: unknown): void { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignored */ } }
