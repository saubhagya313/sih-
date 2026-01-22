import { useState } from "react";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: FormData) => void;
  teacherId: string;
}

const VideoUploadModal = ({ isOpen, onClose, onUpload, teacherId }: VideoUploadModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [language, setLanguage] = useState("");

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // 1. First, check if all required fields are filled.
  if (!title || !description || !videoFile || classes.length === 0 || !language) {
    alert("Please fill all fields and choose a video file.");
    return;
  }

  // 2. Add the requested debug logs to check the videoFile state.
  console.log("Checking videoFile before append:", videoFile);
  console.log("Is it an instance of File?", videoFile instanceof File);

  // 3. Add a more robust validation check specifically for the file object.
  if (!(videoFile instanceof File)) {
    console.error("❌ The video file is not a valid File object.");
    alert("Please select a valid video file.");
    return;
  }

  // 4. Log the frontend state values as you were before.
  console.log("🔹 Frontend state values before upload:");
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Classes (array):", classes);
  console.log("Language:", language);
  console.log("TeacherId:", teacherId);
  console.log("Video file object:", videoFile);

  // 5. Create the FormData object and append all fields.
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("teacherId", teacherId);
  formData.append("videoFile", videoFile); // This is the correct way to append a File object
  formData.append("classes", classes.join(","));
  formData.append("language", language);

  // 6. Log the contents of the FormData object for debugging.
  console.log("🔹 FormData contents:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // 7. Call the parent upload function.
  onUpload(formData);

  // 8. Reset the form state.
  setTitle("");
  setDescription("");
  setVideoFile(null);
  setClasses([]);
  setLanguage("");
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. English, Hindi"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Choose Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadModal;
