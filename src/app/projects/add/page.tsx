"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";

const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(200, "Summary too long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description too long"),
  tags: z.string().min(1, "Add at least one tag"),
  thumbnail: z.string().url("Must be a valid URL"),
  mediaUrls: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const AddProjectPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      tags: "",
      thumbnail: "",
      mediaUrls: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      // Transform data for backend format
      const payload = {
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
        media:
          data.mediaUrls
            ?.split("\n")
            .filter((url) => url.trim())
            .map((url) => ({
              type:
                url.includes(".mp4") || url.includes(".webm")
                  ? "video"
                  : "image",
              src: url.trim(),
            })) || [],
      };

      console.log("Project data:", payload);

      // You can replace this console.log with a POST API call like:
      // await fetch("/api/projects", { method: "POST", body: JSON.stringify(payload) });

      toast({
        title: "Project Added",
        description: "Your project has been successfully added.",
      });

      setTimeout(() => router.push("/projects"), 1500);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="mb-6">
        <button
          onClick={() => router.push("/projects")}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Projects
        </button>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Add New Project
          </CardTitle>
          <CardDescription>
            Fill in the details to showcase a new project
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the project (shown on cards)"
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed project description"
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Research, Web, SaaS (comma-separated)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter tags separated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL of the main thumbnail image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mediaUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media URLs (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`https://example.com/image1.jpg\nhttps://example.com/video.mp4\nhttps://example.com/image2.jpg`}
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter image/video URLs (one per line)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/projects")}
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Project"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default AddProjectPage;
