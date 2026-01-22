
// import { useState, useEffect } from "react";
// import { Plus, BarChart3, Users, Video, Eye, Trash2 } from "lucide-react";
// import TeacherProfileSidebar from "../common/TeacherProfileSidebar";
// import { videoAPI } from "@/lib/api";
// import VideoUploadModal from "./VideoUploadModal";

// const TeacherDashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [videos, setVideos] = useState<any[]>([]);
//   const [analytics, setAnalytics] = useState({
//     followers: 0,
//     totalViews: 0,
//     averageScore: 0,
//     totalVideos: 0,
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch teacher data and videos
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = localStorage.getItem("user");
//         if (!userData) return;

//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);

//         const videoRes = await videoAPI.getVideosByTeacher(parsedUser._id);
//         const videoList = videoRes.data || [];
//         setVideos(videoList);

//         setAnalytics({
//           followers: 1250,
//           totalViews: videoList.reduce((sum: number, v: any) => sum + (v.views || 0), 0),
//           averageScore: 87.5,
//           totalVideos: videoList.length,
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleVideoUpload = async (videoData: FormData) => {
//     if (!user?._id) return;

//     try {
//       const res = await videoAPI.uploadVideo(videoData);

//       const newVideo = res.data;
//       setVideos((prev) => [newVideo, ...prev]);
//       setIsUploadModalOpen(false);

//       setAnalytics((prev) => ({
//         ...prev,
//         totalVideos: prev.totalVideos + 1,
//         totalViews: prev.totalViews + (newVideo.views || 0),
//       }));
//     } catch (error: any) {
//       console.error("Error uploading video:", error.response?.data || error.message);
//       alert("Video upload failed: " + (error.response?.data?.error || error.message));
//     }
//   };

//   const handleDeleteVideo = async (videoId: string) => {
//     if (!window.confirm("Are you sure you want to delete this video?")) return;

//     try {
//       await videoAPI.deleteVideo(videoId);
//       setVideos((prev) => prev.filter((v) => v._id !== videoId));
//       setAnalytics((prev) => ({ ...prev, totalVideos: prev.totalVideos - 1 }));
//     } catch (error) {
//       console.error("Error deleting video:", error);
//       alert("Failed to delete video");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading your dashboard...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background flex">
//       {user && <TeacherProfileSidebar user={user} />}

//       <div className="flex-1 p-8">
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">
//               Welcome, {user?.fullName?.split(" ")[0]}! 👨‍🏫
//             </h1>
//             <p className="text-muted-foreground mt-2">
//               Manage your content and track student engagement
//             </p>
//           </div>
//           <button
//             onClick={() => setIsUploadModalOpen(true)}
//             className="btn-hero flex items-center gap-2"
//           >
//             <Plus className="w-5 h-5" /> Upload Video
//           </button>
//         </div>

//         {/* Analytics Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Card: Total Videos */}
//           <div className="card p-6 flex flex-col items-center text-center">
//             <Video className="w-8 h-8 text-primary mb-2" />
//             <span className="text-4xl font-bold text-foreground">{analytics.totalVideos}</span>
//             <p className="text-muted-foreground mt-1">Total Videos</p>
//           </div>
//           {/* Card: Total Views */}
//           <div className="card p-6 flex flex-col items-center text-center">
//             <Eye className="w-8 h-8 text-primary mb-2" />
//             <span className="text-4xl font-bold text-foreground">{analytics.totalViews}</span>
//             <p className="text-muted-foreground mt-1">Total Views</p>
//           </div>
//           {/* Card: Followers */}
//           <div className="card p-6 flex flex-col items-center text-center">
//             <Users className="w-8 h-8 text-primary mb-2" />
//             <span className="text-4xl font-bold text-foreground">{analytics.followers}</span>
//             <p className="text-muted-foreground mt-1">Followers</p>
//           </div>
//           {/* Card: Average Score */}
//           <div className="card p-6 flex flex-col items-center text-center">
//             <BarChart3 className="w-8 h-8 text-primary mb-2" />
//             <span className="text-4xl font-bold text-foreground">{analytics.averageScore}%</span>
//             <p className="text-muted-foreground mt-1">Avg. Score</p>
//           </div>
//         </div>

//         {/* Videos Section */}
//         <h2 className="text-2xl font-bold text-foreground mb-4">My Videos</h2>
//         {videos.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {videos.map((video) => (
//               <div key={video._id} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//                 <video
//                   src={`http://localhost:5000${video.videoUrl}`}
//                   controls
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4 bg-card">
//                   <h3 className="text-lg font-semibold text-foreground truncate">{video.title}</h3>
//                   <p className="text-sm text-muted-foreground mt-1 truncate">{video.description}</p>
//                   <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
//                     <Eye className="w-4 h-4" /> {video.views || 0} views
//                   </div>
//                 </div>
//                 <div className="absolute top-2 right-2">
//                   <button
//                     onClick={() => handleDeleteVideo(video._id)}
//                     className="p-1 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
//             <Video className="w-12 h-12 mx-auto mb-4" />
//             <p>You haven't uploaded any videos yet. Click "Upload Video" to get started!</p>
//           </div>
//         )}
//       </div>

//       {/* Video Upload Modal */}
//       <VideoUploadModal
//         isOpen={isUploadModalOpen}
//         onClose={() => setIsUploadModalOpen(false)}
//         onUpload={handleVideoUpload}
//         teacherId={user?._id}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;






import { useState, useEffect } from "react";
import { Plus, BarChart3, Users, Video, Eye, Trash2, FileText } from "lucide-react";
import TeacherProfileSidebar from "../common/TeacherProfileSidebar";
import { videoAPI, assignmentAPI } from "@/lib/api";
import VideoUploadModal from "./VideoUploadModal";
import AssignmentUploadModal from "./AssignmentUploadModal";

const TeacherDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({
    followers: 0,
    totalViews: 0,
    averageScore: 0,
    totalVideos: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch teacher data, videos, and assignments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) return;

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Fetch videos and assignments in parallel for efficiency
        const [videoRes, assignmentRes] = await Promise.all([
          videoAPI.getVideosByTeacher(parsedUser._id),
          assignmentAPI.getAssignmentsByTeacher(parsedUser._id),
        ]);

        const videoList = videoRes.data || [];
        setVideos(videoList);

        const assignmentList = assignmentRes.data || [];
        setAssignments(assignmentList);

        setAnalytics({
          followers: 1250,
          totalViews: videoList.reduce((sum: number, v: any) => sum + (v.views || 0), 0),
          averageScore: 87.5,
          totalVideos: videoList.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle video upload
  const handleVideoUpload = async (videoData: FormData) => {
    if (!user?._id) return;
    try {
      const res = await videoAPI.uploadVideo(videoData);
      const newVideo = res.data;
      setVideos((prev) => [newVideo, ...prev]);
      setIsUploadModalOpen(false);
      setAnalytics((prev) => ({
        ...prev,
        totalVideos: prev.totalVideos + 1,
        totalViews: prev.totalViews + (newVideo.views || 0),
      }));
    } catch (error: any) {
      console.error("Error uploading video:", error.response?.data || error.message);
      alert("Video upload failed: " + (error.response?.data?.error || error.message));
    }
  };

  // Handle assignment upload
  const handleAssignmentUpload = async (formData: FormData) => {
    try {
      const res = await assignmentAPI.uploadAssignment(formData);
      const newAssignment = res.data;
      setAssignments((prev) => [newAssignment, ...prev]);
      setIsAssignmentModalOpen(false);
    } catch (error: any) {
      console.error("Error uploading assignment:", error.response?.data || error.message);
      alert("Assignment upload failed: " + (error.response?.data?.error || error.message));
    }
  };

  // Handle video deletion
  const handleDeleteVideo = async (videoId: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await videoAPI.deleteVideo(videoId);
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
      setAnalytics((prev) => ({ ...prev, totalVideos: prev.totalVideos - 1 }));
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video");
    }
  };


 // Handle assignment deletion
const handleDeleteAssignment = async (assignmentId: string) => {
  if (!window.confirm("Are you sure you want to delete this assignment?")) return;
  try {
    // ✅ This is the correct way to call the API function.
    await assignmentAPI.deleteAssignment(assignmentId);
    setAssignments((prev) => prev.filter((a) => a._id !== assignmentId));
  } catch (error) {
    console.error("Error deleting assignment:", error);
    alert("Failed to delete assignment");
  }
};

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {user && <TeacherProfileSidebar user={user} />}

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">
              Welcome, {user?.fullName?.split(" ")[0]}! 👨‍🏫
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your content and track student engagement
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-hero flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors duration-300"
            >
              <Plus className="w-5 h-5" /> Upload Video
            </button>
            <button
              onClick={() => setIsAssignmentModalOpen(true)}
              className="btn-hero flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-foreground font-semibold border border-gray-300 hover:bg-gray-200 transition-colors duration-300"
            >
              <Plus className="w-5 h-5" /> Add Assignment
            </button>
          </div>
        </div>
        
        {/* Analytics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 rounded-2xl bg-white shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <Video className="w-8 h-8 text-primary mb-2" />
            <span className="text-4xl font-bold text-foreground">{analytics.totalVideos}</span>
            <p className="text-muted-foreground mt-1">Total Videos</p>
          </div>
          <div className="card p-6 rounded-2xl bg-white shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <Eye className="w-8 h-8 text-primary mb-2" />
            <span className="text-4xl font-bold text-foreground">{analytics.totalViews}</span>
            <p className="text-muted-foreground mt-1">Total Views</p>
          </div>
          <div className="card p-6 rounded-2xl bg-white shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <Users className="w-8 h-8 text-primary mb-2" />
            <span className="text-4xl font-bold text-foreground">{analytics.followers}</span>
            <p className="text-muted-foreground mt-1">Followers</p>
          </div>
          <div className="card p-6 rounded-2xl bg-white shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <BarChart3 className="w-8 h-8 text-primary mb-2" />
            <span className="text-4xl font-bold text-foreground">{analytics.averageScore}%</span>
            <p className="text-muted-foreground mt-1">Avg. Score</p>
          </div>
        </div>

        {/* Video and Assignment Sections in a two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Video Section (2/3 width on medium screens and up) */}
          <div className="md:col-span-2 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">My Videos</h2>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video._id} className="relative rounded-xl overflow-hidden shadow-sm bg-gray-100 hover:shadow-md transition-shadow duration-300">
                    <video
                      src={`http://localhost:5000${video.videoUrl}`}
                      controls
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-foreground truncate">{video.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 truncate">{video.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <Eye className="w-4 h-4" /> {video.views || 0} views
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDeleteVideo(video._id)}
                        className="p-1 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed rounded-xl border-gray-300 text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-4" />
                <p>You haven't uploaded any videos yet. Click "Upload Video" to get started!</p>
              </div>
            )}
          </div>

          {/* Assignment Section (1/3 width on medium screens and up) */}
          <div className="md:col-span-1 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">My Assignments</h2>
            {assignments.length > 0 ? (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment._id} className="relative card p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{assignment.name}</h3>
                        <p className="text-sm text-gray-500">Classes: {assignment.classes.join(", ")}</p>
                      </div>
                    </div>
                    <a
                      href={`http://localhost:5000${assignment.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium mt-2 inline-block"
                    >
                      Download Assignment
                    </a>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDeleteAssignment(assignment._id)}
                        className="p-1 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed rounded-xl border-gray-300 text-gray-500">
                <p>No assignments uploaded yet. Click "Add Assignment" to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <VideoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleVideoUpload}
        teacherId={user?._id}
      />
      <AssignmentUploadModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onUpload={handleAssignmentUpload}
        teacherId={user?._id}
      />
    </div>
  );
};

export default TeacherDashboard;