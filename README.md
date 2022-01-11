배포 사이트 : https://gjeon03.github.io/kimchiflix

# 설명

최신, 인기 등의 영화 및 티비쇼를 보여주는 웹 사이트 입니다.

framer-motion을 사용해 다양한 애니메이션을 경험해보고 react&typescript에 더 익숙해 지고자 만들었습니다.

# 사용한 기술

## typescript

전부터 react와 typescript는 궁합이 잘맞고 jsvascript의 불친절함을 보완해준다는 글을 많이 봐와서 사용해보았습니다.

## styled-components

전체적인 스타일을 CSS 커스텀 컴포넌트를 만들어 사용하고 ThemeProvider로 중복되는 컬러를 등록해서 사용

## react-helmet-async

header의 title을 바꾸기 위해 사용하였습니다.

## recoil

framer-motion 을 사용하여 layoutId 를 주어 슬라이더 이미지에서 자연스럽게 디테일 화면으로 커지게 하였는데 여러 슬라이더 이미지에서 해당하는 layoutId 만 디테일로 보내기 위해 사용하였습니다.

## framer-motion

- 슬라이더
  - 메인 페이지의 영화, Movie, TvShow, Search 페이지의 슬라이더를 표현
- 스크롤을 내렸을때 헤더의 색이 변경
  - useAnimation을 사용하여 스크롤 위치에 따라 animation이 바뀌게 하였습니다.
  - useViewportScroll 을 사용하여 스크롤의 위치를 추출
- svg 파일 애니메이션
  - 헤더의 카메라 로고를 motion을 사용해 색이 깜빡이는 애니메이션
- 슬라이더에서 이미지 클릭시 디테일로 자연스럽게 넘어가기
  - layoutId를 사용하여 자연스럽게 이어짐

motion의 variants 오브젝트를 넘겨주고 string으로 initial, transition, whileHover 등과 같은 애니메이션을 좀 더 편리하게 관리하고 사용하는것을 배우게 되었습니다.

## react-hook-form

header search의 form을 구현함.

```tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Header() {
	...
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<IForm>();
	const onValid = (data: IForm) => {
		navigate(`/search?keyword=${data.keyword}`);
	};
	return (
		...
		<Search onSubmit={handleSubmit(onValid)}>
			<Input
				{...register("keyword", { required: true, minLength: 2 })}
				animate={inputAnimation}
				initial={{ scaleX: 0 }}
				transition={{ type: "linear" }}
				placeholder="Search for movie or tv show..."
			/>
		</Search>
		...
	);
}
```

## gh-pages

gh-pages를 사용하여 프로젝트를 호스팅

# 어려웠던 점

- framer-motion 사용
  documentation을 보고 예시도 보며 사용은 하였지만, 애니메이션 자체에 대한 지식이 부족해 활용이 어려웠습니다.(애니메이션에 따라 z-index변화)
- search에서의 디테일 화면
  슬라이더 이미지 클릭시 디테일 화면이 뜨면서 하단에 유사 영화 또는 티비쇼가 뜨고 이걸 클릭할시 해당 정보로 바뀌게 하였는데 Detail 컴포넌트를 하나로 사용했을때 movie, tvShow, search 경로로 들어올때 각각 원하는 정보를 보여주는게 잘 안되어 컴포넌트를 movie,tvShow 둘로 나눠서 나타내었습니다.

# 보완할 점

- 사이트 최적화
  - 여러 이미지들과 라이브러리를 불어오다 보니 사이트가 많이 느린 느낌을 받아 react 최적화의 중요성을 느꼈습니다.
- 디테일 화면에서 슬라이더로 들어갈때 슬라이더 이미지가 더 앞으로 오는 현상
  - 애니메이션 마다 z-index를 사용하여 보완을 하려고 했는데 디테일에서 슬라이더 이미지로 들어갈때 어떤 방식을 사용해야될지 막혀 보완하지 못했습니다.
- 비동기 요청을 Axios로 바꾸기
  - 비동기 요청의 경우 fetch를 사용하였는데 JavaScript의 내장 라이브러리이고 쓰기에 친숙하여 사용하였는데, React를 사용할 때 Axios를 더 선호하는 편이라고 한다.
  - 이유는 fetch는 axios에 비해 브라우저 호환성이 상대적으로 떨어지고 기능이 부족하기 때문이다.
