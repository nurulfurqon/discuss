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

export default function TopicCreateForm() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });

  return (
    <section>
      <Button size="sm" color="secondary" variant="light" onPress={onOpen}>
        Create New Topic
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create a new topic</ModalHeader>
              <form action={action}>
                <ModalBody>
                  {formState.errors._form ? <div className="bg-red-500 text-white text-sm p-3 rounded-lg mb-4">{formState.errors._form}</div> : null}
                  <Input
                    name="name"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Input the topic name"
                    variant="bordered"
                    isInvalid={!!formState.errors.name}
                    errorMessage={formState.errors.name?.join(", ")}
                  />
                  <Textarea
                    name="description"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Input the description of your topic"
                    variant="bordered"
                    isInvalid={!!formState.errors.description}
                    errorMessage={formState.errors.description?.join(", ")}
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
  );
}