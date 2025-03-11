export function getSourceLogo(source: string = '') {
  const sourceLower = source.toLowerCase();
  if (sourceLower.includes('ul') || sourceLower.includes('underwriters')) {
    return '/images/logos/ul-logo.png';
  }
  if (sourceLower.includes('compliance') || sourceLower.includes('incompliance')) {
    return '/images/logos/incompliance-logo.png';
  }
  return null;
} 