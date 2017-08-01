import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import {Menu,} from 'antd';
import {Link} from 'dva/router';
import {config} from '../../utils';


const {prefix} = config

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  };
  handleItemClick = (e) => {
    if (e.key != "logout")
      window.location = `${location.origin}/${e.key}`;
  }
  handleLogout = () => {
    localStorage.setItem(`${prefix}loginToken`, "")
    localStorage.setItem(`${prefix}loginUsername`, "")
    window.location = `${location.origin}/home`;
  }

  render() {
    const props = {...this.props};
    const isMode = props.isMode;
    delete props.isMode;


    const navChildren = [
      <Item key="home">首页</Item>,
      <Item key="start">开始答题</Item>,
      <Item key="dashboard">控制台</Item>,
    ];
    const userTitle = (<div>
      <span className="img">
        <img
          src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
          width="30"
          height="30"
        />
      </span>
      <span>{localStorage.getItem(`${prefix}loginUsername`) || "未登录"}</span>
    </div>);
    navChildren.push(
      (<SubMenu className="user" title={userTitle} key="user">
        <Item key="login">用户中心</Item>
        <Item key="logout">
          <div
            onClick={() => {
              this.handleLogout();
            }}>
            登出
          </div>
        </Item>
      </SubMenu>));
    return (<TweenOne
      component="header"
      animation={{opacity: 0, type: 'from'}}
      {...props}
    >
      <TweenOne
        className={`${this.props.className}-logo`}
        animation={{x: -30, delay: 100, type: 'from', ease: 'easeOutQuad'}}
        id={`${this.props.id}-logo`}
      >
        <Link to={"/home"}>
          <div>
            <img style={{width: 40, "margin-right": 8}} alt={'logo'} src={config.logo}/>
            <span>{config.name}</span>
          </div>
        </Link>
      </TweenOne>
      {isMode ? (<div
          className={`${this.props.className}-phone-nav${this.state.phoneOpen ? ' open' : ''}`}
          id={`${this.props.id}-menu`}
        >
          <div
            className={`${this.props.className}-phone-nav-bar`}
            onClick={() => {
              this.phoneClick();
            }}
          >
            <em/>
            <em/>
            <em/>
          </div>
          <div
            className={`${this.props.className}-phone-nav-text`}
          >
            <Menu
              onClick={
                (e) => {
                  this.handleItemClick(e)
                }
              }
              defaultSelectedKeys={['0']}
              mode="inline"
              theme="dark"
            >
              {navChildren}
            </Menu>
          </div>
        </div>) :
        <TweenOne
          animation={{x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad'}}
          className={`${this.props.className}-nav`}
        >
          <Menu
            onClick={
              (e) => {
                this.handleItemClick(e)
              }
            }
            mode="horizontal" defaultSelectedKeys={['0']}
            id={`${this.props.id}-menu`}
          >
            {navChildren}
          </Menu>
        </TweenOne>
      }
    </TweenOne>);
  }
}

Header.propTypes = {
  className: PropTypes.string,
  isMode: PropTypes.bool,
  id: PropTypes.string,
};

Header.defaultProps = {
  className: 'header1',
};

export default Header;
