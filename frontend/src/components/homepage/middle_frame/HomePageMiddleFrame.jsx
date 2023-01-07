import MiddleFrameBody from "./MiddleFrameBody";
import MiddleFrameFooter from "./MiddleFrameFooter";
import MiddleFrameHeader from "./MiddleFrameHeader";
import "./homepagemiddleframe.css";

const HomePageMiddleFrame = () => {
	return (
		<>
			<div className="homepage-middle-frame-container">
				<div className="homepage-middle-frame-wrapper">
					<MiddleFrameHeader />
					<MiddleFrameBody />
					<MiddleFrameFooter />
				</div>
			</div>
		</>
	);
};

export default HomePageMiddleFrame;
