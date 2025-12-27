/// <reference types="vite/client" />

interface ImportMeta {
  glob: any;
}

declare module "*?raw" {
  const content: string;
  export default content;
}
