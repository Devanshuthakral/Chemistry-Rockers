import { Helmet } from "react-helmet";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Zap } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      title: "Class 11th Foundation",
      target: "JEE / NEET / Boards",
      description: "Build a strong base in Physical, Organic, and Inorganic Chemistry. Detailed coverage of NCERT + Competitive Level.",
      features: ["Daily Practice Papers", "Weekly Tests", "Doubt Clearing Sessions", "NCERT Line-by-Line"],
      popular: false,
    },
    {
      title: "Class 12th Target",
      target: "Board Exams + Competitive",
      description: "Focus on Board Exam percentage along with rank improvement for JEE/NEET. rigorous testing and revision.",
      features: ["Board Answer Writing", "Previous Year Questions", "Mock Tests", "Crash Course Included"],
      popular: true,
    },
    {
      title: "Dropper Batch",
      target: "JEE Main & Advanced / NEET",
      description: "Intensive 1-year program for students dedicating a year for preparation. High-paced and result-oriented.",
      features: ["Advanced Problem Solving", "Time Management Tricks", "All India Test Series", "Personal Mentorship"],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Courses | Chemistry Rockers</title>
        <meta name="description" content="Explore our chemistry courses for Class 11, 12, JEE, and NEET. Online and Offline batches available." />
      </Helmet>
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-white">Our Courses</h1>
          <p className="text-slate-400 text-lg">
            Structured learning paths designed to help you achieve your academic goals. Choose the program that fits your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-8 rounded-3xl border ${
                course.popular 
                  ? "bg-slate-900/80 border-primary shadow-[0_0_40px_rgba(250,204,21,0.1)] scale-105 z-10" 
                  : "bg-card border-white/10"
              }`}
            >
              {course.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-primary font-medium text-sm">{course.target}</p>
              </div>
              
              <p className="text-slate-400 mb-8 flex-grow">{course.description}</p>
              
              <ul className="space-y-4 mb-8">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <Button className={`w-full h-12 text-base font-semibold ${course.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-slate-800 text-white hover:bg-slate-700"}`}>
                  Enquire Now
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Modes of Learning */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Modes of Learning</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[2/1]">
              <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors z-10" />
              {/* classroom offline */}
              <img src="https://pixabay.com/get/gd1a92624c4f88b4198d8dd2d82a780da890358665a1578eafaecdbac0d539a46b684e68fcf6b67192370c988ba33231710c47046a34432571c548c76a1220bd7_1280.jpg" alt="Offline Classes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white">Offline Classes</h3>
                <p className="text-slate-300">Face-to-face interaction at our Gurgaon center.</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[2/1]">
               <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors z-10" />
               {/* student with laptop online class */}
              <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800" alt="Online Classes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white">Online Live Classes</h3>
                <p className="text-slate-300">Interactive live sessions from the comfort of your home.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
