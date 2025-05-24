import { PorscheDesignSystemProvider, PToast } from '@porsche-design-system/components-react/ssr';
import {
  getBrowserSupportFallbackScript,
  getComponentChunkLinks,
  getCookiesFallbackScript,
  getDSRPonyfill,
  getFontLinks,
  getIconLinks,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-react/partials';
import { preload, prefetchDNS } from 'react-dom';
import './globals.css';
import type { Metadata, Viewport } from 'next';

const title = 'COP30 Places Pará';

const { themeColor, appleWebApp, icons } = getMetaTagsAndIconLinks({
  appTitle: title,
  format: 'js',
});

export const viewport: Viewport = {
  themeColor,
};

export const metadata: Metadata = {
  title,
  appleWebApp,
  icons,
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  getFontLinks({ format: 'js' }).forEach(({ href, options }) => preload(href, options));
  getComponentChunkLinks({ components: ['tabs-bar', 'scroller', 'icon'], format: 'js' }).forEach(({ href, options }) =>
    preload(href, options)
  );
  getIconLinks({ format: 'js' }).forEach(({ href }) => prefetchDNS(href));

  return (
    <html lang="pt-BR">
    <body>
    <PorscheDesignSystemProvider>
      {children}
      <PToast />
    </PorscheDesignSystemProvider>
    {getDSRPonyfill({ format: 'jsx' })}
    {getCookiesFallbackScript({ format: 'jsx' })}
    {getBrowserSupportFallbackScript({ format: 'jsx' })}
    </body>
    </html>
  );
}
