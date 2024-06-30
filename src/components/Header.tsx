import { DefaultButton, mergeStyleSets } from "@fluentui/react";

interface Props {
  label: string;
  buttons?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
}

const header = mergeStyleSets({
  container: {
    display: "flex",
    "@media (max-width: 500px)": {
      flexDirection: "column",
    },
  },
  title: {
    flex: 1,
  },
  buttons: {
    display: "flex",
    gap: "5px",
    "@media (max-width: 500px)": {
      marginTop: "10px",
    },
  },
});

export const Header = ({ label, buttons }: Props) => {
  return (
    <div className={header.container}>
      <h1 className={header.title}>{label}</h1>
      <div className={header.buttons}>
        {buttons &&
          buttons.map((button, index) => (
            <DefaultButton
              key={`${button.label}-${index}`}
              text={button.label}
              onClick={button.onClick}
              disabled={button.disabled}
            />
          ))}
      </div>
    </div>
  );
};
