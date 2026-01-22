import { School, MapPin, Globe, BookOpen, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TeacherUser {
  id: string;
  username: string;
  fullName: string;
  schoolName: string;
  state: string;
  preferredLanguages?: string[];
  profilePicture?: string;
  followers?: number;
  videosCount?: number;
  subjects?: string[];
  classes?: string[];
}

const TeacherProfileSidebar: React.FC<{ user: TeacherUser }> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name: string) =>
    name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="profile-sidebar w-80 border-r">
      {/* Header */}
      <div className="text-center mb-6">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20 object-cover"
          />
        ) : (
          <div className="profile-avatar w-24 h-24 text-2xl mx-auto">
            {getInitials(user.fullName)}
          </div>
        )}
        <h2 className="text-xl font-bold">{user.fullName}</h2>
        <p className="text-muted-foreground">@{user.username}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <div className="font-bold text-lg">{user.followers || 0}</div>
            <div className="text-xs">Followers</div>
          </div>
          <div className="bg-success/10 p-3 rounded-lg">
            <div className="font-bold text-lg">{user.videosCount || 0}</div>
            <div className="text-xs">Videos</div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <School className="w-4 h-4" /> {user.schoolName}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" /> {user.state}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Globe className="w-4 h-4" /> {user.preferredLanguages?.join(", ")}
        </div>

        {user.subjects && user.subjects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="w-4 h-4" /> Subjects
            </div>
            <div className="flex flex-wrap gap-2">
              {user.subjects.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-primary/10 rounded-md text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.classes && user.classes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-4 h-4" /> Teaching Classes
            </div>
            <div className="flex flex-wrap gap-2">
              {user.classes.map((c, i) => (
                <span key={i} className="px-2 py-1 bg-success/10 rounded-md text-xs">
                  Class {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 space-y-3">
        <button className="w-full bg-secondary py-2 px-4 rounded-lg">Edit Profile</button>
        <button className="w-full bg-gradient-primary py-2 px-4 rounded-lg">View Analytics</button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive py-2 px-4 rounded-lg border"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherProfileSidebar;
