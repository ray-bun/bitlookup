import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => {
  return [
    { title: "BitLookup - Recovery faster from Cloudstrike Blue Screen Of Death C-00000291*.sys for Bitlocker machines" },
    {
      property: "og:title",
      content: "BitLookup - Recovery faster from Cloudstrike Blue Screen Of Death C-00000291*.sys for Bitlocker machines",
    },
    {
      name: "description",
      content: "BitLookup - Recovery faster from Cloudstrike Blue Screen Of Death C-00000291*.sys for Bitlocker machines",
    },
  ];
};
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
