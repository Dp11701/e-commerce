declare const google: any;

declare global {
  interface Window {
    google: any;
  }
}
interface LoginPageProps {
  handleLogin: () => void;
}
