"""
Central Gemini model selection.

Google periodically retires models (e.g. gemini-1.5-flash, then gemini-2.0-flash),
which breaks every hardcoded call site at once. Keeping the model name here means:

  * one line to update when a model is deprecated, and
  * it can be overridden at runtime via the GEMINI_MODEL environment variable
    (e.g. set GEMINI_MODEL=gemini-3.5-flash on Render) with no code change.
"""

import os

# A current, widely-available GA model as of mid-2026. Override via env if needed.
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")
