

import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';
import PostForm from "./PostForm";
import Post from "./Post";
import { Separator } from "@/components/ui/separator"




export default async function Home() {

  async function createPost(formData: FormData) {
    "use server"

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;


    const post = await db.post.create({
      data: {
        title: title,
        body: body
      }
    })
    revalidatePath('/')
    return post
  }

  async function updatePost(formData: FormData) {
    "use server"
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const id = formData.get("id") as string;

    const post = await db.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        body: body
      }
    })
    revalidatePath('/')
    return post
  }

  async function deletePost(id: string) {
    "use server"


    const post = await db.post.delete({
      where: {
        id: id,
      }
    })

    revalidatePath('/')
    return post

  }

  const postData = await db.post.findMany()
  console.log(postData);


  return (
    <div className="mx-auto max-w-xl space-y-5">


      <PostForm createPost={createPost} />



      <Separator />

      <div>
        {postData.map(post =>
        (
          <div key={post.id} className="mb-3">

            <Post post={post} updatePost={updatePost} deletePost={deletePost} />
          </div>
        )
        )}
      </div>

    </div>
  );
}
