import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Book, Clock, Users } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: "Introduction to Algebra",
    description: "Learn the fundamentals of algebra, including variables, equations, and functions.",
    category: "Mathematics",
    difficulty: "Beginner",
    chapters: 12,
    duration: "6 weeks",
    enrolled: 1234,
    progress: 0,
  },
  {
    id: 2,
    title: "World History: Ancient Civilizations",
    description: "Explore the rise and fall of ancient civilizations from Mesopotamia to Rome.",
    category: "History",
    difficulty: "Intermediate",
    chapters: 15,
    duration: "8 weeks",
    enrolled: 987,
    progress: 60,
  },
  {
    id: 3,
    title: "Advanced English Literature",
    description: "Analyze classic and contemporary works of English literature.",
    category: "Language Arts",
    difficulty: "Advanced",
    chapters: 20,
    duration: "10 weeks",
    enrolled: 567,
    progress: 30,
  },
  {
    id: 4,
    title: "Introduction to Physics",
    description: "Discover the fundamental principles of physics, from mechanics to thermodynamics.",
    category: "Science",
    difficulty: "Beginner",
    chapters: 14,
    duration: "7 weeks",
    enrolled: 890,
    progress: 0,
  },
]

export function CourseList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.difficulty}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Book className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm text-muted-foreground">
                  {course.chapters} Chapters
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm text-muted-foreground">
                  {course.duration}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm text-muted-foreground">
                  {course.enrolled.toLocaleString()} Enrolled
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-2">
            {course.progress > 0 ? (
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="w-full" />
              </div>
            ) : (
              <Button className="w-full">Start Course</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

