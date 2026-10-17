# Token Treachery: Building "The World's Worst Profile Page"

A record of the conversation that produced TalentSphere Pro. The master prompt and implementation plan are included in full because they are hackathon deliverables. Other turns are condensed.

---

## 1. The brief

The user shared a photo of the hackathon instructions slide.

- **Task:** use AI agents and prompt engineering to build "The World's Worst Profile Page".
- **Process:** write a structured master prompt, review the AI-generated implementation plan, and guide the agent to build a professional-looking but intentionally frustrating profile page. Test the interactions, then submit the codebase, prompt blueprint, implementation plan, and execution proof before the deadline.
- **Scoring:** prompt architecture and constraint design 35%, functional chaos and execution 30%, agent autonomy 20%, UI cohesion 15%.

**Strategy notes from Claude:**
- Most of the score is about how the prompt is designed, not the page itself.
- Chaos should come from behavior (dodging buttons, resetting forms, misleading flows), not from a broken layout.
- Keep a winnable path through every frustration.
- Let the agent choose implementation details to support the autonomy score.

---

## 2. Chaos ideas (round 1)

**User:** "give me ideas or different functional chaos and execution that can be added to profile page"

Claude proposed ideas in these groups: forms and inputs, buttons and navigation, misleading feedback, profile-specific chaos, time and state chaos, and CAPTCHA and verification.

**Features the user selected:**
- Password rules that escalate
- Date picker from hell
- Character limit that shrinks
- Fields that clear
- Validation after submit only
- All of Buttons and navigation (dodging Save, swapped labels, fake Back, shuffling nav, infinite breadcrumb, click-5-times confirm)
- Fake loading bars
- Confirmation dialogs that argue
- Cookie banner with 40 toggles
- Mandatory fields for nothing
- Edit mode timeout
- All of Time and state chaos (session expiry mid-edit, random maintenance popups, lying completeness meter, flipping theme)
- All of CAPTCHA and verification (absurd CAPTCHA, pixel-exact slider, expiring email code)

---

## 3. Master prompt (prompt blueprint)

```
# ROLE
You are a senior front-end engineer and UX saboteur. You build interfaces that
look like a polished, trustworthy enterprise product but are systematically,
deliberately frustrating to use. You are the architect: plan first, then
decide the implementation details yourself.

# PROJECT
"TalentSphere Pro", a fake corporate profile portal. This is "The World's
Worst Profile Page" for the Token Treachery hackathon.

# DESIGN CONSTRAINTS (UI COHESION)
- One consistent visual identity: clean corporate look, one font pair, one
  color palette, 8px spacing grid, subtle shadows. It must look professional
  at first glance.
- Frustration comes from BEHAVIOR and COPY, never from broken layout, illegible
  text, or visual ugliness.
- Microcopy is calm, corporate, and slightly passive-aggressive.
- Stack: vanilla HTML, CSS, JS. Single page. No backend. No external services.

# THE GOLDEN RULE: WINNABLE CHAOS
Every frustration must be technically completable by a determined user.
No dead ends, no infinite loops without an exit, nothing that crashes the
browser. Each mechanic below has a defined "escape condition".

# CHAOS MECHANICS (implement all; you choose the details)

## Forms
1. ESCALATING PASSWORD RULES: a new rule appears each time the user satisfies
   the current one. Minimum 6 rules, increasingly absurd. Must end after the
   final rule.
2. DATE PICKER FROM HELL: a custom date-of-birth picker with slow, tiny-step
   controls. Must accept a valid date eventually, and keyboard input works
   after 3 failed attempts.
3. SHRINKING CHARACTER LIMIT: bio limit decreases as the user types. Never
   below 40 characters.
4. FIELDS THAT CLEAR: one random non-critical field resets on blur, at most
   once per field per session.
5. LATE VALIDATION: no inline validation. After submit, show ONE error at a
   time. Total errors are finite.
6. MANDATORY FIELDS FOR NOTHING: at least 3 required, absurd fields (e.g.
   "Mother's maiden name of your favorite pet"). Any non-empty value is accepted.

## Buttons and navigation
7. DODGING SAVE BUTTON: it moves away from the cursor. It becomes clickable
   after 5 dodges, or via keyboard focus, or on touch devices.
8. SWAPPED LABELS: "Save" and "Cancel" swap labels every few seconds. The
   underlying actions stay fixed per button.
9. FAKE BACK BUTTON: it reloads or goes forward. The browser's native back
   still works.
10. SHUFFLING NAV: menu items reorder on every hover over the nav bar.
11. INFINITE BREADCRUMB: it keeps appending (Home > Profile > Edit > Profile...).
    Clicking "Home" resets it.
12. CLICK-5-TIMES CONFIRM: the confirm button needs 5 clicks. The counter
    silently resets if the gap between clicks exceeds 1.5 seconds.

## Misleading feedback
13. FAKE LOADING BARS: bars that stall at 99%, go backward, or pause randomly.
    They always complete in under 20 seconds.
14. ARGUING CONFIRMATION DIALOGS: "Are you sure?" then "Are you REALLY sure?"
    then a trivia question. 3 stages maximum.
15. COOKIE BANNER, 40 TOGGLES: "Accept" is hidden at the bottom of a scrollable
    list, and "Reject all" is disabled until every toggle is flipped manually.

## Time and state
16. EDIT MODE TIMEOUT: edit mode locks after 30 seconds "for your safety".
    A "Request edit access" flow unlocks it.
17. SESSION EXPIRY MID-EDIT: the session expires once, mid-edit, and asks for
    login + CAPTCHA. Unsaved input is preserved.
18. RANDOM MAINTENANCE POPUPS: a blocking modal for 3 to 5 seconds, at most
    4 per session, never during CAPTCHA.
19. LYING COMPLETENESS METER: profile completeness drops as fields are filled,
    then jumps to 100% on final save.
20. FLIPPING THEME: dark/light mode flips when scrolling past defined
    thresholds. It keeps text contrast readable in both modes.

## CAPTCHA and verification
21. ABSURD CAPTCHA: image-grid style challenge with abstract prompts
    ("Select all squares containing regret"). Use CSS/emoji tiles, no external
    images. Accept any selection after 3 attempts.
22. PIXEL-EXACT SLIDER: a verification slider that must land on an exact
    value. Provide arrow-key fine control.
23. EXPIRING EMAIL CODE: a code delivered as an on-screen popup, valid for
    5 seconds. Allow "Resend" without limit.

# WORKFLOW (PLAN BEFORE CODE)
1. Produce an IMPLEMENTATION PLAN first: file structure, module per mechanic,
   state management approach, how each escape condition is implemented, and
   build order. Do NOT write code until I approve it.
2. After approval, build incrementally in this order: base design system and
   layout, forms (1-6), buttons and navigation (7-12), feedback (13-15),
   time and state (16-20), CAPTCHA (21-23).
3. After each stage, self-test every mechanic in that stage against its
   escape condition and report results.
4. Keep a CHAOS_REGISTRY in the code: a config object listing every mechanic
   with its ID, trigger, and escape condition, so each can be toggled.

# DECISION AUTONOMY
Choose the implementation details yourself: animation techniques, copy, timing
values within the bounds given, and component structure. Ask me only when a
decision would break a constraint above.

# DELIVERABLES
- Working codebase
- README listing every mechanic, its escape condition, and how to test it
- Short test log as execution proof
```

---

## 4. Implementation plan

The user pasted the master prompt back, and Claude produced the plan below before writing any code.

**Architecture**
- Vanilla HTML/CSS/JS with classic `<script>` tags and a global `TS` namespace, not ES modules, so `index.html` opens by double-click.
- Visual identity: navy, white, and one teal accent, with Georgia headings and a system sans body, on an 8px grid.
- State lives in one store backed by `sessionStorage`.
- A chaos governor prevents blocking overlays from stacking. No maintenance popup appears during CAPTCHA or dialogs.

| # | Mechanic | Approach | Escape |
|---|---|---|---|
| 1 | Escalating password rules | Rule array revealed one at a time on each pass | 7 rules, then done |
| 2 | Date picker | Custom wheel, 1 step per 250-400ms, starts at 1900 | Keyboard typing unlocks after 3 failures |
| 3 | Shrinking limit | `limit = max(40, start - typed)` | Floor of 40 |
| 4 | Fields clear | One random non-critical field resets on blur | Once per session |
| 5 | Late validation | Errors shown one per submit | Finite error list |
| 6 | Mandatory nonsense | 3 absurd required fields | Any non-empty value passes |
| 7 | Dodging Save | Pointer-proximity repel with bounds clamping | After 5 dodges, keyboard focus, or touch |
| 8 | Swapped labels | Labels swap on a timer, handlers stay fixed | Actions never change |
| 9 | Fake Back | Reloads view or jumps forward | Native browser back works |
| 10 | Shuffling nav | Reorder on `mouseenter` | Items always present and clickable |
| 11 | Infinite breadcrumb | Appends a crumb per navigation | "Home" resets it |
| 12 | Click-5 confirm | Counter with 1.5s gap timeout | Five quick clicks |
| 13 | Fake loading bars | Scripted easing with stalls and reversals | Always completes |
| 14 | Arguing dialogs | 3-stage flow, trivia stage has a hint | Max 3 stages |
| 15 | 40-toggle cookies | Scrollable list, Accept at the bottom | Both paths work |
| 16 | Edit timeout | 30s timer locks edit mode | "Request edit access" flow |
| 17 | Session expiry | Fires once mid-edit, login plus CAPTCHA | Draft preserved |
| 18 | Maintenance popups | 3-5s blocking modal, random intervals | Max 4 per session |
| 19 | Lying meter | Completeness decreases as fields fill | Jumps to 100% on final save |
| 20 | Flipping theme | Scroll thresholds toggle `data-theme` | Contrast kept in both themes |
| 21 | Absurd CAPTCHA | 3x3 emoji tiles, abstract prompts | Any selection accepted on attempt 3 |
| 22 | Pixel-exact slider | Hidden-tolerance exact value | Arrow keys give fine control |
| 23 | Expiring code | On-screen popup, 5s TTL | Unlimited resend |

**Build order:** foundation, forms, controls, feedback, time and state, verification, final playthrough.

**Decisions flagged for approval:** the theme flips at two scroll thresholds only; session expiry takes priority over the edit lock and the lock timer resets after re-login; if time ran short, mechanics 9, 11, and 22 would be dropped first.

**User response:** "okay, you are approved, give me a zip file for the entire website."

---

## 5. Build 1: the site

Claude delivered `talentsphere.zip` containing:

```
talentsphere/
├── index.html
├── css/styles.css
├── js/core.js        # store, modal helpers, loading bar, CHAOS_REGISTRY
├── js/mechanics.js   # mechanics 1-23
├── README.md
└── TEST_LOG.md       # blank template
```

**Deviations from the plan:** fewer files than planned (mechanics grouped in one file), and a simplified final-save flow: arguing dialogs, five-click confirm, loading bar, slider, then email code.

**Testing status:** the JavaScript was syntax-checked only. The page has not been opened or playtested in a browser, and `TEST_LOG.md` is a blank template for the user's own playthrough.

---

## 6. Chaos ideas (round 2)

**User:** "i liked this website but what else can we add, something more irritating and unique"

Claude suggested ideas in these groups: attacks on typing and input, attacks on the cursor and scrolling, fake assistants and social pressure, and unique profile-specific chaos. Claude's own top picks were a Clippy-style mascot, a photo inspector, backwards confirm password, an idle guilt trip, and autosave regret.

**Features the user selected:**
- Speed limit
- Phantom autocorrect
- Autosave regret
- Rate limiter
- All of Attacks on the cursor and scrolling (cursor drift, runaway checkbox, scroll resistance, reverse scroll zone)

---

## 7. Build 2: additions

Claude added `js/extras.js`, new sections in `index.html`, new styles, and registry entries 24-31.

| # | Mechanic | Behavior | Escape |
|---|---|---|---|
| 24 | Speed limit | About 7 characters typed in 1s freezes the field | Frozen for 2s only |
| 25 | Phantom autocorrect | Email without a full domain becomes `@synergycorp.com` | Backspace twice, or type a full domain |
| 26 | Autosave regret | About 20s into the bio, it reverts to an older version | Undo restores your text once; once per session |
| 27 | Rate limiter | 3 quick actions in 5s causes a lockout | Lifts after 10s |
| 28 | Cursor drift | Real cursor hidden; a fake one lags or mirrors | Lasts 1.5s, never during dialogs |
| 29 | Runaway checkbox | "I am not a robot" slides away on approach | Hold the mouse button, Tab + Space, or touch |
| 30 | Scroll resistance | Terms box slows to 25% near the bottom | Never stops; scrollbar unaffected |
| 31 | Reverse scroll zone | Handbook box scrolls the wrong way, marked with a dashed edge | Page scrolls at the box's limits |

**Flow changes:** Save now also requires the Terms checkbox (unlocked by scrolling to the end) and the robot checkbox.

**Testing status:** syntax-checked only, as with build 1. Cursor drift and the speed limit are the most likely to feel unfair, so test them first.

---

## 8. Submission checklist

- [x] Master prompt (section 3)
- [x] Implementation plan (section 4)
- [x] Codebase (`talentsphere.zip`)
- [ ] Execution proof: record a playthrough and fill in `TEST_LOG.md`
- [ ] Playtest in a browser and fix anything broken before the deadline
