"use client";

import { Session } from "next-auth";
import { Container } from "@ui/modal";
import { LoadingBlock } from "@dashboard/loading-block";
import { Company } from "./conpany";
import { Contact } from "./contact";
import { useModalData } from "./use-modal-data";

export const ProfileModal: React.FC<{
  id: number;
  session: Session;
}> = ({ id, session }) => {
  const { data, isLoading } = useModalData(id, session);

  return (
    <Container
      className="!p-0 !gap-0 w-3xl max-w-full"
      data-component-theme={data?.theme || "green"}
    >
      <div className="flex flex-col sm:flex-row gap-7.5 bg-gradient-to-r from-b2b-bg to-b2b-lv5 px-7 pt-7 pb-6">
        {isLoading ? <LoadingBlock /> : data && <Company data={data} />}
      </div>
      <div className="flex flex-col sm:flex-row gap-7.5 pt-5 px-7 pb-7 bg-b2b-lv5">
        {isLoading ? <LoadingBlock /> : data && <Contact data={data} />}
      </div>
    </Container>
  );
};
