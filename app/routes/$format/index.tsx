import { useRouteLoaderData } from "@remix-run/react";
import { CardLink } from "~/components/CardLink";

export default function () {
  const data = useRouteLoaderData("routes/$format");
  return (
    <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      <CardLink
        path="blend"
        title="Blend Colors"
        description="Blend colors together to create new ones."
      />
      <CardLink
        path="convert"
        title="Convert Colors"
        description="Convert colors between HEX, RGB, HSL, and CMYK."
      />
      <CardLink
        path="palette"
        title="Generate Palettes"
        description="Generate color palettes from HEX, RGB, HSL, or CMYK."
      />
      <CardLink
        path="shades"
        title="Generate Shades"
        description="Generate shades of a color from HEX, RGB, HSL, or CMYK."
      />
    </div>
  );
}
