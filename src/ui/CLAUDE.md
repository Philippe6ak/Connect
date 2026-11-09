# Pure UI components (src/ui)

Files here receive everything through props. They must NOT import from `src/api`, `src/hooks`,
`src/context`, `src/lib` or `@supabase/*`, call `useQuery`/`useMutation`/router hooks, or contain
business rules. Local UI state (open/closed, hover, tabs) is fine.

- Props: `label`, `error`, `className`, `ref`, `...props` spread onto the root control
  (React 19: `ref` is a normal prop, no `forwardRef`). Controls must work with react-hook-form `register()`.
- Match the existing components in this folder (Input, Select, Button, Modal, AuthCard).
