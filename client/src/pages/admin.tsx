import { useAuth } from "@/hooks/use-auth";
import { useResults, useCreateResult, useDeleteResult, type InsertStudentResult } from "@/hooks/use-results";
import { useContactInquiries, useDeleteContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStudentResultSchema } from "@shared/schema";
import { Loader2, Plus, Trash2, LogOut } from "lucide-react";
import { useState } from "react";
import { Redirect } from "wouter";

export default function Admin() {
  const { user, isLoading, logout } = useAuth();
  
  if (isLoading) return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user.firstName || 'User'}</p>
          </div>
          <Button variant="outline" onClick={() => logout()} className="gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="bg-slate-900 border border-white/10">
            <TabsTrigger value="results">Student Results</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <ResultsManager />
          </TabsContent>

          <TabsContent value="inquiries">
            <InquiriesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ResultsManager() {
  const { data: results, isLoading } = useResults();
  const { mutate: deleteResult } = useDeleteResult();
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-white/5">
        <h2 className="text-xl font-bold text-white">Manage Results</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground"><Plus className="w-4 h-4" /> Add Result</Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Add New Result</DialogTitle>
            </DialogHeader>
            <AddResultForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-slate-800/50">
              <TableHead className="text-slate-400">Name</TableHead>
              <TableHead className="text-slate-400">Class</TableHead>
              <TableHead className="text-slate-400">Exam</TableHead>
              <TableHead className="text-slate-400">Marks</TableHead>
              <TableHead className="text-slate-400">Year</TableHead>
              <TableHead className="text-right text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results?.map((result) => (
              <TableRow key={result.id} className="border-white/5 hover:bg-slate-800/50">
                <TableCell className="font-medium text-white">{result.name}</TableCell>
                <TableCell>{result.classGrade}</TableCell>
                <TableCell>{result.examType}</TableCell>
                <TableCell className="text-primary font-bold">{result.marks}</TableCell>
                <TableCell>{result.year}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="hover:text-red-400 hover:bg-red-400/10" onClick={() => deleteResult(result.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AddResultForm({ onSuccess }: { onSuccess: () => void }) {
  const { mutate, isPending } = useCreateResult();
  const form = useForm<InsertStudentResult>({
    resolver: zodResolver(insertStudentResultSchema),
    defaultValues: {
      name: "",
      classGrade: "",
      examType: "",
      marks: "",
      year: new Date().getFullYear().toString(),
      imageUrl: "",
    },
  });

  const onSubmit = (data: InsertStudentResult) => {
    mutate(data, { onSuccess });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl><Input {...field} className="bg-slate-950 border-white/10" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="classGrade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <FormControl><Input {...field} placeholder="12th" className="bg-slate-950 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam</FormLabel>
                <FormControl><Input {...field} placeholder="JEE Mains" className="bg-slate-950 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="marks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Result/Rank</FormLabel>
                <FormControl><Input {...field} placeholder="99%tile" className="bg-slate-950 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl><Input {...field} className="bg-slate-950 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl><Input {...field} placeholder="https://..." className="bg-slate-950 border-white/10" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isPending}>
          {isPending ? "Adding..." : "Add Result"}
        </Button>
      </form>
    </Form>
  );
}

function InquiriesManager() {
  const { data: inquiries, isLoading } = useContactInquiries();
  const { mutate: deleteContact } = useDeleteContact();

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/5 hover:bg-slate-800/50">
            <TableHead className="text-slate-400">Date</TableHead>
            <TableHead className="text-slate-400">Name</TableHead>
            <TableHead className="text-slate-400">Contact</TableHead>
            <TableHead className="text-slate-400">Interest</TableHead>
            <TableHead className="text-slate-400">Message</TableHead>
            <TableHead className="text-right text-slate-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries?.map((inquiry) => (
            <TableRow key={inquiry.id} className="border-white/5 hover:bg-slate-800/50">
              <TableCell className="text-slate-400">
                {new Date(inquiry.createdAt || "").toLocaleDateString()}
              </TableCell>
              <TableCell className="font-medium text-white">{inquiry.name}</TableCell>
              <TableCell>
                <div className="flex flex-col text-sm text-slate-400">
                  <span>{inquiry.email}</span>
                  <span>{inquiry.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="text-primary">{inquiry.classInterested}</span>
                  <span className="text-slate-500">{inquiry.mode}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate text-slate-400" title={inquiry.message}>
                {inquiry.message}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="hover:text-red-400 hover:bg-red-400/10" onClick={() => deleteContact(inquiry.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
