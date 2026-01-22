import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, BookOpen, Trophy, Star, Search, Gamepad2, Video, FileText, ArrowRight, GraduationCap } from "lucide-react";
import StudentProfileSidebar from "../common/StudentProfileSidebar";

// ✅ Correct imports from your API file
import { studentAPI, teacherAPI, videoAPI, assignmentAPI } from "@/lib/api";
import VideoModal from "./VideoModal"; // Assuming this component exists

const StudentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [recommendations, setRecommendations] = useState({
    teachers: [] as any[],
    videos: [] as any[],
    assignments: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);

  // New state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ url: '', title: '' });

  const openVideoModal = (videoUrl: string, videoTitle: string) => {
    setSelectedVideo({ url: videoUrl, title: videoTitle });
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo({ url: '', title: '' });
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          setIsLoading(false);
          return;
        }

        const parsedUser = JSON.parse(userData);
        setUser({
          ...parsedUser,
          points: parsedUser.points || 1250,
          level: parsedUser.level || 5,
        });

        const studentClass = parsedUser.class;

        const teachersRes = await teacherAPI.getRecomendedTeachers(studentClass);
        const teacherIds = teachersRes.data;
        
        let videoList = [];
        let assignmentList = [];

        if (teacherIds && teacherIds.length > 0) {
          const teacherIdsString = teacherIds.join(',');

          const [videosRes, assignmentsRes] = await Promise.all([
            videoAPI.getRecomendedVideos(teacherIdsString),
            assignmentAPI.getRecomendedAssignments(teacherIdsString),
          ]);
          videoList = videosRes.data || [];
          assignmentList = assignmentsRes.data || [];
        }

        setRecommendations({
          teachers: [],
          videos: videoList,
          assignments: assignmentList,
        });

      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading your personalized content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {user && <StudentProfileSidebar user={user} />}

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.fullName?.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search teachers or classes..."
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-80"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/student/games" className="group">
            <div className="game-tile">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Play Games</h3>
                  <p className="text-sm text-muted-foreground">Learn through fun games</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="game-tile">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Watch Videos</h3>
                <p className="text-sm text-muted-foreground">Educational content</p>
              </div>
            </div>
          </div>

          <div className="game-tile">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Assignments</h3>
                <p className="text-sm text-muted-foreground">Complete tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Videos */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">Recommended Videos</h2>
            <Link to="/all-videos" className="text-primary-blue flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {recommendations.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendations.videos.map((video) => (
                <div 
                  key={video._id} 
                  className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => openVideoModal(`http://localhost:5000${video.videoUrl}`, video.title)}
                >
                  <div className="relative pt-[56.25%] overflow-hidden">
                    <video
                      src={`http://localhost:5000${video.videoUrl}`}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onClick={(e) => e.stopPropagation()} // Stop propagation on video controls
                    />
                  </div>
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-lg truncate">{video.title}</h3>
                    <p className="text-sm text-gray-500">{video.description}</p>
                    <Link
                      to={`/teacher/${video.teacherId}/videos`}
                      className="text-sm text-blue-600 hover:underline font-medium mt-2 block"
                      onClick={(e) => e.stopPropagation()} // ✅ This line prevents the parent's onClick from firing
                    >
                      Teacher: {video.teacherName || "Unknown"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed rounded-xl border-gray-300 text-gray-500">
              <Video className="w-12 h-12 mx-auto mb-4" />
              <p>No recommended videos found for your class. Stay tuned!</p>
            </div>
          )}
        </div>

        {/* Recommended Assignments */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">Assignments for You</h2>
            <Link to="/all-assignments" className="text-primary-blue flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {recommendations.assignments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.assignments.map((assignment) => (
                <div key={assignment._id} className="rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary-blue" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg truncate">{assignment.name}</h3>
                      <p className="text-sm text-gray-500">Classes: {assignment.classes.join(", ")}</p>
                    </div>
                  </div>
                  <a
                    href={`http://localhost:5000${assignment.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:underline font-medium mt-2 inline-block"
                  >
                    Download Assignment
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed rounded-xl border-gray-300 text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-4" />
              <p>No assignments found for your class. Great job!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* The Video Modal Component */}
      <VideoModal
          isOpen={isModalOpen}
          onClose={closeVideoModal}
          videoUrl={selectedVideo.url}
          videoTitle={selectedVideo.title}
      />
    </div>
  );
};

export default StudentDashboard;