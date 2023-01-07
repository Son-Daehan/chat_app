import LeftFrameBody from "./LeftFrameBody";
import LeftFrameFooter from "./LeftFrameFooter";
import LeftFrameHeader from "./LeftFrameHeader";
import "./homepageleftframe.css";

const HomePageLeftFrame = () => {
	return (
		<>
			<div className="homepage-left-frame-container">
				<LeftFrameHeader />
				<LeftFrameBody />
				<LeftFrameFooter />
			</div>
		</>
	);
};

export default HomePageLeftFrame;
