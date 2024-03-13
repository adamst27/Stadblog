import { connectToDB } from "@utils/database";
import Idea from "@models/idea";
export const POST = async (req, res) => {
  const { userId, idea, description } = await req.json();

  try {
    await connectToDB();
    const newIdea = new Idea({
      creator: userId,
      idea,
      description,
    });
    await newIdea.save();
    return new Response(JSON.stringify(newIdea), { status: 201 });
  } catch (error) {
    console.log("The error is: " + error);
    return new Response("failed to create a new prompot", { status: 500 });
  }
};
