import {
  IconButton,
  MessageBar,
  TextField,
  mergeStyleSets,
} from "@fluentui/react";
import { FormEvent, useState } from "react";

const form = mergeStyleSets({
  container: {
    display: "flex",
    alignItems: "flex-end",
    position: "relative",
  },
  input: {
    flex: 1,
  },
  button: {
    position: "absolute",
    right: "0",
    top: "30px",
    color: "inherit",

    selectors: {
      ":hover": {
        backgroundColor: "transparent",
      },
      ":active": {
        backgroundColor: "transparent",
      },
    },
  },
});

export const Form = ({
  onSubmit,
  error,
}: {
  onSubmit: (email: string) => void;
  error: string;
}) => {
  const [email, setEmail] = useState("ealbares@gmail.com");

  const handleOnChange = (newValue: string | undefined) => {
    if (newValue) setEmail(newValue);
    else setEmail("");
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className={form.container}>
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(_, newValue) => handleOnChange(newValue)}
          errorMessage={error}
          className={form.input}
        />
        <IconButton
          iconProps={{ iconName: "Search" }}
          className={form.button}
          type="submit"
        />
      </form>
      <MessageBar>
        Please enter the email address you want to search for. After the search,
        a window with contact information will appear.
      </MessageBar>
    </div>
  );
};