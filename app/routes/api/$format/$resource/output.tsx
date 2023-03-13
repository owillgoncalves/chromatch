import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { inputFromUrl } from "domain-functions";
import { getResultErrors } from "~/utils/errors/getResultErrors.server";
import { formatIsValid } from "~/domains/formatIsValid.server";
import type { Formats } from "~/utils/client-types";
import { palette } from "~/domains/palette.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { format, resource } = params;
  const data = inputFromUrl(request);
  const formatResult = await formatIsValid({ format });
  if (!formatResult.success) {
    throw json({ message: getResultErrors(formatResult) }, 400);
  }
  const result = await palette[formatResult.data.format as Formats]({
    colors: [{color: data.color, secondColor: data.secondColor }],
    resource,
  });
  if (!result.success) {
    throw json({ message: getResultErrors(result) }, 400);
  }
  return json(
    {
      input: {
        format,
        resource,
        color: data.color,
      },
      output: result.data,
    },
    { status: 200 }
  );
};