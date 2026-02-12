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
  
  if (isLoading) return <div className="flex h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-primary" /></div>;
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-display">Admin Dashboard</h1>
            <p className="text-slate-600">Welcome back, {user.firstName || 'User'}</p>
          </div>
          <Button variant="outline" onClick={() => logout()} className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-100 font-bold">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <TabsTrigger value="results" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold">Student Results</TabsTrigger>
            <TabsTrigger value="inquiries" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold">Inquiries</TabsTrigger>
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

  if (isLoading) return <Loader2 className="animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 font-display">Manage Results</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-white hover:bg-primary/90 font-bold shadow-md"><Plus className="w-4 h-4" /> Add Result</Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-slate-200 text-slate-900">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Result</DialogTitle>
            </DialogHeader>
            <AddResultForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 hover:bg-slate-50">
              <TableHead className="text-slate-500 font-bold">Name</TableHead>
              <TableHead className="text-slate-500 font-bold">Class</TableHead>
              <TableHead className="text-slate-500 font-bold">Exam</TableHead>
              <TableHead className="text-slate-500 font-bold">Marks</TableHead>
              <TableHead className="text-slate-500 font-bold">Year</TableHead>
              <TableHead className="text-right text-slate-500 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results?.map((result) => (
              <TableRow key={result.id} className="border-slate-100 hover:bg-slate-50">
                <TableCell className="font-bold text-slate-900">{result.name}</TableCell>
                <TableCell className="text-slate-600">{result.classGrade}</TableCell>
                <TableCell className="text-slate-600">{result.examType}</TableCell>
                <TableCell className="text-primary font-black">{result.marks}</TableCell>
                <TableCell className="text-slate-600">{result.year}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => deleteResult(result.id)}>
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
              <FormLabel className="font-bold">Student Name</FormLabel>
              <FormControl><Input {...field} className="bg-white border-slate-200" /></FormControl>
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
                <FormLabel className="font-bold">Class</FormLabel>
                <FormControl><Input {...field} placeholder="12th" className="bg-white border-slate-200" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Exam</FormLabel>
                <FormControl><Input {...field} placeholder="JEE Mains" className="bg-white border-slate-200" /></FormControl>
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
                <FormLabel className="font-bold">Result/Rank</FormLabel>
                <FormControl><Input {...field} placeholder="99%tile" className="bg-white border-slate-200" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Year</FormLabel>
                <FormControl><Input {...field} className="bg-white border-slate-200" /></FormControl>
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
              <FormLabel className="font-bold">Image URL (Optional)</FormLabel>
              <FormControl><Input {...field} placeholder="https://..." className="bg-white border-slate-200" /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary text-white font-bold h-11" disabled={isPending}>
          {isPending ? "Adding..." : "Add Result"}
        </Button>
      </form>
    </Form>
  );
}

function InquiriesManager() {
  const { data: inquiries, isLoading } = useContactInquiries();
  const { mutate: deleteContact } = useDeleteContact();

  if (isLoading) return <Loader2 className="animate-spin text-primary" />;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-slate-50">
            <TableHead className="text-slate-500 font-bold">Date</TableHead>
            <TableHead className="text-slate-500 font-bold">Name</TableHead>
            <TableHead className="text-slate-500 font-bold">Contact</TableHead>
            <TableHead className="text-slate-500 font-bold">Interest</TableHead>
            <TableHead className="text-slate-500 font-bold">Message</TableHead>
            <TableHead className="text-right text-slate-500 font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries?.map((inquiry) => (
            <TableRow key={inquiry.id} className="border-slate-100 hover:bg-slate-50">
              <TableCell className="text-slate-500 text-xs">
                {new Date(inquiry.createdAt || "").toLocaleDateString()}
              </TableCell>
              <TableCell className="font-bold text-slate-900">{inquiry.name}</TableCell>
              <TableCell>
                <div className="flex flex-col text-sm text-slate-600">
                  <span>{inquiry.email}</span>
                  <span className="font-medium text-slate-900">{inquiry.phone}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="text-primary font-bold">{inquiry.classInterested}</span>
                  <span className="text-slate-500 text-xs">{inquiry.mode}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate text-slate-600" title={inquiry.message}>
                {inquiry.message}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => deleteContact(inquiry.id)}>
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
