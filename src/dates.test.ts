import { describe, expect, it } from "vitest";
import { DATA } from "./data";
import { chapterFor, dn } from "./dates";

describe("dn", () => { it("rolls over months", () => { expect(dn("3/1")).toBe(60); expect(dn("10/22")).toBe(295); }); });
describe("chapterFor", () => { it("picks the matching window and null outside", () => { expect(chapterFor(DATA, "the", dn("3/1"))?.[0]).toBe(4); expect(chapterFor(DATA, "the", dn("2/28"))).toBeNull(); expect(chapterFor(DATA, "the", dn("11/1"))).toBeNull(); }); });
