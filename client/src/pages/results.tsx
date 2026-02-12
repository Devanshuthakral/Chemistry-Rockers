import { Helmet } from "react-helmet";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useResults } from "@/hooks/use-results";
import { motion } from "framer-motion";
import { Search, Filter, Loader2, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Results() {
  const { data: results, isLoading } = useResults();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredResults = results?.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || result.examType === filterType;
    return matchesSearch && matchesType;
  }) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Student Results | Chemistry Rockers - Specialized Chemistry Coaching</title>
        <meta name="description" content="View the outstanding achievements of our students in CBSE Boards, JEE, and NEET exams. Specialized Only in Chemistry." />
      </Helmet>
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-slate-900">Hall of Fame</h1>
          <p className="text-slate-600">Celebrating the hard work and success of our chemistry rockers.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              placeholder="Search student name..." 
              className="pl-10 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px] h-12 bg-white border-slate-200 text-slate-900 rounded-xl shadow-sm">
              <SelectValue placeholder="Filter by Exam" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 text-slate-900">
              <SelectItem value="all">All Exams</SelectItem>
              <SelectItem value="Boards">Boards</SelectItem>
              <SelectItem value="JEE">JEE Mains/Adv</SelectItem>
              <SelectItem value="NEET">NEET</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/30 transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="aspect-square bg-slate-100 relative overflow-hidden">
                    {result.imageUrl ? (
                      <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center">
                         <Users className="w-12 h-12 text-slate-300" />
                       </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white leading-tight">{result.name}</h3>
                      <p className="text-white/80 text-xs">{result.classGrade} • {result.year}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between bg-slate-50">
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">{result.examType}</span>
                    <span className="text-lg font-bold text-slate-900">{result.marks}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500">
                No results found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
