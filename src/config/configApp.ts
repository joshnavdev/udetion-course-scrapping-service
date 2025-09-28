export enum EnvironmentEnum {
  DEV = 'development',
  PROD = 'production',
}

export interface ConfigApp {
  env: EnvironmentEnum;
}

export default (): { app: ConfigApp } => ({
  app: {
    env: (process.env.NODE_ENV as EnvironmentEnum) || EnvironmentEnum.DEV,
  },
});
