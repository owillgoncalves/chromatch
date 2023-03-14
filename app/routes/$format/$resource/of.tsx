import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ColorCard } from "~/components/ColorCard";
import { fetchApiRoute } from "~/utils/routes/index.server";

export const loader: LoaderFunction = async ({ request }) =>
  fetchApiRoute(request.url);

export default function () {
  const { input, output } = useLoaderData() as any;
  return (
    <div className="mx-auto flex flex-col text-center">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">
        SHADES
      </h1>
      <h3 className="mt-8 mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        INPUT
      </h3>
      <div className="flex justify-center">
        <ColorCard value={input.color} format={input.format} />
      </div>
      <h3 className="mt-8 mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        OUTPUT
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <ColorCard value={output.shades[100]} format={input.format} />
        <ColorCard value={output.shades[200]} format={input.format} />
        <ColorCard value={output.shades[300]} format={input.format} />
        <ColorCard value={output.shades[400]} format={input.format} />
        <ColorCard value={output.shades[500]} format={input.format} />
        <ColorCard value={output.shades[600]} format={input.format} />
        <ColorCard value={output.shades[700]} format={input.format} />
        <ColorCard value={output.shades[800]} format={input.format} />
        <ColorCard value={output.shades[900]} format={input.format} />
      </div>
    </div>
  );
}
