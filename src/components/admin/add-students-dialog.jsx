import { useState } from 'react'
import { supabase } from '../../lib/superbase'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Input } from "../ui/input"

export function AddStudentDialog({ open, onOpenChange, onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    cohort: '',
    courses: [],
    status: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          name: formData.name,
          cohort: formData.cohort,
          courses: formData.courses,
          date_joined: new Date().toISOString(),
          last_login: new Date().toISOString(),
          status: formData.status,
        },
      ])
      .select()

    if (error) {
      console.error('Error adding student:', error.message);
    } else if (data && data.length > 0) {
      console.log('Student added:', data[0]);
      onStudentAdded(data[0]);
      onOpenChange(false);
      setFormData({
        name: '',
        cohort: '',
        courses: [],
        status: ''
      });
    } else {
      console.error('No data returned from the insertion.');
    }
  };

  const handleCourseChange = (index, value) => {
    const newCourses = [...formData.courses];
    newCourses[index] = value;
    setFormData({ ...formData, courses: newCourses });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Student Name</label>
            <Input
              placeholder="Enter student name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cohort</label>
            <Select
              value={formData.cohort}
              onValueChange={(value) => setFormData({ ...formData, cohort: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cohort" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="AY 2024-25 CBSE 9" className="hover:bg-gray-200">AY 2024-25 (CBSE 9)</SelectItem>
                <SelectItem value="AY 2024-25 CBSE 10" className="hover:bg-gray-200">AY 2024-25 (CBSE 10)</SelectItem>
                <SelectItem value="AY 2023-24 CBSE 9" className="hover:bg-gray-200">AY 2023-24 (CBSE 9)</SelectItem>
                <SelectItem value="AY 2023-24 CBSE 10" className="hover:bg-gray-200">AY 2023-24 (CBSE 10)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Courses</label>
            <div className="flex gap-4">
              <Select
                value={formData.courses[0]}
                onValueChange={(value) => handleCourseChange(0, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select science" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="CBSE 9 Science" className="hover:bg-gray-200">CBSE 9 Science</SelectItem>
                  <SelectItem value="CBSE 10 Science" className="hover:bg-gray-200">CBSE 10 Science</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={formData.courses[1]}
                onValueChange={(value) => handleCourseChange(1, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select math" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="CBSE 9 Math" className="hover:bg-gray-200">CBSE 9 Math</SelectItem>
                  <SelectItem value="CBSE 10 Math" className="hover:bg-gray-200">CBSE 10 Math</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status of student" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="active" className="hover:bg-gray-200">Active</SelectItem>
                <SelectItem value="not-active" className="hover:bg-gray-200">Not Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

