import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ArrowRight, Star, Trophy, Users, BookOpen } from "lucide-react";
import { useResults } from "@/hooks/use-results";

export default function Home() {
  const { data: results, isLoading } = useResults();

  const features = [
    { icon: Trophy, title: "Proven Results", desc: "Consistent top rankers in JEE Mains, Advanced & NEET." },
    { icon: Users, title: "Expert Faculty", desc: "Learn directly from Payal Thakral Ma'am with 15+ years experience." },
    { icon: BookOpen, title: "Comprehensive Material", desc: "Curated study material, DPPs, and regular test series." },
  ];

  const featuredResults = results?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>Chemistry Rockers | Best Chemistry Tuition for JEE, NEET & Boards</title>
        <meta name="description" content="Master Chemistry with Payal Thakral. Top results in JEE, NEET, and CBSE Boards. Join Chemistry Rockers today." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-slate-300">Admissions Open for 2025-26</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight mb-6">
                Master Chemistry <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  Like a Rocker
                </span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                Unlock your potential with conceptual learning designed for JEE, NEET, and Board Exams. Join the league of toppers today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/5 rounded-xl">
                    Book Demo Class
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 border-t border-white/5 pt-8">
                {[
                  { label: "Students", value: "5000+" },
                  { label: "Selections", value: "1200+" },
                  { label: "Years Exp.", value: "15+" },
                ].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                    <p className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card/50 backdrop-blur-sm">
                {/* Descriptive comment for Unsplash image */}
                {/* student studying chemistry in library */}
                <img
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
                  alt="Student Studying"
                  className="w-full h-auto object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Top Results 2024</p>
                    <p className="text-xs text-slate-400">Average score 95% in Boards</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -z-10 -top-8 -right-8 w-24 h-24 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Chemistry Rockers?</h2>
            <p className="text-slate-400">We don't just teach chemistry; we help you visualize and understand the molecular world.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:border-primary/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Hall of Fame</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Our Shining Stars</h2>
            </div>
            <Link href="/results">
              <Button variant="ghost" className="hidden md:flex gap-2 text-slate-300 hover:text-primary">
                View All Results <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-full h-64 bg-slate-900 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredResults.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-800 relative">
                    {result.imageUrl ? (
                      <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800">
                        <Users className="w-12 h-12 text-slate-700" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-primary text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      {result.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{result.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{result.classGrade} • {result.examType}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-slate-500 text-xs uppercase tracking-wider">Result</span>
                      <span className="text-primary font-bold text-lg">{result.marks}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/results">
              <Button className="w-full">View All Results</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-primary px-8 py-16 md:px-16 text-center md:text-left">
            <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to boost your Chemistry score?</h2>
                <p className="text-slate-800 font-medium text-lg">Join our new batches starting soon. Limited seats available for offline classes.</p>
              </div>
              <div className="flex gap-4">
                 <Link href="/contact">
                  <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-8 text-lg shadow-xl">
                    Get Started
                  </Button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
