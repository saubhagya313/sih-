import { School, MapPin, Globe, BookOpen, Trophy, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentUser {
  id: string;
  username: string;
  fullName: string;
  schoolName: string;
  state: string;
  preferredLanguage?: string;
  profilePicture?: string;
  class?: string;
  points?: number;
  level?: number;
}

const StudentProfileSidebar: React.FC<{ user: StudentUser }> = ({ user }) => {
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
      {/* Profile header */}
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

        {user.points !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">{user.points} Points</span>
            </div>
            {user.level && (
              <div className="text-sm text-muted-foreground">Level {user.level}</div>
            )}
          </div>
        )}
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
          <Globe className="w-4 h-4" /> {user.preferredLanguage}
        </div>
        {user.class && (
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4" /> Class {user.class}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 space-y-3">
        <button className="w-full bg-secondary py-2 px-4 rounded-lg">Edit Profile</button>
        <button className="w-full bg-gradient-warning py-2 px-4 rounded-lg">View Achievements</button>
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

export default StudentProfileSidebar;
