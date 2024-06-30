import { mergeStyleSets } from "@fluentui/react";
import { ReactNode } from "react";
import { Card, Header } from "../components";

interface Props {
  header: {
    label: string;
    buttons?: {
      label: string;
      onClick: () => void;
      disabled?: boolean;
    }[];
  };
  children: ReactNode;
}

const sectionLayout = mergeStyleSets({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    marginTop: "30px",
  },
});

export const SectionLayout = ({ header, children }: Props) => {
  return (
    <Card>
      <div className={sectionLayout.container}>
        <Header label={header.label} buttons={header.buttons} />
        <div className={sectionLayout.content}>{children}</div>
      </div>
    </Card>
  );
};
