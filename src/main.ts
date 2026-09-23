import "./style.css";
import { DATA, ROUTES, SECTIONS } from "./data";
import { render, renderHeader } from "./render";
import { DATA_KEY, DONE_KEY, GOT_KEY, load, save, STATE_KEY } from "./storage";
import type { Checks, RouteId, SectionId, Sheet, State } from "./types";

let data: Sheet = DATA;
const state = load<State>(STATE_KEY, {
	route: "the",
	sec: "para",
	tol: 0,
	theme: "",
});
let done = load<Checks>(DONE_KEY, {});
let got = load<Checks>(GOT_KEY, {});

try {
	const savedData = load<Sheet | null>(DATA_KEY, null);
	if (savedData && savedData.recruits) data = savedData;
} catch {
	// Keep the built-in data when saved data cannot be read.
}

const lords = document.getElementById("lords") as HTMLElement;
const secs = document.getElementById("secs") as HTMLElement;
const main = document.getElementById("main") as HTMLElement;
const themeBtn = document.getElementById("themeBtn") as HTMLButtonElement;

function applyTheme(): void {
	if (state.theme) document.documentElement.dataset.theme = state.theme;
	else delete document.documentElement.dataset.theme;
}

function renderPage(): void {
	const header = renderHeader(data, state);
	document.documentElement.style.setProperty("--accent", header.accent);
	lords.innerHTML = header.lords;
	secs.innerHTML = header.secs;
	main.innerHTML = render(data, state, done, got);
}

function closest(target: EventTarget | null, selector: string): HTMLElement | null {
	return target instanceof Element ? target.closest<HTMLElement>(selector) : null;
}

function isSheetLike(value: unknown): value is Sheet {
	return typeof value === "object" && value !== null
		&& "recruits" in value && "paralogues" in value;
}

function onLordsClick(e: MouseEvent): void {
	const button = closest(e.target, ".lord");
	const route = button?.dataset.r;
	if (!button || !route || !ROUTES.includes(route as RouteId)) return;

	state.route = route as RouteId;
	save(STATE_KEY, state);
	renderPage();
}

function onSecsClick(e: MouseEvent): void {
	const button = closest(e.target, ".sec");
	const sec = button?.dataset.s;
	if (!button || !sec || !SECTIONS.some(([k]) => k === sec)) return;

	state.sec = sec as SectionId;
	save(STATE_KEY, state);
	renderPage();
	window.scrollTo({ top: 0 });
}

function onThemeClick(): void {
	const cur = document.documentElement.dataset.theme || "";
	const next = cur === "dark" ? "light" : cur === "light" ? "" : "dark";
	state.theme = next;
	save(STATE_KEY, state);
	applyTheme();
}

function saveJson(): void {
	const json = document.getElementById("json") as HTMLTextAreaElement;
	const msg = document.getElementById("msg") as HTMLElement;

	try {
		const value: unknown = JSON.parse(json.value);
		if (!isSheetLike(value)) throw new Error("missing recruits/paralogues");
		data = value;
		save(DATA_KEY, value);
		msg.textContent = "Saved. Switch tabs to see it.";
	} catch (err) {
		msg.textContent = "Not saved — invalid JSON: "
			+ (err instanceof Error ? err.message : String(err));
	}
}

function resetJson(): void {
	data = DATA;
	try {
		localStorage.removeItem(DATA_KEY);
	} catch {
		// Storage can be unavailable in private/restricted browsing contexts.
	}
	renderPage();
	(document.getElementById("msg") as HTMLElement).textContent = "Reset to built-in data.";
}

function clearProgress(): void {
	done = {};
	got = {};
	save(DONE_KEY, done);
	save(GOT_KEY, got);
	(document.getElementById("msg") as HTMLElement).textContent = "Checkmarks cleared.";
}

function onMainClick(e: MouseEvent): void {
	const doneButton = closest(e.target, "[data-done]");
	if (doneButton?.dataset.done) {
		done[doneButton.dataset.done] = !done[doneButton.dataset.done];
		save(DONE_KEY, done);
		renderPage();
		return;
	}

	const gotButton = closest(e.target, "[data-got]");
	if (gotButton?.dataset.got) {
		got[gotButton.dataset.got] = !got[gotButton.dataset.got];
		save(GOT_KEY, got);
		renderPage();
		return;
	}

	const toleranceButton = closest(e.target, "[data-tol]");
	if (toleranceButton?.dataset.tol) {
		state.tol = Number(toleranceButton.dataset.tol);
		save(STATE_KEY, state);
		renderPage();
		return;
	}

	if (!(e.target instanceof HTMLElement)) return;
	if (e.target.id === "saveJson") saveJson();
	if (e.target.id === "resetJson") resetJson();
	if (e.target.id === "clearProg") clearProgress();
}

lords.addEventListener("click", onLordsClick);
secs.addEventListener("click", onSecsClick);
themeBtn.addEventListener("click", onThemeClick);
main.addEventListener("click", onMainClick);

applyTheme();
renderPage();
