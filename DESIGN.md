---
name: s34nj0hn.dev
description: A platform engineer's portfolio drawn as one rail network, with live service status read from a real cluster.
colors:
  map-white: "#f4f6f3"
  board-white: "#ffffff"
  ink: "#14171c"
  ink-soft: "#4a5059"
  rule: "#d3d7d0"
  track-idle: "#a9aeb3"
  signal-red: "#d52b1e"
  control-green: "#00804a"
  career-blue: "#1f3fae"
  platform-purple: "#7a2e8f"
  board-yellow: "#ffcc00"
typography:
  display:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 11vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.02em"
  readout:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  none: "0px"
  plate: "3px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  xxl: "120px"
components:
  button-plate:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board-white}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "14px 20px"
  button-plate-secondary:
    backgroundColor: "{colors.board-white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "14px 20px"
  service-board:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board-white}"
    typography: "{typography.readout}"
    rounded: "{rounded.plate}"
    padding: "12px 16px"
---

# Design System: s34nj0hn.dev

## Overview

**Creative North Star: "The Platform Network Map"**

The site is a diagrammatic transit map in the Beck and Vignelli tradition: a light printed ground, thick saturated lines that run only horizontal, vertical, or at 45 degrees, tick stations and ringed interchanges, and enamel signage for names. Every line on the page is a real path. The Career line is a work history; the Control line is the GitOps path from Git to the cluster; the Signal line is the telemetry path from the cluster to the visitor's browser. The live heartbeat is printed onto the map as station readouts and a service status board.

Density is low at the top and high in the timetable sections below, the way a station has one big sign and then a dense timetable on the wall. The map is the only performer. Everything else is signage and timetables in the same material, set plainly.

Confirmed anti-references: the near-black ground with a neon accent, glass cards, and glow edges that the previous version used; the white minimal resume page with a large serif name.

**Key Characteristics:**
- Light printed ground, ink type, four saturated line colors that each mean one thing.
- Lines run at 0, 45, and 90 degrees with rounded joins. No curves, no diagonals at other angles.
- State lives in the line itself: solid is good service, dashed is delayed, a broken line with an end cap is suspended.
- Signage type is heavy and tight; readouts are monospaced and tabular.
- No cards, no shadows, no gradients. Plates and rules.

## Colors

A full palette strategy: each line color is a named role and never decorates anything outside its line.

### Primary
- **Signal Red** (signal-red): the telemetry line from the cluster to this page, the moving train marker, and the suspended end cap.
- **Control Green** (control-green): the GitOps control line from Git through Flux and Gatekeeper into K3s.

### Secondary
- **Career Blue** (career-blue): the work-history line from 2014 to now.
- **Platform Purple** (platform-purple): the platform line that branches off the Career line in 2022 and runs into the reference cluster.

### Tertiary
- **Board Yellow** (board-yellow): the ground of a delayed status board, the halo behind the selected station, text selection, and the focus ring on ink surfaces. Never used for text on white.

### Neutral
- **Map White** (map-white): the page ground.
- **Board White** (board-white): plates, station info boards, and the timetable panels that sit on the ground.
- **Ink** (ink): all type, station ticks, interchange rings, primary plates, and the service board ground.
- **Ink Soft** (ink-soft): secondary text. Measured at 7.5:1 on map white and 6.7:1 on the zone fill.
- **Rule** (rule): timetable rules and dividers.
- **Track Idle** (track-idle): a line drawn with no live reading behind it.
- **Zone** (zone): the fill of the private network zone on the map.

### Named Rules
**The One Line, One Meaning Rule.** A line color appears only on its own line, its station markers, and the legend entry that names it. Signal Red never decorates a button; Career Blue never colors a heading.

**The No Color Alone Rule.** Every state a color carries is also carried by a word and a line shape: "Good service" with a solid line, "Minor delays" with a dashed line, "Suspended" with a broken line and end cap.

## Typography

**Display Font:** Overpass (with system-ui)
**Body Font:** Overpass (with system-ui)
**Label/Mono Font:** Overpass Mono, for live readouts, timestamps, paths, and endpoints only

**Character:** Overpass descends from Highway Gothic, the lettering on US road signs, so names read as wayfinding signage. Overpass Mono carries numbers that change.

### Hierarchy
- **Display** (800, clamp(3.25rem, 11vw, 6rem), 0.92, -0.01em): the name, set as station signage. One per page.
- **Headline** (800, clamp(2rem, 5vw, 3rem), 1.0): section signs such as "The network" and "Timetable".
- **Title** (700, 1.25rem, 1.2): station names, role titles, board headings.
- **Body** (400, 1.0625rem, 1.55): prose, capped at 68ch.
- **Label** (700, 0.8125rem, 0.02em): line names, legend entries, plate text. Sentence case, never tracked caps.
- **Readout** (Overpass Mono 600, 0.875rem, tabular numerals): every live value and timestamp.

### Named Rules
**The Readout Rule.** Monospace marks what is live: values from the heartbeat and their timestamps, plus repo paths and the endpoint in source links. Static station facts are set in Overpass, so the type alone shows which numbers are live.

## Layout

A 12-column grid inside a 1200px container with 24px side gutters on phones and 48px from 768px up. Sections open with a headline sign at the left edge and use 120px of space above, 32px below. The network map spans the full container on desktop as a horizontal diagram; below 768px it becomes a vertical strip map, like the line diagram above a train door, with stations stacked down a single rail. Timetables are two-column on desktop (station on the left, detail on the right) and single-column on phones.

## Elevation & Depth

Flat. Depth comes from layering printed material: plates sit on the map ground with a 1px ink or rule border. There are no shadows anywhere.

## Shapes

Square-cut plates with a 3px radius, the way enamel signs have eased corners. Lines are 10px on the map (6px on the career strip) with round caps and round joins. Stations are short perpendicular ticks in the line's color; termini are long perpendicular bars; interchanges are white circles with a 5px ink ring. Trust boundaries are dashed rounded zones (20px radius) like fare zones.

## Components

### Buttons
- **Shape:** enamel plate (3px radius).
- **Primary:** ink plate, white label, a drawn arrow at the right like a wayfinding sign (14px 20px padding).
- **Secondary:** white plate with a 2px ink border.
- **Hover / Focus:** hover shifts the arrow 4px right; focus shows a 3px ink outline offset 3px, switching to board yellow on ink surfaces.

### Service board
- **Style:** ink ground with one row per line, like a line status board. Each row has the line name on its own color plate, the status word right-aligned, and the live facts beneath in readout type.
- **State:** good service (white status word), minor delays (status word on a board-yellow chip with the reason beneath), suspended or no reading (muted status word with the reason), checking (skeleton bar).

### Station
- **Style:** a tick or interchange ring on the line, with the station name in title type and its live readout in readout type beneath.
- **State:** stations are buttons. Selecting one opens its mechanism on the station information board: what it does, its live reading, and the manifest path in the source repo.

### Navigation
- **Style:** a single row of label-type links on the map ground, like station direction signs. The current section shows a 4px ink underline. On phones the row scrolls horizontally inside its own strip.

## Do's and Don'ts

### Do:
- **Do** draw every line at 0, 45, or 90 degrees with round joins.
- **Do** print live values in Overpass Mono with tabular numerals and a timestamp.
- **Do** show a degraded state with a word and a line shape, never color alone.
- **Do** keep content visible by default; the only motion is the line draw on load and the train marker on each poll, and both stop under reduced motion.

### Don't:
- **Don't** use a dark ground with neon accents, glass cards, or glow edges.
- **Don't** put a line color on anything that is not its line.
- **Don't** use cards, shadows, gradients, or tracked uppercase eyebrow labels.
- **Don't** draw a station for a component the reference cluster does not run.
