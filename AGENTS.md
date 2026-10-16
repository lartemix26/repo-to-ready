<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep product catalog data in the shared browser-safe catalog module so the storefront and MCP expose identical products and prices.
- Register authenticated remote tools through the MCP SDK plugin and browser-local tools only in their owning screen; this keeps transport authorization separate from tab actions.
- Canonicalize local OAuth return paths at the sign-in boundary and preserve them through every method so consent cannot be lost or redirected off-site.
