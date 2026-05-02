import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { instructorApi } from "../../api/instructorApi";
import {
  FaPlus,
  FaClipboardList,
  FaArrowRight,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const InstructorAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    course_offering: "",
    title: "",
    description: "",
    due_date: "",
    total_points: 10,
    assignment_type: "REPORT",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignRes, coursesRes] = await Promise.all([
          instructorApi.getAssignments(),
          instructorApi.getCourses(),
        ]);
        setAssignments(assignRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await instructorApi.createAssignment(newAssignment);
      setAssignments([...assignments, response.data]);
      setShowModal(false);
      setNewAssignment({
        course_offering: "",
        title: "",
        description: "",
        due_date: "",
        total_points: 10,
        assignment_type: "REPORT",
      });
    } catch (err) {
      console.error("Failed to create:", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D67A1E]"></div>
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
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
            <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
            <p className="text-sm text-gray-400 flex items-center gap-2 mt-0.5">
              Create and manage assignments
              {assignments.length > 0 && (
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                  {assignments.length} Total
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#282f4f] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <FaPlus size={14} /> Add Assignment
        </button>
      </div>

      {assignments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 border-l-4 border-l-[#5362a3] flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <FaClipboardList className="text-[#D67A1E]" size={20} />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-1.5 rounded-lg">
                    {a.assignment_type}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                    {parseInt(a.total_points)} Points
                  </span>
                </div>
              </div>

              <div className="mb-4 flex-1">
                <h3 className="text-base font-bold text-gray-800 leading-tight mb-1 line-clamp-2">
                  {a.title}
                </h3>
                {a.description && (
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {a.description}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg inline-block truncate max-w-[260px]">
                  {a.course_name}
                </span>
              </div>

              <div className="text-xs text-gray-400 mb-4 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt size={10} />
                  {new Date(a.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{a.submission_count || 0} Submissions</span>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50">
                <Link
                  to={`/instructor/assignments/${a.id}`}
                  className="flex items-center gap-2 text-sm text-[#D67A1E] font-semibold hover:gap-3 transition-all duration-200"
                >
                  View Details
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {assignments.length === 0 && (
        <div className="flex-1 flex items-center justify-center mt-20">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-sm w-full">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaClipboardList size={28} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">
              No Assignments Found
            </h3>
            <p className="text-sm text-gray-400">
              You haven't created any assignments yet.
            </p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Create Assignment
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Course
                </label>
                <select
                  value={newAssignment.course_offering}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      course_offering: e.target.value,
                    })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                  required
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Title
                </label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      title: e.target.value,
                    })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 resize-none bg-gray-50/50"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={newAssignment.due_date}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      due_date: e.target.value,
                    })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Points
                  </label>
                  <input
                    type="number"
                    value={newAssignment.total_points}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        total_points: e.target.value,
                      })
                    }
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Type
                  </label>
                  <select
                    value={newAssignment.assignment_type}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        assignment_type: e.target.value,
                      })
                    }
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                  >
                    <option value="REPORT">Report</option>
                    <option value="QUIZ">Quiz</option>
                    <option value="EXAM">Exam</option>
                    <option value="PROJECT">Project</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#1B2036] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorAssignments;
