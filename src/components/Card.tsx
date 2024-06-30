import { NeutralColors, Separator, mergeStyleSets } from "@fluentui/react";

const card = mergeStyleSets({
  container: {
    background: NeutralColors.white,
    width: "100%",
    borderRadius: "10px",
    boxShadow:
      "rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px",
    marginBottom: "20px",
  },
  main: {
    padding: "20px",
  },
  title: {
    fontWeight: "600",
  },
  content: {
    display: "flex",
  },
});

export const Card = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={card.container}>
      <div className={card.main}>
        {title && (
          <>
            <div className={card.title}>{title}</div>
            <Separator />
          </>
        )}
        <div className={card.content}>{children}</div>
      </div>
    </div>
  );
};
