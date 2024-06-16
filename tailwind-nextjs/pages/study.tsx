/**
 * 
React Query ⇒ Tanstack Query (React말고도 다른 프레임 워크도 지원하면서 이름 변경)

사용이유

- 캐싱된 데이터 관리
- 같은 데이터 중복 요청 제거
- out of date된 데이터 빠르게 백 그라운데서 업데이트하고 반영
- pagination, lazy loading등 성능최적화
- 서버 상태의 메모리, garbage collection 관리
- structural sharing기능 사용으로 이전 상태와 새 상태를 비교하며, 가능한 많은 이전 상태를 유지

알아야하는 개념

- staletime: fresh 상태의 데이터(최신상태 데이터)가 stale(오래된 데이터)한 상태의 데이터로 변하기까지 걸리는 시간, 기본값 0
    
    ( 쉽게말해 3초로 설정하면 3초후에 fresh한 데이터는 stale한 오래된 데이터로 변함)
    
- gctime(garbage collection time, 원래 cachetime인데 바뀜) - inactive 상태의 데이터가 사용되지 않을 경우 delete 상태의 데이터로 변하는데 걸리는 시간, 기본값 5분 
(쉽게말해 5분동안 화면에서 사용하지 않으면 delete 데이터 상태가 됨)

Query 데이터 상태 흐름도

- fetching ⇒ fresh ⇒  stale  ⇒ inactive(화면에서 사용되지 않는 데이터) ⇒ delete
  (fetching ~~ stale은 반복)
    

오래된 데이터가 데이터가 없는 것보다 낫다 전략?
 */