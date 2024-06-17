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
 */