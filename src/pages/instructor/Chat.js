import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { instructorApi } from "../../api/instructorApi";
import { FaPaperPlane, FaComments, FaBook, FaUsers } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const getAvatarColor = (name) => {
  if (!name) return "bg-gray-400";
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const InstructorChat = () => {
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await instructorApi.getCourses();
        setCourses(response.data || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;

    const fetchMessages = async () => {
      try {
        const response = await instructorApi.getCourseChat(selectedCourse.id);
        setMessages(response.data || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedCourse]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedCourse) return;

    setSending(true);
    try {
      const response = await instructorApi.sendCourseMessage(
        selectedCourse.id,
        {
          content: newMessage.trim(),
        },
      );
      setMessages((prev) => [response.data, ...prev]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send:", err);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D67A1E]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden min-h-screen bg-[#f9fafb]">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-400 hover:text-[#323d6d] transition-all group"
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
            </button>
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaComments size={16} className="text-[#D67A1E]" />
              Course Chats
            </h1>
          </div>
          <p className="text-xs text-gray-400 ml-8">
            {courses.length} active courses
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {courses.length > 0 ? (
            courses.map((course) => {
              const isActive = selectedCourse?.id === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all duration-200 ${
                    isActive
                      ? "bg-[#29335d] text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-orange-50 text-[#D67A1E]"}`}
                  >
                    <FaBook size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {course.course_name}
                    </p>
                    <p
                      className={`text-xs truncate mt-0.5 ${isActive ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {course.course_code} • {course.semester} {course.year}
                    </p>
                    <p
                      className={`text-xs truncate mt-1 ${isActive ? "text-gray-400" : "text-gray-400"}`}
                    >
                      {course.enrolled_count || 0} students
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center pt-16 text-center px-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <FaComments size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">No Courses</p>
              <p className="text-xs text-gray-400 mt-1">
                Assign courses to see group chats here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedCourse ? (
          <>
            {/* Header */}
            <div className="bg-white px-6 py-3.5 border-b border-gray-200 shadow-sm flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <FaBook size={16} className="text-[#D67A1E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {selectedCourse.course_name}
                </p>
                <p className="text-xs text-gray-400">
                  {selectedCourse.course_code} • {selectedCourse.semester}{" "}
                  {selectedCourse.year}
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <FaUsers size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">
                  {selectedCourse.enrolled_count || 0} Members
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length > 0 ? (
                messages.map((msg, index) => {
                  const isInstructor = msg.sender_role === "INSTRUCTOR";
                  const senderName =
                    msg.sender_name ||
                    msg.full_name ||
                    msg.student_name ||
                    "User";
                  const showLabel =
                    index === 0 ||
                    messages[index - 1]?.sender_id !== msg.sender_id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isInstructor ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-7 mr-2 text-white font-bold text-xs ${
                          isInstructor
                            ? "bg-[#1B2036]"
                            : getAvatarColor(senderName)
                        }`}
                      >
                        {senderName?.charAt(0)}
                      </div>
                      <div
                        className={`max-w-[70%] flex flex-col ${isInstructor ? "items-end" : "items-start"}`}
                      >
                        {showLabel && (
                          <p
                            className={`text-[11px] font-semibold mb-1 px-1 ${isInstructor ? "text-right text-[#D67A1E]" : "text-gray-500"}`}
                          >
                            {isInstructor ? "Me" : senderName?.split(" ")[0]}
                          </p>
                        )}
                        <div
                          className={`px-4 py-2.5 shadow-sm ${isInstructor ? "bg-[#1B2036] text-white rounded-2xl rounded-br-sm" : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100"}`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        </div>
                        <p
                          className={`text-[10px] mt-1 px-1 text-gray-400 ${isInstructor ? "text-right" : ""}`}
                        >
                          {new Date(
                            msg.created_at || msg.timestamp,
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <FaComments size={24} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      No messages yet
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Start the conversation by saying hello
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message #${selectedCourse.course_code}...`}
                  className="flex-1 text-sm border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 transition-all"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="w-10 h-10 rounded-xl bg-[#323d6d] text-white flex items-center justify-center hover:bg-[#252b45] transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane size={14} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#f9fafb]">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FaComments size={36} className="text-gray-200" />
              </div>
              <p className="text-lg font-bold text-gray-600">Select a Course</p>
              <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                Choose a course from the sidebar to view its group chat.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorChat;
