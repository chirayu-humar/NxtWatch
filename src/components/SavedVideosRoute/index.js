import './index.css'
import {GrClose} from 'react-icons/gr'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import SpecialContext from '../../context/SpecialContext'
import Header from '../Header'
import TrendingVideoItem from '../TrendingVideoItem'

class SavedVideosRoute extends Component {
  state = {isBannerPresent: true, videosList: [], isLoading: false}

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
    const {isBannerPresent, videosList, isLoading} = this.state
    return (
      <SpecialContext.Consumer>
        {value => {
          const {isDark, savedVideosList} = value
          return (
            <>
              <Header />
              <div className="homeOuter">
                <div className="bottomLargerContainer">
                  {/* first cont */}
                  <div className="bottomLargerFirst">
                    <div className="bottomLargerFirstInner1">
                      <div className="firstChildSideContainer">
                        <Link to="/">
                          <div className="firstInnerDivTemp">
                            <AiFillHome />
                            <p>Home</p>
                          </div>
                        </Link>
                        <Link to="/trending">
                          <div className="firstInnerDivTemp">
                            <AiTwotoneFire />
                            <p>Trending</p>
                          </div>
                        </Link>
                        <Link to="/gaming">
                          <div className="firstInnerDivTemp">
                            <SiYoutubegaming />
                            <p>Gaming</p>
                          </div>
                        </Link>
                        <Link to="/saved-videos">
                          <div className="firstInnerDivTemp">
                            <p>Saved Videos</p>
                          </div>
                        </Link>
                      </div>
                      <div className="firstChildSideContainer">
                        <div className="firstInnerDivTemp">
                          <p>Contact Us</p>
                        </div>
                        <div className="firstInnerDivTemp">
                          <img
                            alt="facebook logo"
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                          />
                          <img
                            alt="twitter logo"
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                          />
                          <img
                            alt="linked in logo"
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                          />
                        </div>
                        <div className="firstInnerDivTemp">
                          <p>
                            Enjoy! Now to see your channels and recommendations!
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
                        <h1>Saved Videos</h1>
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
                      <ul className="specialVideoContainer">
                        {savedVideosList.length === 0 && (
                          <li>
                            <img
                              className="notFound"
                              alt="no saved videos"
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                            />
                            <h1>No saved videos found</h1>
                            <p>Save your videos by clicking a button</p>
                          </li>
                        )}
                        {savedVideosList.map(eachItem => (
                          <TrendingVideoItem
                            key={eachItem.id}
                            details={eachItem}
                          />
                        ))}
                      </ul>
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

export default SavedVideosRoute
