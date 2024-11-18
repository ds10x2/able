import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "손쉬운 AI 모델 개발",
    Svg: require("@site/static/img/blocks.svg").default,
    description: <></>,
  },
  {
    title: "한 눈에 보이는 모델 분석",
    Svg: require("@site/static/img/data-analysis.svg").default,
    description: <></>,
  },
  {
    title: "간편한 배포",
    Svg: require("@site/static/img/deployment.svg").default,
    description: <></>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} viewBox="0 0 512 512" role="img" />
      </div>
      <div
        className={`${styles.featureTextContainer} text--center padding-horiz--md`}
      >
        <p className={`${styles.title}`}>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
