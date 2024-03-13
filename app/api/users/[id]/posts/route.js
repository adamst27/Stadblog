import { connectToDB } from "@/utils/database";
import Idea from "@/models/idea";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const ideas = await Idea.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all ideas", { status: 500 });
  }
};
