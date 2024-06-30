import { Spinner as FluentSpinner, SpinnerSize } from "@fluentui/react";

export const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading)
    return (
      <div
        style={{
          position: "absolute",
          background: "#edebe980",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: "999",
        }}
      >
        <FluentSpinner
          size={SpinnerSize.large}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    );
  else return <></>;
};
