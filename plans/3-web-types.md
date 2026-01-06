## Plan
Split public types between React Native and React DOM, then publish conditional exports so RN/RNW see native types and DOM sees div-based types.

## Type Split
- Move current RN-specific public types into `src/types.native.ts`.
- Create DOM-specific public types in `src/types.ts` (LegendListProps extends div props).
- Extract shared definitions into `src/types.base.ts` to avoid duplication across platforms.

## Build & Exports
- Keep `tsup` emitting `index.d.ts` and `index.native.d.ts` via existing `.native` resolution.
- Add `exports` entries with `types` per condition for `.` and all public subpaths (`./animated`, `./reanimated`, `./keyboard`, etc.).
- Preserve the `react-native` field for Metro; ensure default export paths remain unchanged.

## Validation
- Run `bun run build` and `bun run tsc` to confirm typings resolve for DOM and RN.
- Spot-check example-web imports compile against DOM types.

## Steps
- [ ] Add `types.base.ts`, move shared type definitions, and create platform-specific `types.ts` + `types.native.ts`.
- [ ] Update barrel exports to re-export platform-specific types without changing public API.
- [ ] Add conditional `exports` + subpath mappings in `package.json` for `types` and JS outputs.
- [ ] Run build + typecheck and fix any fallout in example-web or integrations.
