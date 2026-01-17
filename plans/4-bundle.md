## Plan
Ship separate development and production bundles for web entrypoints (React DOM) while keeping the React Native entrypoint dynamic, then wire package exports to select the correct bundle.

## Build Outputs
- Keep native build as a single output that relies on Metro's __DEV__ for dev/prod behavior at app bundle time.
- Add web dev/prod outputs (index.development.* and index.production.*) for ESM + CJS.
- Ensure development builds keep debug code and production builds compile it out.

## Exports & Package Metadata
- Add conditional exports for web entrypoints using development/production conditions and default to production.
- Keep the react-native field pointing at the native output for Metro compatibility.
- Preserve existing subpath exports (animated, reanimated, keyboard, etc.) and add dev/prod variants where applicable.

## Validation
- Run bun run build to confirm files land in dist with expected names.
- Verify dev/prod selection by checking built output for dev-only code presence/absence.

## Steps
- [x] Update tsup config to emit separate web dev/prod bundles and keep a single native bundle.
- [ ] Update posttsup packaging to write conditional exports for dev/prod web bundles and preserve react-native entrypoint.
- [ ] Build and verify that dev-only code is present in dev bundles and stripped from prod bundles.
