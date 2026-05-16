# Sirf Tents — Google Workspace MCP Setup (Claude Code)

**Owner:** Gurvir
**Status:** Mid-execution. Cloud Console steps in Gurvir's hands (2026-05-15). `claude mcp add` commands ready to fire once Client ID + Secret arrive.

---

## Goal

Connect Google Gmail + Calendar to Claude Code as MCP servers, same pattern as the HubSpot MCP that was wired up 2026-05-13.

## Decisions locked in

| Decision | Choice | Why |
|---|---|---|
| Provider | **Google's official remote MCPs** (not Composio, not Zapier, not community npm) | Same shape as HubSpot — managed remote endpoint, OAuth, no Node babysitting. Matches the standard set by the prior session. |
| Services in scope | **Gmail + Calendar only** | Google's official MCPs cover Gmail, Calendar, Drive, Chat, People. |
| Sheets | **Skipped** (pending official Google MCP) | Google hasn't shipped a Sheets MCP yet. Rejected Composio / Zapier / community workarounds — adds third-party surface area for a service Google is likely to publish soon. Revisit when Google releases it. |
| OAuth client | **Single shared client** across both MCPs | One Google Cloud project, one OAuth 2.0 Web Application client, same redirect URI reused for Gmail + Calendar MCP registrations. Cleaner than two clients. |
| Callback port | **33419** | HubSpot already owns 33418. Avoids OAuth-handshake collision if both auth flows happen simultaneously. |
| OAuth client type | **Web application** | Claude Code's HTTP MCP transport uses confidential-client + PKCE with a localhost redirect. "Desktop app" type speaks a different flow and won't work. |
| Verification status | **External + Test users** (not published) | Test users bypass Google's app verification queue — no privacy policy, no branding review. Only `sirfstudios@gmail.com` needs access. |
| Calendar capability | **Read-only at v1** | Google's official Calendar MCP ships with `calendar.events.readonly` + `calendar.calendarlist.readonly` + `calendar.events.freebusy`. No event creation in v1. Acceptable for now; flag if event-creation becomes a need. |
| Gmail capability | **Read + Compose drafts** | Scopes `gmail.readonly` + `gmail.compose`. No send-on-behalf in v1 (compose only drafts). |

## Endpoints (verified 2026-05-15 from Google's docs)

- Gmail: `https://gmailmcp.googleapis.com/mcp/v1`
- Calendar: `https://calendarmcp.googleapis.com/mcp/v1`
- (Drive `https://drivemcp.googleapis.com/mcp/v1`, Chat `https://chatmcp.googleapis.com/mcp/v1`, People `https://people.googleapis.com/mcp/v1` — available but not in scope)

Google requires **pre-registered OAuth Client ID + Secret** (no Dynamic Client Registration), same constraint as HubSpot.

---

## Manual steps Gurvir is executing (Google Cloud Console)

Console: https://console.cloud.google.com, signed in as `sirfstudios@gmail.com`.

1. **Project**: create `claude-code-mcp` (or reuse existing).
2. **Enable APIs** (APIs & Services → Library): **Gmail API**, **Google Calendar API**.
3. **OAuth consent screen**:
   - User type: External
   - App name: `Claude Code`
   - User support email / Developer contact: `sirfstudios@gmail.com`
   - Scopes — add exactly these 5:
     - `https://www.googleapis.com/auth/gmail.readonly`
     - `https://www.googleapis.com/auth/gmail.compose`
     - `https://www.googleapis.com/auth/calendar.calendarlist.readonly`
     - `https://www.googleapis.com/auth/calendar.events.readonly`
     - `https://www.googleapis.com/auth/calendar.events.freebusy`
   - Test users: `sirfstudios@gmail.com`
4. **Credentials → Create OAuth client ID**:
   - Application type: **Web application**
   - Name: `Claude Code`
   - Authorized redirect URIs: `http://localhost:33419/callback`
5. Copy Client ID + Client Secret, paste back to Claude Code.

---

## Commands Claude Code will run once credentials arrive

Pattern matches the HubSpot session — secret passed via env var to keep it out of `ps`/argv. Substitute `CLIENT_ID` and `CLIENT_SECRET`.

```bash
# Gmail
MCP_CLIENT_SECRET='CLIENT_SECRET' claude mcp add --transport http --scope user \
  --client-id CLIENT_ID --client-secret --callback-port 33419 \
  gmail https://gmailmcp.googleapis.com/mcp/v1

# Calendar
MCP_CLIENT_SECRET='CLIENT_SECRET' claude mcp add --transport http --scope user \
  --client-id CLIENT_ID --client-secret --callback-port 33419 \
  calendar https://calendarmcp.googleapis.com/mcp/v1
```

Both reuse the **same** Client ID + Secret (single OAuth client, two MCP registrations).

After registration: status will be `! Needs authentication`. Gurvir must:
1. `/exit` Claude Code, restart in any directory.
2. `/mcp` → `gmail` → Authenticate → browser → approve scopes → return.
3. `/mcp` → `calendar` → Authenticate → browser → approve scopes → return.
4. Tools surface as `mcp__gmail__*` and `mcp__calendar__*` in every project.

---

## Resume points (if session interrupted)

| Where Gurvir left off | Next action |
|---|---|
| Hasn't started Cloud Console yet | Follow "Manual steps" section above. |
| Cloud Console partway done, no credentials yet | Pick up at the step he stopped on; the section is checklist-shaped. |
| Has Client ID + Secret in hand | Paste them to Claude Code; it runs the two `claude mcp add` commands. |
| Commands run, status is `! Needs authentication` | `/exit`, restart, `/mcp` → authenticate each MCP. |
| Both MCPs authenticated | Verify via `claude mcp list` — both should show `✓ Connected`. Update `MEMORY.md` to reflect new MCP availability. |

---

## Why not the alternatives

- **Composio MCP for Google services** — adds a third-party in the loop (Composio's hosted router holds OAuth tokens). Extra dependency, extra trust boundary. Only reasonable if Google never ships Sheets MCP and Sheets becomes critical.
- **Zapier MCP** — burns Zapier task quota per tool call (2 tasks per call). Ties Google access to a Zapier subscription. Fine if Zapier is already core, but Sirf Tents doesn't lean on it.
- **Community npm servers** (`taylorwilsdon/google_workspace_mcp`, `workspacemcp.com`) — local stdio MCPs requiring Node babysitting + a private-app-style token. More features (Sheets, Docs, Slides, write-on-Calendar) but more maintenance and an extra OAuth Client to manage. Reconsider only if write-access to Calendar becomes a hard requirement.
- **One OAuth client per service** (two clients) — extra Cloud Console clicks, no benefit. Scopes are managed at the consent-screen level, not the client level, so splitting clients buys nothing.
- **Port 33418 (shared with HubSpot)** — would work in practice but creates a chance of OAuth-handshake collision if Gurvir authenticates two MCPs at the same time. 33419 is free.

---

## References (verified 2026-05-15)

- Google: [Configure the Google Workspace MCP servers](https://developers.google.com/workspace/guides/configure-mcp-servers)
- Google: [Configure the Gmail MCP server](https://developers.google.com/workspace/gmail/api/guides/configure-mcp-server)
- Google: [Configure the Calendar MCP server](https://developers.google.com/workspace/calendar/api/guides/configure-mcp-server)
- HubSpot precedent for the same OAuth pattern: prior Claude Code session 2026-05-13 (HubSpot MCP wired up with `--client-id` / `--client-secret` / `--callback-port 33418` against `https://mcp.hubspot.com/anthropic`).
