// Inline scripts written by hand in layouts. astro.config.mjs adds their hashes to the CSP,
// so the policy cannot drift from the code (scripts/check-csp.mjs verifies every page).
export const jsClassScript = "document.documentElement.classList.add('js')";
