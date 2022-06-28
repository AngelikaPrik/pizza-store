import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader 
	  speed={2}
	  width={280}
	  height={470}
	  viewBox="0 0 280 470"
	  backgroundColor="#f3f3f3"
	  foregroundColor="#ecebeb"
	  {...props}
	>
	  <rect x="536" y="264" rx="10" ry="10" width="150" height="15" /> 
	  <circle cx="133" cy="125" r="125" /> 
	  <rect x="0" y="300" rx="10" ry="10" width="264" height="78" /> 
	  <rect x="2" y="392" rx="10" ry="10" width="90" height="45" /> 
	  <rect x="0" y="270" rx="5" ry="5" width="262" height="20" /> 
	  <rect x="119" y="392" rx="30" ry="30" width="145" height="45" />
	</ContentLoader>
 )
 

export default Skeleton;
