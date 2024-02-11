const dotEnvs = import.meta.env;

export const ENV: {
  BASE_API: string;
} = {
  BASE_API: dotEnvs.VITE_BASE_API as string,
};
