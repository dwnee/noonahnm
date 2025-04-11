import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router';

const NavBar = ({authenticate, setAuthenticate}) => {
  const navigate = useNavigate()
  const menuList = ['여성','Divided','남성','신생아/유아','아동','H&M HOME','Sale','지속가능성']
  const goToLogin=()=>{
    if (authenticate) {
      // 로그아웃 처리
      setAuthenticate(false);
    } else {
      // 로그인 페이지로 이동
      navigate('/login');
    }
  }
  const goToHome=()=>{
    navigate('/')
  }
  const search = (event) =>{
    if(event.key === "Enter"){
      // 입력한 검색어를 읽어와서
      let keyword = event.target.value
      console.log(keyword, "keyword")
      // url을 바꿔준다
      navigate(`/?q=${keyword}`)
    }
  }
  const [menuOpen, setMenuOpen] = useState(false)
  const openMenuMobile = () => {
    setMenuOpen(!menuOpen);
  }
  return (
    <div>
      <div>
        <div className="login-button" onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} />
          <div>{authenticate ? "로그아웃" : "로그인"}</div>
        </div>
      </div>
      <div className="nav-section" onClick={goToHome}>
        <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/800px-H%26M-Logo.svg.png"/>
      </div>
      <div>
        <div className="menu-area">
        <FontAwesomeIcon icon={faBars}className="icon-menu-hamburger" onClick={openMenuMobile}
        />
            <ul className={`menu-list ${menuOpen ? 'show-menu' : 'hide-menu'}`}>
              {menuList.map((menu)=> (
                <li>{menu}</li>
            ))}
            </ul>
            <div className='search-box'>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" onKeyPress={(event)=>search(event)}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar