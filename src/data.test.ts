import { describe, expect, it } from "vitest";
import { DATA, ROUTES } from "./data";
import { dn } from "./dates";

describe("data/sheet.json", () => {
	it("has valid route keys and paralogue windows", () => {
		for (const p of DATA.paralogues) {
			for (const [route, value] of Object.entries(p.routes)) {
				expect(ROUTES).toContain(route);
				if (!value) continue;

				for (const [start, end] of value.windows) {
					expect(start).toMatch(/^\d+\/\d+$/);
					expect(end).toMatch(/^\d+\/\d+$/);
					expect(dn(start)).toBeLessThanOrEqual(dn(end));
					expect(dn(end)).toBeLessThanOrEqual(dn(value.deadline));
				}
			}
		}
	});

	it("gives every recruit all four route keys and valid gates", () => {
		const ids = new Set(DATA.paralogues.map((p) => p.id));

		for (const u of DATA.recruits) {
			for (const route of ROUTES) {
				expect(route in u).toBe(true);
			}
			if (u.gate) expect(ids.has(u.gate)).toBe(true);
		}
	});

	it("uses numeric chapters in route-specific don't-miss items", () => {
		for (const route of ROUTES) {
			for (const item of DATA.dontMiss[route]) {
				expect(typeof item.ch).toBe("number");
			}
		}
	});
});
