import type { LoaderFunction } from "@remix-run/node";
import { fetchApiRoute } from "~/utils/routes/index.server";

export const loader: LoaderFunction = async ({ request }) =>
  fetchApiRoute(request.url);

// export default function () {
//   return (
//     <div className="flex flex-1 justify-center md:items-center">
//       <h1>BLEND WITH</h1>
//     </div>
//   );
// }
