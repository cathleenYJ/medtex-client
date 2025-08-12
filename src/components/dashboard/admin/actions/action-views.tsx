"use client";

import { ConfigValue } from "@/config";
import type { Session } from "next-auth";
import type { AppointmentItem } from "@/types";
import { ReApply } from "./reapply";
import { Decline } from "./decline";
import { Accept } from "./accept";

export const actionViews = ({
  role_id,
  id,
  buyer_id,
  seller_id,
  seller_company,
  case_status,
}: Pick<Session["user"], "role_id"> & AppointmentItem) => {
  switch (role_id) {
    case ConfigValue.ROLES.buyer:
      switch (case_status) {
        case ConfigValue.CASESTATUS.pending:
          return (
            <div className="flex gap-2">
              <Decline {...{ id, seller_id, seller_company }} />
              <Accept seller_id={seller_id} seller_company={seller_company} />
            </div>
          );
        default:
          return "-";
      }
    case ConfigValue.ROLES.seller:
      switch (case_status) {
        case ConfigValue.CASESTATUS.expired:
          return <ReApply buyer_id={buyer_id} appId={id} />;
        case ConfigValue.CASESTATUS.notComplete:
          return (
            <ReApply buyer_id={buyer_id} appId={id}>
              Continue
            </ReApply>
          );
        default:
          return "-";
      }
    default:
      return "-";
  }
};
