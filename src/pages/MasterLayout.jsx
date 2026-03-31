import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    header: "Pages",
    links: [
      { to: "/dashboard", icon: "sliders", label: "Dashboard" },
      { to: "/profile", icon: "user", label: "Profile" },
      { to: "/", icon: "log-in", label: "Sign In" },
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

export default function MasterLayout({ children, title = "Page" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`wrapper ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      {/* Sidebar */}
      <nav id="sidebar" className="sidebar js-sidebar">
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="/dashboard">
            <span className="align-middle">ERP System</span>
          </a>

          <ul className="sidebar-nav">
            {navItems.map((section) => (
              <div key={section.header}>
                <li className="sidebar-header">{section.header}</li>
                {section.links.map((link) => (
                  <li className="sidebar-item" key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                      }
                    >
                      <i className="align-middle" data-feather={link.icon}></i>
                      <span className="align-middle">{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main">
        {/* Navbar */}
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <a
            className="sidebar-toggle js-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ cursor: "pointer" }}
          >
            <i className="hamburger align-self-center"></i>
          </a>

          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">

              {/* Notifications */}
              <li className={`nav-item dropdown ${notifOpen ? "show" : ""}`}>
                <a
                  className="nav-icon dropdown-toggle"
                  href="#"
                  onClick={(e) => { e.preventDefault(); setNotifOpen(!notifOpen); setMsgOpen(false); setUserOpen(false); }}
                >
                  <div className="position-relative">
                    <i className="align-middle" data-feather="bell"></i>
                    <span className="indicator">{notifications.length}</span>
                  </div>
                </a>
                {notifOpen && (
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 show">
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
              <li className={`nav-item dropdown ${msgOpen ? "show" : ""}`}>
                <a
                  className="nav-icon dropdown-toggle"
                  href="#"
                  onClick={(e) => { e.preventDefault(); setMsgOpen(!msgOpen); setNotifOpen(false); setUserOpen(false); }}
                >
                  <div className="position-relative">
                    <i className="align-middle" data-feather="message-square"></i>
                  </div>
                </a>
                {msgOpen && (
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 show">
                    <div className="dropdown-menu-header">4 New Messages</div>
                    <div className="list-group">
                      {["Vanessa Tucker", "William Harris", "Christina Mason", "Sharon Lessman"].map((name, i) => (
                        <a href="#" className="list-group-item" key={i}>
                          <div className="row g-0 align-items-center">
                            <div className="col-2">
                              <div
                                className="avatar img-fluid rounded-circle d-flex align-items-center justify-content-center text-white"
                                style={{ width: 40, height: 40, background: "#3b7ddd", fontSize: 14 }}
                              >
                                {name[0]}
                              </div>
                            </div>
                            <div className="col-10 ps-2">
                              <div className="text-dark">{name}</div>
                              <div className="text-muted small mt-1">Click to view message.</div>
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

              {/* User Dropdown */}
              <li className={`nav-item dropdown ${userOpen ? "show" : ""}`}>
                <a
                  className="nav-link dropdown-toggle d-none d-sm-inline-block"
                  href="#"
                  onClick={(e) => { e.preventDefault(); setUserOpen(!userOpen); setNotifOpen(false); setMsgOpen(false); }}
                >
                  <div
                    className="avatar img-fluid rounded me-1 d-inline-flex align-items-center justify-content-center text-white"
                    style={{ width: 32, height: 32, background: "#3b7ddd", fontSize: 13 }}
                  >
                    A
                  </div>
                  <span className="text-dark">Admin</span>
                </a>
                {userOpen && (
                  <div className="dropdown-menu dropdown-menu-end show">
                    <a className="dropdown-item" href="/profile">
                      <i className="align-middle me-1" data-feather="user"></i> Profile
                    </a>
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
                  <strong>ERP System</strong> &copy; {new Date().getFullYear()}
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
