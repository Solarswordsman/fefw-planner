import type { FreeTimeWindow, RouteId, Sheet } from "./types";

const MD = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/** In-game M/D → day-of-year number. */
export function dn(s: string): number {
	const [m, d] = s.split("/").map(Number);
	let n = 0;
	for (let i = 1; i < m; i += 1) n += MD[i];
	return n + d;
}
export function chapterFor(data: Sheet, route: RouteId, day: number): FreeTimeWindow | null {
	const ft = data.freeTime[route] || [];
	for (const c of ft) if (day >= dn(c[1]) && day <= dn(c[2])) return c;
	return null;
}
