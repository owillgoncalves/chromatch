import { CardLink } from "~/components/CardLink";

export default function () {
  return (
    <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      <CardLink description="#000000" title="HEX" path="/hex" />
      <CardLink description="rgb(0, 0, 0)" title="RGB" path="/rgb" />
      <CardLink description="hsl(0, 0%, 0%)" title="HSL" path="/hsl" />
      <CardLink description="cmyk(0, 0, 0, 0)" title="CMYK" path="/cmyk" />
    </div>
  );
}
