import { Link } from "react-router-dom";
import { GraduationCap, Users, BookOpen, Trophy, Star, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card-hover to-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-primary p-4 rounded-2xl shadow-soft">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduQuest: A Gamified Multilingual Learning Platform
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gamified learning experience that makes all subjects engaging and fun for students while empowering teachers with powerful tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-warning" />
                <span>Interactive Games</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning" />
                <span>Achievement System</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-warning" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <Link to="/student/login" className="group">
              <div className="learning-card group-hover:border-primary group-hover:scale-105">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-success rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Student</h3>
                    <p className="text-muted-foreground mb-6">
                      Learn through interactive games, watch educational videos, and track your progress with achievements.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center gap-2 text-success">
                      <Trophy className="w-4 h-4" />
                      <span>Gamified Learning</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-success">
                      <BookOpen className="w-4 h-4" />
                      <span>Video Lessons</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-success">
                      <Star className="w-4 h-4" />
                      <span>Progress Tracking</span>
                    </div>
                  </div>

                  <button className="btn-success w-full">
                    Start Learning
                  </button>
                </div>
              </div>
            </Link>

            {/* Teacher Card */}
            <Link to="/teacher/login" className="group">
              <div className="learning-card group-hover:border-primary group-hover:scale-105">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Teacher</h3>
                    <p className="text-muted-foreground mb-6">
                      Create engaging content, manage your classes, and monitor student progress with detailed analytics.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span>Content Creation</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Users className="w-4 h-4" />
                      <span>Class Management</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Zap className="w-4 h-4" />
                      <span>Analytics Dashboard</span>
                    </div>
                  </div>

                  <button className="btn-hero w-full">
                    Start Teaching
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground">Built for the modern classroom with cutting-edge technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-warning rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Gamified Experience</h3>
              <p className="text-muted-foreground">Points, badges, and leaderboards keep students motivated</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Rich Content</h3>
              <p className="text-muted-foreground">Interactive videos and assignments tailored to each class</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Analytics</h3>
              <p className="text-muted-foreground">Track progress and performance with detailed insights</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;