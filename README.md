# MSCS-535-B01 Project 2

This repository demonstrates insecure patterns involving dynamic JavaScript execution and HTML injection alongside safer alternatives. The examples are intentionally small to highlight the security impact of `eval` and unsanitized DOM insertion, with paired fixes showing recommended mitigations.

## Project structure

- `app.js` – Minimal Express server exposing `/run`, which dangerously executes arbitrary JavaScript provided in the request body. Intended as a cautionary example of server-side code execution risks.
- `eval.html` – Browser calculator that directly `eval`s user input (vulnerable).
- `evalFix.html` – Calculator that performs arithmetic via explicit operators without `eval` (safe alternative).
- `evalFixParseStr.html` – Calculator that restricts allowed characters and evaluates within a constrained `Function` wrapper (safer but still illustrative of parsing concerns).
- `injection.html` – Greeting page that injects user-controlled content via `innerHTML` (vulnerable to XSS).
- `injectionFix.html` – Safe variant using `textContent` to avoid HTML interpretation.
- `injectionFixInnerHTML.html` – Escapes user input before inserting trusted markup with `innerHTML`.

## Requirements

- [Node.js](https://nodejs.org/) 18+.
- Install Express before running the server:

```bash
npm install express
```

## Running the server

Start the demo API on port 3000:

```bash
node app.js
```

Send JavaScript snippets to the `/run` endpoint. This is intentionally dangerous—only use in a controlled environment:

```bash
curl -X POST http://localhost:3000/run \
  -H "Content-Type: application/json" \
  -d '{"code":"2 + 2"}'
```

## Viewing the HTML demos

Open any of the HTML files directly in your browser (e.g., by double-clicking or serving them via a simple static server). Each page is self-contained and demonstrates either a vulnerable pattern or a safer approach.

## Security notes

These examples are educational and intentionally showcase unsafe practices. Do **not** deploy them as-is. For production code, avoid executing untrusted input, validate and sanitize user-provided data, and prefer safe DOM APIs like `textContent`.
