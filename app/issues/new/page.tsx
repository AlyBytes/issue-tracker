"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">New Issue </TextField.Root>
        {/* <TextArea placeholder="Description" />   ---> replacing this with Simple MDE*/}
        <SimpleMDE placeholder="Description" />
        <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
