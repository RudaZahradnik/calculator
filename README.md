# Provident Calculator Generator

## Version 15

The Teamtailor heading-font rule is now part of the actual exported CSS template in `app.js`, so every newly generated CSS file includes it automatically. The generator preview CSS also contains the same rule.

## Version 14

Generated calculator CSS now keeps Nunito for body and UI text while allowing the main calculator headings to inherit the Teamtailor heading font through `--company-header-font-family`. If the Teamtailor variable is unavailable, the headings fall back to Nunito.

## Version 13

The editor and preview now use a true 50/50 split inside the available workspace width, with a fixed 32px column gap. The previous fixed 520px + 960px columns overflowed because they did not account for the workspace padding, which caused the preview to overlap the editor. Both columns now use `minmax(0, 1fr)` and `width: 100%` so they cannot overflow their grid tracks.

## Version 12

The main workspace now uses fixed desktop dimensions instead of percentage/fr-based columns: 520px editor + 32px gap + 960px preview, with a 1512px maximum content width. Below 1050px viewport width, the two areas stack vertically. This keeps a deterministic gap and prevents the preview from overlapping the editor.

## Version 11

The desktop layout now uses explicit `calc(35% - 16px)` and `calc(65% - 16px)` tracks with a 32px gap. This makes the visible space between the editor and preview deterministic instead of relying on fractional grid tracks.

## Version 10

The main desktop grid now uses a true 35fr / 65fr split with a separate 28px column gap. This guarantees that the gap is preserved and is not accidentally included in either column.

## Version 9

The desktop editor/preview layout now calculates the 35% and 65% columns from the available width after the 28px column gap. This preserves a real, visible gap between the editor and preview as the browser becomes narrower. The two columns stack below 1000px.

## Version 8

The live preview now behaves like a scaled mock-up of the final calculator.

The calculator keeps its internal desktop composition instead of reflowing its cards into awkward narrow layouts. When the available preview area becomes smaller, the entire calculator is proportionally scaled down so it fits inside the preview without affecting the editor on the left.

This scaling applies only to the Generator preview. The generated calculator code remains responsive for the final website.


## Version 7

This version includes improved responsive behaviour. The editor fields collapse before the desktop 35/65 layout becomes too narrow, and the editor/preview stack earlier on smaller screens.

## What is this?

A simple local web tool for creating a localised Provident commission calculator and generating the files needed for Teamtailor or another CMS.

It lets you:
- choose a market, locale and currency
- edit all visible calculator texts
- add or remove any number of commission tiers
- set time, commission and Top Performer values
- add or remove benefits
- set CTA text and URL
- preview the calculator live
- generate HTML, CSS and XLSX
- generate a complete ZIP package

## Run the generator

1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge or Firefox.
3. No installation or Vercel is required for local use.

## Market & settings

Choose the market, locale, currency, XLSX filename and CTA target. The country presets are starting points only. Replace demo values with approved local content.

## Content & translations

Every visible text is editable, including headline, subtitle, labels, disclaimer, Top Performer text and CTA.

## Commission tiers

Each tier contains:
- Client range
- Time label
- Commission
- Top Performer

Use **Add tier** to add rows and `×` to remove them. The calculator slider automatically adapts to the tier ranges.

## Benefits

Use **Add benefit** to add as many benefits as required. Each benefit is one row.

## XLSX data source

The generated XLSX contains three sheets:

### Tiers
`Client range | Time | Commission | Top performer`

### Benefits
One benefit per row.

### Texts
`Key | Value`, containing the visible text, CTA settings, locale and currency.

Keep the sheet names and expected columns unchanged.

## Hosting the XLSX

Teamtailor is not used to host the XLSX. Upload the market XLSX to Sanity or another public HTTPS host.

After upload, copy the public XLSX URL.

## Connecting the XLSX to the HTML

In the generated HTML, find:

`PASTE_PUBLIC_XLSX_URL_HERE`

Replace it with the public XLSX URL, for example:

`const DATA_URL='https://cdn.sanity.io/files/.../Calculator_Data_CZ.xlsx';`

## Teamtailor

1. Open the relevant website.
2. Open the target page.
3. Go to **Components**.
4. Choose the custom HTML component.
5. Paste the generated HTML into the HTML field.
6. Paste the generated CSS into the CSS field.
7. Preview and publish.

The XLSX itself is hosted separately and is loaded by the calculator.

## Other CMS platforms

The same principle applies: host the XLSX at a public HTTPS URL, then insert the generated HTML snippet and CSS into the CMS. The exact fields depend on the CMS.

## Updating values later

For normal commission-data changes:
1. Edit the XLSX.
2. Keep the sheet names and columns unchanged.
3. Replace the hosted XLSX.
4. Keep the same public URL where possible.

The calculator will use the updated data when it loads the XLSX. You should not need to rewrite the HTML for ordinary data changes.

## CTA

Set the CTA text, URL and target in the generator. Use the approved recruitment/application URL for the market.

## Pre-publish checklist

- [ ] Translations approved
- [ ] Client ranges approved
- [ ] Time labels approved
- [ ] Commission values approved
- [ ] Top Performer values approved
- [ ] Currency and locale correct
- [ ] Benefits correct
- [ ] CTA text and URL correct
- [ ] XLSX hosted at a public HTTPS URL
- [ ] Correct XLSX URL added to generated HTML
- [ ] HTML and CSS inserted into Teamtailor/CMS
- [ ] Slider tested
- [ ] + / − buttons tested
- [ ] Commission and Top Performer values tested
- [ ] CTA tested
- [ ] Desktop and mobile tested

## Troubleshooting

### Wrong commission
Check the tier ranges, tier order and Commission column in the XLSX.

### XLSX changes are not visible
Confirm the hosted file was replaced, the public URL is correct and browser/CDN caching is not showing an old copy.

### XLSX does not load
Make sure the URL is HTTPS, publicly accessible without login, and points to a valid XLSX file.

### Styling is missing
Make sure the generated CSS was pasted into the CMS CSS field.

### CTA does not work
Check the CTA URL in the generator and in the generated HTML.

## Recommended workflow

`Generator → translate and configure market → enter approved data → preview → Generate package → upload XLSX to Sanity → add XLSX URL to HTML → paste HTML + CSS into Teamtailor → test → publish`

Local market teams should normally only need the Generator and the XLSX. They should not need to edit JavaScript or CSS.


## Version 16

The calculator now uses weekly time commitment as the slider metric. Tier matching is based on the `Weekly time` column in the XLSX, while the client-volume range is displayed as supporting information. Benefits are displayed in a dedicated box on the left side, below the slider statistics. The result card keeps commission, top performer and CTA on the right.


## Version 17

Fixed the slider data source so the slider range and tier matching are calculated from the `Weekly time` column. This is the hours-per-week version shown in the reference design.


## Version 18

The slider endpoint labels are now explicitly readable. Benefits have been moved to the left column directly below the disclaimer in both the generator preview and the exported calculator. The benefits heading is also editable in Content & translations.


## Version 19

The result card no longer stretches to match the taller left column. It now sizes to its own content, leaving balanced padding below the CTA instead of an empty extended area.

## Version 20

Added a subtle CTA hover animation. The button gently lifts, gets a soft shadow and slightly increases brightness on hover, then returns to its normal position on click. The same animation is included in the generator preview and every exported calculator CSS file.

## Version 21

Added editable slider endpoint labels to Content & translations:
- Slider minimum label
- Slider maximum label

These labels are independent from the calculated slider limits and are included in exported HTML. Existing configurations receive sensible labels automatically when the fields are missing.

## Slider endpoint labels

The generator now exposes two separate editable fields under **Content & translations**:
- **Slider minimum label (shown below slider)**
- **Slider maximum label (shown below slider)**

These are **display labels only**. They are intentionally independent from the actual slider limits, which are calculated automatically from the `Weekly time` values in the commission tiers.

The field formerly labelled **Client question** is now labelled **Time commitment question**, because the slider represents weekly time commitment rather than client count.


## Version 23

Fixed exported HTML/JS, slider endpoint handling, and time-commitment wording across all market presets.

## Version 24

Added automatic responsive fitting for the two statistic values inside the calculator cards. Long values such as `25–37,5 h/týden` or long client-range labels are kept inside the card's existing padding and automatically reduce their font size when the available width becomes smaller. A ResizeObserver refits them when the calculator changes size.

## Version 25

Fixed open-ended final tiers such as `37.5+ hrs/week`. The final tier is now selected when the slider reaches its minimum value, while the slider itself still ends at that finite value. This prevents the previous tier from incorrectly remaining active at the maximum.

## Version 26

Fixed tier selection so **commission tiers are completely independent of the slider endpoint labels**.

The calculator now uses the minimum value defined in each tier's `Weekly time` field to determine which tier is active. When the slider reaches an exact boundary, the later tier wins. For example:
- 15 → tier 1
- 15–25 → tier 2
- 25–37.5 → tier 3
- 37.5+ → tier 4

The visible minimum/maximum labels under the slider remain purely display text and cannot affect tier selection.

## Version 27 fix

The generated HTML now contains the corrected tier-selection logic as well as the generator preview logic.

Important: the slider endpoint labels are display-only. They do not determine which tier is active. The tier is selected from the minimum value in each tier's **Weekly time** field.

The generated HTML also handles an open-ended final tier such as `37.5+` correctly.

## Version 28 final correction

The previous V28 build still contained an older range parser in the generator. This has now been corrected as well.

The slider is **not** generated from the text labels below it. It is generated from the tier data:
- each tier's `Weekly time` minimum creates a slider boundary
- the final `+` tier uses its minimum as the final slider position
- labels below the slider are display-only

Therefore four tiers produce four logical tier states, with the last tier active at the final position.

## Version 29

Fixed the lowest slider position. When the first two tiers share the same minimum value (for example `15` and `15–25`), the exact minimum now activates **Tier 1**. Tier 2 becomes active after the first slider step above the minimum.

This keeps the lowest tier visible while preserving all subsequent tier transitions.

## Version 30

Fixed the remaining lowest-tier selection issue. The first tier now explicitly owns the exact minimum slider value. A later tier with the same minimum becomes active only after the slider moves above that minimum.

Example:
- 15.0 → Tier 1
- 15.5 → Tier 2
- 25.0 → Tier 2
- 25.5 → Tier 3
- 37.5 → Tier 4

Slider endpoint labels remain display-only and do not affect any of this logic.

## Version 31

Fixed the highest-tier boundary. The final tier is now activated when the slider reaches its exact minimum value.

For the four-tier example:
- 15.0 → Tier 1
- 15.5–24.5 → Tier 2
- 25.0 → Tier 2
- 25.5–37.0 → Tier 3
- 37.5 → Tier 4

This avoids losing either endpoint while keeping intermediate shared boundaries predictable.

## Version 32

Slider architecture changed to a tier-index model.

The slider is now completely independent of the numeric values in `Weekly time`:
- 1 tier = 1 slider position
- 4 tiers = 4 slider positions
- 7 tiers = 7 slider positions
- any number of tiers is supported

The slider selects a tier by index. The tier itself supplies client volume, weekly time, commission and Top Performer values.

The two endpoint labels under the slider remain presentation-only and are independently editable. They do not affect the number of slider positions or tier selection.

This removes all ambiguity around overlapping ranges such as `15 h/week` and `15–25 h/week`, and around open-ended values such as `37.5+ h/week`.
