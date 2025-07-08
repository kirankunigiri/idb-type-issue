# idb-type-issue
Repro for instantdb type issue

### Steps
- `bun i`
- Open `app/app/index.tsx`
- Example query result `expense` will have fields with type unknown
- Schema is defined in `shared/instant.schema.ts` using core. Changing it to use react-native instead will fix the issue, but we need to be able to use core since this is a monorepo