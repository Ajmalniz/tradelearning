# Liquidity & Order Flow Trading Masterclass

An interactive, self-paced HTML course on market liquidity and order flow — based on Fabio's methodology (NASDAQ scalping, CME Group Equity Cup, World Trading Cup). Learn how professional traders read the order book, liquidity heat maps, and microstructure patterns that most retail traders never see.

## Quick start

No install or build step required. Open the course in any modern browser:

1. Clone or download this repository.
2. Open `index.html` in your browser (double-click the file, or serve the folder locally).
3. Follow lessons in order — progress is saved automatically in your browser.

**Optional local server** (avoids some browser restrictions on `file://` URLs):

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

## Course structure

| Phase | Focus | Lessons |
|-------|--------|---------|
| **1 — Foundation** | How markets really work | 1–3 |
| **2 — Reading the Market** | Heat maps, path of least resistance, context tools | 4–6 |
| **3 — Core Patterns** | Reload, iceberg, book sweep & flip | 7–8 |
| **4 — Heat Map Patterns** | Reload setups, Grill, cluster walls, auction flip | 9–11 |
| **5 — Trading Application** | Full bias → entry → exit system | 12 |

### Lesson index

| # | Title |
|---|--------|
| 1 | What is Liquidity & Why It's Everything |
| 2 | Market Participants: Who Moves the Price? |
| 3 | Market Microstructure: The Order Book in Action |
| 4 | The Liquidity Heat Map: See the Invisible |
| 5 | Path of Least Resistance: Where Price Goes Next |
| 6 | Context Tools: CVD, VWAP & Volume Profile |
| 7 | Reload Orders & Iceberg Hidden Liquidity |
| 8 | Book Sweep & Book Flip |
| 9 | Buyers & Sellers Reload Patterns |
| 10 | The Grill, Stookie Grill & Cluster Wall |
| 11 | Auction Flip, Break & Protect, Absorption |
| 12 | Full System: Bias → Entry → Exit |

## Project files

```
Fabio/
├── index.html          # Course home — lesson grid & progress bar
├── lesson-01.html      # Individual lessons (01–12)
├── …
├── lesson-12.html
├── fabio.txt.txt       # Source transcript / reference notes
└── README.md
```

Each lesson is a standalone HTML file with embedded CSS and JavaScript. There are no external dependencies or package managers.

## Features

- **Progress tracking** — Completed lessons are stored in `localStorage` (`lesson-1` … `lesson-12`). The home page shows a progress bar and checkmarks on finished cards.
- **Interactive quizzes** — Lessons include knowledge checks with instant feedback.
- **Visual diagrams** — Order book flows, pattern breakdowns, and step-by-step trade logic.
- **Responsive layout** — Works on desktop and mobile; dark theme optimized for long study sessions.

## How to use the course

1. Start at [index.html](index.html) and work through phases in order — each lesson builds on the last.
2. Mark completion via the button at the end of each lesson (or complete the quiz where provided).
3. Revisit the index anytime to see overall progress and jump to any lesson.

## Disclaimer

This material is for **educational purposes only**. It does not constitute financial advice. Trading involves substantial risk of loss. Past performance and illustrative examples (including live NASDAQ walkthroughs in Lesson 12) are not guarantees of future results.

## Credits

Course content is derived from Fabio's liquidity and order flow masterclass methodology. The `fabio.txt.txt` file contains reference transcript material used when building the lessons.
