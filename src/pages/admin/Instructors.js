import { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaUserTie,
} from "react-icons/fa";

const initialInstructors = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  name: "Niggro",
  instructorId: "#1234",
  title: "Assistant Professor",
  email: "n@yahoo.com",
  department: [
    "Computer Science",
    "Artificial Intelligence",
    "Information System",
    "Software Engineering",
  ][i % 4],
  specialization: "Machine Learning & Data Science",
  avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${i + 50}`,
}));

const Instructors = () => {
  const [instructors, setInstructors] = useState(initialInstructors);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [form, setForm] = useState({
    name: "",
    instructorId: "",
    title: "",
    email: "",
    department: "",
    specialization: "",
  });

  const departments = [
    "All",
    "Computer Science",
    "Artificial Intelligence",
    "Information System",
    "Software Engineering",
  ];

  const titles = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Lecturer",
    "Teaching Assistant",
  ];

  const perPage = 8;

  const filtered = instructors.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.instructorId.includes(search);
    const matchDept = department === "All" || s.department === department;
    return matchSearch && matchDept;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    const pageIds = paginated.map((s) => s.id);
    const allSelected = pageIds.every((id) => selected.includes(id));
    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleDelete = (id) => {
    const instructor = instructors.find((s) => s.id === id);
    setConfirmDelete(instructor);
  };

  const confirmDeleteInstructor = () => {
    setInstructors((prev) => prev.filter((s) => s.id !== confirmDelete.id));
    setSelected((prev) => prev.filter((x) => x !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const openAdd = () => {
    setEditingInstructor(null);
    setForm({
      name: "",
      instructorId: "",
      title: "",
      email: "",
      department: "",
      specialization: "",
    });
    setShowModal(true);
  };

  const openEdit = (instructor) => {
    setEditingInstructor(instructor);
    setForm({
      name: instructor.name,
      instructorId: instructor.instructorId,
      title: instructor.title,
      email: instructor.email,
      department: instructor.department,
      specialization: instructor.specialization,
      department: instructor.department,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editingInstructor) {
      setInstructors((prev) =>
        prev.map((s) =>
          s.id === editingInstructor.id ? { ...s, ...form } : s,
        ),
      );
    } else {
      const newId = Date.now();
      setInstructors((prev) => [
        ...prev,
        {
          id: newId,
          ...form,
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newId}`,
        },
      ]);
    }
    setShowModal(false);
  };

  const pageIds = paginated.map((s) => s.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.includes(id));

  return (
    <div className="min-h-screen font-sans">
      <div className="px-4 pt-4 pb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Instructors
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:shadow-md shadow-sm transition-all duration-200"
        >
          <FaPlus size={12} />
          Add Instructor
        </button>
      </div>

      <div className="mx-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-base">
            Instructors Information
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <FaSearch size={13} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-52"
              />
            </div>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 outline-none cursor-pointer"
              >
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <FaChevronDown
                size={11}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                />
              </th>
              <th className="w-16 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left">
                Image
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left px-2">
                Instructor Name
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left px-2">
                ID
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left px-2">
                Title
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left px-2">
                Email
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left px-2">
                Department
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left px-2">
                Specialization
              </th>
              <th className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right pr-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-16 text-gray-300">
                  <FaUserTie size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No instructors found</p>
                </td>
              </tr>
            ) : (
              paginated.map((instructor) => (
                <tr
                  key={instructor.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                    selected.includes(instructor.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(instructor.id)}
                      onChange={() => toggleSelect(instructor.id)}
                      className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 pl-2">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-9 h-9 rounded-full bg-gray-100 object-cover"
                    />
                  </td>
                  <td className="py-3 px-2 font-semibold text-gray-800 text-sm">
                    {instructor.name}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-400">
                    {instructor.instructorId}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-400">
                    {instructor.title}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-400">
                    {instructor.email}
                  </td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-700">
                    {instructor.department}
                  </td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-700">
                    {instructor.specialization}
                  </td>
                  <td className="py-3 pr-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEdit(instructor)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FaEdit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(instructor.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-3 py-5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <FaChevronLeft size={11} />
          </button>
          {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-7 h-7 rounded-full text-sm font-medium transition-colors ${
                page === p
                  ? "bg-[#D67A1E] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <FaChevronRight size={11} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-gray-100 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash size={20} className="text-red-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Delete Instructor?
            </h2>
            <p className="text-sm text-gray-400 mb-1">
              You are about to delete{" "}
              <span className="font-semibold text-gray-700">
                {confirmDelete.name}
              </span>
            </p>
            <p className="text-xs text-gray-400 mb-7">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-100 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteInstructor}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingInstructor ? "Edit Instructor" : "Add New Instructor"}
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Full Name",
                  key: "name",
                  type: "text",
                  placeholder: "e.g. Shahd Shaban",
                },
                {
                  label: "Instructor ID",
                  key: "instructorId",
                  type: "text",
                  placeholder: "e.g. #1234",
                },
                {
                  label: "Email",
                  key: "email",
                  type: "email",
                  placeholder: "e.g. shahd@yahoo.com",
                },
                {
                  label: "Specialization",
                  key: "specialization",
                  type: "text",
                  placeholder: "e.g. Machine Learning & Data Science",
                },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
              ))}

              {/* Title Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Title
                </label>
                <div className="relative">
                  <select
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="w-full appearance-none border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  >
                    <option value="">Select Title</option>
                    {titles.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <FaChevronDown
                    size={11}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Department Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={form.department}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, department: e.target.value }))
                    }
                    className="w-full appearance-none border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  >
                    <option value="">Select Department</option>
                    {departments
                      .filter((d) => d !== "All")
                      .map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                  </select>
                  <FaChevronDown
                    size={11}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-100 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-[#D67A1E] text-white text-sm font-semibold hover:bg-[#af6b26] transition-colors"
              >
                {editingInstructor ? "Save Changes" : "Add Instructor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructors;
