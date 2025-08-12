import { Confirm } from "@ui/confirm";
import { Container, Title } from "@ui/modal";

export const Message: React.FC<{
  closeModal: () => void;
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  btnCancel?: string;
  btnAccept?: React.ReactNode;
}> = ({
  icon,
  children,
  closeModal,
  title = "Something went wrong!",
  btnCancel = "Try Again",
  btnAccept,
}) => {
  return (
    <Container>
      {icon && <div className="flex justify-center">{icon}</div>}
      <Title>{title}</Title>
      <div className="flex flex-col gap-10">
        <div className="text-center text-black">{children}</div>
      </div>
      <Confirm
        className="!justify-center"
        cancelClick={closeModal}
        cancelText={btnCancel}
      >
        {btnAccept}
      </Confirm>
    </Container>
  );
};
