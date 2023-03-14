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
        CONVERT
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
      <div className="flex flex-col justify-center gap-4 text-center">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {output.hsl}
        </h4>
        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {output.rgb}
        </h4>
        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {output.hex.toUpperCase()}
        </h4>
        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {output.cmyk}
        </h4>
      </div>
    </div>
  );
}
