/**
 * 用戶信息摺疊
 */

import { useState } from 'react';
import './usermenu.style.less';

const UserMenu = (props) => {
  const [actionShow, setActionShow] = useState(false);

  return (
    <ul className="nav user">
      <li className={'menu'}>
        <div
          className="link"
          style={{
            opacity: 1,
            paddingBottom: 0,
          }}
          onClick={() => setActionShow(!actionShow)}
        >
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${props.avatar})`,
            }}
          ></div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              height: '40px',
              lineHeight: '40px',
            }}
          >
            {props.name}
            <b
              className={`caret${actionShow ? ' expanded' : ''}`}
              style={{
                top: 19,
              }}
            ></b>
          </p>
        </div>
        <div
          className={`collapse${actionShow ? ' show' : ''}`}
          style={{
            maxHeight: (actionShow ? 2 * 37 : 0) + 'px',
          }}
        >
          <ul className="nav">{props.action}</ul>
        </div>
      </li>
    </ul>
  );
};

export default UserMenu;
