import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instructorApi } from "../../api/instructorApi";
import { FaCheck, FaFileAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const InstructorSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeData, setGradeData] = useState({ grade: "", notes: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await instructorApi.getSubmissions();
        setSubmissions(response.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleGrade = async (e) => {
    e.preventDefault();
    try {
      await instructorApi.gradeSubmission(selectedSubmission.id, gradeData);
      setSubmissions(
        submissions.map((s) =>
          s.id === selectedSubmission.id
            ? {
                ...s,
                status: "GRADED",
                grade: gradeData.grade,
                notes: gradeData.notes,
              }
            : s,
        ),
      );
      setShowGradeModal(false);
      setSelectedSubmission(null);
      setGradeData({ grade: "", notes: "" });
    } catch (err) {
      console.error("Failed to grade:", err);
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
      {/* Header */}
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
          <h1 className="text-2xl font-bold text-gray-800">Submissions</h1>
          <p className="text-sm text-gray-400 flex items-center gap-2 mt-0.5">
            Review and grade student submissions
            {submissions.length > 0 && (
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                {submissions.length} Pending
              </span>
            )}
          </p>
        </div>
      </div>

      {submissions.length > 0 && (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 border-l-4 border-l-[#5362a3]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                      <FaUser size={11} className="text-gray-400" />
                      {s.student_name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                      {s.course_name}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-gray-700 mb-2">
                    {s.assignment_title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} />
                      {new Date(s.submission_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-lg font-medium ${
                        s.status === "GRADED"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {s.status}
                    </span>
                    {s.grade && (
                      <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg font-medium">
                        Grade: {parseInt(s.grade)}/100
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 sm:flex-col sm:items-end sm:gap-2">
                  {s.file_url && (
                    <a
                      href={s.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaFileAlt size={12} />
                      View File
                    </a>
                  )}
                  {s.status !== "GRADED" && (
                    <button
                      onClick={() => {
                        setSelectedSubmission(s);
                        setShowGradeModal(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#282f4f] rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <FaCheck size={12} />
                      Grade
                    </button>
                  )}
                </div>
              </div>

              {s.notes && (
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg italic leading-relaxed">
                    <span className="font-semibold text-gray-600 not-italic">
                      Feedback:
                    </span>{" "}
                    {s.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {submissions.length === 0 && (
        <div className="flex-1 flex items-center justify-center mt-20">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-sm w-full">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaFileAlt size={28} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">
              No Submissions Yet
            </h3>
            <p className="text-sm text-gray-400">
              There are no student submissions to review right now.
            </p>
          </div>
        </div>
      )}

      {showGradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 my-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Grade Submission
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Evaluating:{" "}
              <span className="font-medium text-gray-600">
                {selectedSubmission?.assignment_title}
              </span>{" "}
              by{" "}
              <span className="font-medium text-gray-600">
                {selectedSubmission?.student_name}
              </span>
            </p>

            <form onSubmit={handleGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Grade (0 - 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradeData.grade}
                  onChange={(e) =>
                    setGradeData({ ...gradeData, grade: e.target.value })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Feedback / Notes
                </label>
                <textarea
                  value={gradeData.notes}
                  onChange={(e) =>
                    setGradeData({ ...gradeData, notes: e.target.value })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 resize-none bg-gray-50/50"
                  rows={4}
                  placeholder="Provide constructive feedback to the student..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowGradeModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#1B2036] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                  Submit Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSubmissions;
