import Head from 'next/head';
import { useMemo } from 'react';

import { useTheme } from '@/providers/theme';
import type { FC } from '@/types';
import { unique } from '@/utils/unique';

const defaultLogoImage =
  'https://jahir.dev/static/images/brand/logo-full-me.png';

type MetaImageStyle = 'summary_large_image' | 'summary';
export interface MetaData {
  title: string;
  description: string;
  exactUrl?: string;
  keywords?: string | Array<string> | null;
  siteType?: 'portfolio' | 'website' | 'blog';
  image?: string;
  metaImageStyle?: MetaImageStyle;
}

const mapKeywords = (keywords?: string | Array<string> | null): string => {
  if (!keywords) return '';
  if (Array.isArray(keywords)) {
    return unique(keywords || []).join(', ');
  }
  return keywords;
};

const ColorMeta: FC = () => {
  const { isDark, themeReady } = useTheme();

  const siteColor = useMemo<string>(() => {
    if (!themeReady || !isDark) return '#ebf0fb';
    return '#080f1e';
  }, [themeReady, isDark]);

  return (
    <>
      <meta name={'theme-color'} content={siteColor} />
      <meta name={'msapplication-TileColor'} content={siteColor} />
      <meta name={'msapplication-navbutton-color'} content={siteColor} />
      <meta
        name={'apple-mobile-web-app-status-bar-style'}
        content={siteColor}
      />
    </>
  );
};


export const Seo: FC<MetaData> = (props) => {
  const {
    title,
    description,
    exactUrl = '/',
    keywords: initialKeywords = [],
    siteType = 'website',
    image,
    metaImageStyle = 'summary_large_image',
  } = props;

  const keywords = mapKeywords(initialKeywords);

  return (
    <Head>
      <title>{title}</title>

      <meta name={'title'} content={title} />
      <meta name={'description'} content={description} />
      <meta name={'keywords'} content={keywords} />

      <meta itemProp={'name'} content={title} />
      <meta itemProp={'description'} content={description} />
      <link rel={'canonical'} href={exactUrl} />

      <meta property={'og:title'} content={title} />
      <meta property={'og:type'} content={siteType} />
      <meta property={'og:url'} content={exactUrl} />
      <meta property={'og:description'} content={description} />
      <meta property={'og:site_name'} content={title} />

      <meta property={'twitter:url'} name={'twitter:url'} content={exactUrl} />
      <meta property={'twitter:title'} name={'twitter:title'} content={title} />
      <meta
        property={'twitter:description'}
        name={'twitter:description'}
        content={description}
      />

      <ColorMeta />
    </Head>
  );
};
