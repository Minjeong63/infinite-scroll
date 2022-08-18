/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useLocalStorage from "use-local-storage";
import { useObserver } from "../lib/hooks/useObserver";
import style from "../styles/pokemon.module.scss";

const PokemonCard = ({ id, name }) => {
  const target = useRef(null);
  // useRef : 리렌더링 하지 않음, 컴포넌트의 속성만 조회 & 수정함
  // useRef() 를 사용할 때?
  // 1. 컴포넌트에 focus를 위치시킬 필요가 있는 경우
  // 2. 속성 값을 초기화(clear)할 필요가 있는 경우
  // 3. useRef로 컴포넌트 안의 변수 관리하기(컴포넌트의 속성 정보를 조회 & 수정할 때 & 리렌더링 하지 않으면서)

  const [visible, setVisible] = useState(false);

  const [scrollY, setScrollY] = useLocalStorage("poke_list_scroll", 0);
  // npm i use-local-storage
  // yarn add use-local-storage
  // typescript 사용법 : useLocalStorage<string>("name")
  // useLocalStorage(key, value)

  const onIntersect = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <Link href={`/pokemon/${id}`} key={name}>
      <a
        className={style.pokemon_item}
        ref={target}
        onClick={() => setScrollY(window.scrollY)}
      >
        {visible && (
          <>
            <LazyLoadImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name}
            />
            <div className={style.item}>
              <div className={style.info_box}>
                <p className={style.label}>ID</p>
                <p className={style.info}>{id}</p>
              </div>
              <div className={style.info_box}>
                <p className={style.label}>name</p>
                <p className={style.info}>{name}</p>
              </div>
            </div>
          </>
        )}
      </a>
    </Link>
  );
};

export default PokemonCard;
