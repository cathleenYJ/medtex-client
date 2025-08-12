import Link from "next/link";
import { Ul } from "@ui/ul";
import { Checkbox } from "@ui/form";
import { Routes } from "@/config/routes";

export const PaymentConfirm: React.FC<{
  confirm: boolean;
  setConfirm: (checked: boolean) => void;
  accepted: boolean;
  setAccepted: (checked: boolean) => void;
}> = ({ confirm, setConfirm, accepted, setAccepted }) => {
  return (
    <>
      <Ul className="text-xs text-black/80 flex flex-col gap-5">
        <li>Payment will only be collected after your event registration is confirmed.</li>
        <li>
          All payments are securely processed through ECPay. This platform does not retain any credit card details.
        </li>
      </Ul>
      <Checkbox
        className="text-black/80"
        checked={confirm}
        onChange={setConfirm}
      >
        I confirm that the above information is accurate and agree to proceed with payment upon confirmation of the event registration.
      </Checkbox>
      <Checkbox
        className="text-black/80"
        checked={accepted}
        onChange={setAccepted}
      >
        I agree to the{" "}
        <Link
          className="text-black"
          target="_blank"
          href={Routes.documents.terms}
        >
          [Terms of Service]
        </Link>{" "}
        and{" "}
        <Link
          className="text-black"
          target="_blank"
          href={Routes.documents.privacy}
        >
          [Privacy Policy]
        </Link>
        .
      </Checkbox>
    </>
  );
};
