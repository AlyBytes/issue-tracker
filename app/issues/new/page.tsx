"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import {z} from 'zod';

// interface IssueForm {   ---> redundant interface because we define it here and in our schema; if we need to add smth in the future we need to rememebr to add in 2 places
//   title: string;     ---> we will generate interface based on our schema
//   description: string;
// }

type IssueForm= z.infer<typeof createIssueSchema>  //we let zod infer its type based on its schema

const NewIssuePage = () => {
  const router = useRouter(); //use useRouter() from navigation
  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>(//specify shape of our form inside<> --->we called that func and get and obj; we destructure that obj to grab register func
    {resolver: zodResolver(createIssueSchema)}  //eventually we pass config obj when calling useForm Hook - and set resolver to zodResolver and pass schema to it
  ); 
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
        {errors.title && <Text color="red" as="p">{errors.title.message} </Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {/* <SimpleMDE placeholder="Description" />    ---> we have to move this into COntroller to be able to render it properly as it will not compile with register func */}
        {errors.description && <Text color="red" as="p">{errors.description.message} </Text>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
