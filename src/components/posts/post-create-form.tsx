"use client";

import { useFormState } from "react-dom";
import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

import type { PostCreateFormProps } from "@/types/global.types";

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  return <section>
    <Button size="sm" color="secondary" onPress={onOpen}>
      Create New Post
    </Button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create a new post</ModalHeader>
            <form action={action}>
              <ModalBody>
                {formState.errors._form ? <div className="bg-red-500 text-white text-sm p-3 rounded-lg mb-4">{formState.errors._form}</div> : null}
                <Input
                  name="title"
                  label="Title"
                  labelPlacement="outside"
                  placeholder="Input the post title"
                  variant="bordered"
                  isInvalid={!!formState.errors.title}
                  errorMessage={formState.errors.title?.join(", ")}
                />
                <Textarea
                  name="content"
                  label="Content"
                  labelPlacement="outside"
                  placeholder="Input the content of your post"
                  variant="bordered"
                  isInvalid={!!formState.errors.content}
                  errorMessage={formState.errors.content?.join(", ")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <FormButton>
                  Save
                </FormButton>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  </section>
}