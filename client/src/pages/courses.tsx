import { Helmet } from "react-helmet";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Zap } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      title: "Class 9th & 10th Chemistry",
      target: "Foundation for Board & Future Exams",
      description: "Comprehensive coverage of Class 9 & 10 Chemistry syllabus with focus on conceptual understanding. Specialized Only in Chemistry Coaching.",
      features: ["NCERT Concept Clarity", "Regular Topic-wise Tests", "Doubt Solving Sessions", "Interactive Classes"],
      popular: false,
    },
    {
      title: "Class 11th & 12th Chemistry",
      target: "Board Exams + Competitive Edge",
      description: "In-depth study of Physical, Organic, and Inorganic Chemistry. Classes Available Online (Zoom) & Offline Mode.",
      features: ["Board Exam Preparation", "Previous Year Question Practice", "Detailed Study Material PDF", "Weekly Progress Tracking"],
      popular: true,
    },
    {
      title: "JEE & NEET Chemistry",
      target: "Entrance Exam Excellence",
      description: "Rigorous preparation for JEE and NEET with advanced problem-solving techniques and shortcuts.",
      features: ["Exam-Oriented Question Bank", "Mock Test Series", "Personalized Attention", "Rank Booster Strategies"],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Courses | Chemistry Rockers - Specialized Chemistry Coaching</title>
        <meta name="description" content="Explore our specialized chemistry courses for Class 9-12, JEE, and NEET. Classes available Online (Zoom) and Offline." />
      </Helmet>
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-slate-900">Our Courses</h1>
          <p className="text-slate-600 text-lg">
            Specialized Only in Chemistry Coaching. Structured learning paths for Class 9-12, JEE, and NEET. Available Online & Offline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                course.popular 
                  ? "bg-white border-primary shadow-xl scale-105 z-10" 
                  : "bg-white/50 border-slate-200 hover:border-primary/50"
              }`}
            >
              {course.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-primary font-semibold text-sm">{course.target}</p>
              </div>
              
              <p className="text-slate-600 mb-8 flex-grow">{course.description}</p>
              
              <ul className="space-y-4 mb-8">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button className={`w-full h-12 text-base font-semibold ${course.popular ? "bg-primary text-white hover:bg-primary/90" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}>
                  Enquire Now
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Modes of Learning */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Modes of Learning</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[2/1] shadow-lg">
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors z-10" />
              <img src="https://pixabay.com/get/gd1a92624c4f88b4198d8dd2d82a780da890358665a1578eafaecdbac0d539a46b684e68fcf6b67192370c988ba33231710c47046a34432571c548c76a1220bd7_1280.jpg" alt="Offline Classes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white">Offline Classes</h3>
                <ul className="text-slate-100 text-sm mt-2 space-y-1">
                  <li>• Classroom Batches</li>
                  <li>• Limited Students Per Batch</li>
                  <li>• Personal Attention</li>
                  <li>• Regular Tests & Doubt Solving</li>
                </ul>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[2/1] shadow-lg">
               <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors z-10" />
              <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800" alt="Online Classes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white">Online Live Classes</h3>
                <ul className="text-slate-100 text-sm mt-2 space-y-1">
                  <li>• Live Zoom Classes</li>
                  <li>• Recorded Lectures</li>
                  <li>• Weekly Tests & Doubt Sessions</li>
                  <li>• Study Material PDF</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
