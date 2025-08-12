import { Button } from "@ui/button";
import { providerMap, signIn } from "@lib/nextauth/auth";

export const OAuthSignin: React.FC<{ redirectTo: string }> = ({
  redirectTo,
}) => (
  <div className="flex flex-col gap-4">
    {providerMap.map((provider) => (
      <form
        key={provider.id}
        action={async () => {
          "use server";
          try {
            await signIn(provider.id, { redirectTo });
          } catch (error) {
            throw error;
          }
        }}
      >
        <Button
          type="submit"
          className="block w-full rounded-sm p-3 bg-white/30 text-white"
        >
          Login with {provider.name}
        </Button>
      </form>
    ))}
  </div>
);
