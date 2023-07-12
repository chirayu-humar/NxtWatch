import './index.css'
import {Link} from 'react-router-dom'

const TrendingVideoItem = props => {
  const {details} = props
  const {id, thumbnailUrl, title, viewCount} = details
  return (
    <div className="videoItemOuterGaming">
      <div className="thumbnailContainer">
        <Link to={`/videos/${id}`}>
          <img className="thumbnailImage" src={thumbnailUrl} />
        </Link>
      </div>
      <div className="detailsContainer">
        <div className="videoProfileContainer">
          {/* <img className="profileOfVideo" src={profileImageUrl} /> */}
        </div>
        <div className="contentContainer">
          <p>{title}</p>
          {/* <p>{name}</p> */}
          <div className="informationDiv">
            <p>{viewCount}</p>
            {/* <p>{publishedAt}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingVideoItem
