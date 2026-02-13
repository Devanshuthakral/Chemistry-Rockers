import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ArrowRight, Trophy, Users, BookOpen } from "lucide-react";

export default function Home() {

  const features = [
    {
      icon: Trophy,
      title: "Proven Results",
      desc: "Consistent top rankers in JEE Mains, Advanced & NEET.",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      desc: "Learn directly from Payal Thakral Ma'am with 10+ years experience.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Material",
      desc: "Curated study material, DPPs, and regular test series.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Helmet>
        <title>Chemistry Rockers | Chemistry Coaching</title>
      </Helmet>

      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Chemistry Rockers <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Score 95+ in Chemistry
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-8">
                Specialized coaching for Class 9-12, JEE & NEET.
                Online & Offline batches available.
              </p>

              <div className="flex gap-4">
                <Link href="/courses">
                  <Button className="bg-purple-600 text-white hover:bg-purple-700 h-12 px-6">
                    Join Online
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-700 hover:bg-purple-50 h-12 px-6"
                  >
                    Visit Offline
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 border-t border-slate-200 pt-6">
                {[
                  { label: "Students", value: "5000+" },
                  { label: "Selections", value: "1200+" },
                  { label: "Years Exp.", value: "10+" },
                ].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-bold">{stat.value}</h4>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
                  alt="Student Studying"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white shadow-md p-8 rounded-2xl text-center"
              >
                <feature.icon className="w-10 h-10 mx-auto text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-600 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Boost Your Chemistry Score?
        </h2>
        <Link href="/contact">
          <Button className="bg-white text-purple-700 hover:bg-purple-100 h-12 px-6">
            Get Started
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
