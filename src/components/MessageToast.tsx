import { IMessageBar, MessageBar, MessageBarType } from "@fluentui/react";
import { useEffect, useState } from "react";

interface Props {
  messageError: string | null;
  setMessageError: () => void;
}

const messageStyles: Partial<IMessageBar> = {
  root: {
    position: "absolute",
    maxWidth: "300px",
    left: 10,
    bottom: 10,
    zIndex: "99",
    boxShadow:
      "rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px",
  },
};

export const MessageToast = ({ messageError, setMessageError }: Props) => {
  const [message, setMessage] = useState(messageError);

  useEffect(() => {
    if (message)
      setTimeout(() => {
        setMessage(null);
      }, 5000);
  }, [message]);

  useEffect(() => {
    setMessage(messageError);
  }, [messageError]);

  return (
    <>
      {message && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={true}
          styles={messageStyles}
          dismissButtonAriaLabel="Close"
          onDismiss={setMessageError}
        >
          {message}
        </MessageBar>
      )}
    </>
  );
};
