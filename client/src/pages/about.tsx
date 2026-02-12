import { Helmet } from "react-helmet";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>About Payal Thakral | Chemistry Rockers - Specialized Chemistry Coaching</title>
        <meta name="description" content="Meet Payal Thakral, an expert Chemistry educator with 15+ years of experience. Specialized Only in Chemistry coaching for JEE, NEET & Boards." />
      </Helmet>
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative z-10">
              {/* teacher portrait professional */}
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800" 
                alt="Payal Thakral" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-8 left-8">
                <h2 className="text-3xl font-bold text-white">Payal Thakral</h2>
                <p className="text-primary font-bold">Founder & Senior Faculty</p>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute top-10 -left-10 w-full h-full border-2 border-primary/20 rounded-3xl -z-10 hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Specialized Only in Chemistry</span>
            <h1 className="text-4xl md:text-5xl font-bold font-display mt-2 mb-6 text-slate-900">Mentoring Future <span className="text-primary">Doctors & Engineers</span></h1>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                With over 15 years of dedicated teaching experience, Payal Thakral has become a trusted name in Chemistry education. Specialized Only in Chemistry Coaching, her unique teaching methodology focuses on simplifying complex concepts, making Chemistry accessible and enjoyable for students of all levels.
              </p>
              <p>
                She believes that every student has the potential to excel if guided correctly. Her classes (available Online & Offline) are a blend of rigorous academic training and motivational mentorship, ensuring students build the confidence to crack JEE Mains, Advanced, and NEET.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <GraduationCap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-1">M.Sc Chemistry</h3>
                <p className="text-sm text-slate-500">Gold Medalist</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Calendar className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-1">15+ Years</h3>
                <p className="text-sm text-slate-500">Teaching Experience</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-1">Best Educator</h3>
                <p className="text-sm text-slate-500">Awarded 2022</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy */}
        <div className="mt-32 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Teaching Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Conceptual Clarity</h3>
              <p className="text-slate-600">Rote learning doesn't work in science. We focus on "Why" and "How" before jumping to "What". Specialized Only in Chemistry.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Personal Attention</h3>
              <p className="text-slate-600">Small batch sizes ensure every student's doubts are addressed and progress is monitored for both Online & Offline modes.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
