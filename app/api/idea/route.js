import { connectToDB } from "@/utils/database";
import Idea from "@/models/idea";

export const GET = async (event) => {
    try {
        await connectToDB();
        const ideas = await Idea.find({}).populate('creator');

        return new Response(JSON.stringify(ideas), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all ideas", { status: 500 });
    }
}