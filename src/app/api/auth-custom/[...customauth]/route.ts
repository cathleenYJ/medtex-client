import { Routes } from "@/config/routes";
import { fetchData } from "@/data/fetch-data";

export const GET = async (
  request: Request,
  context: { params: Promise<{ customauth: string[] }> }
) => {
  const { searchParams } = new URL(request.url);
  const {
    customauth: [action],
  } = await context.params;
  switch (action) {
    case "vertify":
      return await vertify(searchParams);
    case "reset-password":
      return resetPassword(searchParams);
    default:
      return new Response("Invalid Action", { status: 400 });
  }
};

const resetPassword = (searchParams: URLSearchParams) => {
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${Routes.auth.resetPassword}/${token}?email=${email}`,
    },
  });
};

const vertify = async (searchParams: URLSearchParams) => {
  const user_id = searchParams.get("user_id");
  const code = searchParams.get("code");
  if (!user_id || !code) {
    return new Response("Invalid Vertify Link", { status: 400 });
  }
  try {
    await fetchData.auth.mailVertify({ user_id: Number(user_id), code });
    const callbackUrl = encodeURIComponent(`${Routes.private.profileForm}/1`);
    const success = encodeURIComponent("Vertify Success");
    const message = encodeURIComponent(
      "You have successfully verified your email. Please login to complete your profile."
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${Routes.auth.signIn}?success=${success}&message=${message}&callbackUrl=${callbackUrl}`,
      },
    });
  } catch (err) {
    const error = encodeURIComponent("Invalid Vertify Link");
    const message = encodeURIComponent((err as Error).message);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${Routes.auth.signIn}?error=${error}&message=${message}`,
      },
    });
  }
};