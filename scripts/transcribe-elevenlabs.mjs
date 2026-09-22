#!/usr/bin/env node
// Default caption transcriber for HyperFrames projects: ElevenLabs Scribe v2.
//
// Writes two files next to the output path:
//   <out>                          normalized [{ id, text, start, end }] — what HyperFrames captions consume
//   <out minus .json>.elevenlabs.json   raw Scribe response, kept for re-normalizing without re-billing
//
// Usage:
//   ELEVENLABS_API_KEY=... node scripts/transcribe-elevenlabs.mjs <media> [--out transcript.json]
//        [--language en] [--keyterms "Sirf Tents,Brampton,Legacy"] [--diarize]
//   node scripts/transcribe-elevenlabs.mjs --from-json raw.elevenlabs.json [--out transcript.json]

import { openAsBlob } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const API_URL = "https://api.elevenlabs.io/v1/speech-to-text";
const MODEL_ID = "scribe_v2";

function parseArgs(argv) {
  const args = { out: "transcript.json" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else if (a === "--language") args.language = argv[++i];
    else if (a === "--keyterms") args.keyterms = argv[++i];
    else if (a === "--from-json") args.fromJson = argv[++i];
    else if (a === "--diarize") args.diarize = true;
    else if (!a.startsWith("--") && !args.input) args.input = a;
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!args.input && !args.fromJson) {
    throw new Error("Usage: transcribe-elevenlabs.mjs <media> [--out transcript.json] | --from-json raw.json");
  }
  return args;
}

async function callScribe({ input, language, keyterms, diarize }) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error("ELEVENLABS_API_KEY is not set.");

  const form = new FormData();
  form.append("file", await openAsBlob(input), basename(input));
  form.append("model_id", MODEL_ID);
  form.append("timestamps_granularity", "word");
  form.append("tag_audio_events", "false");
  form.append("diarize", diarize ? "true" : "false");
  if (language) form.append("language_code", language);
  for (const term of (keyterms ?? "").split(",").map((t) => t.trim()).filter(Boolean)) {
    form.append("keyterms", term);
  }

  const res = await fetch(API_URL, { method: "POST", headers: { "xi-api-key": key }, body: form });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return res.json();
}

// Keep spoken words only: Scribe interleaves "spacing" and "audio_event" entries.
export function normalize(raw) {
  const round3 = (n) => Math.round(n * 1000) / 1000;
  return (raw.words ?? [])
    .filter((w) => (w.type ?? "word") === "word" && typeof w.text === "string" && w.text.trim())
    .map((w, i) => ({ id: `w${i}`, text: w.text.trim(), start: round3(w.start), end: round3(w.end) }));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rawPath = args.out.replace(/\.json$/, "") + ".elevenlabs.json";

  let raw;
  if (args.fromJson) {
    raw = JSON.parse(await readFile(args.fromJson, "utf-8"));
  } else {
    raw = await callScribe(args);
    await writeFile(rawPath, JSON.stringify(raw, null, 2));
  }

  const words = normalize(raw);
  if (words.length === 0) throw new Error("No words found in ElevenLabs response.");
  await writeFile(args.out, JSON.stringify(words, null, 2));
  console.log(
    `Wrote ${words.length} words → ${args.out}` +
      (args.fromJson ? "" : ` (raw: ${rawPath}, language: ${raw.language_code ?? "?"})`),
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
