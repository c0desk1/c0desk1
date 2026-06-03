// src/components/ui/icons/IconReact.tsx
import { ICONS, type IconName, type IconData } from './index';

interface Props {
  name: IconName;
  className?: string;
  size?: number | string;
  strokeWidth?: string | number;
  viewBox?: string; 
}

export default function IconReact({ 
  name, 
  className = "w-5 h-5", 
  size = 24,
  strokeWidth = "2",
  viewBox 
}: Props) {
  const iconData: IconData = ICONS[name] || ICONS['system']; 
  const isString = typeof iconData === 'string';

  const svgContent = isString ? iconData : iconData.body;
  const finalViewBox = viewBox || (isString ? "0 0 24 24" : (iconData.viewBox || "0 0 24 24"));
  
  const finalLinecap = isString ? "round" : (iconData.strokeLinecap || "round");
  const finalLinejoin = isString ? "round" : (iconData.strokeLinejoin || "round");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={finalViewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap={finalLinecap as any}
      strokeLinejoin={finalLinejoin as any}
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}