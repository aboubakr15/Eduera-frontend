import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instructorApi } from "../../api/instructorApi";
import { FaUser, FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const InstructorStudents = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCourse, setFilterCourse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = filterCourse ? { course_offering: filterCourse } : {};
        const [studentsRes, coursesRes] = await Promise.all([
          instructorApi.getStudents(params),
          instructorApi.getCourses(),
        ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filterCourse]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D67A1E]"></div>
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-[#1B2036] transition-all group"
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-1"
          />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-sm text-gray-400 flex items-center gap-2 mt-0.5">
            View students across your courses
            {students.length > 0 && (
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                {students.length} Students
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 bg-white outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all w-full max-w-xs"
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.course_name}
            </option>
          ))}
        </select>
      </div>

      {students.length > 0 && (
        <div className="space-y-4">
          {students.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 border-l-4 border-l-[#5362a3] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-gray-500" size={18} />
                </div>

                <div>
                  <h3 className="text-md font-bold text-gray-800">
                    {s.full_name}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
                    <FaEnvelope size={10} /> {s.email}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg">
                      ID: {s.student_id}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 px-3.5 py-2 rounded-lg">
                      <FaGraduationCap size={9} /> GPA: {s.current_gpa}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block flex-shrink-0">
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                  {s.enrolled_courses?.length || 0} Courses
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {students.length === 0 && (
        <div className="flex-1 flex items-center justify-center mt-20">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-sm w-full">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUser size={28} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">
              No Students Found
            </h3>
            <p className="text-sm text-gray-400">
              {filterCourse
                ? "No students enrolled in this specific course."
                : "There are no students registered yet."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorStudents;
