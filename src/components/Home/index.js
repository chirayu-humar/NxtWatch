import './index.css'
import {GrClose} from 'react-icons/gr'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import SpecialContext from '../../context/SpecialContext'
import Header from '../Header'
import VideoItem from '../VideoItem'

class Home extends Component {
  state = {
    searchInput: '',
    isBannerPresent: true,
    videosList: [],
    isLoading: false,
    isReqSuccess: true,
  }

  componentDidMount = () => {
    this.fetchTheData()
  }

  fetchTheData = async () => {
    this.setState({
      isLoading: true,
    })
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    const newVideosList = data.videos.map(eachItem =>
      this.FormatTheVideoDetails(eachItem),
    )
    this.setState({
      videosList: newVideosList,
      isLoading: false,
    })
  }

  removeTheBanner = () => {
    this.setState({
      isBannerPresent: false,
    })
  }

  changeTheSearchInput = event => {
    const {value} = event.target
    this.setState({
      searchInput: value,
    })
  }

  FormatTheVideoDetails = object => ({
    channel: {
      name: object.channel.name,
      profileImageUrl: object.channel.profile_image_url,
    },
    id: object.id,
    publishedAt: object.published_at,
    thumbnailUrl: object.thumbnail_url,
    title: object.title,
    viewCount: object.view_count,
  })

  render() {
    const {isBannerPresent, searchInput, videosList, isLoading} = this.state
    return (
      <SpecialContext.Consumer>
        {value => {
          const {isDark, changeTheMode} = value
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
                        {/* first  */}
                        <div className="firstInnerBanner">
                          <div className="firstInnerLogoContainer">
                            <img
                              className="bannerLogo"
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            />
                          </div>
                          <div>
                            <button onClick={this.removeTheBanner}>
                              <GrClose />
                            </button>
                          </div>
                        </div>
                        {/* second  */}
                        <div className="firstInnerBanner">
                          <div className="secondTemp">
                            <p>dfsdfsd fsdf dfsdf sdfsdf s sdf sd </p>
                          </div>
                        </div>
                        {/* third  */}
                        <div>
                          <button className="button">GET IT NOW</button>
                        </div>
                        {/* fourth  */}
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
                      <div className="searchBox">
                        <input
                          onChange={this.changeTheSearchInput}
                          className="searchInput"
                          type="search"
                        />
                        <button
                          onClick={this.fetchTheData}
                          className="searchBtn"
                          type="button"
                        >
                          search
                        </button>
                      </div>
                      {/* search box ended */}
                      {/* video items container started */}
                      <div className="specialVideoContainer">
                        {videosList.length === 0 && (
                          <div>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
                          </div>
                        )}
                        {videosList.map(eachItem => (
                          <VideoItem details={eachItem} />
                        ))}
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

export default Home
