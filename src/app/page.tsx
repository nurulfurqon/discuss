import { Divider } from "@nextui-org/react";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Top Posts</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Topics</h2>
          <TopicCreateForm />
        </div>
        <Divider />
        <TopicList />
      </div>
    </div>
  )
}
