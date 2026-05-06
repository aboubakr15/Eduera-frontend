import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { studentApi } from "../../api/studentApi";
import {
  FaGraduationCap,
  FaBookOpen,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const getLetterGrade = (score) => {
  const num = parseFloat(score);
  if (num >= 90) return "A";
  if (num >= 80) return "B";
  if (num >= 70) return "C";
  if (num >= 60) return "D";
  return "F";
};

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ACTIVE");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await studentApi.getGrades();
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];
        setGrades(data);
      } catch (err) {
        console.error("Failed to fetch grades:", err);
        setError("Failed to load grades");
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  const filteredGrades = grades.filter((g) => !filter || g.status === filter);

  const completedCount = grades.filter((g) => g.status === "COMPLETED").length;
  const averageGrade =
    completedCount > 0
      ? (
          grades
            .filter((g) => g.status === "COMPLETED")
            .reduce((sum, g) => sum + parseFloat(g.grade || 0), 0) /
          completedCount
        ).toFixed(2)
      : "0.00";

  const averageLetterGrade =
    completedCount > 0 ? getLetterGrade(averageGrade) : "-";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D67A1E]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4">
      {/* Header */}
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
            <h1 className="text-2xl font-bold text-gray-800">Grades</h1>
            <p className="text-sm text-gray-400">
              View your course grades and GPA
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 border-l-4 border-l-blue-500">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaBookOpen className="text-blue-600" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Courses</p>
            <p className="text-lg font-bold text-gray-800">{grades.length}</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 border-l-4 border-l-emerald-500">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaCheckCircle className="text-emerald-600" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Completed</p>
            <p className="text-lg font-bold text-gray-800">{completedCount}</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 border-l-4 border-l-purple-500">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaChartLine className="text-purple-600" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Average Grade</p>
            <p className="text-lg font-bold text-gray-800">
              {averageGrade}{" "}
              <span className="text-sm text-gray-500 font-semibold">
                ({averageLetterGrade})
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 mb-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 text-base">
          Grades Information
          {filteredGrades.length > 0 && (
            <span className="ml-2 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold">
              {filteredGrades.length} Courses
            </span>
          )}
        </h2>

        <div className="flex gap-2">
          {["ACTIVE", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === status
                  ? "bg-[#282f4f] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {status === "ACTIVE" ? "In Progress" : status}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 font-medium text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-4 pb-8">
        {filteredGrades.length === 0 ? (
          <div className="flex-1 flex items-center justify-center mt-10">
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-sm w-full">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap size={28} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">
                No Grades Found
              </h3>
              <p className="text-sm text-gray-400">
                {filter
                  ? `No ${filter.toLowerCase()} courses found.`
                  : "You don't have any courses yet."}
              </p>
            </div>
          </div>
        ) : (
          filteredGrades.map((grade) => {
            const letter =
              grade.grade != null ? getLetterGrade(grade.grade) : null;

            return (
              <div
                key={grade.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 border-l-4 border-l-[#5362a3] flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-[#D67A1E]" size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {grade.course_name}
                    </p>
                    <p className="text-xs text-gray-400">{grade.course_code}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      grade.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {grade.status === "ACTIVE" ? "In Progress" : grade.status}
                  </span>

                  {grade.grade != null ? (
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold text-gray-800 bg-gray-100 border border-gray-200">
                        {letter}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {parseFloat(grade.grade).toFixed(0)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-300">—</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentGrades;
