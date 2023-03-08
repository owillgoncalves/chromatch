import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { ErrorComponent } from "~/components/ErrorComponent";
import { getResultErrors } from "~/utils/errors/getResultErrors.server";
import { resourceIsValid } from "~/domains/resourceIsValid.server";

export const loader: LoaderFunction = async (request) => {
  const { resource } = request.params;
  const result = await resourceIsValid(resource);
  if (!result.success) {
    throw json({ message: getResultErrors(result) }, 400);
  }
  return json({ resource: result.data }, { status: 200 });
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorComponent message={error.message} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <ErrorComponent message={`${caught.data.message} | ${caught.status}`} />
  );
}

export default function () {
  const { resource } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-1 justify-center md:items-center">{resource}</div>
  );
}
