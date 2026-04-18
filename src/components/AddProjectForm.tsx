"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

import MediaDropzone from "@/components/media/MediaDropzone";
import SortableMediaList from "@/components/media/SortableMediaList";
import { projectService } from "@/services/projectService";
import { CreateProjectData } from "@/interfaces/project";

/* =======================
   Types
======================= */
type LocalMediaItem = {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
};

/* =======================
   Zod schema (form-only)
======================= */
const projectSchema = z.object({
  type: z.enum(["Mobile", "Web"], {
    message: "Please select a project type",
  }),
  title: z.string().min(3, "Title must be at least 3 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  tags: z.string().min(1, "At least one tag is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

/* =======================
   Component
======================= */
export default function AddProjectForm() {
  const router = useRouter();

  const [media, setMedia] = useState<LocalMediaItem[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      type: "Web",
      title: "",
      summary: "",
      description: "",
      tags: "",
    },
  });

  /* =======================
     Stable Cloudinary folder
  ======================= */
  const title = form.watch("title");
  const uniqueId = useMemo(() => nanoid(6), []);

  const projectFolder = useMemo(() => {
    if (!title) return null;

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    return `projects/${slug}_${uniqueId}`;
  }, [title, uniqueId]);

  /* =======================
     Upload helper
  ======================= */
  const uploadToCloudinary = async (file: File, folder: string) => {
    const signRes = await fetch("/api/cloudinary/sign-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder }),
    });

    if (!signRes.ok) {
      throw new Error("Failed to sign upload");
    }

    const signData = await signRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", signData.timestamp);
    formData.append("signature", signData.signature);
    formData.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadRes.ok) {
      throw new Error("Cloudinary upload failed");
    }

    return uploadRes.json();
  };

  /* =======================
     Submit
  ======================= */
  const onSubmit = async (data: ProjectFormData) => {
    if (!projectFolder) {
      toast({
        title: "Missing title",
        description: "Please enter a project title first.",
        variant: "destructive",
      });
      return;
    }

    if (media.length === 0) {
      toast({
        title: "No media uploaded",
        description: "Please add at least one image or video.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload media AFTER clicking submit
      const uploadedMedia: { type: "image" | "video"; src: string }[] = [];

      for (const item of media) {
        const res = await uploadToCloudinary(item.file, projectFolder);
        uploadedMedia.push({
          type: item.type,
          src: res.secure_url,
        });
      }

      const payload: CreateProjectData = {
        type: data.type,
        title: data.title,
        summary: data.summary,
        description: data.description,
        tags: data.tags.split(",").map((t) => t.trim()),
        thumbnail: uploadedMedia[0].src,
        media: uploadedMedia,
      };

      const result = await projectService.addProject(payload);

      if (!result.success) {
        throw new Error(result.message || "Failed to add project");
      }

      toast({
        title: "✅ Project Added",
        description: "Your project has been added successfully.",
      });

      router.push("/projects");
    } catch (err) {
      toast({
        title: "❌ Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================
     UI (unchanged)
  ======================= */
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() => router.push("/projects")}
        className="text-sm mb-6 text-muted-foreground hover:text-primary"
      >
        ← Back to Projects
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border backdrop-blur-2xl p-8 shadow-xl
        bg-gradient-to-br from-white/60 to-white/30
        dark:from-white/10 dark:to-white/5 border-white/20"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-2">
          Add New Project
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl bg-white/70 dark:bg-white/5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Project Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl bg-white/70 dark:bg-white/5">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="Web">Web</SelectItem>
                    </SelectContent>
                  </Select>
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
                      rows={2}
                      className="rounded-xl bg-white/70 dark:bg-white/5"
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
                      rows={5}
                      className="rounded-xl bg-white/70 dark:bg-white/5"
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
                      className="rounded-xl bg-white/70 dark:bg-white/5"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Comma-separated</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Media */}
            <div className="space-y-4 rounded-xl border border-white/20 bg-white/40 dark:bg-white/5 p-4">
              <FormLabel className="font-semibold">Project Media</FormLabel>

              <MediaDropzone
                onAdded={(item) => {
                  setMedia((prev) => [...prev, item]);
                  if (!thumbnail) setThumbnail(item.preview);
                }}
              />

              {media.length > 0 && (
                <SortableMediaList
                  media={media}
                  setMedia={setMedia}
                  thumbnail={thumbnail}
                  onSetThumbnail={setThumbnail}
                  usePreview
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/projects")}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              >
                {isSubmitting ? "Saving..." : "Add Project"}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </main>
  );
}
