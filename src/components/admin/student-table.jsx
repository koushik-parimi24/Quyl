import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../../lib/superbase'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { AddStudentDialog } from './add-students-dialog'
import { EditStudentDialog } from './edit-student-dialog'
import student1 from '../../assets/student.png'
import student2 from '../../assets/student-2.png'

export function StudentTable() {
  const [year, setYear] = useState("all")
  const [grade, setGrade] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const sortStudents = useCallback((studentsArray) => {
    console.log('Sorting students:', studentsArray.length)
    return [...studentsArray].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const fetchStudents = useCallback(async () => {
    console.log('Fetching students...')
    setLoading(true)
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching students:', error)
    } else {
      console.log('Fetched students:', data)
      setStudents(sortStudents(data || []))
    }
    setLoading(false)
  }, [sortStudents])

  useEffect(() => {
    fetchStudents()
    
    const channel = supabase
      .channel('table-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, (payload) => {
        console.log('Database change detected:', payload)
        fetchStudents()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchStudents])

  const handleStudentAdded = useCallback((newStudent) => {
    console.log('New student added:', newStudent)
    fetchStudents()
  }, [fetchStudents])

  const handleStudentEdited = useCallback((editedStudent) => {
    console.log('Student edited:', editedStudent)
    fetchStudents()
  }, [fetchStudents])

  const handleDeleteStudent = useCallback(async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?")
    if (confirmDelete) {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId)

      if (error) {
        console.error('Error deleting student:', error)
      } else {
        console.log('Student deleted:', studentId)
        fetchStudents()
      }
    }
  }, [fetchStudents])

  const filteredStudents = useMemo(() => {
    console.log('Filtering students. Total:', students.length, 'Year:', year, 'Grade:', grade)
    return students.filter(student => {
      const yearMatch = year === "all" || student.cohort.includes(year);
      const gradeMatch = grade === "all" || student.cohort.includes(grade);
      return yearMatch && gradeMatch;
    });
  }, [students, year, grade]);

  console.log('Rendering StudentTable. Students:', students.length, 'Filtered:', filteredStudents.length)

  return (
    <div className="flex flex-col p-4">
      <div className="p-6 mt-4 w-full bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Select value={year} onValueChange={setYear} className="w-full md:w-[180px]">
              <SelectTrigger className="bg-gray-300" >
                <SelectValue placeholder="Select year"/>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all" className="hover:bg-slate-200">All Years</SelectItem>
                <SelectItem value="AY 2024-25" className="hover:bg-slate-200">AY 2024-25</SelectItem>
                <SelectItem value="AY 2023-24" className="hover:bg-slate-200">AY 2023-24</SelectItem>
              </SelectContent>
            </Select>

            <Select value={grade} onValueChange={setGrade} className="w-full md:w-[180px]">
              <SelectTrigger className="bg-gray-300">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all" className="hover:bg-slate-200">All Grades</SelectItem>
                <SelectItem value="CBSE 9" className="hover:bg-slate-200">CBSE 9</SelectItem>
                <SelectItem value="CBSE 10" className="hover:bg-slate-200">CBSE 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gray-300 text-gray-700 hover:bg-gray-300 w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add new Student
          </Button>
        </div>

        <div className="rounded-lg overflow-x-auto">
          {loading ? (
            <p>Loading students...</p>
          ) : filteredStudents.length === 0 ? (
            <p>No students found. Please check your filters or add new students.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Cohort</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Last login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{student.cohort}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {student.courses.map((course, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5">
                            <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded">
                              {i === 0 ? (
                                <img src={student1} className="w-4 h-4 rounded-sm" alt="Science course icon" />
                              ) : (
                                <img src={student2} className="w-4 h-4 rounded-sm" alt="Math course icon" />
                              )}
                            </span>
                            <span className="min-w-[120px]">{course}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="pr-16">{new Date(student.date_joined).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(student.last_login).toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`w-2 h-2 ml-4 rounded-full inline-block ${
                        student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setEditingStudent(student)
                            setIsEditDialogOpen(true)
                          }}
                          className="p-2"
                          variant="outline"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2"
                          variant="outline"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <AddStudentDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen}
          onStudentAdded={handleStudentAdded}
        />
        <EditStudentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          student={editingStudent}
          onStudentEdited={handleStudentEdited}
        />
      </div>
    </div>
  )
}
