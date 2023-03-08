import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { ErrorComponent } from "./components/ErrorComponent";
import { Layout } from "./components/Layout";
import { Theme, ThemeProvider } from "./context/Theme";
import useTheme from "./hooks/useTheme";
import { getThemeSession } from "./session/theme.server";

export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };
  return data;
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function ErrorBoundary({ error }: { error: Error }) {
  const [theme] = useTheme();
  return (
    <html lang="en" className={theme === Theme.DARK ? "dark" : ""}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen w-full flex-col bg-gray-100 p-4 dark:bg-gray-900">
        <Layout>
          <ErrorComponent message={error.message} />;
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const [theme] = useTheme();
  return (
    <html lang="en" className={theme === Theme.DARK ? "dark" : ""}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen w-full flex-col bg-gray-100 p-4 dark:bg-gray-900">
        <Layout>
          <ErrorComponent
            message={`${caught.data.message} | ${caught.status}`}
          />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function App() {
  const [theme] = useTheme();
  return (
    <html lang="en" className={theme === Theme.DARK ? "dark" : ""}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen w-full flex-col bg-gray-100 p-4 dark:bg-gray-900">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
