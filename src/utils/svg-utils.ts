import fs from 'fs';
import path from 'path';
import { parseSync } from 'svgson';

// Define types for SVG elements
interface SvgElement {
  name: string;
  type: string;
  value?: string;
  attributes: {
    id?: string;
    d?: string;
    [key: string]: string | undefined;
  };
  children: SvgElement[];
}

// Region ID mappings - map region slugs to the country IDs in the SVG
const REGION_MAPPINGS: Record<string, string[]> = {
  'north-america': ['US', 'CA', 'MX'],
  'south-america': ['BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'UY', 'BO', 'PY', 'GY', 'SR', 'GF'],
  'europe': ['GB', 'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE', 'CH', 'AT', 'SE', 'DK', 'NO', 'FI', 'IE', 'PL', 'RO', 'BG', 'GR', 'CZ', 'HU', 'SK', 'LT', 'LV', 'EE', 'HR', 'SI', 'RS', 'ME', 'MK', 'AL', 'BA', 'XK', 'UA', 'BY', 'MD', 'LU', 'MT', 'CY', 'IS'],
  'asia': ['CN', 'JP', 'KR', 'IN', 'ID', 'TH', 'MY', 'SG', 'PH', 'VN', 'MM', 'LA', 'KH', 'TW', 'LK', 'NP', 'BD', 'PK', 'AF', 'KZ', 'UZ', 'TM', 'KG', 'TJ', 'MN', 'BN', 'BT'],
  'middle-east': ['TR', 'IR', 'IQ', 'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'SY', 'JO', 'LB', 'IL', 'PS'],
  'africa': ['ZA', 'EG', 'NG', 'DZ', 'MA', 'TN', 'LY', 'GH', 'CI', 'KE', 'TZ', 'ET', 'UG', 'RW', 'MZ', 'AO', 'NA', 'BW', 'ZM', 'ZW', 'CD', 'CG', 'CM', 'GA', 'TD', 'CF', 'SD', 'SS', 'ER', 'DJ', 'SO', 'MG', 'MU', 'SN', 'ML', 'NE', 'BF', 'GN', 'BJ', 'TG', 'LR', 'SL', 'GM', 'GW', 'CV', 'MR', 'EH'],
  'oceania': ['AU', 'NZ', 'PG', 'FJ', 'SB', 'VU', 'WS', 'TO', 'FM', 'MH', 'PW', 'NR', 'KI', 'TV']
};

// Fixed viewBox values by region for better display
const REGION_VIEWBOXES: Record<string, string> = {
  'north-america': '-170 0 120 100',
  'south-america': '-120 -60 80 90',
  'europe': '0 25 50 40',
  'asia': '60 0 100 80',
  'middle-east': '30 10 50 50',
  'africa': '0 -40 60 80',
  'oceania': '100 -60 80 60'
};

/**
 * Extract SVG paths for a specific region from the world map
 */
export function extractRegionSvg(region: string): string {
  try {
    // For debugging - if no SVG is showing, use a simple circle
    if (process.env.NODE_ENV === 'development') {
      console.log(`Extracting SVG for region: ${region}`);
    }

    // Fallback to a simple circle SVG if there's an issue with extraction
    const fallbackSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="40" fill="currentColor" />
      </svg>
    `;

    // Path to the world map SVG
    const svgPath = path.join(process.cwd(), 'public', 'images', 'world-map.svg');
    
    // Check if file exists
    if (!fs.existsSync(svgPath)) {
      console.error('SVG file not found');
      return fallbackSvg;
    }
    
    // Read the SVG file
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Parse the SVG
    const svgData = parseSync(svgContent);
    
    // Get the country IDs for the region
    const countryIds = REGION_MAPPINGS[region] || [];
    if (countryIds.length === 0) {
      console.error(`No country IDs found for region: ${region}`);
      return fallbackSvg;
    }
    
    // Find all path elements that have an ID in the countryIds array
    const pathElements = svgData.children
      .filter((element: SvgElement) => 
        element.name === 'path' && 
        element.attributes.id && 
        countryIds.includes(element.attributes.id)
      );
    
    if (pathElements.length === 0) {
      console.error(`No path elements found for region: ${region}`);
      return fallbackSvg;
    }
    
    // Log how many paths were found for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`Found ${pathElements.length} path elements for region: ${region}`);
    }
    
    // Use region-specific viewBox for better display
    const viewBox = REGION_VIEWBOXES[region] || '-180 -90 360 180';
    
    // Generate a new SVG containing only the region paths
    const regionSvg = `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="${viewBox}"
        width="100%" 
        height="100%"
        style="fill: currentColor; stroke: white; stroke-width: 0.2;"
        preserveAspectRatio="xMidYMid meet">
        ${pathElements.map((path: SvgElement) => `<path d="${path.attributes.d}" />`).join('\n')}
      </svg>
    `;
    
    return regionSvg.trim();
  } catch (error) {
    console.error('Error extracting region SVG:', error);
    
    // Return a simple circle as fallback
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="40" fill="currentColor" />
      </svg>
    `;
  }
} 