import { Cards } from "@ui/card";
import { OverviewCard } from "./overview-card";
import { Appointments } from "./cards/Appointments";
export * from "./company";

export const Overview: React.FC = () => (
  <Cards className="gap-7.5">
    <Appointments />
    <OverviewCard className="gap-4">
      <div className="text-lg">Notification</div>
    </OverviewCard>
  </Cards>
);
