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
    ctaBg: "/images/destinations/zhangjiajie/02_Tianmen_Mountain_National_Forest_Park.jpg",
    homeImage: "/images/destinations/chongqing/chongqing-1.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/chongqing/chongqing-2.jpg" },
      { rank: 2, image: "/images/destinations/chongqing/chongqing-3.jpg" },
      { rank: 3, image: "/images/destinations/chongqing/chongqing-4.jpg" },
      { rank: 4, image: "/images/destinations/chongqing/chongqing-5.jpg" },
      { rank: 5, image: "/images/destinations/chongqing/chongqing-6.jpg" },
    ],
  },
  sichuan: {
    slug: "sichuan",
    ctaBg: "/images/destinations/sichuan/sichuan_03_huanglong.jpg",
    homeImage: "/images/destinations/sichuan/dest-sichuan.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/sichuan/dest-sichuan.jpg" },
      { rank: 2, image: "/images/destinations/sichuan/dest-sichuan.jpg" },
      { rank: 3, image: "/images/destinations/sichuan/dest-sichuan.jpg" },
      { rank: 4, image: "/images/destinations/sichuan/dest-sichuan.jpg" },
      { rank: 5, image: "/images/destinations/sichuan/dest-sichuan.jpg" },
    ],
  },
  zhangjiajie: {
    slug: "zhangjiajie",
    ctaBg: "/images/destinations/zhangjiajie/02_Tianmen_Mountain_National_Forest_Park.jpg",
    homeImage: "/images/destinations/zhangjiajie/dest-zhangjiajie.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/zhangjiajie/01_Zhangjiajie_National_Forest_Park.jpg" },
      { rank: 2, image: "/images/destinations/zhangjiajie/02_Tianmen_Mountain_National_Forest_Park.jpg" },
      { rank: 3, image: "/images/destinations/zhangjiajie/03_Tianzi_Mountain.jpg" },
      { rank: 4, image: "/images/destinations/zhangjiajie/04_Zhangjiajie_Yellow_Dragon_Cave.jpg" },
      { rank: 5, image: "/images/destinations/zhangjiajie/05_Zhangjiajie_Grand_Canyon.jpg" },
    ],
  },
  guangxi: {
    slug: "guangxi",
    ctaBg: "/images/destinations/guangxi/guangxi.jpg",
    homeImage: "/images/destinations/guangxi/guangxi.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/guangxi/guangxi-1.jpg" },
      { rank: 2, image: "/images/destinations/guangxi/guangxi-2.jpg" },
      { rank: 3, image: "/images/destinations/guangxi/guangxi-3.jpg" },
      { rank: 4, image: "/images/destinations/guangxi/guangxi-4.jpg" },
      { rank: 5, image: "/images/destinations/guangxi/guangxi-5.jpg" },
    ],
  },
  guizhou: {
    slug: "guizhou",
    ctaBg: "/images/destinations/guizhou/guizhou-3.jpg",
    homeImage: "/images/destinations/guizhou/guizhou-1.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/guizhou/guizhou-1.jpg" },
      { rank: 2, image: "/images/destinations/guizhou/guizhou-2.jpg" },
      { rank: 3, image: "/images/destinations/guizhou/guizhou-3.jpg" },
      { rank: 4, image: "/images/destinations/guizhou/guizhou-4.jpg" },
      { rank: 5, image: "/images/destinations/guizhou/guizhou-5.jpg" },
    ],
  },
  yunnan: {
    slug: "yunnan",
    ctaBg: "/images/destinations/yunnan/yunnan_04_jade_dragon_snow_mountain.jpg",
    homeImage: "/images/destinations/yunnan/dest-yunnan.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/yunnan/dest-yunnan.jpg" },
      { rank: 2, image: "/images/destinations/yunnan/dest-yunnan.jpg" },
      { rank: 3, image: "/images/destinations/yunnan/dest-yunnan.jpg" },
      { rank: 4, image: "/images/destinations/yunnan/dest-yunnan.jpg" },
      { rank: 5, image: "/images/destinations/yunnan/dest-yunnan.jpg" },
    ],
  },
  beijing: {
    slug: "beijing",
    ctaBg: "/images/destinations/beijing/beijing-2.jpg",
    homeImage: "/images/destinations/beijing/beijing-1.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/beijing/beijing-1.jpg" },
      { rank: 2, image: "/images/destinations/beijing/beijing-2.jpg" },
      { rank: 3, image: "/images/destinations/beijing/beijing-3.jpg" },
      { rank: 4, image: "/images/destinations/beijing/beijing-4.jpg" },
      { rank: 5, image: "/images/destinations/beijing/beijing-5.jpg" },
    ],
  },
  xian: {
    slug: "xian",
    ctaBg: "/images/destinations/xian/xian-4.jpg",
    homeImage: "/images/destinations/xian/xian-1.jpg",
    spots: [
      { rank: 1, image: "/images/destinations/xian/xian-1.jpg" },
      { rank: 2, image: "/images/destinations/xian/xian-2.jpg" },
      { rank: 3, image: "/images/destinations/xian/xian-3.jpg" },
      { rank: 4, image: "/images/destinations/xian/xian-4.jpg" },
      { rank: 5, image: "/images/destinations/xian/xian-5.jpg" },
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
