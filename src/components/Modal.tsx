import {
  Modal as FluentModal,
  IconButton,
  NeutralColors,
  Persona,
  PersonaSize,
  Separator,
  mergeStyleSets,
} from "@fluentui/react";
import { DateTime } from "luxon";
import { Card, Row } from "../components";
import { TContact } from "../eWayAPI/ContactsResponse";

const modal = mergeStyleSets({
  container: {
    padding: "10px",
    maxWidth: "500px",
    width: "100%",
    background: NeutralColors.gray20,
  },
  scrollableContent: {
    overflowY: "unset",
  },
  top: {
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    padding: "10px",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

export const Modal = ({
  isModalOpen,
  hideModal,
  data,
}: {
  isModalOpen: boolean;
  hideModal: () => void;
  data: TContact | undefined;
}) => {
  const getFullName = (firstName: string, lastName: string) =>
    firstName + " " + lastName;

  return (
    <FluentModal
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      containerClassName={modal.container}
      scrollableContentClassName={modal.scrollableContent}
    >
      <div className={modal.top}>
        <IconButton iconProps={{ iconName: "Cancel" }} onClick={hideModal} />
      </div>
      {data && (
        <div className={modal.content}>
          <Card>
            <div className={modal.header}>
              <Persona
                size={PersonaSize.size120}
                imageUrl={`data:image/png;base64,${data.ProfilePicture}`}
              />
              <Separator />
              <Row
                label={"Full name"}
                value={getFullName(data.FirstName, data.LastName)}
              />
            </div>
          </Card>

          <Card title={"Profile information"}>
            <div className={modal.info}>
              <Row label={"City"} value={data.BusinessAddressCity} />
              <Separator />
              <Row label={"State"} value={data.BusinessAddressState} />
              <Separator />
              <Row label={"Street"} value={data.BusinessAddressStreet} />
            </div>
          </Card>

          <Card title={"Account information"}>
            <div className={modal.info}>
              <Row label={"E-mail"} value={data.Email1Address} />
              <Separator />
              <Row label={"Phone number"} value={data.TelephoneNumber1} />
              <Separator />
              <Row
                label={"Created date"}
                value={DateTime.fromJSDate(new Date(data.ItemCreated)).toFormat(
                  "dd.MM. yyyy"
                )}
              />
              <Separator />
              <Row
                label={"Last activity"}
                value={DateTime.fromJSDate(
                  new Date(data.LastActivity)
                ).toFormat("dd.MM. yyyy")}
              />
            </div>
          </Card>
        </div>
      )}
    </FluentModal>
  );
};
