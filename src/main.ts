import "./style.css";
import { DATA, ROUTES } from "./data";
import { DONE_KEY, DATA_KEY, GOT_KEY, load, save, STATE_KEY } from "./storage";
import { render, renderHeader } from "./render";
import type { Checks, RouteId, SectionId, Sheet, State } from "./types";

let data: Sheet = DATA;
const state = load<State>(STATE_KEY, { route: "the", sec: "para", tol: 0, theme: "" });
let done = load<Checks>(DONE_KEY, {});
let got = load<Checks>(GOT_KEY, {});
try { const d = load<Sheet | null>(DATA_KEY, null); if (d && d.recruits) data = d; } catch { /* ignored */ }
const lords = document.getElementById("lords") as HTMLElement;
const secs = document.getElementById("secs") as HTMLElement;
const main = document.getElementById("main") as HTMLElement;
function applyTheme(): void { if (state.theme) document.documentElement.dataset.theme = state.theme; else delete document.documentElement.dataset.theme; }
function renderPage(): void { const header = renderHeader(data, state); document.documentElement.style.setProperty("--accent", header.accent); lords.innerHTML = header.lords; secs.innerHTML = header.secs; main.innerHTML = render(data, state, done, got); }
function closest(target: EventTarget | null, selector: string): HTMLElement | null { return target instanceof Element ? target.closest<HTMLElement>(selector) : null; }
lords.addEventListener("click", (e) => { const b = closest(e.target, ".lord"); const route = b?.dataset.r; if (!b || !route || !ROUTES.includes(route as RouteId)) return; state.route = route as RouteId; save(STATE_KEY, state); renderPage(); });
secs.addEventListener("click", (e) => { const b = closest(e.target, ".sec"); const sec = b?.dataset.s; if (!b || !sec || !["para", "rec", "miss", "cal", "data"].includes(sec)) return; state.sec = sec as SectionId; save(STATE_KEY, state); renderPage(); window.scrollTo({ top: 0 }); });
(document.getElementById("themeBtn") as HTMLButtonElement).addEventListener("click", () => { const cur = document.documentElement.dataset.theme || ""; const next = cur === "dark" ? "light" : cur === "light" ? "" : "dark"; state.theme = next; save(STATE_KEY, state); applyTheme(); });
main.addEventListener("click", (e) => { const d = closest(e.target, "[data-done]"); if (d?.dataset.done) { done[d.dataset.done] = !done[d.dataset.done]; save(DONE_KEY, done); renderPage(); return; } const g = closest(e.target, "[data-got]"); if (g?.dataset.got) { got[g.dataset.got] = !got[g.dataset.got]; save(GOT_KEY, got); renderPage(); return; } const t = closest(e.target, "[data-tol]"); if (t?.dataset.tol) { state.tol = Number(t.dataset.tol); save(STATE_KEY, state); renderPage(); return; } const target = e.target; if (!(target instanceof HTMLElement)) return; if (target.id === "saveJson") { const json = document.getElementById("json") as HTMLTextAreaElement; const msg = document.getElementById("msg") as HTMLElement; try { const v: unknown = JSON.parse(json.value); if (!isSheetLike(v)) throw new Error("missing recruits/paralogues"); data = v; save(DATA_KEY, v); msg.textContent = "Saved. Switch tabs to see it."; } catch (err) { msg.textContent = "Not saved — invalid JSON: " + (err instanceof Error ? err.message : String(err)); } } if (target.id === "resetJson") { data = DATA; try { localStorage.removeItem(DATA_KEY); } catch { /* ignored */ } renderPage(); (document.getElementById("msg") as HTMLElement).textContent = "Reset to built-in data."; } if (target.id === "clearProg") { done = {}; got = {}; save(DONE_KEY, done); save(GOT_KEY, got); (document.getElementById("msg") as HTMLElement).textContent = "Checkmarks cleared."; } });
function isSheetLike(value: unknown): value is Sheet { return typeof value === "object" && value !== null && "recruits" in value && "paralogues" in value; }
applyTheme(); renderPage();
