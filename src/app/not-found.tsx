import { Button } from "@ui/button";
import clsx from "clsx";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      data-admin
      className="text-white grid place-items-center min-h-[calc(100vh-8rem)]"
    >
      <div className="flex flex-col gap-10 text-center pb-20">
        <div className="text-[12.5rem]/[12.5rem] font-extrabold flex justify-center">
          <div
            data-component-theme="blue"
            className={clsx(
              "-mx-2.5 text-shadow-xs",
              "bg-clip-text text-transparent bg-linear-90 from-b2b-lv3 to-b2b-lv5"
            )}
          >
            4
          </div>
          <div
            data-component-theme="green"
            className={clsx(
              "-mx-2.5 text-shadow-xs",
              "bg-clip-text text-transparent bg-linear-90 from-b2b-lv3 to-b2b-lv5"
            )}
          >
            0
          </div>
          <div
            data-component-theme="red"
            className={clsx(
              "-mx-2.5 text-shadow-xs",
              "bg-clip-text text-transparent bg-linear-90 from-b2b-lv5 to-b2b-lv3"
            )}
          >
            4
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-medium">This page doesn’t exist</div>
          <div>
            We couldn’t find the page you requested. Please check the URL or
            return to the homepage.
          </div>
        </div>
        <div>
          <Button
            className="!w-75 max-w-full mx-auto"
            variant="auth"
            component={Link}
            href="/"
          >
            Go Back to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
}
