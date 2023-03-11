import type { LoaderFunction } from "@remix-run/node";
import { fetchApiRoute } from "~/utils/routes/index.server";

export const loader: LoaderFunction = async ({ request }) =>
  fetchApiRoute(request.url);

// export default function () {
//   return (
//     <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
//       <h1>SHADES OF</h1>
//     </div>
//   );
// }
