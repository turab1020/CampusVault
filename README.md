# CampusVault: Academic Deliverable

## Project Identity
**Project**: CampusVault Marketplace Frontend
**Stack**: React, Vite, Tailwind CSS (v3)
**Design System**: Neobrutalist UI Architecture
**Academic Delivery Track**: Core Engineering & Interface Design

## System Architecture mapped decisions
CampusVault deviates from traditional component systems by executing a strict structural **Neobrutalism UI framework**.
### Structural Tokens
- **Borders**: Forced `.border-4 .border-black` bounding variables.
- **Shadows**: Hand-mapped dropshadow matrices `.shadow-[4px_4px_0px_#000]` simulating hard-painted layer extrusions instead of native box-shadows.
- **Typography Matrix**: `Archivo Black` assigned universally for global display headers, while `DM Sans` processes readability data. Both are configured under Tailwind root `theme.fontFamily`.

### Subsystem Boundaries
- **Router Layering**: React Router DOM (v6) binds protected execution wrappers isolating (`Admin.jsx` & `Dashboard.jsx`) behind a monolithic `<AuthProvider>` execution state parsing `localStorage` persistent JWT simulation tokens.
- **Micro-interactions**: Hover events physically transform absolute coordinates (`-translate-y-1`) mapping the visual depth shifts to mimic raw 90s OS interface elasticity without rendering native smooth UI logic.

## Execution Sequence
1. **Repository Synchronization**: Clone core `dev` logic node.
2. **Package Graphing**: Run `npm install` establishing exact dependency mapping.
3. **Local Dev Container**: `npm run dev` bootstraps Vite HMR stream on port 5173.

## Architectural Stabilization
The core loop now enforces deterministic state bounds intercepting fatal unhandled exceptions (`ErrorBoundary`) transforming standard failure white-screens directly into stylized system crash alerts matching the Neobrutalist semantic identity entirely. Data operations utilize synthetic API boundaries validating payload streams.
