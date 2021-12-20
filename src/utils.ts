import { tmpdir } from "os";

export function makeImagePath(id: string, format?: string) {
	return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function sliderTitleFind(infoName: string) {
	let title;
	switch (infoName) {
		case "now":
			title = "Now Playing";
			break;
		case "popular":
			title = "Popular";
			break;
		case "top":
			title = "Top Rated";
			break;
		case "up":
			title = "Up Coming";
			break;
	}
	return title;
}