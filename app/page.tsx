

export default function Home() {

  async function createPost(formData: FormData) {
    "use server"
    await console.log(formData.get("title"));
  }

  return (
    <div className="m-8">
      <form action={createPost}>
        <input name="title" className="border-2 border-gray-600 mr-4" />
        <button>click</button>


      </form>
    </div>
  );
}
