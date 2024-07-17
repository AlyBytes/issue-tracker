"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter(); //use useRouter() from navigation
  const { register, control, handleSubmit } = useForm<IssueForm>(); //specify shape of our form inside<> --->we called that func and get and obj; we destructure that obj to grab register func
  //with this func we can register our input fields with react hooks form so it can keep track of them
//   console.log(register("title")); //register fun returns obj with 4 properties - so we need to use ... operator when we call it below in our TextField component
  //we cannot do this in SimpleMDE - because it doesnt compile - we need to import and use COntroller from react
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
 
         {error && (<Callout.Root color="red" className="mb-5"> <Callout.Text> {error}</Callout.Text> </Callout.Root> )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            // console.log(error)
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          New Issue{" "}
        </TextField.Root>
        {/* <TextArea placeholder="Description" />   ---> replacing this with Simple MDE*/}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {/* <SimpleMDE placeholder="Description" />    ---> we have to move this into COntroller to be able to render it properly as it will not compile with register func */}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
