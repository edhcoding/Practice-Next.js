/**
 * isLoading, isFetching 차이점
 * isLoading, isFetching은 데이터의 로드 상태를 나타내는데 사용됨
 * 
 * isLoading은 쿼리가 현제 데이터를 가지고 오고 있는지 여부를 boolean 값으로 반환함
 * ex)
 * import { useQuery } from 'react-query';
 * 
 * function ExampleComponent() {
 *  const { data, isLoading, error } = useQuery('exampleData', fetchData);
 *  if (isLoading) {
 *    return <div>Loading...</div>;
 *  }
 *  if (error) {
 *    return <div>Error: {error.message}</div>;
 *  }
 *  return <div>Data: {data}</div>;
 * }
 * 
 * 반면에
 * isFetching은 react query에서 전역으로 사용할 수 있는 속서임, 애플리케이션의 쿼리가
 * 현재 데이터를 가져오고 있는지 여부를 나타냄
 * 
 * queryClient의 isFetching메서드를 이용해서 현재 데이터를 가져오는 쿼리가 있는지 확인함
 * ex)
 * import { useQueryClient } from 'react-query';
 * 
 * function ExampleComponent() {
 *  const queryClient = useQueryClient();
 *  const isAnyQueryFetching = queryClient.isFetching();
 * 
 *  return <div>{isAnyQueryFetching ? 'Fetching data...' : 'Data loaded'}</div>;
 *  데이터를 가져오고 있는지 또는 로드가 완료되었는지를 나타내는 메시지를 조건부로 렌더링하는 데
 *  사용할 수 있는 boolean 값을 반환한다.
 * }
 * 
 * 정리
 * isLoading은 react query에서 쿼리 수준에서 사용되는 속성이고 특정 쿼리가 현재 데이터를 가져오고 있는지
 * 여부를 나타내고 특정 쿼리에 대한 로드 상태를 조건부로 처리할 수 있음
 * isFetching은 react query에서 전역 수준에서 사용할 수 있는 메서드임, 애플리케이션의 쿼리가 현재
 * 데이터를 가져오고 있는지 여부를 나타내고 여러 쿼리에서 가져오는 데이터의 전체 로드 상태를 결정하는 방법을 제공함
 * 
 * useQuery()
 * useQuery() 훅은 원격 데이터 소스(ex: API 엔드포인트)에서 데이터를 가져와 애플리케이션의 상태에서 관리하는 데 사용함 
 * 일반적으로 useQuery는 서버에서 데이터를 가져와 애플리케이션에서 표시해야 할 때 활용되고 
 * 데이터 가져오기, 캐싱, 데이터의 업데이트를 자동으로 처리함
 * 
 * 기본 형태
 * const { isLoading, error, data } = useQuery({ ['test'], queryFn, ...options });
 * 
 * 기본적으로 많이 사용하는 옵션
 * - enable: 데이터 자동패치 여부. 기본값은 true.
 * - retry : 데이터 재요청 여부 및 횟수. 기본값은 false이며, true의 기본 재요청 횟수는 3회.
 * - retryNumber: 재요청까지 대기시간을 설정 가능. 기본값은 0.
 * - staleTime : 데이터가 fresh 상태로 유지되는 시간. 설정시간이 지나면 stale이 되며, 기본값은 0.
 * - cacheTime : inactive 상태인 캐시 데이터가 메모리에 남아있는 시간. 해당 시간이 초과되면 가비지 컬렉터에 의해 메모리에서 제거되며, 기본값은 5분. (브라우저의 캐시 비우기와 연관됨)
 * - refetchOnMount, refetchOnWindowFocus, refetchOnReconnect: 쿼리가 stale 상태인 경우에 각각 
 *   마운트 시, 브라우저 창 포커싱 시, 네트워크 연결 시 refetch 실행여부이다. 기본값은 true.
 * - refetchInterval : refetch가 발생하는 간격을 설정. 기본값은 false.
 * - onSuccess() : 데이터 fetch 성공 시 실행되는 콜백. 매개변수는 response 데이터가 들어있다.
 * - onError() : 데이터 fetch 실패 시 실행되는 콜백. 매개변수는 Error 정보가 들어있다.
 * - onSettled() : 데이터 fetch 완료 시 실행되는 콜백. 성공/실패 여부와 상관없이 실행.
 */