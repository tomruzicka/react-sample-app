import { Icon, mergeStyleSets } from "@fluentui/react";

const noData = mergeStyleSets({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: "10px",
  },
});

export const NoData = () => {
  return (
    <div className={noData.container}>
      <Icon iconName="Sad" style={{ fontSize: 100 }} />
      <h2>There are no recent searches</h2>
      <p>Use the search here to add a new</p>
    </div>
  );
};
