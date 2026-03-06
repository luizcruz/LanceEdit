# LanceEdit

Chrome extension (Manifest V3) that injects a floating pencil button on Lance pages, linking directly to the CMS edit page.

## How it works

- A pencil button appears fixed at the bottom-left corner of every page on the configured site domain.
- On **article/post pages**: reads `window.customData.page.id` from the page and opens the corresponding WordPress edit URL in a new tab.
- On the **homepage** (`/`): opens the category management URL in a new tab.
- On any other domain: the extension does nothing.

## Installation

1. Clone or download this repository.
2. Generate the icons (one-time):
   ```bash
   python3 create_icons.py
   ```
3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the project folder.

## Configuration

Open the extension popup and click **Settings**, or go to `chrome://extensions/` → LanceEdit → **Details** → **Extension options**.

| Setting | Default | Description |
|---|---|---|
| Site Domain | `www.lance.com.br` | The site where the button is shown |
| CMS Domain | `cms.lancecorp.com.br` | The WordPress admin domain for edit links |

Settings are synced via `chrome.storage.sync`.

## File structure

```
LanceEdit/
├── manifest.json       # MV3 extension manifest
├── background.js       # Service worker — sets default settings on install
├── content.js          # Injects the floating edit button
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── options.html        # Settings page UI
├── options.js          # Settings page logic
├── create_icons.py     # Script to generate PNG icons (stdlib only)
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Technical notes

- `customData` is read via a `<script>` tag injected into the page's main world and communicated back to the content script through `window.postMessage` — this is necessary because content scripts run in an isolated JavaScript world.
- No `eval()` or inline JavaScript in HTML — fully CSP-compliant.
- Minimum permissions: only `storage`.
