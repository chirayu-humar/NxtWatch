import './index.css'
import {WiMoonWaxingCrescent3, WiDaySunny} from 'react-icons/wi'
import SpecialContext from '../../context/SpecialContext'

const Header = () => (
  <SpecialContext.Consumer>
    {value => {
      const {isDark, changeTheMode} = value
      const headerClass = isDark ? 'DarkHeader' : 'LightHeader'
      return (
        <div className={`outerHeader ${headerClass}`}>
          <div className="logoContainer">
            {!isDark && (
              <img
                className="websiteLogo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              />
            )}
            {isDark && (
              <img
                className="websiteLogo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              />
            )}
          </div>
          <div className="allBtnsContainer">
            <button
              onClick={changeTheMode}
              type="button"
              className="specialBtn"
            >
              {!isDark && <WiMoonWaxingCrescent3 className="profileClass" />}
              {isDark && <WiDaySunny className="sumIcon profileClass" />}
            </button>
            <button className="specialBtn">
              <img
                className="profileClass"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
            </button>
            <button>Logout</button>
          </div>
        </div>
      )
    }}
  </SpecialContext.Consumer>
)

export default Header
