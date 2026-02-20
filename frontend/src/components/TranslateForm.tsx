import { useState } from "react";
import {
  Stack,
  Select,
  FileInput,
  Button,
  Group,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

/**
 * We need
 * 1) Drop down list of Novel Source
 * 2) File input or
 * 3) Text input, one of those are allowed depending on choice of source
 * 4) Source Language dropdown list
 * 5) Target Language Dropdown list
 * 6) Translate Button
 */

type Props = {
  set_task_result: React.Dispatch<React.SetStateAction<string>>;
};

const handleFormSubmit = (
  set_task_result: React.Dispatch<React.SetStateAction<string>>,
) => {
  return async (data: {
    source: string;
    file: File | null;
    sourceLang: string;
    targetLang: string;
  }) => {
    const formData = new FormData();
    formData.append("source", data.source);
    formData.append("file", data.file!);
    formData.append("sourceLang", data.sourceLang);
    formData.append("targetLang", data.targetLang);

    let response = await fetch(
      `${import.meta.env.VITE_TRANSLATE_API_URL}/api/translate`,
      {
        method: "POST",
        body: formData,
      },
    );

    let result = await response.json();

    response = await fetch(
      `${import.meta.env.VITE_TRANSLATE_API_URL}/api/translate_status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_id: result.task_id }),
      },
    );

    result = await response.json();

    console.log("fetched task status");
    console.log(`${JSON.stringify(result)}`);

    set_task_result(result);
  };
};

export default function TranslateForm({ set_task_result }: Props) {
  const novel_sources = ["Text", "Archive Of Our Own"];
  const source_languages = ["auto", "en", "es"];
  const target_languages = ["en", "es"];
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      novel_source: "Archive Of Our Own",
      source_language: "auto",
      target_language: "en",
    },
    // TODO: figure out how to validate file_input/text input
    // depending on drop down source
    validate: {},
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack w={300} ml="md" align="flex-start" justify="center" gap="md">
        <Select
          label="Source"
          placeholder="Select what to translate from"
          data={novel_sources}
        />

        <FileInput
          variant="filled"
          radius="md"
          label="File"
          description="only accepts .html of relevant webpage"
          placeholder="Add file"
        />

        <Textarea label="Text" placeholder="Place text to translate" />

        <Select
          label="Source Language"
          placeholder="Select source language"
          data={source_languages}
        />

        <Select
          label="Target Language"
          placeholder="Select target language"
          data={target_languages}
        />

        <Group justify="flex-end">
          <Button type="submit">Translate</Button>
        </Group>
      </Stack>
    </form>
  );
}
