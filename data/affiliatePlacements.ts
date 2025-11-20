import { AffiliateLinkKey } from "./affiliateLinks";

export type AffiliatePlacementContext =
  | "calculator_hydration"
  | "calculator_highHydrationTools"
  | "calculator_thermometer"
  | "mylab_afterFirstBatch"
  | "levain_basic"
  | "styles_pizza"
  | "styles_bread"
  | "learn_article_footer";

export type AffiliatePlacement = {
  id: string;
  context: AffiliatePlacementContext;
  title: string;
  description: string;
  ctaLabel: string;
  linkKey: AffiliateLinkKey;
};

export const AFFILIATE_PLACEMENTS: AffiliatePlacement[] = [
  {
    id: "calc_scale_core",
    context: "calculator_hydration",
    title: "Precision digital scale",
    description: "Small hydration changes require accurate gram-level precision.",
    ctaLabel: "View recommended scale",
    linkKey: "digitalScales"
  },
  {
    id: "calc_highHydration_tools",
    context: "calculator_highHydrationTools",
    title: "Tools for high-hydration doughs",
    description: "Scrapers and containers that make 70%+ hydration doughs manageable.",
    ctaLabel: "See suggested tools",
    linkKey: "doughScrapers"
  },
  {
    id: "calc_oven_thermometer",
    context: "calculator_thermometer",
    title: "Infrared thermometer",
    description: "Measure your stone or steel surface to match the recipe temperature.",
    ctaLabel: "View thermometer",
    linkKey: "infraredThermometers"
  },
  {
    id: "mylab_first_batch",
    context: "mylab_afterFirstBatch",
    title: "Upgrade your baking setup",
    description: "You logged your first batch. These tools help you be more consistent.",
    ctaLabel: "View baking tools",
    linkKey: "proofingContainers"
  },
  {
    id: "levain_jar",
    context: "levain_basic",
    title: "Proper levain jar",
    description: "A tall, straight jar makes levain growth easier to track.",
    ctaLabel: "View jar",
    linkKey: "levainJars"
  },
  {
    id: "styles_pizza_steel",
    context: "styles_pizza",
    title: "Baking steel for pizza",
    description: "For Neapolitan-style heat transfer in a home oven.",
    ctaLabel: "View baking steel",
    linkKey: "bakingSteel"
  },
  {
    id: "styles_bread_flour",
    context: "styles_bread",
    title: "High-protein flour",
    description: "Supports strong gluten structure for lean breads and long fermentation.",
    ctaLabel: "View flour options",
    linkKey: "highProteinFlour"
  },
  {
    id: "learn_footer_books",
    context: "learn_article_footer",
    title: "Deep dive into dough science",
    description: "Books that inspired the technical content of DoughLabPro.",
    ctaLabel: "View recommended books",
    linkKey: "bookFWSY"
  }
];
