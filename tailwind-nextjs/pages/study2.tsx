/** 
 * QueryClient
 * - 모든 쿼리에 대한 상태 및 캐시를 가지고 있는 클래스, react query를 사용하기 위해서는 필수적으로 생성해줘야함
 * 
 * ex)
 * const query = new QueryClient(); 쿼리클라이언트 선언
 * 
 * export default function App({ Component, pageProps }: AppProps) {
 * <QueryClientProvider client={queryClient}> props로 queryClient를 전달해주면
 *   return <Component {...pageProps} />; 하위 컴포넌트에서 접근가능함
 * </QueryClientProvider>;
 * }
 * 
 * 
 * QueryClient에서는 전역적으로 옵션을 설정할 수 있음
 * queries, mutations 옵션을 설정할 수 있는데 이 두 가지 개념이 react query에서 중요한 개념임
 * 
 * ex)
 * export const queryClient = new QueryClient({
 *  defaultOptions: {
 *    queries: {
 *      staleTime: 1000 * 60,
 *      retry: 1,
 *    }
 *    mutations: {
 *      retry: 1,
 *    }
 *  }
 * });
 */