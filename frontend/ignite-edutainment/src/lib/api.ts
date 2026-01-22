// import axios from "axios";

// // ----------------- Axios Instance -----------------
// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Backend base URL
//   timeout: 10000,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

// // ----------------- AUTH API -----------------
// export const authAPI = {
//   studentLogin: (credentials: { username: string; password: string }) =>
//     api.post("/auth/student/login", credentials),

//   studentRegister: (data: {
//     username: string;
//     password: string;
//     fullName: string;
//     schoolName: string;
//     state: string;
//     class: string;
//     preferredLanguage: string;
//     profilePicture?: string;
//     mobileNumber: string;
//   }) => api.post("/auth/student/register", data),

//   teacherLogin: (credentials: { username: string; password: string }) =>
//     api.post("/auth/teacher/login", credentials),

//   teacherRegister: (data: {
//     username: string;
//     password: string;
//     fullName: string;
//     schoolName: string;
//     state: string;
//     subjects: string[];
//     classes: string[];
//     preferredLanguages: string[];
//     profilePicture?: string;
//     mobileNumber: string;
//   }) => api.post("/auth/teacher/register", data),
// };

// // ----------------- STUDENT API -----------------
// export const studentAPI = {
//   getProfile: () => api.get("/student/profile"),
//   updateProfile: (data: any) => api.put("/student/profile", data),
//   getRecommendations: () => api.get("/student/recommendations"),
//   submitGameScore: (data: { gameId: string; score: number; points: number }) =>
//     api.post("/student/game-score", data),
//   getGameScores: () => api.get("/student/game-scores"),
// };

// // ----------------- TEACHER API -----------------
// export const teacherAPI = {
//   getProfile: () => api.get("/teacher/profile"),
//   updateProfile: (data: any) => api.put("/teacher/profile", data),
//   getAnalytics: () => api.get("/teacher/analytics"),
//   getStudents: () => api.get("/teacher/students"),
// };

// // ----------------- SEARCH API -----------------
// export const searchAPI = {
//   searchTeachers: (query: string) => api.get(`/search/teachers?q=${query}`),
//   searchByClass: (className: string) => api.get(`/search/class?class=${className}`),
// };

// // ----------------- VIDEO API -----------------
// export const videoAPI = {
//   uploadVideo: (data: any) => {
//     if (data instanceof FormData) {
//       return api.post("/videos/upload", data); // ❌ no need to set headers manually
//     }
//     return api.post("/videos/upload", data);
//   },

//   getVideosByTeacher: (teacherId: string) => api.get(`/videos/teacher/${teacherId}`),
//   getAllVideos: () => api.get("/videos"),
//   deleteVideo: (videoId: string) => api.delete(`/videos/${videoId}`),
// };
// export default api;




import axios from "axios";

// ----------------- Axios Instance (for JSON and standard requests) -----------------
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// ----------------- Axios Instance (for file uploads) -----------------
const apiForm = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// ----------------- Request Interceptor -----------------
// Apply the request interceptor to both instances
const addAuthToken = (config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
apiForm.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));

// ----------------- Response Interceptor -----------------
// ✅ Apply the response interceptor to both instances, not the global axios object
const handleResponseError = (error: any) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return Promise.reject(error);
};

api.interceptors.response.use((response) => response, handleResponseError);
apiForm.interceptors.response.use((response) => response, handleResponseError);

// ----------------- AUTH API -----------------
const authAPI = {
  studentLogin: (credentials: { username: string; password: string }) =>
    api.post("/auth/student/login", credentials),
  studentRegister: (data: any) => api.post("/auth/student/register", data),
  teacherLogin: (credentials: { username: string; password: string }) =>
    api.post("/auth/teacher/login", credentials),
  teacherRegister: (data: any) => api.post("/auth/teacher/register", data),
};

// ----------------- OTHER APIs (named exports) -----------------
export const studentAPI = {
  getProfile: () => api.get("/student/profile"),
  updateProfile: (data: any) => api.put("/student/profile", data),
  getRecommendations: () => api.get("/student/recommendations"),
  submitGameScore: (data: { gameId: string; score: number; points: number }) =>
    api.post("/student/game-score", data),
  getGameScores: () => api.get("/student/game-scores"),
};

export const teacherAPI = {
  getProfile: () => api.get("/teacher/profile"),
  updateProfile: (data: any) => api.put("/teacher/profile", data),
  getAnalytics: () => api.get("/teacher/analytics"),
  getStudents: () => api.get("/teacher/students"),
  // ✅ New: API function for getting recommended teacher IDs
  getRecomendedTeachers: (studentClass: string) => api.get(`/auth/teacher/recommended?class=${studentClass}`),
};

export const searchAPI = {
  searchTeachers: (query: string) => api.get(`/search/teachers?q=${query}`),
  searchByClass: (className: string) => api.get(`/search/class?class=${className}`),
};

export const videoAPI = {
  // ✅ Use the dedicated form instance for file uploads
  uploadVideo: (data: FormData) => apiForm.post("/videos/upload", data),
  getVideosByTeacher: (teacherId: string) => api.get(`/videos/teacher/${teacherId}`),
  getAllVideos: () => api.get("/videos"),
  deleteVideo: (videoId: string) => api.delete(`/videos/${videoId}`),
  // ✅ New: API function for getting recommended videos
  getRecomendedVideos: (teacherIds: string) => api.get(`/videos/recommended?teacherIds=${teacherIds}`),
};

export const assignmentAPI = {
  // ✅ Use the dedicated form instance for file uploads
  uploadAssignment: (formData: FormData) => apiForm.post("/assignments/upload", formData),
  getAssignmentsByTeacher: (teacherId: string) => api.get(`/assignments/teacher/${teacherId}`),
  deleteAssignment: (assignmentId: string) => api.delete(`/assignments/${assignmentId}`),
  // ✅ New: API function for getting recommended assignments
  getRecomendedAssignments: (teacherIds: string) => api.get(`/assignments/recommended?teacherIds=${teacherIds}`),
};

// ----------------- Final Export -----------------
export default authAPI;