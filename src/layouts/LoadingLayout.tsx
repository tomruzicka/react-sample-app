import {
  MessageBar,
  MessageBarType,
  NeutralColors,
  ShimmerElementType,
  mergeStyleSets,
} from "@fluentui/react";
import { Shimmer } from "@fluentui/react/lib/Shimmer";
import { ReactNode } from "react";
interface Props {
  isLoading: boolean;
  error: string | null;
  children: ReactNode;
}

const shimmerElements = [
  { type: ShimmerElementType.circle, height: 56 },
  { type: ShimmerElementType.gap, width: 10 },
  { type: ShimmerElementType.line, height: 30, width: "160px" },
  { type: ShimmerElementType.gap, width: "100%" },
];

export const LoadingLayout = ({ isLoading, error, children }: Props) => {
  if (isLoading) return <RecentlyShimmer />;
  if (error) return <ErrorMessage error={error} />;
  return <>{children}</>;
};

const recentlyShimmer = mergeStyleSets({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  column: {
    flex: "1 1 50%",
    padding: "20px",
    boxSizing: "border-box",
  },
  shimmer: {
    padding: "10px",
  },
});

const RecentlyShimmer = () => {
  return (
    <div className={recentlyShimmer.container}>
      {Array.from({ length: 4 }, (_, index) => index).map((index) => (
        <div className={recentlyShimmer.column} key={index}>
          <Shimmer
            shimmerColors={{
              shimmer: NeutralColors.gray10,
              shimmerWave: NeutralColors.gray40,
            }}
            shimmerElements={shimmerElements}
            className={recentlyShimmer.shimmer}
          />
        </div>
      ))}
    </div>
  );
};

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
      {error}
    </MessageBar>
  );
};
