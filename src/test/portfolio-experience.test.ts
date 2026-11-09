import { describe, expect, it } from "vitest";
import {
  CONTACTS,
  openingCount,
  COUNTDOWN_DURATION,
  OPENING_DURATION,
  shouldShowOpening,
} from "@/lib/portfolio-experience";

describe("Portfolio visitor experience", () => {
  it("counts 3-2-1 before beginning the video reveal", () => {
    expect([0, 1000, 2000, 3000].map(openingCount)).toEqual([3, 2, 1, 0]);
    expect(COUNTDOWN_DURATION).toBe(3000);
    expect(OPENING_DURATION).toBeGreaterThan(COUNTDOWN_DURATION);
  });
  it("links Instagram to Palak's supplied account", () =>
    expect(CONTACTS.instagram).toBe("https://www.instagram.com/thepalakvoice/"));
  it("links LinkedIn to Palak's supplied profile", () =>
    expect(CONTACTS.linkedin).toBe("https://linkedin.com/in/pal-tripathi-"));
  it("addresses email to Palak", () =>
    expect(CONTACTS.email).toBe("mailto:palak09.learner@gmail.com"));
  it("shows the opening only on the first home-page visit", () => {
    expect(shouldShowOpening("/", false, false)).toBe(true);
    expect(shouldShowOpening("/", true, false)).toBe(false);
    expect(shouldShowOpening("/other", false, false)).toBe(false);
  });
  it("bypasses animated opening for reduced motion", () =>
    expect(shouldShowOpening("/", false, true)).toBe(false));
});
