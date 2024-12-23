import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { supabase } from '../../lib/superbase'

export function EditStudentDialog({ open, onOpenChange, student, onStudentEdited }) {
  const [name, setName] = useState('')
  const [cohort, setCohort] = useState('')
  const [courses, setCourses] = useState('')
  const [dateJoined, setDateJoined] = useState('')
  const [lastLogin, setLastLogin] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (student) {
      setName(student.name)
      setCohort(student.cohort)
      setCourses(student.courses.join(', '))
      setDateJoined(student.date_joined)
      setLastLogin(student.last_login)
      setStatus(student.status)
    }
  }, [student])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!student) return

    const updatedStudent = {
      name,
      cohort,
      courses: courses.split(',').map(course => course.trim()),
      date_joined: dateJoined,
      last_login: lastLogin,
      status
    }

    const { data, error } = await supabase
      .from('students')
      .update(updatedStudent)
      .eq('id', student.id)

    if (error) {
      console.error('Error updating student:', error)
    } else {
      console.log('Student updated:', data)
      onStudentEdited(data)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cohort" className="text-right">
                Cohort
              </Label>
              <Input
                id="cohort"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courses" className="text-right">
                Courses
              </Label>
              <Input
                id="courses"
                value={courses}
                onChange={(e) => setCourses(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateJoined" className="text-right">
                Date Joined
              </Label>
              <Input
                id="dateJoined"
                type="date"
                value={dateJoined}
                onChange={(e) => setDateJoined(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastLogin" className="text-right">
                Last Login
              </Label>
              <Input
                id="lastLogin"
                type="datetime-local"
                value={lastLogin}
                onChange={(e) => setLastLogin(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

