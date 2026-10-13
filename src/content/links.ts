export const LINKEDIN_URL = "https://linkedin.com/in/s34nj0hnson/";
export const PLATFORM_REPO_URL = "https://github.com/s34nj0hn/k8s-platform-reference";
export const PORTFOLIO_REPO_URL = "https://github.com/s34nj0hn/portfolio";

export function platformPath(path: string): string {
  return `${PLATFORM_REPO_URL}/tree/main/${path}`;
}
