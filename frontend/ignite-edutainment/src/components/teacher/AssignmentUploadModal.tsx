import React, { useState } from "react";

interface AssignmentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: FormData) => void;
  teacherId: string;
}

const AssignmentUploadModal = ({ isOpen, onClose, onUpload, teacherId }: AssignmentUploadModalProps) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [classes, setClasses] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file || classes.length === 0) {
      alert("Please fill all fields and choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("classes", classes.join(","));
    formData.append("teacherId", teacherId);
    formData.append("assignmentFile", file); // Must match backend's multer field name

    onUpload(formData);

    // Reset form
    setName("");
    setFile(null);
    setClasses([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Assignment Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Classes (comma separated)</label>
            <input
              type="text"
              value={classes.join(",")}
              onChange={(e) => setClasses(e.target.value.split(",").map(c => c.trim()))}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 6,7,8"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Choose File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-primary text-white">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentUploadModal;