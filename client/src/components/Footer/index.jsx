import React from 'react';

function Footer() {
  return (
    <div className="coffee-button" style={{ position: 'relative', bottom: '0', right: '0', margin: '10px' }}>
      <a href='https://ko-fi.com/T6T2QRAJ9' target='_blank'>
        <img
          height='36'
          style={{ border: '0px', height: '36px' }}
          src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
          border='0'
          alt='Buy Me a Coffee at ko-fi.com'
        />
      </a>
    </div>
  );
}

export default Footer;
