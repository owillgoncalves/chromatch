import { Link } from "@remix-run/react"
import { Card } from "flowbite-react"

export function CardLink ({
  path,
  title,
  description
}: {
  path: string
  title: string
  description: string
}) {
  return (
    <Link to={path}>
      <Card className="h-full text-center hover:scale-[102%] active:scale-[98%] transition-all duration-300">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </Card>
    </Link>
  )
}