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
        PALETTE
      </h1>
      <h3 className="mt-8 mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        INPUT
      </h3>
      <div className="flex justify-center">
        <ColorCard value={input.color} format={input.format} />
      </div>
      <h3 className="mt-8 text-2xl font-bold text-gray-700 dark:text-gray-300">
        OUTPUT
      </h3>
      <div className="flex flex-col">
        {Object.entries(output).map(([type, { colors }]: any) => (
          <div className="flex flex-col" key={type}>
            <h4 className="mt-4 mb-1 text-xl font-bold text-gray-700 dark:text-gray-300">
              {type.toUpperCase()}
            </h4>
            <div className="flex flex-wrap gap-4">
              {colors.map((value: { color: string }) => (
                <ColorCard
                  key={value.color}
                  value={value.color}
                  format={input.format}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
