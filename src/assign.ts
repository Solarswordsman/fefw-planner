import { ROUTES } from "./data";
import type { Checks, Recruit, RouteId, Sheet } from "./types";

export function isReq(req: Recruit[RouteId]): req is [number, number, string] { return Array.isArray(req); }
export function isAuto(req: Recruit[RouteId]): req is string { return typeof req === "string"; }
export function minR(u: Recruit): number { const reqs = ROUTES.map((r) => u[r]).filter(isReq); return Math.min(...reqs.map((req) => req[1])); }
export function assign(data: Sheet, got: Checks, tol: number): { out: Record<string, RouteId>; count: Record<RouteId, number> } {
	const count: Record<RouteId, number> = { cai: 0, die: 0, the: 0, leda: 0 };
	const out: Record<string, RouteId> = {};
	const units = data.recruits.filter((u) => ROUTES.some((r) => isReq(u[r])) && !ROUTES.some((r) => isAuto(u[r])));
	units.sort((a, b) => { const ra = ROUTES.filter((r) => isReq(a[r])).length, rb = ROUTES.filter((r) => isReq(b[r])).length; if (ra !== rb) return ra - rb; return minR(b) - minR(a); });
	for (const u of units) {
		if (got[u.n]) continue;
		const cand = ROUTES.filter((r) => isReq(u[r]));
		const best = Math.min(...cand.map((r) => isReq(u[r]) ? u[r][1] : Infinity));
		const tied = cand.filter((r) => isReq(u[r]) && u[r][1] <= best + tol).sort((a, b) => { const ar = u[a], br = u[b]; return isReq(ar) && isReq(br) ? ar[1] - br[1] || count[a] - count[b] || ar[0] - br[0] : 0; });
		tied.sort((a, b) => { const ar = u[a], br = u[b]; return isReq(ar) && isReq(br) ? count[a] - count[b] || ar[1] - br[1] || ar[0] - br[0] : 0; });
		const chosen = tied[0]; out[u.n] = chosen; count[chosen] += 1;
	}
	return { out, count };
}
