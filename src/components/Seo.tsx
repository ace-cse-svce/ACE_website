import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
}

export default function Seo({ title, description }: SeoProps) {
  const fullTitle = `${title} | ACE`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
