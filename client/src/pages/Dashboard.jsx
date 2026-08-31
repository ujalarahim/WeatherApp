import React from "react";
import { useAuth } from "../hooks/useAuth";
import {
  FiUser,
  FiMail,
  FiShield,
  FiActivity,
  FiLogOut,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineBell,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../Api/AuthApi";

const Dashboard = () => {

  const navigate = useNavigate();  
  const { user, setUser, setAccessToken } = useAuth();


  async function handleLogout() {
        try {
          await AuthApi.logout();
          //setting user and access token to null
          setUser(null);
          setAccessToken(null);
          navigate("/login")
        } catch (error) {
          console.log(error, "error from logout")
        }
  }

  const stats = [
    {
      icon: <FiActivity className="w-6 h-6" />,
      label: "Status",
      value: "Active",
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      label: "Role",
      value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "User",
      color: "text-primary-light",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "N/A",
      color: "text-accent-light",
      bg: "bg-accent/10",
      border: "border-accent/20",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      label: "Last Updated",
      value: user?.updatedAt
        ? new Date(user.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "N/A",
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/20",
    },
  ];

  const quickActions = [
    {
      icon: <HiOutlineCog className="w-5 h-5" />,
      label: "Settings",
      desc: "Manage preferences",
    },
    {
      icon: <HiOutlineBell className="w-5 h-5" />,
      label: "Notifications",
      desc: "View alerts",
    },
    {
      icon: <HiOutlineChartBar className="w-5 h-5" />,
      label: "Analytics",
      desc: "View insights",
    },
  ];

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-20%] right-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-blob delay-2000" />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-surface-lighter/50 bg-surface-light/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <HiOutlineSparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4 animate-slide-in-right">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface/80 border border-surface-lighter rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Online</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm font-medium hover:bg-danger/20 hover:border-danger/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">👋</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent">
                {user?.name || "User"}
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm ml-10">
            Here&apos;s your account overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`${stat.bg} border ${stat.border} rounded-2xl p-5 animate-fade-in-up hover:scale-[1.03] transition-transform duration-300`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className={`${stat.color} mb-3`}>{stat.icon}</div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 rounded-2xl p-6 shadow-xl shadow-black/20 animate-fade-in-up delay-500">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <FiUser className="w-5 h-5 text-primary-light" />
              Profile Information
            </h2>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-primary/30 animate-pulse-glow">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </div>

              {/* Info Grid */}
              <div className="flex-1 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-surface/60 border border-surface-lighter/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiUser className="w-3.5 h-3.5" />
                      <span className="text-xs uppercase tracking-wider">
                        Name
                      </span>
                    </div>
                    <p className="text-white font-medium">
                      {user?.name || "N/A"}
                    </p>
                  </div>
                  <div className="bg-surface/60 border border-surface-lighter/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiMail className="w-3.5 h-3.5" />
                      <span className="text-xs uppercase tracking-wider">
                        Email
                      </span>
                    </div>
                    <p className="text-white font-medium text-sm break-all">
                      {user?.email || "N/A"}
                    </p>
                  </div>
                  <div className="bg-surface/60 border border-surface-lighter/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <span className="text-xs">⚧</span>
                      <span className="text-xs uppercase tracking-wider">
                        Gender
                      </span>
                    </div>
                    <p className="text-white font-medium capitalize">
                      {user?.gender || "N/A"}
                    </p>
                  </div>
                  <div className="bg-surface/60 border border-surface-lighter/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiShield className="w-3.5 h-3.5" />
                      <span className="text-xs uppercase tracking-wider">
                        Role
                      </span>
                    </div>
                    <p className="text-white font-medium capitalize">
                      {user?.role || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 rounded-2xl p-6 shadow-xl shadow-black/20 animate-fade-in-up delay-700">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <HiOutlineSparkles className="w-5 h-5 text-accent-light" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, i) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-3.5 bg-surface/60 border border-surface-lighter/30 rounded-xl text-left hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-surface-lighter/50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-primary-light group-hover:bg-primary/10 transition-all duration-300">
                    {action.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-500">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-fade-in delay-1000">
          <div className="flex justify-center gap-1.5 mb-3">
            <div className="w-2 h-1 bg-primary/30 rounded-full" />
            <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            <div className="w-2 h-1 bg-accent/30 rounded-full" />
          </div>
          <p className="text-xs text-gray-600">
            Sheraz Company • Built with ❤️
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
