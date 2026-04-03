import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    header: "Pages",
    links: [
      { to: "/dashboard", icon: "sliders", label: "Dashboard" },
      { to: "/profile", icon: "user", label: "Profile" },
      { to: "/sign-in", icon: "log-in", label: "Sign In" },
      { to: "/sign-up", icon: "user-plus", label: "Sign Up" },
    ],
  },
  {
    header: "Tools & Components",
    links: [
      { to: "/buttons", icon: "square", label: "Buttons" },
      { to: "/forms", icon: "check-square", label: "Forms" },
      { to: "/cards", icon: "grid", label: "Cards" },
      { to: "/typography", icon: "align-left", label: "Typography" },
      { to: "/icons", icon: "coffee", label: "Icons" },
    ],
  },
  {
    header: "Plugins & Addons",
    links: [
      { to: "/charts", icon: "bar-chart-2", label: "Charts" },
      { to: "/maps", icon: "map", label: "Maps" },
    ],
  },
];

const notifications = [
  { icon: "alert-circle", color: "text-danger", title: "Update completed", desc: "Restart server 12 to complete the update.", time: "30m ago" },
  { icon: "bell", color: "text-warning", title: "Lorem ipsum", desc: "Aliquam ex eros, imperdiet vulputate hendrerit et.", time: "2h ago" },
  { icon: "home", color: "text-primary", title: "Login from 192.186.1.8", desc: "", time: "5h ago" },
  { icon: "user-plus", color: "text-success", title: "New connection", desc: "Christina accepted your request.", time: "14h ago" },
];

const messages = [
  { name: "Vanessa Tucker", avatar: "avatar-5.jpg", msg: "Nam pretium turpis et arcu.", time: "15m ago" },
  { name: "William Harris", avatar: "avatar-2.jpg", msg: "Curabitur ligula sapien euismod vitae.", time: "2h ago" },
  { name: "Christina Mason", avatar: "avatar-4.jpg", msg: "Pellentesque auctor neque nec urna.", time: "4h ago" },
  { name: "Sharon Lessman", avatar: "avatar-3.jpg", msg: "Aenean tellus metus, bibendum sed.", time: "5h ago" },
];

export default function MasterLayout({ children, title = "Page" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (window.feather) window.feather.replace();
  });

  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem("user");
      setCurrentUser(user ? JSON.parse(user) : null);
    };
    loadUser();
    window.addEventListener("userChanged", loadUser);
    return () => window.removeEventListener("userChanged", loadUser);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotifOpen(false);
        setMsgOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
    setCurrentUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Shared dropdown style to prevent overflow
  const dropdownStyle = {
    position: "absolute",
    right: 0,
    left: "auto",
    maxWidth: "calc(100vw - 16px)",
    overflowX: "hidden",
    zIndex: 9999,
  };

  return (
    <div className="wrapper" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 99 }}
        />
      )}

      {/* Sidebar */}
      <nav
        id="sidebar"
        className="sidebar js-sidebar"
        style={{
          marginLeft: sidebarOpen ? "0" : "-260px",
          position: isMobile ? "fixed" : "relative",
          top: 0,
          height: "100vh",
          flexShrink: 0,
          zIndex: isMobile ? 100 : "auto",
          overflow: "hidden",
        }}
      >
        <div
          className="sidebar-content js-simplebar"
          style={{
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NavLink className="sidebar-brand" to="/dashboard">
            <span className="align-middle">ByteEngage</span>
          </NavLink>

          <ul className="sidebar-nav">
            {navItems.map((section) => (
              <div key={section.header}>
                <li className="sidebar-header">{section.header}</li>
                {section.links.map((link) => (
                  <li className="sidebar-item" key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
                      onClick={() => isMobile && setSidebarOpen(false)}
                    >
                      <i className="align-middle" data-feather={link.icon}></i>
                      <span className="align-middle">{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </div>
            ))}
          </ul>

          <div className="sidebar-cta">
            <div className="sidebar-cta-content">
              <strong className="d-inline-block mb-2">Extra Card</strong>
              <div className="mb-3 text-sm">Looking for more components?</div>
              <div className="d-grid">
                <a href="#" className="btn btn-primary">Coming Soon..</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="main" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", height: "100vh" }}>

        {/* Navbar — position: relative is critical so dropdowns anchor here */}
        <nav
          className="navbar navbar-expand navbar-light navbar-bg"
          ref={dropdownRef}
          style={{ position: "relative" }}
        >
          <a className="sidebar-toggle js-sidebar-toggle" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
            <i className="hamburger align-self-center"></i>
          </a>

          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">

              {/* Notifications */}
              <li className={`nav-item dropdown${notifOpen ? " show" : ""}`} style={{ position: "relative" }}>
                <a
                  className="nav-icon dropdown-toggle"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setNotifOpen(!notifOpen);
                    setMsgOpen(false);
                    setUserOpen(false);
                  }}
                >
                  <div className="position-relative">
                    <i className="align-middle" data-feather="bell"></i>
                    <span className="indicator">{notifications.length}</span>
                  </div>
                </a>
                {notifOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 show"
                    style={dropdownStyle}
                  >
                    <div className="dropdown-menu-header">{notifications.length} New Notifications</div>
                    <div className="list-group">
                      {notifications.map((n, i) => (
                        <a href="#" className="list-group-item" key={i}>
                          <div className="row g-0 align-items-center">
                            <div className="col-2">
                              <i className={n.color} data-feather={n.icon}></i>
                            </div>
                            <div className="col-10">
                              <div className="text-dark">{n.title}</div>
                              {n.desc && <div className="text-muted small mt-1">{n.desc}</div>}
                              <div className="text-muted small mt-1">{n.time}</div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-menu-footer">
                      <a href="#" className="text-muted">Show all notifications</a>
                    </div>
                  </div>
                )}
              </li>

              {/* Messages */}
              <li className={`nav-item dropdown${msgOpen ? " show" : ""}`} style={{ position: "relative" }}>
                <a
                  className="nav-icon dropdown-toggle"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMsgOpen(!msgOpen);
                    setNotifOpen(false);
                    setUserOpen(false);
                  }}
                >
                  <div className="position-relative">
                    <i className="align-middle" data-feather="message-square"></i>
                  </div>
                </a>
                {msgOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 show"
                    style={dropdownStyle}
                  >
                    <div className="dropdown-menu-header">4 New Messages</div>
                    <div className="list-group">
                      {messages.map((m, i) => (
                        <a href="#" className="list-group-item" key={i}>
                          <div className="row g-0 align-items-center">
                            <div className="col-2">
                              <img
                                src={`/img/avatars/${m.avatar}`}
                                className="avatar img-fluid rounded-circle"
                                alt={m.name}
                              />
                            </div>
                            <div className="col-10 ps-2">
                              <div className="text-dark">{m.name}</div>
                              <div className="text-muted small mt-1">{m.msg}</div>
                              <div className="text-muted small mt-1">{m.time}</div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="dropdown-menu-footer">
                      <a href="#" className="text-muted">Show all messages</a>
                    </div>
                  </div>
                )}
              </li>

              {/* User */}
              <li className={`nav-item dropdown${userOpen ? " show" : ""}`} style={{ position: "relative" }}>
                <a
                  className="nav-link dropdown-toggle d-none d-sm-inline-block"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setUserOpen(!userOpen);
                    setNotifOpen(false);
                    setMsgOpen(false);
                  }}
                >
                  <img src="/img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Admin" />
                  <span className="text-dark">
                    {currentUser?.username || "Guest"}
                  </span>
                </a>
                <a
                  className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setUserOpen(!userOpen);
                    setNotifOpen(false);
                    setMsgOpen(false);
                  }}
                >
                  <i className="align-middle" data-feather="settings"></i>
                </a>
                {userOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-end show"
                    style={{ ...dropdownStyle, minWidth: "160px" }}
                  >
                    <NavLink className="dropdown-item" to="/profile">
                      <i className="align-middle me-1" data-feather="user"></i> Profile
                    </NavLink>
                    <a className="dropdown-item" href="#">
                      <i className="align-middle me-1" data-feather="pie-chart"></i> Analytics
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="align-middle me-1" data-feather="help-circle"></i> Help Center
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a>
                  </div>
                )}
              </li>

            </ul>
          </div>
        </nav>

        {/* Page Content */}
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">{title}</h1>
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container-fluid">
            <div className="row text-muted">
              <div className="col-6 text-start">
                <p className="mb-0">
                  <strong>ByteEngage</strong> &copy; {new Date().getFullYear()}
                </p>
              </div>
              <div className="col-6 text-end">
                <ul className="list-inline">
                  <li className="list-inline-item"><a className="text-muted" href="#">Support</a></li>
                  <li className="list-inline-item"><a className="text-muted" href="#">Privacy</a></li>
                  <li className="list-inline-item"><a className="text-muted" href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
