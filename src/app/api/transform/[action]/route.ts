import { auth } from "@lib/nextauth/auth";
import { fetchData } from "@/data/fetch-data";

export const POST = async (
  request: Request,
  context: { params: Promise<{ action: string }> }
) => {
  const session = await auth();
  const data = await request.json();
  const { action } = await context.params;

  try {
    switch (action) {
      case "payment":
        const res = await fetchData.admin.payment(data, session);
        return new Response(JSON.stringify(res), { status: 200 });
      default:
        return new Response(JSON.stringify({ message: "Invalid endpoint" }), {
          status: 404,
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
};
