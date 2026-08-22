# Local development (feat-account-app)

Worktree path (moved out from under `_repo/`):

```bash
cd /Users/ekaterinavlasova/Desktop/rentiers-website/feat-account-app
```

## Preview (works today)

Static export is already in `out/`. Use Python while `next dev` is unreliable on this machine:

```bash
# stop anything on 3001 first if needed
python3 -m http.server 3001 --bind 127.0.0.1 --directory out
```

Open: http://127.0.0.1:3001/account/register/

### Magic activate e2e

1. Register → portfolio → deposit → payment-success → dashboard (pending)
2. Open http://127.0.0.1:3001/manager-activate.html  
   - Base URL defaults to this origin `/account/activate/`  
   - Secret = value of `NEXT_PUBLIC_ACTIVATION_SECRET` in `.env.local` (local default was set for you)
3. Generate link → open it → dashboard becomes **Active**
4. Then try **Download Statement** / **Request Withdrawal** (after you rebuild — see below)

## Hot reload (`npm run dev`)

Still slow/hanging in this environment (Next watches a large tree; TypeScript step can stall). Config pins `turbopack.root` and ignores `content-factory` / `out`.

Try overnight or on a quieter machine:

```bash
cd /Users/ekaterinavlasova/Desktop/rentiers-website/feat-account-app
# optional: keep content-factory.devbak renamed away
NEXT_TELEMETRY_DISABLED=1 npm run build   # may take 10–20+ minutes
python3 -m http.server 3001 --bind 127.0.0.1 --directory out
```

For true HMR when it works:

```bash
npm run dev   # http://127.0.0.1:3001
```

## Restore home lockfile

```bash
mv ~/package-lock.json.bak-rentiers ~/package-lock.json
```
