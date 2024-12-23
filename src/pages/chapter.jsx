import { CourseList } from "../components/admin/chapter/chapter-list";

function Chapter() {
    return ( 
        <div className="flex h-screen bg-gray-100"> 
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Courses and Chapters</h1>
          <CourseList />
        </div>
      </main>
      </div>
     );
}

export default Chapter;