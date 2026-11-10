 import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Sprout,
  Wheat,
  Droplets,
  FlaskConical,
  Tractor,
  BrainCircuit,
  FileBarChart,
  TrendingUp,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  Sun,
  CloudSun,
  Wind,
  Droplet,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Clock,
  MapPin,
  MoreHorizontal,
 Leaf,
  ThermometerSun,
  ShieldCheck,
  Moon,
  Languages,
  Save,
  UserRound,
  LogOut,
  CircleHelp,
  AlertTriangle,
  CloudRain,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import "./styles.css";

const navGroups = [
  {
    label: "WORKSPACE",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "Farm overview", icon: Sprout },
      { name: "Crop management", icon: Wheat },
      { name: "Irrigation", icon: Droplets },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { name: "Soil health", icon: FlaskConical },
      { name: "Equipment", icon: Tractor },
      { name: "AI recommendations", icon: BrainCircuit, badge: "NEW" },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      { name: "Crop reports", icon: FileBarChart },
      { name: "Market prices", icon: TrendingUp },
    ],
  },
];

const initialCrops = [
  {
    id: 1,
    name: "Wheat",
    variety: "HD 2967 · Field A",
    stage: "Flowering",
    progress: 72,
    health: "Healthy",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300",
    color: "green",
  },
  {
    id: 2,
    name: "Rice",
    variety: "BPT 5204 · Field B",
    stage: "Vegetative",
    progress: 54,
    health: "Healthy",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300",
    color: "blue",
  },
  {
    id: 3,
    name: "Cotton",
    variety: "Bt Cotton · Field C",
    stage: "Boll formation",
    progress: 38,
    health: "Attention",
    image:
      "https://images.unsplash.com/photo-1595872018818-97555653a011?w=300",
    color: "gold",
  },
];
const initialTasks = [
  {
    id: 1,
    title: "Inspect wheat field moisture",
    time: "Today · 09:00 AM",
    done: true,
  },
  {
    id: 2,
    title: "Apply organic fertilizer to rice",
    time: "Today · 11:30 AM",
    done: false,
  },
  {
    id: 3,
    title: "Check irrigation equipment",
    time: "Today · 03:00 PM",
    done: false,
  },
  {
    id: 4,
    title: "Review cotton crop health",
    time: "Tomorrow · 08:30 AM",
    done: false,
  },
];

const marketData = [
  { name: "Wheat", market: "Warangal Market", price: "₹2,425", change: "+2.4", up: true },
  { name: "Rice", market: "Hyderabad Market", price: "₹3,150", change: "+1.8", up: true },
  { name: "Cotton", market: "Adilabad Market", price: "₹7,120", change: "-0.6", up: false },
  { name: "Maize", market: "Karimnagar Market", price: "₹2,180", change: "+1.2", up: true },
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function App() {
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
 const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [toast, setToast] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [farmName, setFarmName] = useState("Greenfield Farms");
  const [farmLocation, setFarmLocation] = useState("Warangal, Telangana");
  const [adminName, setAdminName] = useState("Srivani Racha");
  const [adminRole, setAdminRole] = useState("Farm Administrator");
  const [showSignout, setShowSignout] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const filteredCrops = useMemo(() => {
    return initialCrops.filter((crop) =>
      crop.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const selectNav = (name) => {
    setActive(name);
    setMobileOpen(false);
    setSearch("");
    setShowSearch(false);
  };
   const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) return;

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: taskTitle.trim(),
        time: "Today · New activity",
        done: false,
      },
    ]);

    setTaskTitle("");
    setShowTaskModal(false);
    setToast("New activity added successfully");
  };

  const completedTasks = tasks.filter((task) => task.done).length;

  const confirmSignout = () => {
    setShowSignout(false);
    setSignedOut(true);
    setToast("You have signed out of the demo dashboard");
  };

  if (signedOut) {
    return <LoginPage onLogin={() => {
      setSignedOut(false);
      setActive("Dashboard");
      setToast("Welcome back to AgriSmart");
    }} />;
  }

  return (
    <div className={`app-shell ${darkMode ? "dark-mode" : ""}`} dir={rtl ? "rtl" : "ltr"}>
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Sprout size={24} />
          </div>
          <div>
            <div className="brand-name">
              Agri<span>Smart</span>
            </div>
            <div className="brand-caption">FARM MANAGEMENT</div>
          </div>
          <button
            className="icon-btn mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={17} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p className="nav-label">{group.label}</p>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    className={`nav-item ${active === item.name ? "active" : ""}`}
                    onClick={() => selectNav(item.name)}
                  >
                    <Icon size={17} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="nav-new">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${active === "Settings" ? "active" : ""}`}
            onClick={() => selectNav("Settings")}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <button
            className={`profile-row ${active === "Profile" ? "active" : ""}`}
            onClick={() => selectNav("Profile")}
          >
            <div className="profile-avatar">{getInitials(adminName)}</div>
            <div className="profile-info">
              <strong>{adminName}</strong>
              <span>{adminRole}</span>
            </div>
            <ChevronRight size={15} />
          </button>

         <button
  className="nav-item signout-item"
  onClick={confirmSignout}
>
  <LogOut size={17} />
  <span>Sign out</span>
</button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>

            <div className="breadcrumb">
              <span>Workplace</span>
              <ChevronRight size={13} />
              <strong>{active}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <button
              className="icon-btn mobile-search-btn"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <Search size={17} />
            </button>

            <div className={`search-wrap ${showSearch ? "search-visible" : ""}`}>
              <Search size={15} />
              <input
                type="search"
                placeholder="Search crops..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              className="utility-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>

            <button
              className="utility-toggle"
              onClick={() => setRtl(!rtl)}
              title="Toggle text direction"
            >
              <Languages size={15} />
              <span>{rtl ? "LTR" : "RTL"}</span>
            </button>

            <button
              className="icon-btn notification-btn"
              onClick={() => setToast("You are all caught up!")}
              aria-label="Notifications"
            >
              <Bell size={17} />
              <i />
            </button>

            <button
              className="top-profile"
              onClick={() => selectNav("Profile")}
              title="Open profile"
            >
              <div className="profile-avatar">{getInitials(adminName)}</div>
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <div className="page-content">
          {active === "Dashboard" && (
            <Dashboard
              formattedDate={formattedDate}
              tasks={tasks}
              completedTasks={completedTasks}
              toggleTask={toggleTask}
              openTaskModal={() => setShowTaskModal(true)}
              filteredCrops={filteredCrops}
              adminName={adminName}
              farmName={farmName}
              farmLocation={farmLocation}
              selectNav={selectNav}
              toast={setToast}
            />
          )}
           {active === "Settings" && (
            <SettingsPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              rtl={rtl}
              setRtl={setRtl}
              farmName={farmName}
              setFarmName={setFarmName}
              farmLocation={farmLocation}
              setFarmLocation={setFarmLocation}
              toast={setToast}
            />
          )}

          {active === "Profile" && (
            <ProfilePage
              adminName={adminName}
              setAdminName={setAdminName}
              adminRole={adminRole}
              setAdminRole={setAdminRole}
              toast={setToast}
            />
          )}

          {active !== "Dashboard" &&
            active !== "Settings" &&
            active !== "Profile" && (
              <SectionPage
                active={active}
                selectNav={selectNav}
                toast={setToast}
              />
            )}
        </div>
      </main>

      {showTaskModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowTaskModal(false)}
        >
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Add new activity</h2>
                <p>Create a new farm task for your schedule.</p>
              </div>
              <button
                className="icon-btn"
                onClick={() => setShowTaskModal(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
             <form onSubmit={addTask}>
              <label>Activity name</label>
              <input
                autoFocus
                required
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Enter activity name"
              />
              <button type="submit" className="primary-btn full">
                <Plus size={15} />
                Add activity
              </button>
            </form>
          </div>
        </div>
      )}

      

         

      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}

function Dashboard({
  formattedDate,
  tasks,
  completedTasks,
  toggleTask,
  openTaskModal,
  filteredCrops,
  adminName,
  farmName,
  farmLocation,
  selectNav,
  toast,
}) {
  const [weather, setWeather] = useState({
    loading: true,
    temperature: "--",
    condition: "Loading weather...",
    humidity: "--",
    wind: "--",
    rain: "--",
    resolvedLocation: farmLocation,
    error: false,
  });
  
  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      const place = (farmLocation || "").trim();
      if (!place) {
        setWeather((old) => ({ ...old, loading: false, error: true, condition: "Add a farm location in Settings" }));
        return;
      }

      setWeather((old) => ({ ...old, loading: true, resolvedLocation: place }));
      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`
        );
        if (!geoResponse.ok) throw new Error("Location lookup failed");
        const geoData = await geoResponse.json();
        const result = geoData.results?.[0];
        if (!result) throw new Error("Location not found");

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=precipitation_probability&forecast_days=1&timezone=auto`
        );
        if (!weatherResponse.ok) throw new Error("Weather lookup failed");
        const weatherData = await weatherResponse.json();
        const current = weatherData.current || {};
        const code = Number(current.weather_code);
        const conditions = code === 0 ? "Clear sky"
          : [1, 2, 3].includes(code) ? "Partly cloudy"
          : [45, 48].includes(code) ? "Foggy"
          : [51, 53, 55, 56, 57].includes(code) ? "Drizzle"
          : [61, 63, 65, 66, 67, 80, 81, 82].includes(code) ? "Rain"
          : [71, 73, 75, 77, 85, 86].includes(code) ? "Snow"
          : [95, 96, 99].includes(code) ? "Thunderstorm"
          : "Current conditions";

        const hourlyTimes = weatherData.hourly?.time || [];
        const currentHour = current.time?.slice(0, 13);
        const hourIndex = hourlyTimes.findIndex((time) => time.startsWith(currentHour));
        const rainChance = hourIndex >= 0
          ? weatherData.hourly?.precipitation_probability?.[hourIndex]
          : null;

        if (!cancelled) {
          setWeather({
            loading: false,
            temperature: Math.round(current.temperature_2m ?? 0),
            condition: conditions,
            humidity: current.relative_humidity_2m ?? "--",
            wind: current.wind_speed_10m ?? "--",
            rain: rainChance ?? "--",
            resolvedLocation: [result.name, result.admin1, result.country].filter(Boolean).join(", "),
            error: false,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setWeather((old) => ({
            ...old,
            loading: false,
            error: true,
            condition: "Weather unavailable",
          }));
        }
      }
    }

    loadWeather();
    return () => { cancelled = true; };
  }, [farmLocation]);
  return (
    <>
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <span className="live-dot" />
            WORKPLACE · {farmName}
           
          </div>
          <h1>
            Good day, {adminName.split(" ")[0]} <span className="wave"></span>
          </h1>
          <p>Here is what is happening on your farm today.</p>
        </div>

        <div className="welcome-actions">
          <button
            className="secondary-btn"
            onClick={() => toast("Your report is ready to export.")}
          >
            <Download size={15} />
            Export report
          </button>
          <button className="primary-btn" onClick={openTaskModal}>
            <Plus size={16} />
            Add activity
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          title="Total land area"
          value="24.5"
          unit="acres"
          note="Across 4 fields"
          icon={Sprout}
          color="green"
        />
        <StatCard
          title="Active crops"
          value="08"
          unit="varieties"
          note="3 major crop types"
          icon={Wheat}
          color="gold"
        />
        <StatCard
          title="Water usage"
          value="68"
          unit="%"
          note="Within planned usage"
          icon={Droplets}
          color="blue"
        />
        <StatCard
          title="Crop health"
          value="92"
          unit="%"
          note="Overall healthy status"
          icon={ShieldCheck}
          color="purple"
        />
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Crop overview</h2>
              <p>Monitor your crop growth and health.</p>
            </div>
            <button
              className="text-link"
              onClick={() => selectNav("Crop management")}
            >
              View all <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="crop-list">
            {filteredCrops.length === 0 ? (
              <p className="muted-text">No crops match your search.</p>
            ) : (
              filteredCrops.map((crop) => (
                <div className="crop-row" key={crop.id}>
                  <img src={crop.image} alt={crop.name} />
                  <div className="crop-detail">
                    <div className="crop-title-line">
                      <strong>{crop.name}</strong>
                      <span
                        className={`health-badge ${
                          crop.health === "Healthy" ? "healthy" : "warning"
                        }`}
                      >
                        <span />
                        {crop.health}
                      </span>
                    </div>
                    <span className="crop-variety">{crop.variety}</span>
                    <div className="progress-line">
                      <div className={`progress-track ${crop.color}`}>
                        <span style={{ width: `${crop.progress}%` }} />
                      </div>
                      <small>{crop.progress}%</small>
                    </div>
                  </div>
                        
                  <div className="crop-stage">   
                                      <span>Growth stage</span>
                    <strong>{crop.stage}</strong>
                  </div>
                  <button
                    className="icon-btn crop-more"
                    onClick={() => selectNav("Crop management")}
                    aria-label={`View ${crop.name}`}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="panel-footer">
            <span>
              <i className="legend-dot green-dot" /> Healthy
              <i className="legend-dot amber-dot" /> Needs attention
            </span>
            <span>Sample crop data</span>
          </div>
        </section>

        <section className="panel task-panel">
          <div className="panel-heading">
            <div>
              <h2>Today's activities</h2>
              <p>Keep track of your farm work.</p>
            </div>
            <button className="text-link" onClick={openTaskModal}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="task-progress">
            <div>
              <span
                style={{
                  width: `${tasks.length ? (completedTasks / tasks.length) * 100 : 0}%`,
                }}
              />
            </div>
            <small>{completedTasks}/{tasks.length} completed</small>
          </div>

          <div className="task-list">
            {tasks.slice(0, 5).map((task) => (
              <div
                className={`task-item ${task.done ? "task-done" : ""}`}
                key={task.id}
              >
                <button
                  className={`task-check ${task.done ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                  aria-label="Toggle task completion"
                >
                  {task.done && <Check size={12} />}
                </button>
                <div className="task-content">
                  <strong>{task.title}</strong>
                  <span>
                    <Clock size={11} /> {task.time}
                  </span>
                </div>
                <button
                  className="task-more"
                  onClick={() => toggleTask(task.id)}
                  aria-label="Toggle task"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>
            ))}
          </div>

          <button
            className="panel-bottom-link"
            onClick={openTaskModal}
          >
            Add another activity <ArrowUpRight size={14} />
          </button>
        </section>
      </div>

      <div className="dashboard-grid lower-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Irrigation overview</h2>
              <p>Water usage and irrigation schedule.</p>
            </div>
            <button
              className="text-link"
              onClick={() => selectNav("Irrigation")}
            >
              Manage <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="irrigation-summary">
            <div className="water-ring">
              <div>
                <strong>68%</strong>
                <small>Used</small>
              </div>
            </div>
            <div className="irrigation-text">
              <strong>Water consumption</strong>
              <p>17,000 L of 25,000 L weekly allocation</p>
              <div className="water-bar">
                <span />
              </div>
              <small>8,000 L remaining · Sample data</small>
            </div>
          </div>
  <div className="schedule-list">
            <div className="schedule-item">
              <span className="schedule-time">06:00 AM</span>
              <span className="schedule-dot blue-dot" />
              <div>
                <strong>Wheat field irrigation</strong>
                <small>Field A · 45 minutes</small>
              </div>
              <span className="schedule-status completed">Completed</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">04:00 PM</span>
              <span className="schedule-dot blue-dot" />
              <div>
                <strong>Rice field irrigation</strong>
                <small>Field B · 60 minutes</small>
              </div>
              <span className="schedule-status scheduled">Scheduled</span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>AI recommendations</h2>
              <p>Suggested actions for your farm.</p>
            </div>
            <span className="ai-pill">
              <BrainCircuit size={12} /> AI INSIGHTS
            </span>
          </div>

          <div className="recommendation">
            <div className="recommend-icon amber">
              <AlertTriangle size={17} />
            </div>
            <div>
              <span className="rec-tag">CROP HEALTH</span>
              <strong>Monitor cotton moisture</strong>
              <p>
                Review soil moisture in Field C and check whether additional
                irrigation is needed.
              </p>
              <button onClick={() => selectNav("AI recommendations")}>
                View recommendation <ChevronRight size={13} />
              </button>
            </div>
          </div>

          <div className="recommendation">
            <div className="recommend-icon green">
              <Leaf size={17} />
            </div>
            <div>
              <span className="rec-tag">FIELD MANAGEMENT</span>
              <strong>Review fertilizer schedule</strong>
              <p>
                Check the next planned fertilizer application for your rice
                field.
              </p>
              <button onClick={() => selectNav("AI recommendations")}>
                View recommendation <ChevronRight size={13} />
              </button>
            </div>
          </div>
           <p className="disclaimer">
            Demonstration recommendations only. Not generated from live farm
            sensors or an AI service.
          </p>
        </section>
      </div>

      <section className="panel market-panel">
        <div className="panel-heading">
          <div>
            <h2>Market prices</h2>
            <p>Example commodity prices for your region.</p>
          </div>
          <button
            className="text-link"
            onClick={() => selectNav("Market prices")}
          >
            View market <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="market-table">
          <div className="market-head">
            <span>COMMODITY</span>
            <span>MARKET</span>
            <span>PRICE / QUINTAL</span>
            <span>CHANGE</span>
          </div>
          {marketData.map((item) => (
            <div className="market-row" key={item.name}>
              <strong>
                <span className="commodity-icon">
                  <Wheat size={14} />
                </span>
                {item.name}
              </strong>
              <span>{item.market}</span>
              <strong>{item.price}</strong>
              <span className={`market-change ${item.up ? "up" : "down"}`}>
                {item.up ? (
                  <ArrowUpRight size={13} />
                ) : (
                  <ArrowDownRight size={13} />
                )}
                {item.change}%
              </span>
            </div>
          ))}
        </div>
        <p className="disclaimer">
          Sample prices only. Verify current prices with your local market
          before making trading decisions.
        </p>
      </section>

      <footer className="footer">
        <span>© 2026 AgriSmart. Smart farming management.</span>
        <span><i className="footer-status" /> Dashboard ready</span>
        <span>Designed for better farming <Leaf size={12} /></span>
      </footer>
    </>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setError("");
    onLogin();
  };
   return (
    <main className="login-screen">
      <section className="login-card">
        <div className="brand-mark login-brand-mark"><Sprout size={26} /></div>
        <div className="login-brand-name">Agri<span>Smart</span></div>
        <p className="login-subtitle">Smart agriculture. Better decisions.</p>
        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Sign in to continue to your AgriSmart workplace.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <div className="login-input-wrap">
            <Mail size={17} />
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              
  
  required
            />
          </div>
          <label htmlFor="login-password">Password</label>
          <div className="login-input-wrap">
            <LockKeyhole size={17} />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              className="login-password-toggle"
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="primary-btn login-submit" type="submit">
            Continue to AgriSmart <ArrowUpRight size={16} />
          </button>
        </form>
        <p className="login-demo-note">
          Demo sign-in: enter any valid email address and a password to continue.
        </p>
      </section>
    </main>
  );
}

function StatCard({ title, value, unit, note, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <span className={`stat-icon ${color}`}>
          <Icon size={17} />
        </span>
      </div>
      <div className="stat-value">
        {value}
        <small>{unit}</small>
      </div>
      <div className="stat-bottom">{note}</div>
    </div>
  );
}

function SettingsPage({
  darkMode,
  setDarkMode,
  rtl,
  setRtl,
  farmName,
  setFarmName,
  farmLocation,
  setFarmLocation,
  toast,
}) {
  const [name, setName] = useState(farmName);
  const [location, setLocation] = useState(farmLocation);

  const saveFarm = (event) => {
    event.preventDefault();
    setFarmName(name);
    setFarmLocation(location);
    toast("Farm settings saved successfully");
  };

  return (
    <div className="section-page">
      <div className="welcome-row section-welcome">
        <div>
          <div className="eyebrow">PREFERENCES</div>
          <h1>Settings</h1>
          <p>Manage your dashboard preferences and farm information.</p>
        </div>
      </div>

      <section className="panel section-panel settings-panel">
        <h2>Appearance and display</h2>

        <div className="setting-row">
          <div>
            <strong>Dark mode</strong>
            <p>Switch between light and dark dashboard themes.</p>
          </div>
          <button
            className={`switch ${darkMode ? "on" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            <span />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <strong>Right-to-left layout</strong>
            <p>Change the text and layout direction.</p>
          </div>
          <button
            className={`switch ${rtl ? "on" : ""}`}
            onClick={() => setRtl(!rtl)}
            aria-label="Toggle right-to-left layout"
          >
            <span />
          </button>
        </div>
      </section>

      <section className="panel section-panel">
        <div className="panel-heading">
          <div>
            <h2>Farm information</h2>
            <p>Update your farm workspace details.</p>
          </div>
        </div>
        
        <form className="settings-form" onSubmit={saveFarm}>
          <label>Farm / business name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Farm location</label>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />

          <button className="primary-btn" type="submit">
            <Save size={15} /> Save changes
          </button>
        </form>
      </section>
    </div>
  );
}

function ProfilePage({
  adminName,
  setAdminName,
  adminRole,
  setAdminRole,
  toast,
}) {
  const [name, setName] = useState(adminName);
  const [role, setRole] = useState(adminRole);

  const saveProfile = (event) => {
    event.preventDefault();
    setAdminName(name);
    setAdminRole(role);
    toast("Profile updated successfully");
  };

  return (
    <div className="section-page">
      <div className="welcome-row section-welcome">
        <div>
          <div className="eyebrow">ACCOUNT</div>
          <h1>My profile</h1>
          <p>Manage your personal profile information.</p>
        </div>
      </div>

      <section className="panel section-panel profile-edit-panel">
        <div className="profile-large-avatar">{getInitials(adminName)}</div>
        <h2>{adminName}</h2>
        <p className="muted-text">{adminRole}</p>

        <form onSubmit={saveProfile}>
          <label>Full name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Role</label>
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />
           <button type="submit" className="primary-btn">
            <Save size={15} /> Save profile
          </button>
        </form>
      </section>
    </div>
  );
}

function SectionPage({ active, selectNav, toast }) {
  const content = {
    "Farm overview": {
      title: "Farm overview",
      description: "Your farm information and field summary.",
      metric: "24.5 acres",
      metricLabel: "Total registered farm area",
    },
    "Crop management": {
      title: "Crop management",
      description: "Monitor crop stages, field progress and crop health.",
      metric: "08 crops",
      metricLabel: "Currently tracked crop varieties",
    },
    Irrigation: {
      title: "Irrigation management",
      description: "Review water consumption and irrigation schedules.",
      metric: "68%",
      metricLabel: "Weekly water usage",
    },
    "Soil health": {
      title: "Soil health",
      description: "Review soil metrics and field conditions.",
      metric: "6.8 pH",
      metricLabel: "Example soil pH measurement",
    },
    Equipment: {
      title: "Farm equipment",
      description: "Manage equipment and maintenance information.",
      metric: "06 units",
      metricLabel: "Example registered equipment",
    },
    "AI recommendations": {
      title: "AI recommendations",
      description: "Review suggested crop and farm management actions.",
      metric: "02 insights",
      metricLabel: "Example recommendations",
    },
    "Crop reports": {
      title: "Crop reports",
      description: "Review your farm performance and crop reports.",
      metric: "92%",
      metricLabel: "Example overall crop health",
    },
    "Market prices": {
      title: "Market prices",
      description: "Review example commodity market prices.",
      metric: "04 crops",
      metricLabel: "Example tracked commodities",
    },
  };
  const page = content[active] || {
    title: active,
    description: "Manage your farm information.",
    metric: "—",
    metricLabel: "No information available",
  };

  return (
    <div className="section-page">
      <div className="welcome-row section-welcome">
        <div>
          <div className="eyebrow">AGRISMART MANAGEMENT</div>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        <div className="welcome-actions">
          <button
            className="secondary-btn"
            onClick={() => toast("This is demonstration data.")}
          >
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <div className="section-cards">
        <section className="panel section-panel">
          <div className="panel-heading">
            <div>
              <h2>{page.title} summary</h2>
              <p>Current overview</p>
            </div>
            <span className="stat-icon green">
              <Sprout size={18} />
            </span>
          </div>
          <div className="big-metric">
            {page.metric}
            <small>{page.metricLabel}</small>
          </div>
          <p className="muted-text">
            This section currently displays sample information for the
            AgriSmart demonstration dashboard.
          </p>
        </section>

        <section className="panel section-panel">
          <div className="panel-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Explore other farm sections.</p>
            </div>
          </div>
          <div className="equipment-grid">
            <button
              className="equipment-card"
              onClick={() => selectNav("Crop management")}
            >
              <span className="equipment-icon"><Wheat size={19} /></span>
              <strong>Manage crops</strong>
              <small>Crop growth and health</small>
            </button>
            <button
              className="equipment-card"
              onClick={() => selectNav("Irrigation")}
            >
              <span className="equipment-icon"><Droplets size={19} /></span>
              <strong>Irrigation</strong>
              <small>Water schedules</small>
            </button>
            <button
              className="equipment-card"
              onClick={() => selectNav("Crop reports")}
            >
              <span className="equipment-icon"><FileBarChart size={19} /></span>
              <strong>Reports</strong>
              <small>Farm performance</small>
            </button>
          </div>
        </section>
      </div>

      <section className="panel section-panel">
        <h2>Information</h2>
        <p className="muted-text">
          Detailed records, live sensor readings and connected services can
          be added to this section as the project is integrated with real
          farm data sources.
        </p>
      </section>
    </div>
  );
}
export default App;

