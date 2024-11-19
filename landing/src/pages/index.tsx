import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import CustomButton from "../components/commons/CustomButton";

import styles from "./index.module.css";

function copyToClipboard(text: string): void {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("복사되었습니다!");
    })
    .catch((error) => {
      console.error("Failed to copy text:", error);
      alert("복사에 실패했습니다.");
    });
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const dockerCommand =
    "docker run -d -p 5000:5000 -p 8088:8088 aiblockeditor/able:latest";
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <p className="hero__subtitle">
          {/* {siteConfig.tagline} */}
          AI BLOCK EDITOR
        </p>
        <div className="hero__title">
          <img src="img/ABLE.svg" alt="ABLE Logo" />
        </div>
        <div className={`${styles.buttons} button-container`}>
          <CustomButton
            label={dockerCommand}
            variant="code"
            onClick={() => copyToClipboard(dockerCommand)}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Ai BLock Editor`} description="">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
