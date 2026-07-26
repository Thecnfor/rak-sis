// Destination registry: one locale-independent source of truth for
// destination slugs, shared route metadata, and featured subsets used by
// navigation, homepage cards, and sitemap generation.

export type SpotRank = 1 | 2 | 3 | 4 | 5;

export type SpotMeta = {
  rank: SpotRank;
  image: string;
};

type DestinationMetaShape = {
  slug: string;
  ctaBg: string;
  homeImage: string;
  spots: SpotMeta[];
};

const DESTINATION_REGISTRY = {
  chongqing: {
    slug: "chongqing",
    ctaBg: "/images/02_Tianmen_Mountain_National_Forest_Park.jpg",
    homeImage: "/images/chongqing-1.jpg",
    spots: [
      { rank: 1, image: "/images/chongqing-2.jpg" },
      { rank: 2, image: "/images/chongqing-3.jpg" },
      { rank: 3, image: "/images/chongqing-4.jpg" },
      { rank: 4, image: "/images/chongqing-5.jpg" },
      { rank: 5, image: "/images/chongqing-6.jpg" },
    ],
  },
  sichuan: {
    slug: "sichuan",
    ctaBg: "/images/sichuan_03_huanglong.jpg",
    homeImage: "/images/dest-sichuan.jpg",
    spots: [
      { rank: 1, image: "/images/dest-sichuan.jpg" },
      { rank: 2, image: "/images/dest-sichuan.jpg" },
      { rank: 3, image: "/images/dest-sichuan.jpg" },
      { rank: 4, image: "/images/dest-sichuan.jpg" },
      { rank: 5, image: "/images/dest-sichuan.jpg" },
    ],
  },
  zhangjiajie: {
    slug: "zhangjiajie",
    ctaBg: "/images/02_Tianmen_Mountain_National_Forest_Park.jpg",
    homeImage: "/images/dest-zhangjiajie.jpg",
    spots: [
      { rank: 1, image: "/images/01_Zhangjiajie_National_Forest_Park.jpg" },
      { rank: 2, image: "/images/02_Tianmen_Mountain_National_Forest_Park.jpg" },
      { rank: 3, image: "/images/03_Tianzi_Mountain.jpg" },
      { rank: 4, image: "/images/04_Zhangjiajie_Yellow_Dragon_Cave.jpg" },
      { rank: 5, image: "/images/05_Zhangjiajie_Grand_Canyon.jpg" },
    ],
  },
  guangxi: {
    slug: "guangxi",
    ctaBg: "/images/guangxi.jpg",
    homeImage: "/images/guangxi.jpg",
    spots: [
      { rank: 1, image: "/images/guangxi-1.jpg" },
      { rank: 2, image: "/images/guangxi-2.jpg" },
      { rank: 3, image: "/images/guangxi-3.jpg" },
      { rank: 4, image: "/images/guangxi-4.jpg" },
      { rank: 5, image: "/images/guangxi-5.jpg" },
    ],
  },
  guizhou: {
    slug: "guizhou",
    ctaBg: "/images/guizhou-3.jpg",
    homeImage: "/images/guizhou-1.jpg",
    spots: [
      { rank: 1, image: "/images/guizhou-1.jpg" },
      { rank: 2, image: "/images/guizhou-2.jpg" },
      { rank: 3, image: "/images/guizhou-3.jpg" },
      { rank: 4, image: "/images/guizhou-4.jpg" },
      { rank: 5, image: "/images/guizhou-5.jpg" },
    ],
  },
  yunnan: {
    slug: "yunnan",
    ctaBg: "/images/yunnan_04_jade_dragon_snow_mountain.jpg",
    homeImage: "/images/dest-yunnan.jpg",
    spots: [
      { rank: 1, image: "/images/dest-yunnan.jpg" },
      { rank: 2, image: "/images/dest-yunnan.jpg" },
      { rank: 3, image: "/images/dest-yunnan.jpg" },
      { rank: 4, image: "/images/dest-yunnan.jpg" },
      { rank: 5, image: "/images/dest-yunnan.jpg" },
    ],
  },
  beijing: {
    slug: "beijing",
    ctaBg: "/images/beijing-2.jpg",
    homeImage: "/images/beijing-1.jpg",
    spots: [
      { rank: 1, image: "/images/beijing-1.jpg" },
      { rank: 2, image: "/images/beijing-2.jpg" },
      { rank: 3, image: "/images/beijing-3.jpg" },
      { rank: 4, image: "/images/beijing-4.jpg" },
      { rank: 5, image: "/images/beijing-5.jpg" },
    ],
  },
  xian: {
    slug: "xian",
    ctaBg: "/images/xian-4.jpg",
    homeImage: "/images/xian-1.jpg",
    spots: [
      { rank: 1, image: "/images/xian-1.jpg" },
      { rank: 2, image: "/images/xian-2.jpg" },
      { rank: 3, image: "/images/xian-3.jpg" },
      { rank: 4, image: "/images/xian-4.jpg" },
      { rank: 5, image: "/images/xian-5.jpg" },
    ],
  },
} as const satisfies Record<string, DestinationMetaShape>;

export type DestinationSlug = keyof typeof DESTINATION_REGISTRY;
export type DestinationMeta = (typeof DESTINATION_REGISTRY)[DestinationSlug];
export type DestinationHref = `/${DestinationSlug}`;

export const DESTINATIONS = DESTINATION_REGISTRY;

export const DESTINATION_SLUGS = Object.keys(DESTINATIONS) as DestinationSlug[];

export const HOME_DESTINATION_SLUGS = [
  "chongqing",
  "guangxi",
  "sichuan",
  "zhangjiajie",
] as const satisfies readonly DestinationSlug[];

export const FOOTER_DESTINATION_SLUGS = [
  "chongqing",
  "guangxi",
  "sichuan",
  "zhangjiajie",
  "yunnan",
] as const satisfies readonly DestinationSlug[];

export function isDestinationSlug(value: string): value is DestinationSlug {
  return value in DESTINATIONS;
}

export function getDestination(slug: DestinationSlug): DestinationMeta {
  return DESTINATIONS[slug];
}

export function getDestinationHref(slug: DestinationSlug): DestinationHref {
  return `/${slug}`;
}
