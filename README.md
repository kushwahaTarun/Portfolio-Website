# Tarun Kushwaha — Portfolio

Personal portfolio built with Next.js, React, and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Configure these in your local `.env.local` and in the production hosting environment. Never commit real secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes for contact form delivery | Resend API key used to send contact-form notifications |
| `CONTACT_TO_EMAIL` | No | Destination inbox; defaults to the email in `lib/site.ts` |
| `CONTACT_FROM_EMAIL` | Recommended | Verified sender address/domain configured in Resend |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes for production rate limiting | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes for production rate limiting | Server-only Supabase service-role key; never expose it with a `NEXT_PUBLIC_` prefix |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only if browser-side Supabase features are used | Supabase anon key |

The contact endpoint deliberately returns HTTP 503 when `RESEND_API_KEY` is missing. It does not report a successful send or log submitted contact details in that configuration.

## Production checklist

1. Set the environment variables above in the production deployment.
2. Verify the Resend sender domain/address and send a real test message through the contact form.
3. Deploy the Supabase `check_rate_limit` RPC expected by `lib/rate-limit.ts`. Confirm it is callable using the service-role key and that the rate-limit table/function permissions are restricted appropriately.
4. Test the contact form with valid input, invalid input, the honeypot field, and repeated submissions.
5. Check `/robots.txt`, `/sitemap.xml`, canonical URLs, and Open Graph previews on the deployed domain.
6. Run `npm run lint`, `npm run typecheck`, and `npm run build` before merging.

## Scripts

- `npm run dev` — local development
- `npm run lint` — lint checks
- `npm run typecheck` — TypeScript checks
- `npm run build` — production build
- `npm run start` — run the production server
