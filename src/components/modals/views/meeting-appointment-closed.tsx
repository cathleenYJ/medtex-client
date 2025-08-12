import { Button } from "@ui/button";
import { Container, Title } from "@ui/modal";

export const MeetingAppointmentClosed: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <Container>
      <Title>Meeting Appointment Closed</Title>
      <div className="flex flex-col gap-10">
        <div>
          The deadline for making meeting appointments was{" "}
          <span className="font-bold">November 30th</span>.
          <br />
          This feature is no longer available.
        </div>
        <div>
          * Please note that the organizer reserves the right to adjust the
          appointment deadline based on actual circumstances.
        </div>
      </div>
      <Button variant="modal" component={Button} onClick={closeModal}>
        OK
      </Button>
    </Container>
  );
};
