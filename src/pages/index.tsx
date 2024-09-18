import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

import {
  Check,
  ArrowRight,
  SquarePen,
  SquareChartGantt,
  Blocks,
  ExternalLink,
} from "lucide-react";

const features = [
  {
    name: "Friendly UI system for interacting and managing STI approaches",
    description:
      "We know designing a user-friendly, robust UI can be a challenge and can demand both technical prowess and design skills, that is why we developed MantisTable UI",
    icon: SquareChartGantt,
  },
  {
    name: "Visualisation of annotations",
    description:
      "With MantisTable UI, you can easily visualise table annotations, providing a clear and intuitive overview of your data",
    icon: SquarePen,
  },
  {
    name: "Powerful and flexible plugin system",
    description:
      "This incredible feature enables users to easily extend and customise its functionality, offering a seamless experience and allowing for effortless expansion and personalisation",
    icon: Blocks,
  },
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="MantisTable UI was designed to let you tame your Semantic Table Interpretation approach."
    >
      <main>
        <img
          src="/mantistable-ui-docs/img/bblurry.svg"
          className="absolute opacity-15 -top-[45rem]"
        />
        <section className="relative z-10">
          <div className="place-content-center mx-4 lg:gap-12 xl:gap-12 lg:pt-10 lg:grid-cols-12 pb-12">
            <h1 className="md:text-center pt-12 mb-4 leading-none text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white font-bold tracking-widest">
              MantisTable UI
            </h1>
            <div className="justify-center flex flex-col md:flex-row max-w-6xl gap-20 pb-2 mx-auto">
              <img
                alt="Logo"
                src="/mantistable-ui-docs/img/mantislogo.svg"
                className="lg:mt-0 lg:col-span-4 lg:flex w-[20rem] object-fit-cover h-auto max-w-full"
              />
              <div className="place-content-center max-w-lg pl-2">
                <p className=" text-dgBackground dark:text-white sm:text-xl lg:mb-8 md:text-2xl lg:text-3xl">
                  {" "}
                  Effortless data interaction and simple table navigation with a
                  Graphic User Interface for Semantic Table Interpretion{" "}
                </p>
                <div className="flex flex-row">
                  <a
                    href="/mantistable-ui-docs/docs/introduction"
                    className="text-center inline-flex items-center border-none dark:bg-primaryGreen dark:text-lightBackground  hover:text-dgBackground text-dgBackground font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-secondaryGreen font-semibold"
                  >
                    Learn more <ArrowRight className="ml-2 h-5 w-5" />{" "}
                  </a>
                  <a
                    href="https://forms.gle/oQ24aYpVZ5B8enXj8"
                    className="text-center inline-flex items-center border-none dark:bg-primaryGreen dark:text-lightBackground  hover:text-dgBackground text-dgBackground font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-secondaryGreen font-semibold"
                  >
                    Feedback and Features request <ExternalLink className="ml-2 h-5 w-5" />{" "}
                  </a>
                  <a
                    href="https://mantistable.datai.disco.unimib.it/"
                    className="text-center inline-flex items-center border-2 border-solid dark:border-primaryGreen border-secondaryGreen hover:text-dgBackground dark:text-lightBackground text-dgBackground font-sm rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-semibold"
                  >
                    Try it out <ExternalLink className="ml-2 h-5 w-5" />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden dark:bg-darkBackground bg-lightBackground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col justify-center lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    An intuitive UI for Semantic Table Interpretation
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
                    MantisTable UI is the ultimate web interface for managing
                    Semantic Table Interpretation (STI) approaches, providing an
                    intuitive, ready-to-use platform tailored anyone who is
                    interested in STI world.
                  </p>
                  <div className="mt-6 max-w-xl space-y-4 text-base leading-5 text-gray-600 lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-8">
                        <div className="inline font-bold text-gray-900 dark:text-gray-300">
                          <feature.icon
                            aria-hidden="true"
                            className="absolute left-1 top-1 h-5 w-5 text-primaryGreen dark:text-secondaryGreen"
                          />
                          {feature.name}
                        </div>
                        <span className="inline pl-3 text-gray-600 dark:text-gray-200">
                          {feature.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <img
                alt="Product screenshot"
                src="/mantistable-ui-docs/img/mantisUI.png"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
