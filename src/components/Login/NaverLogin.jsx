import React from 'react';

const NaverLogin = () => {
  // useEffect(() => {
  //   const naverLogin = new window.naver.LoginWithNaverId({
  //     clientId: `${process.env.REACT_APP_NAVER_CLIENT_ID}`,
  //     callbackUrl: `http://localhost:3000`,
  //     loginButton: { color: 'green', type: 3, height: '50' },
  //   });
  //   naverLogin.init();
  //   naverLogin.logout();
  //   try {
  //     naverLogin.getLoginStatus(status => {
  //       if (status) {
  //         console.log(naverLogin.user);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const handleClickLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      process.env.REACT_APP_NAVER_CLIENT_ID
    }&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&state=${Math.random()
      .toString(36)
      .substring(3, 14)}`;
    // fetch(
    //   `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    //     process.env.REACT_APP_NAVER_CLIENT_ID
    //   }&redirect_uri=${process.env.REDIRECT_URI}&state=${Math.random()
    //     .toString(36)
    //     .substring(3, 14)}`,
    // )
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  };

  return (
    // <div>
    //   <div className="connect">
    //     <div id="naverIdLogin" />
    //   </div>
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleClickLogin} id="naver login">
      Naver Login
    </div>
    // </div>
  );
};

export default NaverLogin;
