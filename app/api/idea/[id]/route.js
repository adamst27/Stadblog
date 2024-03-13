//Get

import { connectToDB } from "@/utils/database";
import Idea from "@/models/idea";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const idea = await Idea.findById(params.id).populate("creator");
    if (!idea) return new Response("Could not find idea", { status: 404 });
    return new Response(JSON.stringify(idea), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all ideas", { status: 500 });
  }
};
//Patch

export const PATCH = async (req, { params }) => {
  const { idea, description } = await req.json();
  try {
    await connectToDB();
    const existingIdea = await Idea.findById(params.id);
    if (!existingIdea)
      return new Response("Could not find idea", { status: 404 });
    existingIdea.idea = idea;
    existingIdea.description = description;
    await existingIdea.save();
    return new Response(JSON.stringify(existingIdea), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all ideas", { status: 500 });
  }
};
// Delete
export const DELETE = async (res, { params }) => {
  try {
    await connectToDB();
    const idea = await Idea.findByIdAndRemove(params.id);
    return new Response("Idea deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete idea", { status: 500 });
  }
};
