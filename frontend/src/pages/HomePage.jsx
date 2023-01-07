import { useSelector } from "react-redux";
import HomePageLeftFrame from "../components/homepage/left_frame/HomePageLeftFrame";
import HomePageMiddleFrame from "../components/homepage/middle_frame/HomePageMiddleFrame";
import HomePageMiddleFrameAlternative from "../components/homepage/middle_frame/HomePageMiddleFrameAlternative";
import "./homepage.css";

const HomePage2 = () => {
	const { selectedChannel } = useSelector((state) => state.channel);

	return (
		<div className="homepage">
			<div className="homepage-container">
				<HomePageLeftFrame />
				{selectedChannel ? (
					<HomePageMiddleFrame />
				) : (
					<HomePageMiddleFrameAlternative />
				)}

				{/* NOT IMPLEMENTED */}
				{/* <div className="homepage-right-frame-container">
                </div> */}
			</div>
		</div>
	);
};

export default HomePage2;
