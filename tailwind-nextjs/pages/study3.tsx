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
 * 
 * 참고자료
 * https://abangpa1ace.tistory.com/entry/%EC%9E%91%EC%84%B1%EC%A4%91React-Query-2-Queries%EC%BF%BC%EB%A6%AC?category=927152#google_vignette
 * 
 * useMutation()
 * 원격 데이터 소스로 변형(mutation) 요청(ex:RUD 읽기, 업데이트, 삭제 작업)을 보내고
 * 결과 데이터 및 상태 변경을 관리하는 데 사용함, 보통 useMutation()은 사용자 생성 또는 기존 
 * 엔티티 업데이트 등의 데이터 변형 작업을 수행해야 할 때 활용되고 
 * 변형 요청, 캐싱, 데이터의 업데이트를 자동으로 처리함
 * 
 * 기본 형태
 * const { data, isLoading, mutate } = useMutation({ mutationFn, ...options });
 * 
 * useMutation() 첫 번째 인자인 mutationFn 함수는 변형 또는 수정 작업을 수행하는 함수를 나타내고 
 * mutationFn을 전달하여 데이터 생성, 업데이트 또는 삭제 method를 지정할 수 있음
 * 
 * 두 번째 인자인 options은 쿼리에 대한 구성 옵션을 나타냄
 * 
 * 많이 쓰이는 옵션
 * - onMutate: mutation 전에 실행되는 함수로, 미리 렌더링 하고자할 때 유용함, 이 함수가 반환하는 값을 아래 함수들의 context로 사용 가능 하다.
 * - onSuccess: mutation이 성공하고 결과를 전달할 때 실행.
 * - onError:  mutation이 실패했을 시 에러를 전달한다.
 * - onSettled: mutation의 성공/실패 여부와 상관없이 완료됬을 때 실행. 
 * 
 * ex)
 * function AddBlogPost() {
 * const queryClient = useQueryClient();
 * 
 * const mutation = useMutation({ addPost, {
 *   onSuccess: () => {
 *     // 블로그 게시물 목록을 업데이트하기 위해 'posts' 쿼리를 무효화하고 다시 가져온다.
 *     queryClient.invalidateQueries('posts');   
 *   },
 *  }
 * });
 * 
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const { title, body } = e.target.elements;
 *   // 새 블로그 게시물을 추가하기 위해 mutationFn을 호출한다.
 *   mutation.mutate({ title: title.value, body: body.value });
 *   e.target.reset();
 *   // mutate는 useMutation을 조작할 수 있는 속성임, mutate안에는 useMutation의 비동기 함수에 들어갈 인자가 들어갑니다.
 * };
 * 
 * return (
 *   <div>
 *     <h2>Add New Blog Post</h2>
 *     <form onSubmit={handleSubmit}>
 *       <label>
 *         Title:
 *         <input type="text" name="title" required />
 *       </label>
 *       <br />
 *       <label>
 *         Body:
 *         <textarea name="body" required />
 *       </label>
 *       <br />
 *       <button type="submit" disabled={mutation.isLoading}>
 *         {mutation.isLoading ? 'Adding...' : 'Add Post'}
 *       </button>
 *     </form>
 *   </div>
 * );
 * }
 * 
 * queryClient.invalidateQueries()
 * invalidateQueries는 특정 쿼리를 무효화 해주는 메서드임
 * 쿼리를 무효화한다는 것은 무슨 뜻일까 ? 
 * - invalidateQueries 메서드를 통해 특정 쿼리를 무효화하면, 다음과 같은 두 가지 현상이 발생한다.
 * 해당 쿼리의 상태를 stale로 바꾼다. stale된 상태는 useQuery 또는 관련 훅에서 사용 중인 모든 staleTime 구성에 오버라이드한다.
 * - 만약 useQuery 나 관련 훅을 통해 쿼리가 렌더링되고 있다면 백그라운드에서도 refetch한다.
 * => 그래서 invalidQueries 메서드를 이용해 특정 쿼리를 무효화하면, 해당 쿼리의 data를 신선하지 않은
 * 상태로 간주해 이후 data를 fetch 할 때 캐시의 data가 아닌 서버로부터 새로운 data를 받아올 수 
 * 있도록 하는 것임
 * 
 * 참고자료
 * https://hjk329.github.io/react/react-query-query-invalidation/
 * https://velog.io/@minw0_o/tanstack-query-staleTime-invalidQueries%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-data-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC
 */