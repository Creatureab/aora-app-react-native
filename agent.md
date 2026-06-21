# Agent Guide for this Project (agent.md)

## Project summary
- Name: my-app
- Platform: Expo (SDK ~56) + React Native
- Routing: expo-router
- Styling: Tailwind via NativeWind
- Languages: JS/JSX (some TS config present), fonts loaded via expo-font

## Key dependencies
- expo, expo-router, babel-preset-expo
- nativewind, tailwindcss
- react-native-reanimated, react-native-gesture-handler

## Repository layout (important folders/files)
- app/ — Expo Router screens and layouts (index, (tabs), (auth), search)
- components/ — shared UI components (CustomButtons, ui/*)
- assets/ — images, icons, fonts (Poppins family included)
- constants/ — images, icons, index
- scripts/ — reset-project.js
- tailwind.config.js — Tailwind configuration (includes nativewind preset)
- babel.config.js — includes nativewind/babel preset
- metro.config.js — configured with withNativeWind
- tsconfig.json, nativewind-env.d.ts

## Current Tailwind / NativeWind status (observations)
- tailwind.config.js includes `presets: [require('nativewind/preset')]` and content paths were expanded to include common locations (app, components, src, screens, pages, **).
- Components use className attributes (correct for NativeWind).
- babel.config.js contains `nativewind/babel` preset — required.
- metro.config.js uses `withNativeWind(config)`; previously referenced a global.css file which has been removed.
- global.css was created earlier then intentionally removed; NativeWind works without an imported global CSS when using the Babel/runtime plugin.

## Run & dev commands
- Install: npm install
- Start metro/dev server: expo start -c  (clear cache recommended after config changes)
- Run Android/iOS: expo start --android / --ios
- Web: expo start --web

## Recommended checks & troubleshooting steps for styling issues
1. Restart metro with cache cleared: `expo start -c`.
2. Close and re-open Expo Go (or rebuild native app) after native config changes.
3. Ensure all files using className have extensions matched by tailwind.config.js (js, jsx, ts, tsx, mdx). Dynamic classNames concatenated at runtime may not be picked up by Tailwind's static scanner — prefer full class strings or add safelist in tailwind.config.js for dynamic classes.
4. If some utilities are missing, verify tailwind.config.js `content` paths include the file locations.
5. Check Metro console for nativewind warnings/errors.
6. If using react-native-reanimated, add its Babel plugin to babel.config.js plugins array (at the end):

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

## Fonts
- Fonts are loaded in app/_layout.tsx via expo-font useFonts — keep these font files in assets/fonts and ensure keys match tailwind fontFamily names used in tailwind.config.js.

## Suggestions (non-breaking)
- Add `react-native-reanimated/plugin` in babel.config.js if Reanimated is used in animations.
- Keep tailwind.config.js content globs narrow if performance issues appear; currently broad globs were added for coverage.
- Add a small README section documenting how to use NativeWind and how to add safelist classes for runtime-generated class names.

## Agent tasks (for future automation)
- Task: Run `expo start -c` and capture Metro logs — look for nativewind/tailwind warnings.
- Task: Scan codebase for dynamic className patterns and generate a safelist snippet for tailwind.config.js.
- Task: Run a quick smoke test on Android/iOS to verify major screens render with expected styles.

## Checklist for contributors
- [ ] npm install
- [ ] expo start -c and verify app loads in Expo Go
- [ ] Verify fonts load and custom font class names work
- [ ] Validate Tailwind classes render on critical screens (Welcome, Tabs)
- [ ] Open Metro logs for nativewind warnings and fix any reported path/class issues

---

If you want, next actions I can take now:
- Add `react-native-reanimated/plugin` to babel.config.js (requires commit).
- Run `expo start -c` and capture logs (requires running local dev server).
- Generate a Tailwind safelist for dynamic classes found in the code.

