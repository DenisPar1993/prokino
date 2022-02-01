import React from "react"
import ContentLoader from "react-content-loader"



function Sceleton() {
    return (
        <ContentLoader 
    speed={2}
    width={1170}
    height={920}
    viewBox="0 0 1170 920"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="310" y="45" rx="0" ry="0" width="246" height="203" /> 
    <rect x="349" y="344" rx="0" ry="0" width="217" height="334" /> 
    <rect x="68" y="613" rx="0" ry="0" width="200" height="267" /> 
    <rect x="96" y="328" rx="0" ry="0" width="137" height="121" /> 
    <rect x="55" y="25" rx="0" ry="0" width="187" height="245" />
  </ContentLoader>
    )
}

export default Sceleton
