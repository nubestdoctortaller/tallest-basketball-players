# Tallest Basketball Players: Height Comparison

A small interactive page that shows your height to scale next to the tallest basketball players in the world. Enter your height in feet and inches or centimeters, and the chart places you beside the tallest active pros, the NBA record holders, and the tallest basketball player on record.

The page also lists the 10 tallest active professional basketball players as of October 2026.

## Features

- Height input in feet and inches or centimeters, with the value carried over when you switch units
- To-scale bar chart comparing your height with average heights and record holders
- A one-line result showing how much taller Tacko Fall, the tallest active pro, stands than you
- Table of the 10 tallest active pros with country, height, and club
- No build step, frameworks, or dependencies beyond Google Fonts

## Heights in the chart

| Reference | Height |
| --- | --- |
| Average American man | 5'9" (1.75 m) |
| Average NBA player, 2025–26 | 6'7" (2.00 m) |
| Victor Wembanyama, tallest in a regular NBA rotation | 7'4" (2.24 m) |
| Tacko Fall, tallest active professional | 7'6" (2.29 m) |
| Manute Bol and Gheorghe Mureșan, NBA record | 7'7" (2.31 m) |
| Olivier Rioux, tallest active player at any level | 7'9" (2.36 m) |
| Suleiman Ali Nashnush, most often cited as tallest ever | about 8'0" (2.45 m) |

## Files

```
index.html   Page structure and content
style.css    Layout, colors, and chart styles
script.js    Player data, unit conversion, chart and table rendering
README.md    This file
```

## Run it locally

Clone the repository and open `index.html` in any modern browser. No server is needed.

```bash
git clone https://github.com/nubestdoctortaller/tallest-basketball-players.git
cd tallest-basketball-players
open index.html
```

## Publish with GitHub Pages

1. Go to **Settings > Pages** in the repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then save.

The page will be available at `https://nubestdoctortaller.github.io/tallest-basketball-players/`.

## Updating the data

All player data lives at the top of `script.js` in two arrays:

- `ACTIVE_PROS` holds the top 10 table. Heights are stored in total inches (for example, 7'6" is `90`).
- `LINEUP` holds the bars in the chart. Add a `meters` value only when the source lists a metric figure that differs from the converted one.

Rosters and contracts change often during the NBA preseason and free agency, so check the source article before updating.

## Source

Data comes from [Top 10 Tallest Basketball Players in the World (2026 Update)](https://doctortaller.com/blogs/science-insight/top-10-tallest-basketball-players-in-the-world) on Doctor Taller, which includes full player profiles, the all-time top 10, and references.

Heights from different eras are not perfectly comparable. The NBA has measured players barefoot since the 2019–20 season, while older listings were usually taken in shoes.

This project is not affiliated with the NBA or any team or league.
