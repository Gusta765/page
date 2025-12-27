/**
 * Simple YAML parser for project data
 * This is a basic implementation to parse the specific YAML structure in this project
 */

export interface ProjectData {
  title: string;
  description: string;
  imagem: string;
  colab?: string;
  tags?: string[];
}

export interface ProfileData {
  minha_foto: string;
}

export interface YAMLData {
  Painel_Estoque_por_lote: ProjectData;
  Painel_Vendas_Tempo_Real: ProjectData;
  Painel_Logistica: ProjectData;
  Painel_Cesta_de_Compras: ProjectData;
  Teste_AB_CTR_Pagina_Inicial?: ProjectData;
  Pipeline_ETL_Produtos?: ProjectData;
  EU: ProfileData;
}

 const imageUrlMap = import.meta.glob("../../images/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

/**
 * Parses YAML content from a string
 * This is a simplified parser for our specific YAML structure
 */
export async function parseYAMLFile(filePath: string): Promise<YAMLData> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load YAML file: ${response.statusText}`);
    }
    
    const content = await response.text();
    return parseYAMLContent(content);
  } catch (error) {
    console.error("Error loading YAML file:", error);
    throw error;
  }
}

/**
 * Parse YAML content string into structured data
 */
export function parseYAMLContent(content: string): YAMLData {
  const lines = content.split('\n');
  
  const result: any = {};
  let currentKey: string | null = null;
  let currentObj: any = {};
  let currentSubKey: string | null = null;
  let multilineValue: string | null = null;
  
  for (let originalLine of lines) {
    const line = originalLine.trim();
    
    // Skip empty lines
    if (!line) continue;

    if (multilineValue !== null && currentSubKey) {
      const looksLikeNewKey = /^[A-Za-z0-9_]+:/.test(line);
      if (!looksLikeNewKey) {
        multilineValue += (multilineValue ? ' ' : '') + line;
        currentObj[currentSubKey] = multilineValue;
        continue;
      }

      multilineValue = null;
      currentSubKey = null;
    }
    
    // Check for main section (top-level key)
    if (!originalLine.startsWith(' ') && line.endsWith(':')) {
      // Save previous object if exists
      if (currentKey) {
        result[currentKey] = currentObj;
      }
      
      // Start new section
      currentKey = line.slice(0, -1);
      currentObj = {};
      currentSubKey = null;
      multilineValue = null;
      continue;
    }
    
    // Handle properties (sub-keys)
    if (line.includes(':') && multilineValue === null) {
      const colonIndex = line.indexOf(':');
      currentSubKey = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1); // Remove quotes
        currentObj[currentSubKey] = value;
        currentSubKey = null;
      } 
      // Handle multiline indicator
      else if (value === '>') {
        multilineValue = '';
      }
      // Handle normal values
      else if (value) {
        currentObj[currentSubKey] = value;
        currentSubKey = null;
      }
      continue;
    }
    
    // Handle multiline content
    if (multilineValue !== null && currentSubKey) {
      multilineValue += (multilineValue ? ' ' : '') + line;
      currentObj[currentSubKey] = multilineValue;
    }
  }
  
  // Save the last object
  if (currentKey) {
    result[currentKey] = currentObj;
  }
  
  return result as YAMLData;
}

/**
 * Get all projects from YAML data
 */
export function getAllProjects(yamlData: YAMLData): { id: string; project: ProjectData }[] {
  const projects = [];
  
  if (yamlData.Painel_Estoque_por_lote) {
    projects.push({ 
      id: 'painel-estoque-por-lote',
      project: {
        ...yamlData.Painel_Estoque_por_lote,
        tags: ['Power BI', 'Estoque', 'Análise de Dados']
      }
    });
  }
  
  if (yamlData.Painel_Vendas_Tempo_Real) {
    projects.push({ 
      id: 'painel-vendas-tempo-real',
      project: {
        ...yamlData.Painel_Vendas_Tempo_Real,
        tags: ['Power BI', 'Vendas', 'Tempo Real']
      }
    });
  }
  
  if (yamlData.Painel_Logistica) {
    projects.push({ 
      id: 'painel-logistica',
      project: {
        ...yamlData.Painel_Logistica,
        tags: ['Power BI', 'Logística', 'Eficiência']
      }
    });
  }
  
  if (yamlData.Painel_Cesta_de_Compras) {
    projects.push({ 
      id: 'painel-cesta-de-compras',
      project: {
        ...yamlData.Painel_Cesta_de_Compras,
        tags: ['Power BI', 'Apriori', 'Machine Learning']
      }
    });
  }

  if (yamlData.Teste_AB_CTR_Pagina_Inicial) {
    projects.push({
      id: 'teste-ab-ctr-home',
      project: {
        ...yamlData.Teste_AB_CTR_Pagina_Inicial,
        tags: ['Experimentação', 'A/B Test', 'Estatística', 'CUPED', 'Bayes']
      }
    });
  }

  if (yamlData.Pipeline_ETL_Produtos) {
    projects.push({
      id: 'etl-pipeline-produtos',
      project: {
        ...yamlData.Pipeline_ETL_Produtos,
        tags: ['Python', 'ETL', 'Levenshtein', 'Qualidade Cadastral']
      }
    });
  }
  
  return projects;
}

/**
 * Get profile data
 */
export function getProfileData(yamlData: YAMLData): ProfileData | null {
  return yamlData.EU || null;
}

/**
 * Convert Windows path to web path
 */
export function convertToWebPath(windowsPath: string): string {
  if (!windowsPath) return windowsPath;
  if (windowsPath.startsWith('/') || /^https?:\/\//i.test(windowsPath)) return windowsPath;

  // Extract just the filename from the path
  const parts = windowsPath.split(/\\|\//);
  const filename = parts[parts.length - 1];

  const matchKey = Object.keys(imageUrlMap).find((p) => p.endsWith(`/${filename}`) || p.endsWith(`\\${filename}`));
  if (matchKey) return imageUrlMap[matchKey];

  return `/images/${filename}`;
}
