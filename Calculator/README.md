# CodeAlpha Calculator

A modern, glassmorphism–inspired calculator built for the CodeAlpha Frontend Internship tasks using only HTML, CSS, and JavaScript.

The goal of this project is to go beyond a basic calculator and create a polished, unique UI with smooth interactions and full keyboard support.

## Features

- Clean, responsive layout that works on desktop and mobile
- Glassmorphism card design with soft shadows and gradients
- Dark and light theme toggle with preference saved in `localStorage`
- Real-time display with separate history line
- Core arithmetic operations: addition, subtraction, multiplication, division
- Decimal support and smart formatting of long results
- AC (all clear), DEL (single character delete), and error handling for division by zero
- Full keyboard support for numbers, operators, Enter, Backspace, Escape, and C

## Tech Stack

- HTML5 for structure
- Modern CSS3 for layout, theming, and animations
- Vanilla JavaScript for calculator logic and keyboard handling

## How To Run

You have multiple options to run this project locally:

1. Open `index.html` directly in your browser, or
2. Serve the folder with any static server (for example `Live Server` in VS Code).

No build step or external dependencies are required.

## Keyboard Shortcuts

- Numbers: `0–9`
- Operations: `+`, `-`, `*`, `/`
- Decimal point: `.`
- Equals: `Enter` or `=`
- Clear all: `Escape` or `C`
- Delete one character: `Backspace`

## Project Structure

- `index.html` – main page and calculator layout
- `style.css` – styles, animations, and responsive design
- `script.js` – calculator logic, state management, and keyboard handling

## Future Improvements

- Add percentage and memory buttons (M+, M-, MR)
- Add small animation when a calculation is completed
- Add sound feedback toggle for button presses

