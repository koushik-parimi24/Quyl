import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"

export function RecentActivity() {
  const activities = [
    { user: "John Doe", action: "submitted assignment", course: "Mathematics 101", time: "2 hours ago" },
    { user: "Jane Smith", action: "completed quiz", course: "Physics 202", time: "4 hours ago" },
    { user: "Bob Johnson", action: "joined course", course: "Chemistry 301", time: "1 day ago" },
    { user: "Alice Brown", action: "asked a question", course: "Biology 101", time: "2 days ago" },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className="inline-block h-8 w-8 rounded-full bg-gray-200" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-gray-500">
                  {activity.action} in {activity.course}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

