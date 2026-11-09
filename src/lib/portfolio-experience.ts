export const CONTACTS = {
  instagram: "https://www.instagram.com/thepalakvoice/",
  linkedin: "https://linkedin.com/in/pal-tripathi-",
  email: "mailto:palak09.learner@gmail.com",
  phone: "tel:+917440608049",
};

export const COUNTDOWN_DURATION = 3000;
export const OPENING_DURATION = 3800;
export function openingCount(elapsed: number) {
  return Math.max(0, 3 - Math.floor(elapsed / 1000));
}
export function shouldShowOpening(path: string, seen: boolean, reducedMotion: boolean) {
  return path === "/" && !seen && !reducedMotion;
}
