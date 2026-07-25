// Metadata-only destination catalog. All text content (title, overview,
// spot titles/subtitles/descriptions/notes/closings) lives in
// messages/<locale>.json under `Destinations.<slug>`. This file holds only
// the structural metadata needed to render pages and iterate spots.

export type SpotMeta = {
  rank: number;
  image: string;
};

export type DestinationMeta = {
  slug: string;
  ctaBg: string;
  spots: SpotMeta[];
};

export const DESTINATIONS: Record<string, DestinationMeta> = {
  chongqing: {
    slug: "chongqing",
    ctaBg: "/images/02_Tianmen_Mountain_National_Forest_Park.jpg",
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
    spots: [
      { rank: 1, image: "/images/xian-1.jpg" },
      { rank: 2, image: "/images/xian-2.jpg" },
      { rank: 3, image: "/images/xian-3.jpg" },
      { rank: 4, image: "/images/xian-4.jpg" },
      { rank: 5, image: "/images/xian-5.jpg" },
    ],
  },
};