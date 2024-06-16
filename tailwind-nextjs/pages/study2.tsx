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
 *
 *
 * query
 * - 비동기적 데이터의 선언적 의존성이라는 의미로 공식문서에서 소개하고있음
 * - 쉽게 말하면 서버에서 데이터를 받아올 때 사용하는 기능임
 *
 * ex) useQuery를 사용함으로써 query기능을 사용할 수 있음
 * import { useQuery } from "@tanstack/react-query";
 *
 * const query = useQuery({
 *  queryKey: ["todo"],
 *  queryFn: fetchTodo,
 * })
 * !!! 주의할 점은 v5 버전부터는 인자를 객체 형태로 전달해줘야함
 * 과거)
 * useQuery(key, fn, options);
 * 현재)
 * useQuery({ queryKey, queryFn, ...options })
 * queryKey, queryFn는 필수옵션임
 *
 *
 * queryKey
 * - 캐시를 관리하기 위한 키값으로 배열형태로 사용, 타입 ReadonlyArray<unknown>
 * - string 형태로 해쉬해 key와 data를 mapping 시켜 관리
 * hashing(해싱을 사용하는 이유는 queryKey가 단순 문자열이 아니라 객체나 배열 등 복잡한 구조일 수 있기 때문임
 * 해시 함수를 이용하면 이러한 복잡한 구조의 데이터를 고정된 크기의 고유한 값으로 변환할 수 있어 비교와 검색이 더 효율적임)
 *
 * queryFn
 * - promise를 반환하는 함수임(fetch, axios, ...)
 * - 데이터를 resolve하고 error를 던지는 역할을 함
 *
 * queries 옵션 (엄청많음)
 * - enabled: 자동으로 query를 실행할지 여부를 결정하는 옵션, 기본값 true
 * - retry: query 동작 실패 시, 자동으로 몇번 만큼 retry를 시도할지 결정하는 옵션, 기본값 3
 * - select: response 값에서 필요한 값만을 추출할 수 있도록 하는 옵션 (이 옵션 사용하면 코드를 조금 더 간결하게 작성 가능)
 *   ex) {select: data => {id: data.id, data: data.data}}
 * - refetchInterval: 주기적으로 refetch 하는 간격을 설정하는 옵션
 * - throwOnError: error boundary로 에러를 전파할 지 결정하는 옵션, true값으로 설정 시 error boundary사용가능
 *
 * 결론: query는 data와 error를 반환함
 * queries 반환값
 * - data: 마지막으로 resolved된 데이터
 * - error: 에러가 발생했을때 반환하는 에러 객체
 * 유용하게 사용할 수 있는 옵션
 * - isLoading: 최초 fetch가 in-flight 상태일때 true값을 반환
 * - isFetching: fetch가 실행될 때마다 true값을 반환
 * 둘이 비슷한데 조금 다름
 * - 캐시가 존재하냐 아니냐 차이 isFetching은 존재하고 isLoading은 존재하기도 안하기도함
 *
 * mutations
 * - CRUD중에서 RUD에 해당하는 기능, 즉 서버의 데이터를 수정할 때 사용하는 기능임
 *
 * ex) useMutation함수를 선언함으로써 mutations기능을 사용할 수 있음
 * import { useMutation } from "@tanstack/react-query"
 *
 * const query = useMutation({
 *  queryFn: fetchTodo             // useMutation에서의 필수값으로는 queryKey값이 안들어감
 * });
 *
 * mutaions 옵션
 * - onMutate: mutate함수가 실행되기전에 실행되는 함수로 optimistic update에 유용하게 사용할 수 있음
 *
 * mutations 반환값
 * - mutate: mutation함수를 실행시키는 함수
 *
 * v5에 추가된 중요한 기능
 * useSuspenseQuery
 * - React의 suspense for Data Fetching API을 사용하기 위한 hook
 * 여기서 suspense는 데이터를 불러오는 동안 fallback ui를 대신 보여주는 기능
 *
 * 과거에는 useQuery의 suspense옵션을 적용하면서 사용했었음
 * ex)
 * const { data } = useQuery({
 *  queryKey,
 *  queryFn,
 *  suspense: true,
 * }) 하지만 데이터 값에는 항상 성공하는데 undefined 타입도 같이 반환한다는 문제점이 있었음
 *
 * 현재는 useSuspenseQuery를 사용함으로써 데이터 타입을 보장할 수 있게됨
 * ex)
 * const query = useSuspenseQuery({...});
 * suspense기능을 사용하는 것 외에는 전부 동일한데 query와는 다르게 enabled, placeholderData옵션을 사용할 수 없다는 차이점있음
 * 또한 throwOnError 값을 기본으로 지정할 수 없으며 만약에 반환되는 데이터가 없을 시 자동으로 error boundary로 error를 전파함
 * 
 * React Query는 데이터를 어떻게 저장할 까?
 * context를 사용하기 때문임, context API를 사용하기 때문에 useClientProvider 하위에 써놓은 query들을 서로 공유해서 사용할 수 있는거임
 * 좀 더 자세히 알아보자면 컴포넌트에서 useQuery가 실행되면 생성된 query instance와 함께 키 값으로 매핑시키는 과정을 거침
 * 그리고 fetch된 데이터를 query 객체 내부에 저장함으로써 캐시를 관리하게 됨
 * context를 사용하기 때문에 저장된 캐쉬값은 다른 컴포넌트에서 사용할 수 있음
 */
