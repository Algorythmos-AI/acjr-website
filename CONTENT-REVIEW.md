# Content review before launch

The site copy was checked line by line against `docs/source/statuts-ACJR.md` (the statutes adopted on 17 September 2026), and French, English and Arabic were corrected together.

## Checked against the statutes ✔
- [x] **Preamble:** ten instruments, now including the UN Charter, and the stated aim (criminal justice, impunity, transitional justice, rule of law in Africa). See *Cadre juridique*.
- [x] **Art. 1–3:** the English name is the legal reference and CADJ is the French acronym. The 2026 statutes are the legal continuation of « Paix et la Transition Démocratique », with no new legal entity. Seat: Paris only. Unlimited duration. Activities in France, Africa and internationally.
- [x] **Art. 4, five principles:** independence; universality and indivisibility; impartiality and documentary rigour; non-discrimination; a victim-centred approach. Source protection moved to the Art. 20 policies.
- [x] **Art. 5:** vision and mission now follow the statutes' wording (the hero headline paraphrases the vision).
- [x] **Art. 6, six objectives:**
  - the Istanbul and Minnesota Protocols are named;
  - « personnes signalant des violations » / people who report violations, as in Art. 6.4 (« lanceur d'alerte » is a defined status in French law, so it is not used);
  - the protocols are *promoted* (Art. 6.1), not presented as a standard ACJR already applies;
  - the vulnerable groups match the statute list;
  - examples not in the statutes are removed ("ateliers", "préservation de la mémoire", persons with disabilities).
- [x] **Art. 7–8:** "lorsqu'elle y est admise" and the help with complaint mechanisms are added. The advocacy copy says ACJR *seeks to* engage and states it has no ECOSOC status or UN/AU accreditation. "Genève" and the African Court are removed, since the statutes don't say this. The networks text now follows Art. 8.3.
- [x] **Art. 9:** four member categories, including associate members (advisory, no vote). Honorary members are exempt from dues.
- [x] **Art. 10:** admission follows the internal rules (the site no longer says the Bureau decides). The admission criteria and the grounds for losing membership are listed, including the reasoned exclusion with a hearing.
- [x] **Art. 11–14, governance:**
  - Ordinary General Assembly: members with voting rights who are up to date with their obligations; at least once a year; 21 days' notice except in a justified emergency; simple majority.
  - Extraordinary General Assembly: quorum of two-thirds of members with voting rights; two-thirds majority of votes cast; a second assembly within 30 days with no quorum required, except for dissolution.
  - Board: 3–7 members, renewable 3-year terms, meets at least every 6 months, and the President has the casting vote.
  - Bureau: elected by the Board, with an optional *elected* vice-president.
  - Each officer's duties are stated, and the officers are shown as ensuring "continuité des fonctions".
- [x] **Art. 15:** officers are unpaid; documented expenses are reimbursed and recorded.
- [x] **Art. 16–18:** the exact resource list and the independence rule. The financial year runs 1 Jan–31 Dec. Accounts are audited "lorsque la loi… l'exige". The promise to publish the accounts is removed, because the statutes don't make it.
- [x] **Art. 19–21:** the internal rules are "submitted to the General Assembly for approval". The policies are adopted "according to its activities and obligations" (Art. 20). Dissolution and the transfer of assets are on the Transparency page (Art. 21). The five policies are (ethics and conduct; protection of children and vulnerable people; conflicts of interest and corruption; data and sources; equal opportunity and non-discrimination).
- [x] **Names:** the Bureau is shown family name first, as in the statutes. The Arabic name is spelled المركز الافريقي للحقوق والعدالة, as confirmed.
- [x] **Draft news:** facts only. The founders' invented "conviction" is removed. The claims about a "broader mission" are removed too, since the 2024 statutes aren't available to compare against.
- [x] **Home page:** describes the statutory mission, not existing field work or evidence custody (« instances nationales » removed).
- [x] **Preamble:** the Geneva Additional Protocols are dated 1977 · 2005; the full name of the UN Declaration on Human Rights Defenders is used.

## Launch blockers (legal: LCEN art. 6 III and GDPR art. 13)
Until these are supplied, the legal notice and privacy policy say "à communiquer prochainement". Set the values in `src/config/site.ts`.
- [ ] **A monitored contact email** (`site.email`). Without it, nobody can reach ACJR or exercise their GDPR rights.
- [ ] **A publishable postal address** (`site.postalAddress`): the registered office or a domiciliation address. Associations cannot use the LCEN anonymity option.
- [ ] **A publisher phone number** (`site.phone`).
- [ ] **The host's phone number** (`site.host.phone`). Vercel does not publish one; confirm it with Vercel, or name a host that does.
- [ ] **The Formspree endpoint** (`PUBLIC_FORMSPREE_ENDPOINT`, format `https://formspree.io/f/…`). Before activating it:
  - confirm Formspree's legal basis for US transfers (DPF or SCCs) and add it to the privacy policy;
  - turn off reCAPTCHA in the Formspree dashboard, because it sets third-party cookies and the no-JS fallback posts straight to formspree.io.
- [ ] **Message retention**: confirm the 12-month period stated in the privacy policy.

## Client decisions (open)
- [ ] **Art. 19–20:** have the internal rules and any of the five policies actually been adopted yet? The site says only what the statutes say.
- [ ] **Draft news dates:** both drafts are dated 23 October 2026 as a placeholder. Set `date` to the real publication day when you publish.
- [ ] Social accounts.
- [ ] Confirm the President as publication director (legal notice).
- [ ] Whether to publish the annual accounts. The statutes don't require it.
- [ ] Whether to publish the statutes PDF on the site.
- [ ] Publish the two draft news items: set `draft: false` in `src/news/*/`.
- [ ] Native-speaker review of the English and Arabic copy.
- [ ] Photos for the hero and news (licensed; no images of victims), and founders' photos and bios.
- [ ] Donation method.
