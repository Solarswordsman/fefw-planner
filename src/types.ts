/** The four Part I routes, in display order. */
export const ROUTES = ["cai", "die", "the", "leda"] as const;
export type RouteId = typeof ROUTES[number];
export type SectionId = "para" | "rec" | "miss" | "cal" | "data";

export interface Route {
	name: string;
	sigil: string;
	color: string;
}

/** Free-time windows per chapter (from RPG Site walkthroughs). */
export type FreeTimeWindow = [
	chapter: number,
	start: string,
	end: string,
	note?: string,
];

export type DateWindow = [start: string, end: string];

/** A route's pickup windows and deadline for one paralogue. */
export interface RouteParalogue {
	windows: DateWindow[];
	deadline: string;
	flag?: string;
}

/** Paralogues. Windows are pickup windows; deadline is the last day to finish. */
export interface Paralogue {
	id: string;
	name: string;
	char: string;
	from: string;
	reward: string;
	note: string;
	routes: Partial<Record<RouteId, RouteParalogue>>;
}

/** [Support, Renown, extra] | "auto" | null (not recruitable on that route). */
export type RecruitReq = [support: number, renown: number, extra: string] | string | null;

/** Recruitment conditions, with one requirement per route. */
export interface Recruit {
	n: string;
	cai: RecruitReq;
	die: RecruitReq;
	the: RecruitReq;
	leda: RecruitReq;
	gate?: string;
	tip?: string;
	conflict?: string;
	team?: string;
	appears?: string;
}

/** Route-specific things that would suck to miss. `ch` is a chapter number. */
export interface DontMissItem {
	ch?: number;
	t: string;
	s: string;
	hot?: boolean;
}

/** The complete editable DATA object from the original artifact. */
export interface Sheet {
	version: string;
	routes: Record<RouteId, Route>;
	/* Free-time windows per chapter (from RPG Site walkthroughs). */
	freeTime: Record<RouteId, FreeTimeWindow[]>;
	/* Paralogues: windows are pickup windows; deadline is the last day to finish. */
	paralogues: Paralogue[];
	/* Recruits: [Support, Renown, extra] | "auto" | null. */
	recruits: Recruit[];
	/* Route-specific things that would suck to miss; `ch` is a chapter number. */
	dontMiss: Record<RouteId | "all", DontMissItem[]>;
}

/** Persisted UI selection state (`fw_state`). */
export interface State {
	route: RouteId;
	sec: SectionId;
	tol: number;
	theme: string;
}

export type Checks = Record<string, boolean>;
