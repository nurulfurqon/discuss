"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db"
import paths from "@/path";
import type { Post, User } from "@prisma/client";
import type { CreatePostFormState } from "@/types/global.types";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You need to signed in to create a post"]
      }
    }
  }

  const topic = await db.topic.findUnique({ where: { slug } });
  const user = await db.user.findUnique({ where: { email: session.user.email || undefined } })

  if (!topic) {
    return {
      errors: {
        _form: ["The topic does not exist"]
      }
    }
  }

  if (!user) {
    return {
      errors: {
        _form: ["The user does not exist"]
      }
    }
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: user.id,
        topicId: topic.id,
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ["An error occurred while creating the post"]
        }
      }
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}