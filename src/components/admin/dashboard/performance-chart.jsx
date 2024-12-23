import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", performance: 80 },
  { name: "Feb", performance: 75 },
  { name: "Mar", performance: 85 },
  { name: "Apr", performance: 78 },
  { name: "May", performance: 82 },
  { name: "Jun", performance: 88 },
]

export function PerformanceChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
            <Bar dataKey="performance" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

