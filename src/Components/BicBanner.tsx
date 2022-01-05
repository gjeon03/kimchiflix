import { IApiData } from "../types";
import { makeImagePath, selectData } from "../utils";
import {
	Banner,
	Title,
	Overview,
	MovieInfo
} from "../Styles/bicBanner";

interface IProps {
	data?: IApiData,
};

function BicBanner({ data }: IProps) {
	return (
		<Banner
			bgPhoto={makeImagePath(data?.backdrop_path || "")}
		>
			<Title>{selectData(data?.title || "", data?.name || "")}</Title>
			<MovieInfo>
				<span>{selectData(data?.release_date || "", data?.first_air_date || "")}</span>
				<span>⭐️ {data?.vote_average} / 10</span>
			</MovieInfo>
			<Overview>{data?.overview}</Overview>
		</Banner>
	);
}

export default BicBanner;