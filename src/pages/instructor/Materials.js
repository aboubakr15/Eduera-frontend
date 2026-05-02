import { useState, useEffect } from "react";
import { FaPlus, FaFileAlt, FaArrowRight } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { instructorApi } from "../../api/instructorApi";

const InstructorMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCourse, setFilterCourse] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    course_offering: "",
    title: "",
    description: "",
    material_type: "LECTURE",
    file_type: "pdf",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materialsRes, coursesRes] = await Promise.all([
          instructorApi.getMaterials(),
          instructorApi.getCourses(),
        ]);
        setMaterials(materialsRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const ext = file.name.split(".").pop().toLowerCase();
      setNewMaterial((prev) => ({ ...prev, file_type: ext }));
    } else {
      setSelectedFile(null);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("course_offering", newMaterial.course_offering);
      formData.append("title", newMaterial.title);
      formData.append("description", newMaterial.description);
      formData.append("material_type", newMaterial.material_type);
      formData.append("file_type", newMaterial.file_type);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await instructorApi.createMaterial(formData);
      setMaterials([response.data, ...materials]);

      setShowModal(false);
      setSelectedFile(null);
      setNewMaterial({
        course_offering: "",
        title: "",
        description: "",
        material_type: "LECTURE",
        file_type: "pdf",
      });
    } catch (err) {
      console.error("Failed to create material:", err);
    }
  };

  const filteredMaterials = filterCourse
    ? materials.filter((m) => m.course_offering === parseInt(filterCourse))
    : materials;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D67A1E]"></div>
      </div>
    );

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
            <h1 className="text-2xl font-bold text-gray-800">Materials</h1>
            <p className="text-sm text-gray-400 flex items-center gap-2 mt-0.5">
              Manage your course materials
              {!error && materials.length > 0 && (
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                  {filteredMaterials.length} Items
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#282f4f] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <FaPlus size={14} /> Add Material
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-sm border border-red-100">
          {error}
        </div>
      )}

      {!error && materials.length > 0 && (
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
      )}

      {/* Materials Grid */}
      {!error && filteredMaterials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 border-l-4 border-l-[#5362a3] flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <FaFileAlt className="text-[#D67A1E]" size={20} />
                </div>
                <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md uppercase">
                  {m.file_type || "File"}
                </span>
              </div>

              <div className="mb-4 flex-1">
                <h3 className="text-base font-bold text-gray-800 leading-tight mb-1 line-clamp-2">
                  {m.title}
                </h3>
                {m.description && (
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg truncate max-w-[180px]">
                  {m.course_name}
                </span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                  {m.material_type}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50">
                <a
                  href={m.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#D67A1E] font-semibold hover:gap-3 transition-all duration-200"
                >
                  View File
                  <FaArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && filteredMaterials.length === 0 && (
        <div className="flex-1 flex items-center justify-center mt-20">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-sm w-full">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaFileAlt size={28} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">
              No Materials Found
            </h3>
            <p className="text-sm text-gray-400">
              {filterCourse
                ? "No materials found for this specific course."
                : "You haven't uploaded any materials yet."}
            </p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Upload Material
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Course
                </label>
                <select
                  value={newMaterial.course_offering}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
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
                  value={newMaterial.title}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, title: e.target.value })
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
                  value={newMaterial.description}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      description: e.target.value,
                    })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 resize-none bg-gray-50/50"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Type
                </label>
                <select
                  value={newMaterial.material_type}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      material_type: e.target.value,
                    })
                  }
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-gray-50/50"
                >
                  <option value="LECTURE">Lecture</option>
                  <option value="SECTION">Section</option>
                  <option value="ASSIGNMENT_DESC">Assignment</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Upload File
                </label>
                <div
                  onClick={() => document.getElementById("file-upload").click()}
                  className="w-full text-sm border border-dashed border-gray-300 rounded-xl px-4 py-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors bg-gray-50/50"
                >
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-2 text-[#D67A1E]">
                      <FaFileAlt size={16} />
                      <span className="font-medium truncate">
                        {selectedFile.name}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      Click to select a file from your computer
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedFile(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#1B2036] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                  Upload Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorMaterials;
