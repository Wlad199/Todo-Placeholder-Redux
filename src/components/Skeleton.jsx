import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader
		speed={1}
		width={570}
		height={50}
		viewBox="0 0 570 50"
		backgroundColor="#fafafa"
		foregroundColor="#185c37"
		{...props}
	>
		<rect x="5" y="5" rx="5" ry="5" width="560" height="45" />
	</ContentLoader>
)

export default Skeleton