import './index.css'
import {GrClose} from 'react-icons/gr'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import SpecialContext from '../../context/SpecialContext'
import Header from '../Header'
import GamingVideoItem from '../GamingVideoItem'

class Gaming extends Component {
  state = {isBannerPresent: true, videosList: {}, isLoading: false}

  componentDidMount = () => {
    console.log('fetch for trending')
    this.fetchTrendingVideos()
  }

  FormatTheVideoDetails = object => ({
    id: object.video_details.id,
    thumbnailUrl: object.video_details.thumbnail_url,
    title: object.video_details.title,
    viewCount: object.video_details.view_count,
    publishedAt: object.video_details.published_at,
    videoUrl: object.video_details.video_url,
    description: object.video_details.description,
    channel: {
      name: object.video_details.channel.name,
      profileImageUrl: object.video_details.channel.profile_image_url,
      subscriberCount: object.video_details.channel.subscriber_count,
    },
  })

  fetchTrendingVideos = async () => {
    // this.setState({
    //   isLoading: true,
    // })
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const newVideoDetails = this.FormatTheVideoDetails(data)
    console.log(newVideoDetails)
    this.setState({
      videosList: newVideoDetails,
      isLoading: false,
    })
  }

  render() {
    const {isBannerPresent, videosList, isLoading} = this.state
    const {
      id,
      thumbnailUrl,
      title,
      viewCount,
      publishedAt,
      videoUrl,
      description,
      channel,
    } = videosList
    // const {name, profileImageUrl, subscriberCount} = channel
    const divStyle = {
      width: '100%',
      display: 'flex',
      'flex-shrink': '1',
    }
    return (
      <SpecialContext.Consumer>
        {value => {
          const {
            isDark,
            savedVideosList,
            addToSavedVideos,
            removeFromSavedVideos,
          } = value
          return (
            <>
              <Header />
              <div className="homeOuter">
                <div className="bottomLargerContainer">
                  {/* first cont */}
                  <div className="bottomLargerFirst">
                    <div className="bottomLargerFirstInner1">
                      <div className="firstChildSideContainer">
                        <div className="firstInnerDivTemp">
                          <AiFillHome />
                          <p>Home</p>
                        </div>
                        <div className="firstInnerDivTemp">
                          <AiTwotoneFire />
                          <p>Trending</p>
                        </div>
                        <div className="firstInnerDivTemp">
                          <SiYoutubegaming />
                          <p>Gaming</p>
                        </div>
                        <div className="firstInnerDivTemp">
                          <p>Saved Videos</p>
                        </div>
                      </div>
                      <div className="firstChildSideContainer">
                        <div className="firstInnerDivTemp">
                          <p>Contact Us</p>
                        </div>
                        <div className="firstInnerDivTemp">
                          <img
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                          />
                          <img
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                          />
                          <img
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                          />
                        </div>
                        <div className="firstInnerDivTemp">
                          <p>
                            Enjoy! Now to see your channels and recommendations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* second cont */}
                  <div className="bottomLargerSecond">
                    {/* banner started */}
                    {isBannerPresent && (
                      <div className="bannerContainer">
                        <ReactPlayer style={{width: '50px'}} url={videoUrl} />
                      </div>
                    )}
                    {/* banner ended */}
                    {isLoading && (
                      <div className="loader-container" data-testid="loader">
                        <Loader
                          type="ThreeDots"
                          color="#ffffff"
                          height="50"
                          width="50"
                        />
                      </div>
                    )}
                    {/* video container started */}
                    <div className="videoContainer">
                      {/* search box ended */}
                      {/* video items container started */}
                      <div className="specialVideoContainer">
                        <div className="childForSpecial">
                          <p>{title}</p>
                          <div className="rowContainer">
                            <p>{viewCount}</p>
                            <p>{publishedAt}</p>
                          </div>
                          <div className="rowContainer">
                            <button>like</button>
                            <button>dislike</button>
                            <button>save</button>
                          </div>
                          <hr />
                          <div className="rowContainer">
                            <img />
                            {/* <div>
                              <p>{channel.name}</p>
                              <p>{channel.subscriberCount}</p>
                            </div> */}
                          </div>
                          <p>{description}</p>
                        </div>
                      </div>
                      {/* video items container ended */}
                    </div>
                    {/* video container ended */}
                  </div>
                  {/* third cont */}
                  {/* fourth div */}
                </div>
              </div>
            </>
          )
        }}
      </SpecialContext.Consumer>
    )
  }
}

export default Gaming
