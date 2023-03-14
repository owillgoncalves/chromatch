import { Card } from "flowbite-react";
import { cmykToRgb } from "~/utils/colors/cmykToRgb";

export function ColorCard({
  value,
  format,
}: {
  value: string;
  format: string;
}) {
  const backgroundColor = format === "cmyk" ? cmykToRgb(value) : value;
  const text = format === "hex" ? value.toUpperCase() : value;
  return (
    <Card
      className="relative h-24 w-32 !border-2 border-gray-100 dark:border-gray-700"
      style={{ backgroundColor }}
    >
      <p className="absolute bottom-0 left-0 right-0 bg-gray-100 py-2 text-center text-xs font-normal text-gray-700 dark:bg-gray-700 dark:text-gray-300">
        {text}
      </p>
    </Card>
  );
}
