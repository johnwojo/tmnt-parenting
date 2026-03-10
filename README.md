# Turtle-Tested Parenting Advice — Documentation

A fun UI for getting parenting advice from the Ninja Turtles.

---

## User Guide

**What it does:** Type a parenting question, pick a character, and get advice in that character's voice — powered by the Anthropic API.

**How to use it:**
1. Type your question in the text box (e.g. *"My toddler won't go to sleep"*)
2. Click one of the four turtle buttons to submit
3. Wait a moment while your chosen character thinks it over
4. Read their response — then try another character for a different take on the same question

**Bonus advisors:** Click the **▶ Choose another advisor** toggle beneath the turtle buttons to reveal eight additional characters — allies, villains, and a few wildcards from the TMNT universe. They all work the same way.

**Tips:**
- You can ask the same question to multiple characters — the contrast is half the fun
- Bebop & Rocksteady respond as a dialogue between the two of them
- Baxter Stockman will condescend to you. This is intentional.

---

## Code Reference

### `TURTLES` constant

The four primary characters. Defined as a JavaScript object where each key is a character identifier and each value is a config object.

```js
const TURTLES = {
  leonardo: { ... },
  raphael:  { ... },
  michelangelo: { ... },
  donatello: { ... },
}
```

**Each character config contains:**

| Field | Type | Purpose |
|---|---|---|
| `name` | string | Full display name shown in the response card header |
| `label` | string | Short name shown on the button |
| `subtitle` | string | Italic tagline shown under the name in the response card |
| `color` | hex string | Primary color — used for button fill, avatar circle, and box shadow |
| `bg` | hex string | Dark background color for the response card gradient |
| `accent` | hex string | Accent color — used for button text, borders, and name in response card |
| `icon` | emoji | Displayed in the avatar circle on the response card |
| `loading` | string | Character-specific message shown while the API call is in flight |
| `system` | string | The system prompt sent to the AI — defines the character's voice and behavior |

The `system` field is the most important. It's a detailed instruction to Claude describing who the character is, how they speak, what they emphasize, and how they should end their response.

---

### `BONUS` constant

Eight additional characters, structured identically to `TURTLES`. They render in a collapsible section beneath the primary buttons, split into two rows of four.

```js
const BONUS = {
  splinter:        { ... },  // Row 1
  april:           { ... },
  shredder:        { ... },
  bebop_rocksteady:{ ... },
  metalhead:       { ... },  // Row 2
  baxter:          { ... },
  venus:           { ... },
  casey:           { ... },
}
```

All bonus characters share a unified visual style — TMNT green (`#4da640`) button color and light gray (`#e0e0e0`) text — so they read as a distinct second tier from the four turtles, who each have their own unique color.

**Notable system prompt differences:**
- `bebop_rocksteady` — instructs the AI to respond as a *dialogue* between two characters, formatted with `Bebop:` and `Rocksteady:` labels
- `metalhead` — uses ALL CAPS for robotic "system-level" thoughts, with intentional glitching mid-sentence
- `baxter` — instructs the AI to refer to the child as "the subject" at least once

---

### Adding a new character

1. Add a new entry to either `TURTLES` or `BONUS` following the same structure
2. If adding to `BONUS`, also add the key to the appropriate row array in the JSX:
   ```js
   {["metalhead","baxter","venus","casey"].map(key => ( ... ))}
   ```
3. Choose a `color` and `bg` that work together — `bg` should be a very dark version of `color`
4. Write the `system` prompt — this is where the character's personality lives

---

*Built with React + Anthropic API. Hosted on Vercel.*
