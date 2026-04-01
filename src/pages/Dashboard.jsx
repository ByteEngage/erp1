import { useEffect, useRef } from "react";
import MasterLayout from "../components/MasterLayout";

const stats = [
  { title: "Sales", value: "2,382", icon: "truck", change: "-3.65%", trend: "danger" },
  { title: "Visitors", value: "14,212", icon: "users", change: "+5.25%", trend: "success" },
  { title: "Earnings", value: "$21,300", icon: "dollar-sign", change: "+6.65%", trend: "success" },
  { title: "Orders", value: "64", icon: "shopping-cart", change: "-2.25%", trend: "danger" },
];

const projects = [
  { name: "Project Apollo", start: "01/01/2023", end: "31/06/2023", status: "Done", badge: "success", assignee: "Vanessa Tucker" },
  { name: "Project Fireball", start: "01/01/2023", end: "31/06/2023", status: "Cancelled", badge: "danger", assignee: "William Harris" },
  { name: "Project Hades", start: "01/01/2023", end: "31/06/2023", status: "Done", badge: "success", assignee: "Sharon Lessman" },
  { name: "Project Nitro", start: "01/01/2023", end: "31/06/2023", status: "In progress", badge: "warning", assignee: "Vanessa Tucker" },
  { name: "Project Phoenix", start: "01/01/2023", end: "31/06/2023", status: "Done", badge: "success", assignee: "William Harris" },
  { name: "Project X", start: "01/01/2023", end: "31/06/2023", status: "Done", badge: "success", assignee: "Sharon Lessman" },
  { name: "Project Romeo", start: "01/01/2023", end: "31/06/2023", status: "Done", badge: "success", assignee: "Christina Mason" },
  { name: "Project Wombat", start: "01/01/2023", end: "31/06/2023", status: "In progress", badge: "warning", assignee: "William Harris" },
];

export default function Dashboard() {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineInstance = useRef(null);
  const pieInstance = useRef(null);
  const barInstance = useRef(null);

  useEffect(() => {
    if (!window.Chart) return;

    // Destroy previous
    if (lineInstance.current) lineInstance.current.destroy();
    if (pieInstance.current) pieInstance.current.destroy();
    if (barInstance.current) barInstance.current.destroy();

    const primary = "#3b7ddd";

    // Line chart
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 225);
      gradient.addColorStop(0, "rgba(215,227,244,1)");
      gradient.addColorStop(1, "rgba(215,227,244,0)");
      lineInstance.current = new window.Chart(lineChartRef.current, {
        type: "line",
        data: {
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          datasets: [{ label: "Sales ($)", fill: true, backgroundColor: gradient, borderColor: primary, data: [2115,1562,1584,1892,1587,1923,2566,2448,2805,3438,2917,3327] }]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { display: false }, ticks: { stepSize: 1000 } } } }
      });
    }

    // Pie chart
    if (pieChartRef.current) {
      pieInstance.current = new window.Chart(pieChartRef.current, {
        type: "pie",
        data: {
          labels: ["Chrome","Firefox","IE"],
          datasets: [{ data: [4306,3801,1689], backgroundColor: [primary,"#fcb92c","#dc3545"], borderWidth: 5 }]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
    }

    // Bar chart
    if (barChartRef.current) {
      barInstance.current = new window.Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          datasets: [{ label: "This year", backgroundColor: primary, borderColor: primary, data: [54,67,41,55,62,45,55,73,60,76,48,79], barPercentage: 0.75, categoryPercentage: 0.5 }]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: "transparent" } }, y: { grid: { display: false }, ticks: { stepSize: 20 } } } }
      });
    }
  }, []);

  return (
    <MasterLayout title={<><strong>Analytics</strong> Dashboard</>}>

      {/* Stats Row */}
      <div className="row">
        <div className="col-xl-6 col-xxl-5 d-flex">
          <div className="w-100">
            <div className="row">
              {stats.map((s, i) => (
                <div className="col-sm-6" key={i}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">{s.title}</h5>
                        </div>
                        <div className="col-auto">
                          <div className="stat text-primary">
                            <i className="align-middle" data-feather={s.icon}></i>
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">{s.value}</h1>
                      <div className="mb-0">
                        <span className={`text-${s.trend}`}>{s.change} </span>
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-xxl-7">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Movement</h5>
            </div>
            <div className="card-body py-3">
              <div className="chart chart-sm">
                <canvas ref={lineChartRef} id="chartjs-dashboard-line"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Browser Usage</h5>
            </div>
            <div className="card-body d-flex">
              <div className="align-self-center w-100">
                <div className="py-3">
                  <div className="chart chart-xs">
                    <canvas ref={pieChartRef} id="chartjs-dashboard-pie"></canvas>
                  </div>
                </div>
                <table className="table mb-0">
                  <tbody>
                    <tr><td>Chrome</td><td className="text-end">4306</td></tr>
                    <tr><td>Firefox</td><td className="text-end">3801</td></tr>
                    <tr><td>IE</td><td className="text-end">1689</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Real-Time</h5>
            </div>
            <div className="card-body px-4">
              <div style={{ height: 350, background: "#f5f7fb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#adb5bd" }}>
                Map Component (Integrate jsVectorMap)
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Calendar</h5>
            </div>
            <div className="card-body d-flex">
              <div className="align-self-center w-100">
                <div style={{ padding: "1rem", textAlign: "center", color: "#adb5bd" }}>
                  {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Row */}
      <div className="row">
        <div className="col-12 col-lg-8 col-xxl-9 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Latest Projects</h5>
            </div>
            <table className="table table-hover my-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="d-none d-xl-table-cell">Start Date</th>
                  <th className="d-none d-xl-table-cell">End Date</th>
                  <th>Status</th>
                  <th className="d-none d-md-table-cell">Assignee</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td className="d-none d-xl-table-cell">{p.start}</td>
                    <td className="d-none d-xl-table-cell">{p.end}</td>
                    <td><span className={`badge bg-${p.badge}`}>{p.status}</span></td>
                    <td className="d-none d-md-table-cell">{p.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-12 col-lg-4 col-xxl-3 d-flex">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Monthly Sales</h5>
            </div>
            <div className="card-body d-flex w-100">
              <div className="align-self-center chart chart-lg w-100">
                <canvas ref={barChartRef} id="chartjs-dashboard-bar"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

    </MasterLayout>
  );
}
