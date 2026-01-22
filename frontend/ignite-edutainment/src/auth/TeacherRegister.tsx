// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Users, Eye, EyeOff, ArrowLeft } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { authAPI } from "@/lib/api";

// const TeacherRegister = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     fullName: "",
//     schoolName: "",
//     state: "",
//     mobileNumber: "", // ✅ Corrected
//     subjects: [] as string[],
//     classes: [] as string[],
//     preferredLanguages: [] as string[],
//     profilePicture: ""
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
//   const classes = ["6", "7", "8", "9", "10", "11", "12"];
//   const languages = ["English", "Hindi", "Odia"];
//   const indianStates = [
//     "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
//     "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
//     "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
//     "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
//     "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Password mismatch",
//         description: "Passwords do not match. Please try again.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!formData.mobileNumber) { // ✅ Corrected
//       toast({
//         title: "Missing mobile number",
//         description: "Please provide your mobile number.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (formData.subjects.length === 0) {
//       toast({
//         title: "Select subjects",
//         description: "Please select at least one STEM subject.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (formData.classes.length === 0) {
//       toast({
//         title: "Select classes",
//         description: "Please select at least one class to teach.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { confirmPassword, ...registerData } = formData;
//       const response = await authAPI.teacherRegister(registerData);
//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify({ ...user, type: "teacher" }));

//       toast({
//         title: "Account created!",
//         description: "Welcome to the STEM Learning Platform!",
//       });

//       navigate("/teacher/dashboard");
//     } catch (error: any) {
//       toast({
//         title: "Registration failed",
//         description: error.response?.data?.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const toggleArrayItem = (array: string[], item: string, field: keyof typeof formData) => {
//     const newArray = array.includes(item)
//       ? array.filter(i => i !== item)
//       : [...array, item];

//     setFormData({
//       ...formData,
//       [field]: newArray
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-card-hover to-primary/10 py-12 px-6">
//       <div className="max-w-2xl mx-auto">
//         <Link to="/teacher/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Login</span>
//         </Link>

//         <div className="learning-card">
//           <div className="text-center mb-8">
//             <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
//               <Users className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold">Teacher Registration</h1>
//             <p className="text-muted-foreground">Join our community of educators!</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium mb-2">Username *</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Mobile Number
//             <div>
//               <label htmlFor="mobileNumber" className="block text-sm font-medium mb-2">Mobile Number *</label>
//               <input
//                 type="tel"
//                 id="mobileNumber"
//                 name="mobileNumber" // ✅ matches state key
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                 required
//               />
//             </div> */}
            

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="schoolName" className="block text-sm font-medium mb-2">School Name *</label>
//                 <input
//                   type="text"
//                   id="schoolName"
//                   name="schoolName"
//                   value={formData.schoolName}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium mb-2">State *</label>
//                 <select
//                   id="state"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                   required
//                 >
//                   <option value="">Select State</option>
//                   {indianStates.map(state => (
//                     <option key={state} value={state}>{state}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Subjects */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Subjects You Teach * (Select multiple)</label>
//               <div className="flex flex-wrap gap-2">
//                 {subjects.map(subject => (
//                   <button
//                     key={subject}
//                     type="button"
//                     onClick={() => toggleArrayItem(formData.subjects, subject, "subjects")}
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       formData.subjects.includes(subject)
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                     }`}
//                   >
//                     {subject}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Classes */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Classes You Want to Teach * (Select multiple)</label>
//               <div className="flex flex-wrap gap-2">
//                 {classes.map(cls => (
//                   <button
//                     key={cls}
//                     type="button"
//                     onClick={() => toggleArrayItem(formData.classes, cls, "classes")}
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       formData.classes.includes(cls)
//                         ? "bg-success text-success-foreground"
//                         : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                     }`}
//                   >
//                     Class {cls}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Languages */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Preferred Languages (Select multiple)</label>
//               <div className="flex flex-wrap gap-2">
//                 {languages.map(lang => (
//                   <button
//                     key={lang}
//                     type="button"
//                     onClick={() => toggleArrayItem(formData.preferredLanguages, lang, "preferredLanguages")}
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       formData.preferredLanguages.includes(lang)
//                         ? "bg-accent text-accent-foreground"
//                         : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                     }`}
//                   >
//                     {lang}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium mb-2">Password *</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 pr-10 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password *</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-muted-foreground">
//               Already have an account?{" "}
//               <Link to="/teacher/login" className="text-primary hover:text-primary-glow font-medium transition-colors">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherRegister;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import authAPI from "@/lib/api"; 

const TeacherRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    schoolName: "",
    state: "",
    mobileNumber: "", // ✅ added mobile number
    subjects: [] as string[],
    classes: [] as string[],
    preferredLanguages: [] as string[],
    profilePicture: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
  const classes = ["6", "7", "8", "9", "10", "11", "12"];
  const languages = ["English", "Hindi", "Odia"];
  const indianStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
    "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
    "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
    "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.mobileNumber) {
      toast({
        title: "Missing mobile number",
        description: "Please provide your mobile number.",
        variant: "destructive",
      });
      return;
    }

    if (formData.subjects.length === 0) {
      toast({
        title: "Select subjects",
        description: "Please select at least one STEM subject.",
        variant: "destructive",
      });
      return;
    }

    if (formData.classes.length === 0) {
      toast({
        title: "Select classes",
        description: "Please select at least one class to teach.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.teacherRegister(registerData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ ...user, type: "teacher" }));

      toast({
        title: "Account created!",
        description: "Welcome to the STEM Learning Platform!",
      });

      navigate("/teacher/login");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleArrayItem = (array: string[], item: string, field: keyof typeof formData) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];

    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card-hover to-primary/10 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/teacher/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <div className="learning-card">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Teacher Registration</h1>
            <p className="text-muted-foreground">Join our community of educators!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* ✅ Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium mb-2">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="schoolName" className="block text-sm font-medium mb-2">School Name *</label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium mb-2">Subjects You Teach * (Select multiple)</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleArrayItem(formData.subjects, subject, "subjects")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.subjects.includes(subject)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Classes */}
            <div>
              <label className="block text-sm font-medium mb-2">Classes You Want to Teach * (Select multiple)</label>
              <div className="flex flex-wrap gap-2">
                {classes.map(cls => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => toggleArrayItem(formData.classes, cls, "classes")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.classes.includes(cls)
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Languages (Select multiple)</label>
              <div className="flex flex-wrap gap-2">
                {languages.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleArrayItem(formData.preferredLanguages, lang, "preferredLanguages")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.preferredLanguages.includes(lang)
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-hero w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/teacher/login" className="text-primary hover:text-primary-glow font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;
