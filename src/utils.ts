export function makeImagePath(id: string, format?: string) {
	return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function selectData(movieDate:string, tvDate:string) {
	if (movieDate !== "") return movieDate;
	return tvDate;
}

export function selecRouteName(routeName:string){
	if (routeName === "" || routeName === "movie") return "movies";
	return routeName; 
}

export function sliderTitleFind(infoName: string) {
	if (infoName === "now") return "Now Playing";
	else if (infoName === "popular") return "Popular";
	else if (infoName === "top") return "Top Rated";
	else if (infoName === "up") return "Up Coming";
	else if (infoName === "on") return "On The Air";
	else if (infoName === "air") return "Airing Today";
	else if (infoName === "top") return "Top Rated";
	return infoName;
}
