import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

// QueryClient 모든 쿼리에 대한 상태및 캐시를 가지고 있는 클래스, react query를 사용하기 위해서는 필수적으로 생성해줘야함
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  <QueryClientProvider client={queryClient}>
    return <Component {...pageProps} />;
  </QueryClientProvider>;
}
