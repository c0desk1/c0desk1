// src/lib/mdx/satteri-external-link.ts
import { defineHastPlugin } from 'satteri';

export interface LinkOptions {
  siteUrl?: string;
}

export const satteriExternalLink = (options: LinkOptions = {}) => {
  return defineHastPlugin({
    name: 'satteri-external-link',
    
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        
        if (typeof href !== 'string') return;

        const isHttp = href.startsWith('http://') || href.startsWith('https://');
        
        let isExternal = isHttp;
        if (isHttp && options.siteUrl) {
          isExternal = !href.startsWith(options.siteUrl);
        }

        const currentClasses = node.properties?.className || [];
        const classArray = Array.isArray(currentClasses) ? currentClasses : [currentClasses];
        
        const newClasses = [...classArray, 'inline-link'];

        if (isExternal) {
          newClasses.push('is-external');
          
          ctx.setProperty(node, 'target', '_blank');
          ctx.setProperty(node, 'rel', 'nofollow noopener noreferrer');
        }

        ctx.setProperty(node, 'className', newClasses);
      }
    }
  });
};
