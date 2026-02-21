import { Pagination, Text } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useLoaderData } from "react-router";

// TODO: add this chapter to a typings folder or something.
// TODO: Organize the code base so it's less of a mess

interface Chapter {
  _Chapter__title: string;
  _Chapter__content: string;
}

export default function NovelPage() {
  const novel = useLoaderData();
  const chapters = novel._Novel__chapters;
  const chapterContents = chapters.map((chapter: Chapter) => (
    <>
      <Text>{chapter._Chapter__title}</Text>
      <Text mt="md">{chapter._Chapter__content}</Text>
    </>
  ));
  const pagination = usePagination({ total: chapters.length, initialPage: 1 });
  const currentChapter = chapterContents[pagination.active - 1];
  return (
    <>
      <Pagination
        total={chapters.length}
        value={pagination.active}
        onChange={pagination.setPage}
        mb="lg"
      />
      {currentChapter}
      <Pagination
        total={chapters.length}
        value={pagination.active}
        onChange={pagination.setPage}
        mt="lg"
      />
    </>
  );
}
