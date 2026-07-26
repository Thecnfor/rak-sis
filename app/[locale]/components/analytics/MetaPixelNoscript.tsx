type Props = {
  pixelId: string;
};

export default function MetaPixelNoscript({ pixelId }: Props) {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
