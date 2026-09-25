/* `server-only` throws when imported outside a server context, which is the
   whole point of it in lib/lead.ts. Under test there is no server context and
   no client bundle to protect, so it resolves to nothing. */
export {};
