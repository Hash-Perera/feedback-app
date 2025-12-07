"use client";

import React, { useState } from "react";
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
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { projectService } from "@/services/projectService";
import { CreateProjectData } from "@/interfaces/project";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(200),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000),
  tags: z.string().min(1, "Add at least one tag"),
  thumbnail: z.string().url("Must be a valid URL"),
  mediaUrls: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const AddProjectForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const payload = {
        ...data,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        media:
          data.mediaUrls
            ?.split("\n")
            .map((u) => u.trim())
            .filter(Boolean)
            .map((url) => ({
              type:
                url.includes(".mp4") || url.includes(".webm")
                  ? "video"
                  : "image",
              src: url,
            })) || [],
      };

      const result = await projectService.addProject(
        payload as CreateProjectData
      );
      if (result.success) {
        toast({
          title: "✅ Project Added",
          description: "Your project has been added successfully.",
        });

        // clear form
        form.reset();

        router.push("/projects/add");
      } else {
        toast({
          title: "❌ Error",
          description: result.message || "Failed to add project",
          variant: "destructive",
        });
        throw new Error(result.message || "Failed to add project");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "❌ Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Back Navigation */}
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() => router.push("/projects")}
        className="text-sm mb-6 text-muted-foreground hover:text-primary transition-colors"
      >
        ← Back to Projects
      </motion.button>

      {/* Glassy Gradient Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`rounded-2xl border backdrop-blur-2xl p-8 shadow-xl transition-all duration-500
        bg-gradient-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-white/5 border-white/20`}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-2">
          Add New Project
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Fill in the project details below to showcase your latest work ✨
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/70 dark:bg-white/5 border border-white/30 focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter project title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-xl bg-white/70 dark:bg-white/5 border border-white/30 resize-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Brief summary (shown on project cards)"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Full Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-xl bg-white/70 dark:bg-white/5 border border-white/30 resize-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Detailed project description..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Tags</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/70 dark:bg-white/5 border border-white/30 focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g., Research, Web, SaaS (comma-separated)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Separate tags with commas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/70 dark:bg-white/5 border border-white/30 focus:ring-2 focus:ring-primary/50"
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Main image for the project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Media URLs */}
            <FormField
              control={form.control}
              name="mediaUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Media URLs (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-xl bg-white/70 dark:bg-white/5 border border-white/30 resize-none focus:ring-2 focus:ring-primary/50"
                      placeholder={`https://example.com/image1.jpg\nhttps://example.com/video.mp4`}
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    One URL per line (supports images & videos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/projects")}
                disabled={isSubmitting}
                className="rounded-full border-gray-300 dark:border-white/20 hover:bg-muted/50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {isSubmitting ? "Adding..." : "Add Project"}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </main>
  );
};

export default AddProjectForm;
