interface ImportMetaEnv {
    readonly VITE_LAW_SEARCH: string;
    readonly VITE_LAW_LINK: string;
    // 다른 환경 변수를 여기에 추가
  }

interface ImportMeta {
    readonly env: ImportMetaEnv;
  }