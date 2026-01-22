import { useState } from "react";
import { Search, User, Users, BookOpen, MapPin, Star } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"teachers" | "classes">("teachers");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockTeachers = [
    {
      id: 1,
      username: "sarah_johnson",
      fullName: "Dr. Sarah Johnson",
      schoolName: "Delhi Public School",
      state: "Delhi",
      subjects: ["Mathematics", "Physics"],
      classes: ["9", "10", "11"],
      followers: 1250,
      videosCount: 15,
      profilePicture: ""
    },
    {
      id: 2,
      username: "raj_kumar",
      fullName: "Prof. Raj Kumar",
      schoolName: "Kendriya Vidyalaya",
      state: "Maharashtra",
      subjects: ["Physics", "Chemistry"],
      classes: ["11", "12"],
      followers: 980,
      videosCount: 12,
      profilePicture: ""
    },
    {
      id: 3,
      username: "priya_sharma",
      fullName: "Ms. Priya Sharma",
      schoolName: "St. Mary's School",
      state: "Karnataka",
      subjects: ["Chemistry", "Biology"],
      classes: ["9", "10"],
      followers: 750,
      videosCount: 8,
      profilePicture: ""
    }
  ];

  const mockClassResults = [
    { class: "Class 6", teachersCount: 45, totalVideos: 120 },
    { class: "Class 7", teachersCount: 52, totalVideos: 145 },
    { class: "Class 8", teachersCount: 48, totalVideos: 132 },
    { class: "Class 9", teachersCount: 38, totalVideos: 98 },
    { class: "Class 10", teachersCount: 42, totalVideos: 108 },
    { class: "Class 11", teachersCount: 35, totalVideos: 89 },
    { class: "Class 12", teachersCount: 32, totalVideos: 76 }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (searchType === "teachers") {
      // Filter teachers by username or name
      const filteredTeachers = mockTeachers.filter(teacher =>
        teacher.username.toLowerCase().includes(query.toLowerCase()) ||
        teacher.fullName.toLowerCase().includes(query.toLowerCase()) ||
        teacher.subjects.some(subject => subject.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredTeachers);
    } else {
      // Filter classes
      const filteredClasses = mockClassResults.filter(classItem =>
        classItem.class.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(classItem.class.toLowerCase())
      );
      setResults(filteredClasses);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Search</h1>
            <a href="/student/dashboard" className="text-primary hover:text-primary-glow transition-colors">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-secondary rounded-lg p-1 flex">
              <button
                onClick={() => setSearchType("teachers")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === "teachers"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-secondary-foreground hover:text-foreground"
                }`}
              >
                Search Teachers
              </button>
              <button
                onClick={() => setSearchType("classes")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === "classes"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-secondary-foreground hover:text-foreground"
                }`}
              >
                Search Classes
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                searchType === "teachers"
                  ? "Search by teacher username, name, or subject..."
                  : "Search by class name (e.g., Class 6, Class 10)..."
              }
              className="w-full pl-12 pr-24 py-4 border border-input rounded-xl text-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {searchType === "teachers" ? "Teachers" : "Classes"} ({results.length} found)
                </h2>
              </div>

              {searchType === "teachers" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((teacher: any) => (
                    <div key={teacher.id} className="learning-card hover:scale-105 cursor-pointer">
                      <div className="text-center space-y-4">
                        <div className="mx-auto">
                          {teacher.profilePicture ? (
                            <img
                              src={teacher.profilePicture}
                              alt={teacher.fullName}
                              className="w-16 h-16 rounded-full object-cover mx-auto"
                            />
                          ) : (
                            <div className="profile-avatar w-16 h-16 text-lg mx-auto">
                              {getInitials(teacher.fullName)}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-foreground">{teacher.fullName}</h3>
                          <p className="text-muted-foreground">@{teacher.username}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            <span>{teacher.schoolName}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{teacher.state}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Subjects</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {teacher.subjects.map((subject: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Classes</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {teacher.classes.map((cls: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                                  Class {cls}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{teacher.followers}</div>
                            <div className="text-xs text-muted-foreground">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-success">{teacher.videosCount}</div>
                            <div className="text-xs text-muted-foreground">Videos</div>
                          </div>
                        </div>

                        <button className="btn-hero w-full">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((classItem: any, index: number) => (
                    <div key={index} className="learning-card hover:scale-105 cursor-pointer">
                      <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-foreground">{classItem.class}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{classItem.teachersCount}</div>
                            <div className="text-xs text-muted-foreground">Teachers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-success">{classItem.totalVideos}</div>
                            <div className="text-xs text-muted-foreground">Videos</div>
                          </div>
                        </div>

                        <button className="btn-success w-full">
                          View Teachers
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {results.length === 0 && query && !isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or check the spelling
              </p>
            </div>
          )}

          {/* Empty State */}
          {results.length === 0 && !query && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Search for {searchType}
              </h3>
              <p className="text-muted-foreground">
                {searchType === "teachers"
                  ? "Find teachers by username, name, or subject they teach"
                  : "Find all teachers who teach a specific class"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;