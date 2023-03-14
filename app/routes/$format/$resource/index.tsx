import type { ActionFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { ColorCard } from "~/components/ColorCard";
import { Form } from "~/form";
import { formAction } from "~/form-action.server";
import { FormColorSchema } from "~/schemas/form";
import type { FormatRouteData, Formats, ResourceRouteData, Resources } from "~/utils/client-types";
import { getButtonLabel } from "~/utils/form/getButtonLabel";
import { getLabels } from "~/utils/form/getLabels";
import { getPlaceholders } from "~/utils/form/getPlaceholders";
import { getSuccessPath } from "~/utils/form/getSuccessPath.server";

const mutation = makeDomainFunction(z.any())(async (values) => {
  return null;
});

export const action: ActionFunction = async ({ request, params }) => {
  const { format, resource } = params;
  const formData = await request.clone().formData();
  const color = formData.get("color");
  const secondColor = formData.get("secondColor");
  return formAction({
    request,
    schema: FormColorSchema(resource as Resources, format as Formats),
    mutation,
    transformValues: (values) => ({ ...values, resource, format }),
    successPath: getSuccessPath(resource as Resources, color, secondColor),
  });
};

export default function () {
  const { resource } = useRouteLoaderData("routes/$format/$resource") as ResourceRouteData;
  const data = useRouteLoaderData("routes/$format") as FormatRouteData;
  const buttonLabel = getButtonLabel(resource, data.format);
  return (
    <div className="flex flex-1 justify-center md:items-center">
      <Form
        mode="onBlur"
        buttonLabel={buttonLabel}
        labels={getLabels(resource, data.format)}
        pendingButtonLabel="..."
        placeholders={getPlaceholders(resource, data.format)}
        schema={FormColorSchema(resource, data.format)}
      />
    </div>
  );
}