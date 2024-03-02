import type { TopicShowPageProps } from "@/types/global.types"
import PostCreateForm from "@/components/posts/post-create-form";

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  return <div className="grid grid-cols-4 gap-4 p-4">
    <div className="col-span-3">
      <h2 className="text-2xl font-semibold mb-3">{slug}</h2>
    </div>

    <div>
      <PostCreateForm slug={slug} />
    </div>
  </div>;
}