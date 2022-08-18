// Web API 중 Intersection Observer API
import { useLayoutEffect } from "react";

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  // default : null, 브라우저의 viewpoint
  // 교차 영역의 기준이 될 root 엘리먼트
  // observe의 대상으로 등록할 엘리먼트는 반드시 root의 하위 엘리먼트여야 함

  rootMargin = "0px",
  // default : '0px 0px 0px 0px'
  // root 엘리먼트의 마진값
  // css에서 margin을 사용하는 방법으로 선언할 수 있고, 축약도 가능
  // px과 %로 표현할 수 있음
  // rootMargin 값에 따라 교차 영역이 확장 또는 축소됨

  threshold = 1.0,
  // default : 0
  // 0.0부터 1.0사이의 숫자 혹은 이 숫자들로 이루어진 배열로, 타겟 엘리먼트에 대한 교차 영역 비율을 의미
  // 0.0의 경우 타겟 엘리먼트가 교차영역에 진입했을 시점에 observer를 실행하는 것을 의미하고
  // 1.0의 경우 타겟 엘리먼트 전체가 교차영역에 들어왔을 때 observer를 실행하는 것을 의미
}) => {
  useLayoutEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current ?? target);
    }

    return () => observer && observer.disconnect();
  }, [target, root, rootMargin, threshold]);
};

// IntersectionObserver.observe(targetElement) : 타겟 엘리먼트에 대한 IntersectionObserver를 등록할 때 (관찰을 시작할 때) 사용함
// IntersectionObserver.unobserve(targetElement) : 타겟 엘리먼트에 대한 관찰을 멈추고 싶을 때 사용하면 됨, 예를 들어 Lazy-Loading을 할 때는 한 번 처리를 한 후에 관찰을 멈춰도 됨, 이 경우에는 처리를 한 후 해당 엘리먼트에 대해 unobserve(targetElement) 를 실행하면 이 엘리먼트에 대한 관찰만 멈출 수 있음
// IntersectionObserver.disconnect() : 다수의 엘리먼트를 관찰하고 있을 때, 이에 대한 모든 관찰을 멈추고 싶을 때 사용하면 됨
// IntersectionObserver.takerecords() : IntersectionObserverEntry 객체의 배열을 리턴

// Properties
// 사각형의 크기를 반환하는 속성
// IntersectionObserverEntry.boundingClientRect : 타겟 엘리먼트의 정보를 반환함
// IntersectionObserverEntry.rootBounds : root 엘리먼트의 정보를 반환함, root를 선언하지 않았을 경우 null을 반환함
// IntersectionObserverEntry.intersectionRect : 교차된 영역의 정보를 반환함

// 유용한 정보를 반환하는 속성
// IntersectionObserverEntry.intersectionRatio : IntersectionObserver 생성자의 options의 threshold와 비슷함, 교차 영역에 타겟 엘리먼트가 얼마나 교차되어 있는지(비율)에 대한 정보를 반환함, threshold와 같이 0.0부터 1.0사이의 값을 반환함
// IntersectionObserverEntry.isIntersecting : 타겟 엘리먼트가 교차 영역에 있는 동안 true를 반환하고, 그 외의 경우 false를 반환함
// IntersectionObserverEntry.target : 타겟 엘리먼트를 반환함
// IntersectionObserverEntry.time : 교차가 기록된 시간을 반환함
