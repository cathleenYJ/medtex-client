import { Routes } from "@/config/routes";

export const GET = async (
  request: Request,
  context: { params: Promise<{ provider: string[] }> }
) => {
  const { searchParams } = new URL(request.url);
  const {
    provider: [provider],
  } = await context.params;

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${
        Routes.private.checkoutForm
      }/2?${searchParams.toString()}&provider=${provider}`,
    },
  });
};
