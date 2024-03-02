"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/path";
import type { Topic } from "@prisma/client";
import type { CreateTopicFormState } from "@/types/global.types";

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-]+$/, { message: "Only lowercase letters and hyphens are allowed" }),
  description: z.string().min(10),
});

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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
        _form: ["You need to signed in to create a topic"]
      }
    }
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ["An error occurred while creating the topic"]
        }
      }
    }
  }

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}