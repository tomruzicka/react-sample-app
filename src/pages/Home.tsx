import { Link } from "@fluentui/react";
import { SectionLayout } from "../layouts/SectionLayout";

export const Home = () => {
  return (
    <SectionLayout header={{ label: "React Sample App" }}>
      <img
        src="https://camo.githubusercontent.com/ce0cec1a1abe2ece11bca0ec0a41599b915eb5e29c990be26586e941ce84772e/68747470733a2f2f7777772e657761792d63726d2e636f6d2f77702d636f6e74656e742f7468656d65732f657761792f696d672f6c6f676f5f6e65772d6e65772e737667"
        alt="ewaycrm"
        width={300}
      />
      <br />
      <br />
      <div>This application is for a eWay-CRM job interview.</div>
      <p>
        Here is a{" "}
        <Link
          href="https://github.com/tomruzicka/react-sample-app"
          target="_blank"
        >
          link
        </Link>{" "}
        to the repository.
      </p>
      <br />
      <h3>
        Goal:{" "}
        <Link
          href="https://github.com/tomruzicka/react-sample-app?tab=readme-ov-file#your-goal"
          target="_blank"
        >
          Here
        </Link>
      </h3>
    </SectionLayout>
  );
};
