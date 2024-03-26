import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';



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

  const postData = await db.post.findMany()
  console.log(postData);


  return (
    <div className="mx-auto max-w-xl space-y-5">


      <Card>
        <CardHeader>
          <CardTitle>CRUD</CardTitle>
          <CardDescription>Create something awesome!</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPost}>
            <Input name="title" placeholder="title" />
            <Input name="body" placeholder="body" className="mt-2 mb-2" />
            <Button className="w-full">click</Button>
          </form>
        </CardContent>

      </Card>



      <div>
        <div>
          {postData.map(post =>
          (
            <div key={post.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.body}</CardDescription>
                </CardHeader>
                <form action={updatePost}>
                  <Input name="id" value={post.id} />
                  <Input name="title" placeholder="title" defaultValue={post.title} />
                  <Input name="body" placeholder="body" defaultValue={post.body} className="mt-2 mb-2" />
                  <Button className="w-full">update</Button>
                </form>

              </Card>

            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
}
