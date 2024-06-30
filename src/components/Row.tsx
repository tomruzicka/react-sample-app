import { mergeStyleSets } from "@fluentui/react";

const row = mergeStyleSets({
  container: {
    display: "flex",
  },
  label: {
    width: "180px",
    fontWeight: "400",
  },
  value: {
    width: "180px",
    fontWeight: "600",
  },
});

export const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={row.container}>
      <div className={row.label}>{label}</div>
      <div className={row.value}>{value}</div>
    </div>
  );
};
