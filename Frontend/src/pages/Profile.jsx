import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [contracts, setContracts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({
    property: "",
    issueDescription: "",
    priority: "MEDIUM",
    notes: "",
  });
  const [maintenanceMessage, setMaintenanceMessage] = useState("");
  const [maintenanceError, setMaintenanceError] = useState("");
  const [submittingMaintenance, setSubmittingMaintenance] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchBookings = useCallback(async () => {
    if (!user?.email) return;

    setLoadingBookings(true);
    const normalizedUserEmail = encodeURIComponent(
      user.email.toLowerCase().trim(),
    );

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/user/${normalizedUserEmail}`,
      );

      if (!response.ok) {
        setBookings([]);
        setLoadingBookings(false);
        return;
      }

      const data = await response.json();

      if (!data.bookings || !Array.isArray(data.bookings)) {
        setBookings([]);
        setLoadingBookings(false);
        return;
      }

      setBookings(data.bookings);
    } catch {
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }, [user?.email, API_URL]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/api/contracts/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setContracts(data?.contracts || []));
  }, [user?.id, API_URL]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API_URL}/api/inquiries/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => setInquiries(data?.inquiries || []))
      .catch(() => setInquiries([]));
  }, [user?.email, API_URL]);

  const fetchMaintenance = useCallback(async () => {
    if (!user?.email) return;

    setMaintenanceLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/maintenance`);
      if (!res.ok) {
        setMaintenanceRequests([]);
        setMaintenanceLoading(false);
        return;
      }
      const data = await res.json();
      if (!data.maintenance || !Array.isArray(data.maintenance)) {
        setMaintenanceRequests([]);
        setMaintenanceLoading(false);
        return;
      }
      const normalizedUserEmail = user.email.toLowerCase().trim();
      setMaintenanceRequests(
        data.maintenance.filter(
          (item) =>
            item.requesterEmail?.toLowerCase().trim() === normalizedUserEmail,
        ),
      );
    } catch {
      setMaintenanceRequests([]);
    } finally {
      setMaintenanceLoading(false);
    }
  }, [user?.email, API_URL]);

  const handleMaintenanceChange = (event) => {
    const { name, value } = event.target;
    setMaintenanceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMaintenanceError("");
    setMaintenanceMessage("");
  };

  const handleMaintenanceSubmit = async (event) => {
    event.preventDefault();
    if (
      !maintenanceForm.property.trim() ||
      !maintenanceForm.issueDescription.trim()
    ) {
      setMaintenanceError("Please fill in the property and issue details.");
      return;
    }

    setSubmittingMaintenance(true);
    setMaintenanceError("");
    try {
      const response = await fetch(`${API_URL}/api/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requester: user.name || user.email,
          requesterEmail: user.email,
          property: maintenanceForm.property.trim(),
          issueDescription: maintenanceForm.issueDescription.trim(),
          priority: maintenanceForm.priority,
          notes: maintenanceForm.notes.trim(),
          status: "PENDING",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to submit maintenance request.",
        );
      }

      setMaintenanceForm({
        property: "",
        issueDescription: "",
        priority: "MEDIUM",
        notes: "",
      });
      setMaintenanceMessage("Maintenance request submitted successfully.");
      await fetchMaintenance();
    } catch (error) {
      setMaintenanceError(
        error.message || "Unable to submit request. Please try again.",
      );
    } finally {
      setSubmittingMaintenance(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    fetchBookings();
  }, [user?.email, API_URL, fetchBookings]);

  useEffect(() => {
    if (activeTab === "bookings" && user?.email) {
      fetchBookings();
    }
    if (activeTab === "maintenance" && user?.email) {
      fetchMaintenance();
    }
  }, [activeTab, fetchBookings, fetchMaintenance, user?.email]);

  useEffect(() => {
    const handleFocus = () => {
      if (user?.email) {
        fetchBookings();
        if (activeTab === "maintenance") fetchMaintenance();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchBookings, fetchMaintenance, activeTab, user?.email]);

  useEffect(() => {
    if (activeTab !== "bookings" || !user?.email) return;

    const interval = setInterval(() => {
      fetchBookings();
    }, 15000);

    return () => clearInterval(interval);
  }, [activeTab, fetchBookings, user?.email]);

  useEffect(() => {
    if (activeTab !== "maintenance" || !user?.email) return;

    const interval = setInterval(() => {
      fetchMaintenance();
    }, 15000);

    return () => clearInterval(interval);
  }, [activeTab, fetchMaintenance, user?.email]);

  useEffect(() => {
    if (!user?.email) return;

    const interval = setInterval(() => {
      fetchMaintenance();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchMaintenance, user?.email]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white border border-slate-200 p-10 rounded-2xl text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Login Required
          </h2>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-linear-to-r from-violet-500 to-blue-500 text-white rounded-xl font-semibold text-sm"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const displayName = user.name || "User";
  const activeContracts = contracts.filter((c) => c.status === "Active").length;

  return (
    <div className="flex bg-slate-100 text-slate-800 min-h-screen">
      {/* ── SIDEBAR ── */}
      <aside className="w-56 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col shadow-sm sticky top-0">
        <h2 className="text-xl font-bold text-slate-800 mb-8 tracking-tight">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-1 flex-1">
          <NavBtn
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavBtn
            label="Contracts"
            active={activeTab === "contracts"}
            onClick={() => setActiveTab("contracts")}
          />
          <NavBtn
            label="Inquiries"
            active={activeTab === "inquiries"}
            onClick={() => setActiveTab("inquiries")}
          />
          <NavBtn
            label="Bookings"
            active={activeTab === "bookings"}
            onClick={() => setActiveTab("bookings")}
          />
          <NavBtn
            label="Maintenance"
            active={activeTab === "maintenance"}
            onClick={() => setActiveTab("maintenance")}
          />
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <main
        className="flex-1 p-8 overflow-y-auto hide-scrollbar"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
      >
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Hi, {displayName} 👋
          </h1>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Contracts"
            value={contracts.length}
            accent="border-t-violet-400"
            label="text-violet-500"
          />
          <StatCard
            title="Active"
            value={activeContracts}
            accent="border-t-emerald-400"
            label="text-emerald-500"
          />
          <StatCard
            title="Inquiries"
            value={inquiries.length}
            accent="border-t-blue-400"
            label="text-blue-500"
          />
          <StatCard
            title="Bookings"
            value={bookings.length}
            accent="border-t-orange-400"
            label="text-orange-500"
          />
        </div>

        {/* Content Panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {activeTab === "overview" && (
            <>
              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                Recent Contracts
              </h2>
              {contracts.slice(0, 5).map((c) => (
                <ContractRow
                  key={c._id}
                  contract={c}
                  onClick={() => setSelectedContract(c)}
                />
              ))}
              {contracts.length === 0 && <Empty />}
            </>
          )}

          {activeTab === "contracts" && (
            <>
              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                All Contracts
              </h2>
              {contracts.map((c) => (
                <ContractRow
                  key={c._id}
                  contract={c}
                  onClick={() => setSelectedContract(c)}
                  showStatus
                />
              ))}
              {contracts.length === 0 && <Empty />}
            </>
          )}

          {activeTab === "inquiries" && (
            <>
              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                My Inquiries
              </h2>
              {inquiries.length > 0 ? (
                <div className="space-y-2">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition flex items-center justify-between gap-4 bg-white"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 truncate">
                          {inq.propertyTitle ||
                            inq.subject ||
                            "Property Inquiry"}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {inq.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                            inq.status === "NEW"
                              ? "bg-blue-100 text-blue-700"
                              : inq.status === "CONTACTED"
                                ? "bg-amber-100 text-amber-700"
                                : inq.status === "REPLIED"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {inq.status}
                        </span>
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
                        >
                          view
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty message="No inquiries yet" />
              )}
            </>
          )}

          {activeTab === "bookings" && (
            <>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold text-slate-800">
                  My Property Viewings
                </h2>
                <button
                  onClick={fetchBookings}
                  disabled={loadingBookings}
                  className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-semibold rounded transition"
                >
                  {loadingBookings ? "🔄 Loading..." : "🔄 Refresh"}
                </button>
              </div>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-slate-200 rounded-3xl p-5 bg-white shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                              {booking.propertyTitle || "Property Viewing"}
                            </h3>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                booking.status === "PENDING"
                                  ? "bg-amber-100 text-amber-700"
                                  : booking.status === "CONFIRMED"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : booking.status === "COMPLETED"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-slate-500">
                            <p className="wrap-break-word">
                              <span className="font-semibold text-slate-700">
                                Date:
                              </span>{" "}
                              {new Date(booking.visitDate).toLocaleDateString(
                                "en-GB",
                              )}
                            </p>
                            <p className="wrap-break-word">
                              <span className="font-semibold text-slate-700">
                                Time:
                              </span>{" "}
                              {booking.visitTime}
                            </p>
                            <p className="wrap-break-word">
                              <span className="font-semibold text-slate-700">
                                Agent:
                              </span>{" "}
                              {booking.agent || "Unassigned"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="self-start sm:self-auto px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-full transition"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty message="No property viewings booked yet" />
              )}
            </>
          )}
          {activeTab === "maintenance" && (
            <>
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-800">
                  Maintenance Requests
                </h2>
                <button
                  onClick={fetchMaintenance}
                  disabled={maintenanceLoading}
                  className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-semibold rounded transition"
                >
                  {maintenanceLoading ? "🔄 Loading..." : "🔄 Refresh"}
                </button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_0.95fr] gap-6">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Submit a Maintenance Request
                    </h3>
                    <form
                      onSubmit={handleMaintenanceSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Property / Location
                        </label>
                        <input
                          name="property"
                          value={maintenanceForm.property}
                          onChange={handleMaintenanceChange}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Property name or address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Issue Description
                        </label>
                        <textarea
                          name="issueDescription"
                          value={maintenanceForm.issueDescription}
                          onChange={handleMaintenanceChange}
                          rows={4}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 resize-none"
                          placeholder="Describe the maintenance issue"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Priority
                          </label>
                          <select
                            name="priority"
                            value={maintenanceForm.priority}
                            onChange={handleMaintenanceChange}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Additional Notes
                          </label>
                          <input
                            name="notes"
                            value={maintenanceForm.notes}
                            onChange={handleMaintenanceChange}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                            placeholder="Optional details"
                          />
                        </div>
                      </div>
                      {maintenanceError && (
                        <p className="text-sm text-red-600">
                          {maintenanceError}
                        </p>
                      )}
                      {maintenanceMessage && (
                        <p className="text-sm text-emerald-700">
                          {maintenanceMessage}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={submittingMaintenance}
                        className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition disabled:opacity-60"
                      >
                        {submittingMaintenance
                          ? "Submitting..."
                          : "Submit Request"}
                      </button>
                    </form>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Your Requests
                    </h3>
                    {maintenanceLoading ? (
                      <p className="text-slate-500">Loading requests...</p>
                    ) : maintenanceRequests.length === 0 ? (
                      <p className="text-slate-500">
                        No maintenance requests yet.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {maintenanceRequests.map((request) => (
                          <div
                            key={request._id}
                            className="rounded-3xl border border-slate-200 p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
                                  {request.property}
                                </p>
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                  {request.issueDescription}
                                </p>
                              </div>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  request.status === "PENDING"
                                    ? "bg-amber-100 text-amber-700"
                                    : request.status === "IN_PROGRESS"
                                      ? "bg-blue-100 text-blue-700"
                                      : request.status === "COMPLETED"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {request.status}
                              </span>
                            </div>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                              <p>
                                <span className="font-semibold text-slate-800">
                                  Priority:
                                </span>{" "}
                                {request.priority}
                              </p>
                              <p>
                                <span className="font-semibold text-slate-800">
                                  Requested:
                                </span>{" "}
                                {new Date(request.createdAt).toLocaleDateString(
                                  "en-GB",
                                )}
                              </p>
                            </div>
                            {request.notes && (
                              <p className="mt-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl">
                                {request.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Request Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-2">
                        Total
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        {maintenanceRequests.length}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-2">
                        Pending
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        {
                          maintenanceRequests.filter(
                            (r) => r.status === "PENDING",
                          ).length
                        }
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-2">
                        In progress
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        {
                          maintenanceRequests.filter(
                            (r) => r.status === "IN_PROGRESS",
                          ).length
                        }
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-2">
                        Completed
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        {
                          maintenanceRequests.filter(
                            (r) => r.status === "COMPLETED",
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

      {/* ── BOOKING DETAIL MODAL ── */}
      {selectedBooking && (
        <div
          onClick={() => setSelectedBooking(null)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-xl flex flex-col"
          >
            <div className="h-1 w-full bg-linear-to-r from-teal-500 to-teal-600" />
            <div
              className="p-6 sm:p-8 overflow-y-auto flex-1 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
                📋 Viewing Details
              </h2>

              {/* Status Badge */}
              <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedBooking.status === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : selectedBooking.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-700"
                        : selectedBooking.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              {/* Property Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  🏠 Property
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">
                      PROPERTY TITLE
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {selectedBooking.propertyTitle || "—"}
                    </p>
                  </div>
                  {selectedBooking.unit && (
                    <div>
                      <p className="text-xs text-slate-600 font-semibold">
                        UNIT
                      </p>
                      <p className="text-slate-800 font-semibold">
                        {selectedBooking.unit || "—"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Visit Details */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  📅 Visit Schedule
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">DATE</p>
                    <p className="text-slate-800 font-semibold">
                      {new Date(selectedBooking.visitDate).toLocaleDateString(
                        "en-GB",
                        { year: "numeric", month: "long", day: "2-digit" },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">TIME</p>
                    <p className="text-slate-800 font-semibold">
                      {selectedBooking.visitTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agent Info */}
              {selectedBooking.agent && (
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                    👤 Agent
                  </h3>
                  <p className="text-slate-800 font-semibold">
                    {selectedBooking.agent}
                  </p>
                </div>
              )}

              {/* Customer Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  👤 Your Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">NAME</p>
                    <p className="text-slate-800 font-semibold">
                      {selectedBooking.customerName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">
                      EMAIL
                    </p>
                    <p className="text-slate-800 font-semibold text-sm break-all">
                      {selectedBooking.customerEmail || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">
                      PHONE
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {selectedBooking.customerPhone || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                    📝 Notes
                  </h3>
                  <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm leading-relaxed">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              {/* Booking Date */}
              <div className="mb-6">
                <p className="text-xs text-slate-600 font-semibold mb-2">
                  📅 BOOKING DATE
                </p>
                <p className="text-slate-800">
                  {new Date(selectedBooking.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>
            </div>

            {/* Close Button - Fixed Bottom */}
            <div className="p-6 sm:p-8 border-t border-slate-200 bg-white">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INQUIRY DETAIL MODAL ── */}
      {selectedInquiry && (
        <div
          onClick={() => setSelectedInquiry(null)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-xl flex flex-col"
          >
            <div className="h-1 w-full bg-linear-to-r from-violet-500 to-blue-500" />
            <div
              className="p-6 sm:p-8 overflow-y-auto flex-1 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
                📋 Inquiry Details
              </h2>

              {/* Status Badge */}
              <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedInquiry.status === "NEW"
                      ? "bg-blue-100 text-blue-700"
                      : selectedInquiry.status === "CONTACTED"
                        ? "bg-amber-100 text-amber-700"
                        : selectedInquiry.status === "REPLIED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {selectedInquiry.status}
                </span>
              </div>

              {/* Property Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  🏠 Property
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">
                      PROPERTY TITLE
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {selectedInquiry.propertyTitle || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">
                      AMOUNT
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {selectedInquiry.amount
                        ? `£${selectedInquiry.amount}`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  📝 Subject
                </h3>
                <p className="text-slate-800">
                  {selectedInquiry.subject || "No subject provided"}
                </p>
              </div>

              {/* Message */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  💬 Message
                </h3>
                <p className="text-slate-800 bg-slate-50 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Date Info */}
              <div className="mb-6">
                <p className="text-xs text-slate-600 font-semibold mb-2">
                  📅 CREATED DATE
                </p>
                <p className="text-slate-800">
                  {new Date(selectedInquiry.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>
            </div>

            {/* Close Button - Fixed Bottom */}
            <div className="p-6 sm:p-8 border-t border-slate-200 bg-white">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-full py-3 bg-linear-to-r from-violet-500 to-blue-500 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL ── */}
      {selectedContract && (
        <div
          onClick={() => setSelectedContract(null)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar shadow-xl"
          >
            <div className="h-1 w-full bg-linear-to-r from-violet-500 to-blue-500" />
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
                📋 Contract Details
              </h2>

              {/* Status Badge */}
              <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusStyle(selectedContract.status)}`}
                >
                  {selectedContract.status}
                </span>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                  Type: {selectedContract.contractType || "Rental Agreement"}
                </span>
              </div>

              {/* Property & Unit Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  🏠 Property & Unit
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <ModalRow
                    label="Property"
                    value={selectedContract.property?.title || "—"}
                  />
                  {selectedContract.unit?.unitNumber && (
                    <ModalRow
                      label="Unit #"
                      value={selectedContract.unit.unitNumber}
                    />
                  )}
                  {selectedContract.unit?.block && (
                    <ModalRow
                      label="Block"
                      value={selectedContract.unit.block}
                    />
                  )}
                  {selectedContract.unit?.floorLevel && (
                    <ModalRow
                      label="Floor"
                      value={selectedContract.unit.floorLevel}
                    />
                  )}
                  {selectedContract.unit?.unitType && (
                    <ModalRow
                      label="Unit Type"
                      value={selectedContract.unit.unitType}
                    />
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  👤 Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <ModalRow
                    label="Name"
                    value={
                      selectedContract.customer?.name ||
                      selectedContract.customerId ||
                      "—"
                    }
                  />
                  <ModalRow
                    label="Email"
                    value={selectedContract.customer?.email || "—"}
                  />
                  <ModalRow
                    label="Phone"
                    value={selectedContract.customer?.phone || "—"}
                  />
                </div>
              </div>

              {/* Financial Details */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  💰 Financial Terms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <ModalRow
                    label="Monthly Amount"
                    value={`£${(selectedContract.amount || 0).toLocaleString()}`}
                    bold
                  />
                  <ModalRow
                    label="Billing Cycle"
                    value={selectedContract.billingCycle || "Monthly"}
                  />
                  {selectedContract.securityDeposit > 0 && (
                    <ModalRow
                      label="Security Deposit"
                      value={`£${(selectedContract.securityDeposit || 0).toLocaleString()}`}
                    />
                  )}
                  {selectedContract.lateFee > 0 && (
                    <ModalRow
                      label="Late Payment Fee"
                      value={`£${(selectedContract.lateFee || 0).toLocaleString()}`}
                    />
                  )}
                </div>
              </div>

              {/* Contract Duration */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  📅 Contract Period
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <ModalRow
                    label="Start Date"
                    value={
                      selectedContract.startDate
                        ? new Date(
                            selectedContract.startDate,
                          ).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })
                        : "—"
                    }
                  />
                  <ModalRow
                    label="End Date"
                    value={
                      selectedContract.endDate
                        ? new Date(selectedContract.endDate).toLocaleDateString(
                            "en-GB",
                            { year: "numeric", month: "short", day: "2-digit" },
                          )
                        : "—"
                    }
                  />
                </div>
                {selectedContract.startDate && selectedContract.endDate && (
                  <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-2 rounded">
                    Duration:{" "}
                    {Math.ceil(
                      (new Date(selectedContract.endDate) -
                        new Date(selectedContract.startDate)) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    days
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              {selectedContract.additionalNotes && (
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                    📝 Terms & Notes
                  </h3>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                    {selectedContract.additionalNotes}
                  </p>
                </div>
              )}

              {/* Documents */}
              {selectedContract.documents &&
                selectedContract.documents.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                      📎 Attached Documents ({selectedContract.documents.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedContract.documents.map((doc, idx) => {
                        const documentHref =
                          doc.url ||
                          `${API_URL}/api/contracts/${selectedContract._id}/download/${idx}`;
                        return (
                          <a
                            key={idx}
                            href={documentHref}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded text-sm transition"
                          >
                            📄 {doc.filename || `Document ${idx + 1}`}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Summary Card */}
              <div className="mb-6 p-4 bg-linear-to-r from-violet-50 to-blue-50 border border-violet-200 rounded-lg">
                <h4 className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-2">
                  Contract Summary
                </h4>
                <div className="text-sm text-violet-900 space-y-1">
                  <p>
                    📍 {selectedContract.property?.title || "—"} •{" "}
                    {selectedContract.unit?.unitNumber || "—"}
                  </p>
                  <p>
                    � £{(selectedContract.amount || 0).toLocaleString()}{" "}
                    {selectedContract.billingCycle || "Monthly"}
                  </p>
                  <p>🧑 {selectedContract.customer?.name || "—"}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <a
                  href={`${API_URL}/api/contracts/${selectedContract._id}/pdf`}
                  download={`Contract-${selectedContract._id}.pdf`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
                >
                  📥 Download Contract PDF
                </a>
                <button
                  onClick={() => setSelectedContract(null)}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-100 text-slate-900 rounded-xl font-semibold text-sm hover:bg-slate-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── COMPONENTS ── */

function NavBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition border-l-2 ${
        active
          ? "bg-violet-50 text-violet-600 border-violet-500"
          : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({ title, value, accent, label }) {
  return (
    <div
      className={`bg-white border border-slate-200 border-t-2 ${accent} rounded-2xl p-5 hover:shadow-md transition shadow-sm`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${label}`}
      >
        {title}
      </p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function ContractRow({ contract, onClick, showStatus }) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center px-4 py-3.5 rounded-xl border border-slate-200 mb-2.5 cursor-pointer hover:bg-slate-50 hover:border-violet-300 transition"
    >
      <div>
        <p className="text-sm text-slate-700 font-medium">
          {contract.property?.title || "Property"}
        </p>
        {showStatus && (
          <span
            className={`inline-block mt-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${statusStyle(contract.status)}`}
          >
            {contract.status}
          </span>
        )}
      </div>
      <span className="text-sm font-semibold text-violet-500">
        £{contract.amount?.toLocaleString()}
      </span>
    </div>
  );
}

function ModalRow({ label, value, bold }) {
  return (
    <div className="flex justify-between items-start gap-2 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wide min-w-fit">
        {label}
      </span>
      <span
        className={`text-sm text-right text-slate-700 ${bold ? "font-bold" : "font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Empty({ message = "No contracts found." }) {
  return <p className="text-slate-400 text-center py-10 text-sm">{message}</p>;
}

function statusStyle(status) {
  if (status === "Active") return "bg-emerald-100 text-emerald-600";
  if (status === "Draft") return "bg-amber-100 text-amber-600";
  return "bg-slate-100 text-slate-500";
}
