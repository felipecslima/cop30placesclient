// src/app/head.tsx
import {
  getInitialStyles,
  getFontFaceStylesheet,
  getFontLinks,
  getComponentChunkLinks,
  getIconLinks,
  getMetaTagsAndIconLinks
} from '@porsche-design-system/components-react/ssr/partials';

export default function Head() {
  return (
    <>
      {getInitialStyles({ format: 'jsx' })}
      {getFontFaceStylesheet({ format: 'jsx' })}
      {getFontLinks({ format: 'jsx' })}
      {getComponentChunkLinks({ format: 'jsx' })}
      {getIconLinks({ format: 'jsx' })}
      {getMetaTagsAndIconLinks({ appTitle: 'COP30 Places Pará', format: 'jsx' })}
    </>
  );
}
