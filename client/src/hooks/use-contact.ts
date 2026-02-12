import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;

export function useContactInquiries() {
  return useQuery({
    queryKey: [api.contact.list.path],
    queryFn: async () => {
      const res = await fetch(api.contact.list.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) return null;
        throw new Error("Failed to fetch inquiries");
      }
      return api.contact.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We will get back to you shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.contact.delete.path, { id });
      const res = await fetch(url, {
        method: api.contact.delete.method,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete inquiry");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.contact.list.path] });
      toast({
        title: "Deleted",
        description: "Inquiry removed successfully.",
      });
    },
  });
}
