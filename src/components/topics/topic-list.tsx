import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/path";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => {
    return (
      <Link href={paths.topicShow(topic.slug)} key={topic.slug}>
        <Chip variant="bordered">
          {topic.slug}
        </Chip>
      </Link>
    )
  })

  return <div className="flex flex-wrap gap-3">{renderedTopics}</div>
}