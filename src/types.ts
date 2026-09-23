export const ROUTES = ["cai", "die", "the", "leda"] as const;
export type RouteId = typeof ROUTES[number];
export type SectionId = "para" | "rec" | "miss" | "cal" | "data";

export interface Route { name: string; sigil: string; color: string; }
/** Free-time window: chapter, start M/D, end M/D, optional route note. */
export type FreeTimeWindow = [number, string, string, string?];
export type DateWindow = [string, string];
export interface RouteParalogue { windows: DateWindow[]; deadline: string; flag?: string; }
export interface Paralogue { id: string; name: string; char: string; from: string; reward: string; note: string; routes: Partial<Record<RouteId, RouteParalogue>>; }
/** Recruit entries: [Support, Renown, extra] | "auto" | null (not recruitable there). */
export type RecruitReq = [number, number, string] | string | null;
export interface Recruit { n: string; cai: RecruitReq; die: RecruitReq; the: RecruitReq; leda: RecruitReq; gate?: string; tip?: string; conflict?: string; team?: string; appears?: string; }
/** Route-specific things that would suck to miss. when = chapter number or "all". */
export interface DontMissItem { ch?: number; t: string; s: string; hot?: boolean; }
export interface Sheet { version: string; routes: Record<RouteId, Route>; freeTime: Record<RouteId, FreeTimeWindow[]>; paralogues: Paralogue[]; recruits: Recruit[]; dontMiss: Record<RouteId | "all", DontMissItem[]>; }
export interface State { route: RouteId; sec: SectionId; tol: number; theme: string; }
export type Checks = Record<string, boolean>;
