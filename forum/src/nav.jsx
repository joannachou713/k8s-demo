function Nav() {
  let logged_in = localStorage.getItem('token') ? true : false
  let logout = () => {
    localStorage.removeItem('token');
    logged_in = false
    window.location.reload();
  };

  return (
    <div className="nav bg-light py-4 px-5 d-flex justify-content-between align-items-center">
      <div><a href='/' className="fs-4" style={{textDecoration: 'none', color: '#0044BB', fontWeight: 600}}>Kubernetes Demo Blog</a></div>
      <div>
    {logged_in ? (
        <><a onClick={logout} style={{textDecoration: 'none', color: '#0044BB'}}>Log out</a></>
    ): (<>
        <a href="/login" style={{textDecoration: 'none', color: '#0044BB', marginRight: '30px'}}>Log in</a>
        <a href="/signup" style={{textDecoration: 'none', color: '#0044BB'}}>Sign up</a></>)}
      </div>
    </div>
  );
}

export default Nav;
