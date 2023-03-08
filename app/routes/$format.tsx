import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useCatch } from "@remix-run/react";
import { ErrorComponent } from "~/components/ErrorComponent";
import { getResultErrors } from "~/utils/errors/getResultErrors.server";
import { formatIsValid } from "~/domains/formatIsValid.server";

export const loader: LoaderFunction = async (request) => {
  const { format } = request.params;
  const result = await formatIsValid(format);
  if (!result.success) {
    throw json({ message: getResultErrors(result) }, 400);
  }
  return json({ format: result.data }, { status: 200 });
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
  return <Outlet />;
}
