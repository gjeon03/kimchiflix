import { atom} from "recoil";

export const layoutIdState = atom({
	key: "layoutId",
	default: "",
})

export const movieIndex = atom({
	key: "movieIndex",
	default: 0,
})

export const tvIndex = atom({
	key: "tvIndex",
	default: 0,
})