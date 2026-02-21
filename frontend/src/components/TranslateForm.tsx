import {
  Stack,
  Select,
  FileInput,
  Button,
  Group,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  set_task_result: React.Dispatch<
    React.SetStateAction<{
      task_id: string;
      state: string;
      result: {};
    }>
  >;
};

export default function TranslateForm({ set_task_result }: Props) {
  const novelSources = ["Text", "Archive Of Our Own"];
  const sourceLanguages = ["auto", "en", "es"];
  const targetLanguages = ["en", "es"];
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      source: "Archive Of Our Own",
      sourceLang: "auto",
      targetLang: "en",
      file: null as File | null,
      text: "",
    },
    // TODO: figure out how to validate file_input/text input
    // depending on drop down source
    validate: {},
  });
  const handleFormSubmit = async (data: typeof form.values) => {
    const formData = new FormData();
    formData.append("source", data.source);
    if (data.file) {
      formData.append("file", data.file);
    }
    formData.append("sourceLang", data.sourceLang);
    formData.append("targetLang", data.targetLang);
    if (data.text) {
      formData.append("text", data.text);
    }

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
  // TODO: add the translation functionality back

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack w={300} ml="md" align="flex-start" justify="center" gap="md">
        <Select
          withAsterisk
          label="Source"
          placeholder="Select what to translate from"
          data={novelSources}
          key={form.key("source")}
          {...form.getInputProps("source")}
        />

        <FileInput
          variant="filled"
          radius="md"
          label="File"
          description="only accepts .html"
          placeholder="Add file"
          key={form.key("file")}
          {...form.getInputProps("file")}
        />

        <Textarea
          label="Text"
          placeholder="Place text to translate"
          key={form.key("text")}
          {...form.getInputProps("text")}
        />

        <Select
          label="Source Language"
          placeholder="Select source language"
          data={sourceLanguages}
          key={form.key("sourceLang")}
          {...form.getInputProps("sourceLang")}
        />

        <Select
          label="Target Language"
          placeholder="Select target language"
          data={targetLanguages}
          key={form.key("targetLang")}
          {...form.getInputProps("targetLang")}
        />

        <Group justify="flex-end">
          <Button type="submit">Translate</Button>
        </Group>
      </Stack>
    </form>
  );
}
