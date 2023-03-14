import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { ColorCard } from "~/components/ColorCard";
import { fetchApiRoute } from "~/utils/routes/index.server";

export const loader: LoaderFunction = async ({ request }) =>
  fetchApiRoute(request.url);

export default function () {
  const { input, output } = useLoaderData() as any;
  return (
    <div className="mx-auto flex flex-col text-center">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">
        BLEND
      </h1>
      <h3 className="mt-8 mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        INPUT
      </h3>
      <div className="flex justify-center gap-4">
        <ColorCard value={input.color} format={input.format} />
        <ColorCard value={input.secondColor} format={input.format} />
      </div>
      <h3 className="mt-8 mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        OUTPUT
      </h3>
      <div className="flex justify-center">
        <ColorCard value={output.color} format={output.format} />
      </div>
    </div>
  );
}
