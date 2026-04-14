import { useCallback, useEffect, useMemo, useRef, useState, useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import BlogManager from "../components/BlogManager";

const TAB_OPTIONS = [
  { section: "MAIN", items: ["dashboard"] },
  {
    section: "REAL ESTATE",
    items: [
      "properties",
      "units",
      "contracts",
      "inquiries",
      "bookings",
      "maintenance",
    ],
  },
  {
    section: "FINANCE",
    items: ["payments", "due-collection", "payroll", "expenses"],
  },
  { section: "PEOPLE", items: ["agents", "owners", "staff", "customers"] },
  { section: "CONTENT", items: ["blogs"] },
  { section: "ADMIN", items: ["users", "roles", "profile"] },
];

const UNIT_STATUS_OPTIONS = [
  "Available",
  "Rented",
  "Sold",
  "Booked",
  "Reserved",
  "Maintenance",
];

const ROLE_FEATURES = [
  { key: "properties", label: "Properties" },
  { key: "contracts", label: "Contracts & Leases" },
  { key: "bookings", label: "Bookings" },
  { key: "inquiries", label: "Lead Inquiries" },
  { key: "maintenance", label: "Maintenance" },
  { key: "payroll", label: "Payroll" },
  { key: "payments", label: "Payments & Invoices" },
  { key: "dueCollection", label: "Due Collection" },
  { key: "owners", label: "Property Owners" },
  { key: "agents", label: "Agents" },
  { key: "customers", label: "Customers / Tenants" },
  { key: "expenses", label: "Expenses" },
  { key: "staff", label: "Staff Management" },
  { key: "users", label: "User Management" },
  { key: "roles", label: "Role Management" },
  { key: "units", label: "Units" },
  { key: "financialReports", label: "Financial Reports" },
];

const normalizeUnitStatus = (status) => {
  if (!status) return "Available";
  const normalized = status.toString().trim();
  const found = UNIT_STATUS_OPTIONS.find(
    (opt) => opt.toLowerCase() === normalized.toLowerCase(),
  );
  return found || normalized;
};

const icons = {
  dashboard: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  properties: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  units: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  contracts: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  ),
  inquiries: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="12" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
    </svg>
  ),
  bookings: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  maintenance: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 3v6l5.25 3.15" />
    </svg>
  ),
  payments: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  "due-collection": (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  payroll: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  expenses: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 0 1 0 9H6" />
    </svg>
  ),
  agents: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  owners: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  staff: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  customers: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  users: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  roles: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  profile: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  logout: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  add: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  trash: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  upload: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  blogs: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

function AdminPanel() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { addNotification } = useContext(NotificationContext);
  const rawUser = localStorage.getItem("user");
  let user = null;
  try {
    if (rawUser) user = JSON.parse(rawUser);
  } catch {
    user = null;
  }

  const name = user?.name || user?.email?.split("@")[0] || "Admin";
  const isAdmin = (user?.role || "admin").toString().toLowerCase() === "admin";

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("adminActiveTab");
    return savedTab || "dashboard";
  });
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const dueCollectionMenuRef = useRef(null);
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const contractDocsInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [propertyAgentDropdownOpen, setPropertyAgentDropdownOpen] = useState(false);
  const [propertyAgentSearch, setPropertyAgentSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [unitsData, setUnitsData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    description: "",
    type: "",
    purpose: "",
    price: "",
    status: "Available",
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    amenities: [],
    agentName: "",
    agentPhone: "",
    coverImage: null,
    images: [],
  });
  const [showAddUnitForm, setShowAddUnitForm] = useState(false);
  const [propertySearchOpen, setPropertySearchOpen] = useState(false);
  const [propertySearchQuery, setPropertySearchQuery] = useState("");
  const [unitSearchQuery, setUnitSearchQuery] = useState("");
  const [unitFilterProperty, setUnitFilterProperty] = useState("all");
  const [unitFilterStatus, setUnitFilterStatus] = useState("all");
  const [unitStatusDropdownOpen, setUnitStatusDropdownOpen] = useState(false);
  const [unitStatusSearch, setUnitStatusSearch] = useState("");
  const [editingStatusDropdownOpen, setEditingStatusDropdownOpen] =
    useState(false);
  const [editingStatusSearch, setEditingStatusSearch] = useState("");
  const [unitForm, setUnitForm] = useState({
    parentProperty: "",
    block: "",
    floorLevel: "",
    unitNumber: "",
    unitType: "Apartment",
    currentStatus: "Available",
    price: "",
    areaSize: "",
    bedrooms: "",
    bathrooms: "",
    windows: "",
  });
  const [openUnitMenu, setOpenUnitMenu] = useState(null);
  const [contractsData, setContractsData] = useState([]);
  const [contractSearchQuery, setContractSearchQuery] = useState("");
  const [showEditUnitForm, setShowEditUnitForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [newContractMode, setNewContractMode] = useState(false);
  const [selectedContractDetail, setSelectedContractDetail] = useState(null);
  const [contractForm, setContractForm] = useState({
    property: "",
    unit: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    status: "",
    amount: "",
    billingCycle: "",
    securityDeposit: "",
    lateFee: "",
    startDate: "",
    endDate: "",
    additionalNotes: "",
    documents: [],
  });
  const [inquiriesData, setInquiriesData] = useState([]);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyId: "",
    propertyTitle: "",
    amount: "",
  });
  const [inquiryPropertyDropdownOpen, setInquiryPropertyDropdownOpen] =
    useState(false);
  const [inquiryPropertySearch, setInquiryPropertySearch] = useState("");
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState(null);
  const [bookingsData, setBookingsData] = useState([]);
  const [bookingSearchQuery, setBookingSearchQuery] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);
  const [bookingDetailStatus, setBookingDetailStatus] = useState("PENDING");
  const [bookingForm, setBookingForm] = useState({
    targetProperty: "",
    targetPropertyId: "",
    unit: "",
    customer: "",
    assignAgent: "",
    visitDate: "",
    visitTime: "",
    currentStatus: "PENDING",
    notes: "",
  });
  const [bookingProperties, setBookingProperties] = useState([]);
  const [bookingCustomers, setBookingCustomers] = useState([]);
  const [bookingAgents, setBookingAgents] = useState([]);
  const [loadingBookingForm, setLoadingBookingForm] = useState(false);

  // Searchable dropdown states
  const [bookingPropertyDropdownOpen, setBookingPropertyDropdownOpen] =
    useState(false);
  const [bookingPropertySearch, setBookingPropertySearch] = useState("");

  useEffect(() => {
    if (selectedBookingDetail) {
      setBookingDetailStatus(selectedBookingDetail.status || "PENDING");
    }
  }, [selectedBookingDetail]);
  const [bookingUnitDropdownOpen, setBookingUnitDropdownOpen] = useState(false);
  const [bookingUnitSearch, setBookingUnitSearch] = useState("");
  const [bookingCustomerDropdownOpen, setBookingCustomerDropdownOpen] =
    useState(false);
  const [bookingCustomerSearch, setBookingCustomerSearch] = useState("");
  const [bookingAgentDropdownOpen, setBookingAgentDropdownOpen] =
    useState(false);
  const [bookingAgentSearch, setBookingAgentSearch] = useState("");
  const [bookingStatusDropdownOpen, setBookingStatusDropdownOpen] =
    useState(false);
  const [bookingStatusSearch, setBookingStatusSearch] = useState("");

  // Maintenance States
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [maintenanceSearchQuery, setMaintenanceSearchQuery] = useState("");
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [selectedMaintenanceDetail, setSelectedMaintenanceDetail] =
    useState(null);
  const [selectedMaintenanceStatus, setSelectedMaintenanceStatus] =
    useState("PENDING");
  const [maintenanceStatusUpdating, setMaintenanceStatusUpdating] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({
    property: "",
    propertyId: "",
    unit: "",
    requestedBy: "",
    title: "",
    type: "Repair",
    description: "",
    priority: "MEDIUM",
    status: "PENDING",
    estimatedCost: "",
    scheduledDate: "",
  });
  const [maintenanceProperties, setMaintenanceProperties] = useState([]);
  const [loadingMaintenanceForm, setLoadingMaintenanceForm] = useState(false);

  // Maintenance Searchable Dropdown States
  const [maintenancePropertyDropdownOpen, setMaintenancePropertyDropdownOpen] =
    useState(false);
  const [maintenancePropertySearch, setMaintenancePropertySearch] =
    useState("");
  const [maintenanceUnitDropdownOpen, setMaintenanceUnitDropdownOpen] =
    useState(false);
  const [maintenanceUnitSearch, setMaintenanceUnitSearch] = useState("");
  const [maintenanceCustomerDropdownOpen, setMaintenanceCustomerDropdownOpen] =
    useState(false);
  const [maintenanceCustomerSearch, setMaintenanceCustomerSearch] =
    useState("");

  // Maintenance Filter States
  const [maintenanceFilterProperty, setMaintenanceFilterProperty] =
    useState("");
  const [maintenanceFilterPriority, setMaintenanceFilterPriority] =
    useState("");
  const [maintenanceFilterStatus, setMaintenanceFilterStatus] = useState("");

  useEffect(() => {
    if (selectedMaintenanceDetail) {
      setSelectedMaintenanceStatus(
        selectedMaintenanceDetail.status || "PENDING",
      );
    }
  }, [selectedMaintenanceDetail]);

  // Payment States
  const [paymentsData, setPaymentsData] = useState([]);
  const [paymentSearchQuery, setPaymentSearchQuery] = useState("");
  const [showRecordPaymentForm, setShowRecordPaymentForm] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState(null);

  // Payment Filter States
  const [paymentPropertyFilter, setPaymentPropertyFilter] = useState("");
  const [paymentUnitFilter, setPaymentUnitFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [paymentCustomerFilter, setPaymentCustomerFilter] = useState("");

  // Agents State
  const [agentsData, setAgentsData] = useState([]);
  const [agentSearchQuery, setAgentSearchQuery] = useState("");
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    phone: "",
    commissionType: "Percentage",
    commissionValue: "",
    experience: "",
    status: "Active",
    specialization: "",
  });

  // Owners State
  const [ownersData, setOwnersData] = useState([]);
  const [ownerSearchQuery, setOwnerSearchQuery] = useState("");
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [ownerForm, setOwnerForm] = useState({
    name: "",
    company: "",
    taxId: "",
    propertiesCount: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // Staff State
  const [staffData, setStaffData] = useState([]);
  const [staffSearchQuery, setStaffSearchQuery] = useState("");
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffImageFile, setStaffImageFile] = useState(null);
  const [staffImagePreview, setStaffImagePreview] = useState("");
  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bio: "",
    image: "",
    expertise: [],
    salary: "",
    status: "Active",
  });

  // Customers State
  const [customersData, setCustomersData] = useState([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Customer",
    address: "",
    status: "Active",
    notes: "",
  });

  // Roles State
  const ROLE_FEATURES = [
    { key: "properties", label: "Properties" },
    { key: "contracts", label: "Contracts & Leases" },
    { key: "bookings", label: "Bookings" },
    { key: "inquiries", label: "Lead Inquiries" },
    { key: "maintenance", label: "Maintenance" },
    { key: "payroll", label: "Payroll" },
    { key: "payments", label: "Payments & Invoices" },
    { key: "dueCollection", label: "Due Collection" },
    { key: "owners", label: "Property Owners" },
    { key: "agents", label: "Agents" },
    { key: "customers", label: "Customers / Tenants" },
    { key: "expenses", label: "Expenses" },
    { key: "staff", label: "Staff Management" },
    { key: "users", label: "User Management" },
    { key: "roles", label: "Role Management" },
    { key: "units", label: "Units" },
    { key: "financialReports", label: "Financial Reports" },
  ];

  const defaultRolePermissions = useMemo(
    () => ({
      dashboard: { view: false },
      systemSettings: { view: false, edit: false },
      aiReports: false,
      aiAssistant: false,
      features: ROLE_FEATURES.reduce((acc, item) => {
        acc[item.key] = {
          scope: "none",
          create: false,
          edit: false,
          delete: false,
        };
        return acc;
      }, {}),
    }),
    [ROLE_FEATURES],
  );

  const [rolesData, setRolesData] = useState([]);
  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleForm, setRoleForm] = useState({
    title: "",
    description: "",
    permissions: defaultRolePermissions,
  });

  // Payment Dropdown States
  const [paymentPropertyDropdownOpen, setPaymentPropertyDropdownOpen] =
    useState(false);
  const [paymentPropertySearch, setPaymentPropertySearch] = useState("");
  const [paymentUnitDropdownOpen, setPaymentUnitDropdownOpen] = useState(false);
  const [paymentUnitSearch, setPaymentUnitSearch] = useState("");
  const [paymentTypeDropdownOpen, setPaymentTypeDropdownOpen] = useState(false);
  const [paymentCustomerDropdownOpen, setPaymentCustomerDropdownOpen] =
    useState(false);
  const [paymentCustomerSearch, setPaymentCustomerSearch] = useState("");

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    linkedContract: "",
    property: "",
    propertyId: "",
    unit: "",
    unitId: "",
    client: "",
    clientId: "",
    paymentType: "RENT",
    paymentMethod: "CASH",
    baseAmount: "",
    receivedAmount: "",
    billingMonth: "",
    billingYear: new Date().getFullYear().toString(),
    internalNotes: "",
  });
  const [paymentFormDropdownOpen, setPaymentFormDropdownOpen] = useState(null);
  const [paymentFormSearch, setPaymentFormSearch] = useState({
    contract: "",
    property: "",
    unit: "",
    client: "",
  });

  const getAgents = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/agents`);
      if (!res.ok) throw new Error("Failed to load agents");
      const data = await res.json();
      const normalized = (data.agents || []).map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setAgentsData(normalized);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load agents");
    }
  }, [API_URL]);

  const getOwners = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/owners`);
      if (!res.ok) throw new Error("Failed to load owners");
      const data = await res.json();
      const normalized = (data.owners || []).map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setOwnersData(normalized);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load owners");
    }
  }, [API_URL]);

  const getStaff = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/staff`);
      if (!res.ok) throw new Error("Failed to load staff");
      const data = await res.json();
      const normalized = (data.staff || []).map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setStaffData(normalized);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load staff");
    }
  }, [API_URL]);

  const getCustomers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/customers`);
      if (!res.ok) throw new Error("Failed to load customers");
      const data = await res.json();
      const normalized = (data.customers || []).map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setCustomersData(normalized);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load customers");
    }
  }, [API_URL]);

  const countRolePermissions = (permissionData) => {
    if (!permissionData || typeof permissionData !== "object") return 0;
    let count = 0;
    if (permissionData.dashboard?.view) count += 1;
    if (permissionData.systemSettings?.view) count += 1;
    if (permissionData.systemSettings?.edit) count += 1;
    if (permissionData.aiReports) count += 1;
    if (permissionData.aiAssistant) count += 1;
    const features = permissionData.features || {};
    Object.values(features).forEach((f) => {
      if (!f || typeof f !== "object") return;
      if (f.scope !== "none") count += 1;
      if (f.create) count += 1;
      if (f.edit) count += 1;
      if (f.delete) count += 1;
    });
    return count;
  };

  const getRoles = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/roles`);
      if (!res.ok) throw new Error("Failed to load roles");
      const data = await res.json();
      const normalized = (data.roles || []).map((item) => {
        const perm = item.permissions || {};
        const permissions =
          typeof perm === "object"
            ? perm
            : { ...defaultRolePermissions, level: Number(perm) || 0 };
        return { ...item, id: item._id || item.id, permissions };
      });
      setRolesData(normalized);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load roles");
    }
  }, [API_URL, defaultRolePermissions]);

  const handleAgentSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      ...agentForm,
      name: agentForm.name.trim(),
      email: agentForm.email.trim(),
      phone: agentForm.phone.trim(),
      commissionType: agentForm.commissionType,
      commissionValue: Number(agentForm.commissionValue || 0),
      experience: Number(agentForm.experience || 0),
      status: agentForm.status,
      specialization: agentForm.specialization.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.phone) {
      setMessage("Name, email and phone are required for agents");
      return;
    }

    try {
      if (editingAgent) {
        const res = await fetch(
          `${API_URL}/api/agents/${editingAgent._id || editingAgent.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmed),
          },
        );

        if (!res.ok) throw new Error("Failed to update agent");
        const data = await res.json();
        const normalizedAgent = {
          ...data.agent,
          id: data.agent._id || data.agent.id,
        };
        setAgentsData((prev) =>
          prev.map((a) =>
            a._id === normalizedAgent._id || a.id === normalizedAgent._id
              ? normalizedAgent
              : a,
          ),
        );
        setMessage("Agent updated successfully");
      } else {
        const res = await fetch(`${API_URL}/api/agents`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmed),
        });

        if (!res.ok) {
          const failMsg = await res
            .json()
            .then((j) => j.message)
            .catch(() => "Failed to create agent");
          throw new Error(failMsg);
        }

        const data = await res.json();
        const normalizedAgent = {
          ...data.agent,
          id: data.agent._id || data.agent.id,
        };
        setAgentsData((prev) => [normalizedAgent, ...prev]);
        setMessage("Agent registered successfully");
      }

      setShowAgentForm(false);
      setEditingAgent(null);
      setAgentForm({
        name: "",
        email: "",
        phone: "",
        commissionType: "Percentage",
        commissionValue: "",
        experience: "",
        status: "Active",
        specialization: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Agent save failed");
    }
  };

  const handleAgentEdit = (agent) => {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name || "",
      email: agent.email || "",
      phone: agent.phone || "",
      commissionType: agent.commissionType || "Percentage",
      commissionValue: agent.commissionValue || "",
      experience: agent.experience || "",
      status: agent.status || "Active",
      specialization: agent.specialization || "",
    });
    setShowAgentForm(true);
  };

  const handleAgentDelete = async (agentId) => {
    if (!window.confirm("Delete this agent?")) return;

    try {
      const res = await fetch(`${API_URL}/api/agents/${agentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete agent");
      setAgentsData((prev) =>
        prev.filter((a) => a._id !== agentId && a.id !== agentId),
      );
      setMessage("Agent deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Agent delete failed");
    }
  };

  const handleOwnerSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      ...ownerForm,
      name: ownerForm.name.trim(),
      company: ownerForm.company.trim(),
      taxId: ownerForm.taxId.trim(),
      propertiesCount: Number(ownerForm.propertiesCount || 0),
      email: ownerForm.email.trim(),
      phone: ownerForm.phone.trim(),
      status: ownerForm.status,
    };

    if (!trimmed.name || !trimmed.email || !trimmed.phone) {
      setMessage("Name, email and phone are required for owners");
      return;
    }

    try {
      if (editingOwner) {
        const res = await fetch(
          `${API_URL}/api/owners/${editingOwner._id || editingOwner.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmed),
          },
        );
        if (!res.ok) throw new Error("Failed to update owner");
        const data = await res.json();
        const normalizedOwner = {
          ...data.owner,
          id: data.owner._id || data.owner.id,
        };
        setOwnersData((prev) =>
          prev.map((o) =>
            o._id === normalizedOwner._id || o.id === normalizedOwner._id
              ? normalizedOwner
              : o,
          ),
        );
        setMessage("Owner updated successfully");
      } else {
        const res = await fetch(`${API_URL}/api/owners`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmed),
        });
        if (!res.ok) {
          const failMsg = await res
            .json()
            .then((j) => j.message)
            .catch(() => "Failed to create owner");
          throw new Error(failMsg);
        }
        const data = await res.json();
        const normalizedOwner = {
          ...data.owner,
          id: data.owner._id || data.owner.id,
        };
        setOwnersData((prev) => [normalizedOwner, ...prev]);
        setMessage("Owner registered successfully");
      }

      setShowOwnerForm(false);
      setEditingOwner(null);
      setOwnerForm({
        name: "",
        company: "",
        taxId: "",
        propertiesCount: "",
        email: "",
        phone: "",
        status: "Active",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Owner save failed");
    }
  };

  const handleOwnerEdit = (owner) => {
    setEditingOwner(owner);
    setOwnerForm({
      name: owner.name || "",
      company: owner.company || "",
      taxId: owner.taxId || "",
      propertiesCount: owner.propertiesCount || "",
      email: owner.email || "",
      phone: owner.phone || "",
      status: owner.status || "Active",
    });
    setShowOwnerForm(true);
  };

  const handleOwnerDelete = async (ownerId) => {
    if (!window.confirm("Delete this owner?")) return;

    try {
      const res = await fetch(`${API_URL}/api/owners/${ownerId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete owner");
      setOwnersData((prev) =>
        prev.filter((o) => o._id !== ownerId && o.id !== ownerId),
      );
      setMessage("Owner deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Owner delete failed");
    }
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      ...staffForm,
      name: staffForm.name.trim(),
      email: staffForm.email.trim(),
      phone: staffForm.phone.trim(),
      role: staffForm.role.trim(),
      salary: Number(staffForm.salary || 0),
      status: staffForm.status,
      bio: staffForm.bio.trim(),
      expertise: (staffForm.expertise || []).filter(e => typeof e === 'string' && e.trim()),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.phone) {
      setMessage("Name, email and phone are required for staff");
      return;
    }

    try {
      let body;
      let headers = {};

      // Use FormData if there's an image file
      if (staffImageFile) {
        body = new FormData();
        body.append('name', trimmed.name);
        body.append('email', trimmed.email);
        body.append('phone', trimmed.phone);
        body.append('role', trimmed.role);
        body.append('bio', trimmed.bio);
        body.append('expertise', JSON.stringify(trimmed.expertise));
        body.append('salary', trimmed.salary);
        body.append('status', trimmed.status);
        body.append('image', staffImageFile);
      } else {
        body = JSON.stringify(trimmed);
        headers = { "Content-Type": "application/json" };
      }

      if (editingStaff) {
        const res = await fetch(
          `${API_URL}/api/staff/${editingStaff._id || editingStaff.id}`,
          {
            method: "PUT",
            headers,
            body,
          },
        );

        if (!res.ok) throw new Error("Failed to update staff member");
        const data = await res.json();
        const normalizedStaff = {
          ...data.staff,
          id: data.staff._id || data.staff.id,
        };
        setStaffData((prev) =>
          prev.map((s) =>
            s._id === normalizedStaff._id || s.id === normalizedStaff._id
              ? normalizedStaff
              : s,
          ),
        );
        setMessage("Staff member updated successfully");
      } else {
        const res = await fetch(`${API_URL}/api/staff`, {
          method: "POST",
          headers,
          body,
        });

        if (!res.ok) {
          const failMsg = await res
            .json()
            .then((j) => j.message)
            .catch(() => "Failed to create staff member");
          throw new Error(failMsg);
        }

        const data = await res.json();
        const normalizedStaff = {
          ...data.staff,
          id: data.staff._id || data.staff.id,
        };
        setStaffData((prev) => [normalizedStaff, ...prev]);
        setMessage("Staff member registered successfully");
      }

      setShowStaffForm(false);
      setEditingStaff(null);
      setStaffImageFile(null);
      setStaffImagePreview("");
      setStaffForm({
        name: "",
        email: "",
        phone: "",
        role: "",
        bio: "",
        image: "",
        expertise: [],
        salary: "",
        status: "Active",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Staff save failed");
    }
  };

  const handleStaffEdit = (staff) => {
    setEditingStaff(staff);
    setStaffForm({
      name: staff.name || "",
      email: staff.email || "",
      phone: staff.phone || "",
      role: staff.role || "",
      bio: staff.bio || "",
      image: staff.image || "",
      expertise: Array.isArray(staff.expertise) ? staff.expertise : [],
      salary: staff.salary || "",
      status: staff.status || "Active",
    });
    setStaffImageFile(null);
    setStaffImagePreview(staff.image && !staff.image.match(/\p{Emoji}/u) ? staff.image : "");
    setShowStaffForm(true);
  };

  const handleStaffDelete = async (staffId) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      const res = await fetch(`${API_URL}/api/staff/${staffId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete staff member");
      setStaffData((prev) =>
        prev.filter((s) => s._id !== staffId && s.id !== staffId),
      );
      setMessage("Staff member deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Staff delete failed");
    }
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      ...customerForm,
      name: customerForm.name.trim(),
      email: customerForm.email.trim(),
      password: customerForm.password,
      phone: customerForm.phone.trim(),
      role: customerForm.role,
      address: customerForm.address.trim(),
      status: customerForm.status,
      notes: customerForm.notes.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.phone) {
      setMessage("Name, email and phone are required for customers");
      return;
    }

    try {
      if (editingCustomer) {
        const res = await fetch(
          `${API_URL}/api/customers/${editingCustomer._id || editingCustomer.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmed),
          },
        );
        if (!res.ok) throw new Error("Failed to update customer");
        const data = await res.json();
        const normalizedCustomer = {
          ...data.customer,
          id: data.customer._id || data.customer.id,
        };
        setCustomersData((prev) =>
          prev.map((c) =>
            c._id === normalizedCustomer._id || c.id === normalizedCustomer._id
              ? normalizedCustomer
              : c,
          ),
        );
        setMessage("Customer updated successfully");
      } else {
        const res = await fetch(`${API_URL}/api/customers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmed),
        });
        if (!res.ok) {
          const failMsg = await res
            .json()
            .then((j) => j.message)
            .catch(() => "Failed to create customer");
          throw new Error(failMsg);
        }
        const data = await res.json();
        const normalizedCustomer = {
          ...data.customer,
          id: data.customer._id || data.customer.id,
        };
        setCustomersData((prev) => [normalizedCustomer, ...prev]);
        setMessage("Customer registered successfully");
      }

      setShowCustomerForm(false);
      setEditingCustomer(null);
      setCustomerForm({
        name: "",
        email: "",
        phone: "",
        status: "Active",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Customer save failed");
    }
  };

  const handleCustomerEdit = (customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      status: customer.status || "Active",
      notes: customer.notes || "",
    });
    setShowCustomerForm(true);
  };

  const handleCustomerDelete = async (customerId) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      const res = await fetch(`${API_URL}/api/customers/${customerId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete customer");
      setCustomersData((prev) =>
        prev.filter((c) => c._id !== customerId && c.id !== customerId),
      );
      setMessage("Customer deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Customer delete failed");
    }
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = {
      ...roleForm,
      title: roleForm.title.trim(),
      description: roleForm.description.trim(),
      permissions: roleForm.permissions,
    };
    if (!trimmed.title || !trimmed.description) {
      setMessage("Role title and description are required");
      return;
    }

    try {
      if (editingRole) {
        const roleId = editingRole._id || editingRole.id;
        const res = await fetch(`${API_URL}/api/roles/${roleId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmed),
        });
        if (!res.ok) throw new Error("Failed to update role");
        const data = await res.json();
        const normalizedRole = {
          ...data.role,
          id: data.role._id || data.role.id,
          permissions: data.role.permissions || trimmed.permissions,
          updatedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
        setRolesData((prev) =>
          prev.map((r) => (r.id === normalizedRole.id ? normalizedRole : r)),
        );
        setMessage("Role updated successfully");
      } else {
        const res = await fetch(`${API_URL}/api/roles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmed),
        });
        if (!res.ok) {
          const failMsg = await res
            .json()
            .then((j) => j.message)
            .catch(() => "Failed to create role");
          throw new Error(failMsg);
        }
        const data = await res.json();
        const normalizedRole = {
          ...data.role,
          id: data.role._id || data.role.id,
          permissions: data.role.permissions || trimmed.permissions,
          updatedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
        setRolesData((prev) => [normalizedRole, ...prev]);
        setMessage("Role created successfully");
      }

      setShowRoleForm(false);
      setEditingRole(null);
      setRoleForm({
        title: "",
        description: "",
        permissions: defaultRolePermissions,
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Role save failed");
    }
  };

  const handleRoleEdit = (role) => {
    setEditingRole(role);
    setRoleForm({
      title: role.title,
      description: role.description,
      permissions:
        typeof role.permissions === "object"
          ? role.permissions
          : defaultRolePermissions,
    });
    setShowRoleForm(true);
  };

  const handleRoleDelete = async (roleId) => {
    if (!window.confirm("Delete this role?")) return;
    try {
      const res = await fetch(`${API_URL}/api/roles/${roleId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete role");
      setRolesData((prev) => prev.filter((r) => r.id !== roleId));
      setMessage("Role deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Role delete failed");
    }
  };

  // Due Collection States
  const [dueCollectionSearchQuery, setDueCollectionSearchQuery] = useState("");
  const [selectedDueDetail, setSelectedDueDetail] = useState(null);
  const [dueCollectionMenuOpen, setDueCollectionMenuOpen] = useState(null);

  const dueCollectionActions = [
    { key: "show", label: "Show", icon: "👁️" },
    { key: "collect", label: "Collect", icon: "💰" },
  ];

  const [payrollForm, setPayrollForm] = useState({
    staffId: "",
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear().toString(),
  });

  const handleGeneratePayrollSubmit = async (e) => {
    e.preventDefault();
    if (!payrollForm.staffId) {
      alert("Please select a staff member");
      return;
    }

    // This is where you'd call API to create payroll.
    console.log("Generating payroll for", payrollForm);

    const selectedStaff = staffData.find(
      (s) => (s._id || s.id) === payrollForm.staffId,
    );
    setPayrollData((prev) => [
      ...prev,
      {
        _id: `payroll-${Date.now()}`,
        staffName: selectedStaff?.name || selectedStaff?.email || "Unknown",
        staffEmail: selectedStaff?.email || "",
        period: `${payrollForm.month} ${payrollForm.year}`,
        salary: 0,
        tips: 0,
        status: "PENDING",
      },
    ]);

    setShowGeneratePayrollForm(false);
  };

  const handleAddExpenseSubmit = async (e) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount || !expenseForm.date) {
      alert("Please fill all required fields");
      return;
    }

    // Add to local state for now
    setExpenseData((prev) => [
      ...(prev || []),
      {
        id: `expense-${Date.now()}`,
        ...expenseForm,
      },
    ]);

    setShowAddExpenseForm(false);
    setExpenseForm({
      title: "",
      amount: "",
      category: "Other",
      date: new Date().toISOString().slice(0, 10),
      paymentMethod: "Cash",
      notes: "",
    });
  };

  const handleDueAction = (payment, actionKey) => {
    setSelectedDueDetail(payment);
    setDueCollectionMenuOpen(null);
    console.log(
      `Due action: ${actionKey} for ${payment.invoiceNumber || payment._id}`,
    );
    if (actionKey === "show") {
      // TODO: open detail modal or panel
    } else if (actionKey === "collect") {
      setShowRecordPaymentForm(true);
    }
  };

  // Payroll States
  const [payrollData, setPayrollData] = useState([]);
  const [payrollSearchQuery, setPayrollSearchQuery] = useState("");
  const [payrollStaffSearch, setPayrollStaffSearch] = useState("");
  const [payrollStaffDropdownOpen, setPayrollStaffDropdownOpen] =
    useState(false);
  const [payrollMenuOpen, setPayrollMenuOpen] = useState(null);
  const [showGeneratePayrollForm, setShowGeneratePayrollForm] = useState(false);

  const [expenseData, setExpenseData] = useState([]);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    title: "",
    amount: "",
    category: "Other",
    date: new Date().toISOString().slice(0, 10),
    paymentMethod: "Cash",
    notes: "",
  });

  const [selectedPayrollDetail, setSelectedPayrollDetail] = useState(null);
  const payrollMenuRef = useRef(null);

  const unitStatusCounts = useMemo(() => {
    const counts = { total: unitsData.length };
    UNIT_STATUS_OPTIONS.forEach((status) => {
      counts[status] = unitsData.filter((u) => u.status === status).length;
    });
    return counts;
  }, [unitsData]);

  const filteredUnits = useMemo(() => {
    return unitsData.filter((u) => {
      const unitFilter = unitSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !unitFilter ||
        (u.unitNumber || "").toString().toLowerCase().includes(unitFilter) ||
        (u.block || "").toString().toLowerCase().includes(unitFilter) ||
        (u.property || "").toString().toLowerCase().includes(unitFilter);

      const matchesProperty =
        unitFilterProperty === "all" ||
        u.propertyId === unitFilterProperty ||
        u.property === unitFilterProperty;
      const matchesStatus =
        unitFilterStatus === "all" || u.status === unitFilterStatus;

      return matchesSearch && matchesProperty && matchesStatus;
    });
  }, [unitsData, unitSearchQuery, unitFilterProperty, unitFilterStatus]);

  // Booking Form Dynamic Filters
  const relatedUnits = useMemo(() => {
    if (!bookingForm.targetPropertyId) return [];
    return unitsData.filter(
      (u) => u.propertyId === bookingForm.targetPropertyId,
    );
  }, [unitsData, bookingForm.targetPropertyId]);

  const [inquirySearchQuery, setInquirySearchQuery] = useState("");
  const [contractUnitDropdownOpen, setContractUnitDropdownOpen] =
    useState(false);
  const [contractUnitSearchQuery, setContractUnitSearchQuery] = useState("");
  const [contractClientDropdownOpen, setContractClientDropdownOpen] =
    useState(false);
  const [contractClientSearchQuery, setContractClientSearchQuery] =
    useState("");
  const [contractTypeDropdownOpen, setContractTypeDropdownOpen] =
    useState(false);
  const [contractStatusDropdownOpen, setContractStatusDropdownOpen] =
    useState(false);

  const getProperties = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch {
      setMessage("Failed to load properties");
    }
  }, [API_URL]);

  const getUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/users`);
      const data = await res.json();
      const allUsers = data.users || [];
      setUsers(allUsers);
      // Set agents from users list (dynamic)
      const agentsFromUsers = allUsers.filter(
        (u) => (u.role || "").toLowerCase() === "agent",
      );
      setAgentsData(
        agentsFromUsers.map((a) => ({
          id: a._id || a.id || `agent-${Date.now()}-${Math.random()}`,
          name:
            a.name ||
            `${a.firstName || ""} ${a.lastName || ""}`.trim() ||
            a.email ||
            "Unknown",
          email: a.email || "",
          phone: a.phone || a.mobile || "",
          activity: a.activity || "N/A",
          earnings: Number(a.earnings || 0),
          status: a.status || "Active",
        })),
      );

      const ownersFromUsers = allUsers.filter(
        (u) => (u.role || "").toLowerCase() === "owner",
      );
      setOwnersData(
        ownersFromUsers.map((o) => ({
          id: o._id || o.id || `owner-${Date.now()}-${Math.random()}`,
          name:
            o.name ||
            `${o.firstName || ""} ${o.lastName || ""}`.trim() ||
            o.email ||
            "Unknown",
          company: o.company || "N/A",
          taxId: o.taxId || "N/A",
          propertiesCount: Number(o.propertiesCount || 0),
          email: o.email || "",
          phone: o.phone || o.mobile || "",
          status: o.status || "Active",
        })),
      );
    } catch {
      setMessage("Failed to load users");
    }
  }, [API_URL]);

  const getUnits = useCallback(async () => {
    try {
      // Fetch actual units from database
      const res = await fetch(`${API_URL}/api/units`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const units = data.units || [];

      if (units.length > 0) {
        // Format units data - handle different field names
        const formatted = units.map((u, idx) => ({
          _id: u._id || idx,
          id: u._id || idx,
          unitNumber: u.unitNumber || `Unit-${idx + 1}`,
          block: u.block || "N/A",
          floorLevel: u.floorLevel || "N/A",
          floor: u.floorLevel || "N/A",
          type: u.unitType || "Apartment",
          location: u.location || "N/A",
          property: u.parentProperty?.title || u.property || "Unknown",
          propertyId: u.parentProperty?._id || u.parentProperty || "",
          bedrooms: u.bedrooms ?? 0,
          bathrooms: u.bathrooms ?? 0,
          areaSize: u.areaSize || "",
          price: u.price || "",
          status: normalizeUnitStatus(
            u.currentStatus || u.status || "Available",
          ),
        }));

        const withStatusColor = formatted.map((u) => ({
          ...u,
          statusColor:
            u.status === "Available"
              ? "bg-emerald-100 text-emerald-700"
              : u.status === "Rented"
                ? "bg-blue-100 text-blue-700"
                : u.status === "Sold"
                  ? "bg-slate-100 text-slate-700"
                  : u.status === "Booked"
                    ? "bg-indigo-100 text-indigo-700"
                    : u.status === "Reserved"
                      ? "bg-amber-100 text-amber-700"
                      : u.status === "Maintenance"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700",
        }));
        setUnitsData(withStatusColor);
      }
    } catch {
      setUnitsData([]);
    }
  }, [API_URL]);

  const getInquiries = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/inquiries`);
      const data = await res.json();
      if (data.success && data.inquiries) {
        const formatted = data.inquiries.map((inq) => ({
          id: inq._id,
          clientName: inq.clientName,
          email: inq.email,
          phone: inq.phone,
          subject: inq.subject || "N/A",
          property: inq.propertyTitle || "N/A",
          amount: inq.amount || "N/A",
          message: `"${inq.message}"`,
          receivedDate: new Date(inq.createdAt)
            .toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .toUpperCase(),
          status: inq.status,
        }));
        setInquiriesData(formatted);
      }
    } catch {
      setMessage("Failed to load inquiries");
    }
  }, [API_URL]);

  const getContracts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/contracts`);
      const data = await res.json();
      if (data.success && data.contracts) {
        const formatted = data.contracts.map((contract) => ({
          id: contract._id,
          property: contract.property?.title || "N/A",
          unit: contract.unit || "N/A",
          type: contract.contractType,
          parties: contract.customer?.name || "N/A",
          owner: contract.createdBy ? "Admin" : "System",
          amount: contract.amount,
          date: new Date(contract.createdAt).toLocaleDateString("en-US"),
          status:
            contract.status === "Draft"
              ? "PENDING"
              : contract.status === "Active"
                ? "ACTIVE"
                : contract.status,
          documents: contract.documents || [],
        }));
        setContractsData(formatted);
      }
    } catch {
      setMessage("Failed to load contracts");
    }
  }, [API_URL]);

  const getBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/bookings`);
      if (!res.ok) {
        setBookingsData([]);
        return;
      }
      const data = await res.json();
      if (data.success && data.bookings) {
        const formatted = data.bookings.map((booking) => ({
          id: booking._id,
          property: booking.property?.title || booking.propertyTitle || "N/A",
          visitDate: new Date(booking.visitDate).toLocaleDateString("en-US"),
          visitTime: booking.visitTime || "N/A",
          customerName: booking.customerName || "N/A",
          customerEmail: booking.customerEmail || "N/A",
          customerPhone: booking.customerPhone || "N/A",
          agent: booking.agent || "Unassigned",
          status: booking.status || "PENDING",
          notes: booking.notes || "",
          createdBy: booking.createdBy || "USER",
          createdDate: new Date(booking.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setBookingsData(formatted);
      }
    } catch {
      setMessage("Failed to load bookings");
    }
  }, [API_URL]);

  const updateBookingStatus = async () => {
    if (!selectedBookingDetail) return;

    try {
      const res = await fetch(`${API_URL}/api/bookings/${selectedBookingDetail.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: bookingDetailStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update booking status");
      }

      const data = await res.json();
      const updatedBooking = data.booking;

      setSelectedBookingDetail((prev) =>
        prev ? { ...prev, status: updatedBooking.status } : prev,
      );
      setBookingsData((prev) =>
        prev.map((booking) =>
          booking.id === selectedBookingDetail.id
            ? { ...booking, status: updatedBooking.status }
            : booking,
        ),
      );

      if (addNotification) {
        addNotification(
          `Booking status updated to ${updatedBooking.status}`,
          "success",
          4000,
        );
      }

      // refresh all bookings in case the status was updated elsewhere in booking data
      getBookings();
    } catch (err) {
      if (addNotification) {
        addNotification(err.message || "Unable to update booking status", "error", 5000);
      }
    }
  };

  const getMaintenances = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/maintenance`);
      if (!res.ok) {
        setMaintenanceData([]);
        return;
      }
      const data = await res.json();
      if (data.maintenance && Array.isArray(data.maintenance)) {
        const formatted = data.maintenance.map((item) => ({
          id: item._id,
          property: item.property || "N/A",
          issueDescription: item.issueDescription || "N/A",
          priority: item.priority || "MEDIUM",
          requester: item.requester || "N/A",
          requesterEmail: item.requesterEmail || "N/A",
          status: item.status || "PENDING",
          notes: item.notes || "",
          createdDate: item.createdAt
            ? new Date(item.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
        }));
        setMaintenanceData(formatted);
      }
    } catch {
      setMessage("Failed to load maintenance requests");
    }
  }, [API_URL]);

  const updateMaintenanceStatus = async (status) => {
    if (!selectedMaintenanceDetail?.id) return;
    setMaintenanceStatusUpdating(true);
    try {
      const res = await fetch(
        `${API_URL}/api/maintenance/${selectedMaintenanceDetail.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      const data = await res.json();
      if (!res.ok || !data.maintenance) {
        throw new Error(data.message || "Unable to update maintenance status");
      }

      const updated = {
        ...selectedMaintenanceDetail,
        status: data.maintenance.status,
      };
      setSelectedMaintenanceDetail(updated);
      setMaintenanceData((prev) =>
        prev.map((item) =>
          item.id === selectedMaintenanceDetail.id ? updated : item,
        ),
      );
      if (addNotification) {
        addNotification(
          `Maintenance request status updated to ${data.maintenance.status}`,
          "success",
          4000,
        );
      }
      getMaintenances();
    } catch (error) {
      if (addNotification) {
        addNotification(
          error.message || "Failed to update maintenance status",
          "error",
          5000,
        );
      }
    } finally {
      setMaintenanceStatusUpdating(false);
    }
  };

  const getPayments = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/payments`);
      if (!res.ok) {
        setPaymentsData([]);
        return;
      }
      const data = await res.json();
      if (data.payments && Array.isArray(data.payments)) {
        const formatted = data.payments.map((item) => ({
          id: item._id,
          invoiceNumber: item.invoiceNumber || "N/A",
          clientName: item.clientName || "N/A",
          clientEmail: item.clientEmail || "",
          property: item.property || "N/A",
          unit: item.unit || "N/A",
          paymentType: item.paymentType || "RENT",
          amount: item.amount || 0,
          received: item.received || 0,
          due: (item.amount || 0) - (item.received || 0),
          date: item.date || new Date().toLocaleDateString(),
        }));
        setPaymentsData(formatted);
      } else {
        setPaymentsData([]);
      }
    } catch {
      setPaymentsData([]);
    }
  }, [API_URL]);

  // Load users on component mount for dashboard stats
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (activeTab === "dashboard") getUsers();
    else if (activeTab === "properties") getProperties();
    else if (activeTab === "units") getUnits();
    else if (activeTab === "agents") getAgents();
    else if (activeTab === "owners") getOwners();
    else if (activeTab === "staff") getStaff();
    else if (activeTab === "customers") getCustomers();
    else if (activeTab === "roles") getRoles();
    else if (activeTab === "users") getUsers();
    else if (activeTab === "inquiries") getInquiries();
    else if (activeTab === "contracts") getContracts();
    else if (activeTab === "bookings") getBookings();
    else if (activeTab === "payments") {
      getPayments();
      getProperties();
      getUnits();
      getUsers();
    } else if (activeTab === "payroll") {
      getStaff();
    } else if (activeTab === "maintenance") {
      getMaintenances();
      getProperties();
    }
  }, [
    activeTab,
    getProperties,
    getUnits,
    getAgents,
    getOwners,
    getStaff,
    getCustomers,
    getRoles,
    getUsers,
    getInquiries,
    getContracts,
    getBookings,
    getPayments,
    getMaintenances,
  ]);

  // Fetch agents when properties tab is active
  useEffect(() => {
    if (activeTab === "properties") {
      fetch(`${API_URL}/api/agents`)
        .then((r) => r.json())
        .then((data) => {
          if (data.agents && Array.isArray(data.agents)) {
            setAgents(data.agents);
          }
        })
        .catch((err) => console.error("Failed to load agents:", err));
    }
  }, [activeTab, API_URL]);

  // Save active tab to localStorage
  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  // Close due collection menu when tab changes
  useEffect(() => {
    if (activeTab !== "due-collection") {
      setDueCollectionMenuOpen(null);
    }
  }, [activeTab]);

  // Close due collection menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if clicked on a 3-dot button (⋯) in the menu row
      const isMenuButton = event.target.closest(
        '[data-menu-button="due-collection"]',
      );

      // If clicking on any menu button, let the onClick handler manage the state
      if (isMenuButton) return;

      // Close menu if clicking outside
      if (
        dueCollectionMenuRef.current &&
        !dueCollectionMenuRef.current.contains(event.target)
      ) {
        setDueCollectionMenuOpen(null);
      }
    };

    if (dueCollectionMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dueCollectionMenuOpen]);

  useEffect(() => {
    if (newContractMode) {
      getProperties();
      getUnits();
      getUsers();
    }
  }, [newContractMode, getProperties, getUnits, getUsers]);

  // Fetch properties when adding a new unit
  useEffect(() => {
    if (showAddUnitForm && properties.length === 0) {
      getProperties();
    }
  }, [showAddUnitForm, properties.length, getProperties]);

  // Fetch properties, customers, and agents when opening booking form
  // Always refetch properties to ensure latest data
  useEffect(() => {
    if (showBookingForm) {
      setLoadingBookingForm(true);

      // Always refetch properties to get latest additions
      fetch(`${API_URL}/api/properties`)
        .then((r) => r.json())
        .then((propsData) => {
          const propsToUse = propsData.properties || [];
          setBookingProperties(propsToUse);
        })
        .catch(() => {
          setBookingProperties([]);
        });

      Promise.all([
        fetch(`${API_URL}/api/auth/users`).then((r) => r.json()),
        fetch(`${API_URL}/api/units`).then((r) => r.json()),
      ])
        .then(([usersData, unitsDataRes]) => {
          if (usersData.success && usersData.users) {
            setBookingCustomers(usersData.users);
            setBookingAgents(
              usersData.users.filter(
                (u) => u.role !== "user" || u.role === "admin",
              ),
            );
          } else if (usersData.users) {
            setBookingCustomers(usersData.users);
            setBookingAgents(
              usersData.users.filter(
                (u) => u.role !== "user" || u.role === "admin",
              ),
            );
          }

          // Format and set units data
          if (unitsDataRes.units && unitsDataRes.units.length > 0) {
            const formatted = unitsDataRes.units.map((u, idx) => ({
              _id: u._id || idx,
              id: u._id || idx,
              unitNumber: u.unitNumber || `Unit-${idx + 1}`,
              block: u.block || "N/A",
              floorLevel: u.floorLevel || "N/A",
              floor: u.floorLevel || "N/A",
              type: u.unitType || "Apartment",
              location: u.location || "N/A",
              property: u.parentProperty?.title || u.property || "Unknown",
              propertyId: u.parentProperty?._id || u.parentProperty || "",
              bedrooms: u.bedrooms ?? 0,
              bathrooms: u.bathrooms ?? 0,
              areaSize: u.areaSize || "",
              price: u.price || "",
              status: normalizeUnitStatus(
                u.currentStatus || u.status || "Available",
              ),
            }));

            const withStatusColor = formatted.map((u) => ({
              ...u,
              statusColor:
                u.status === "Available"
                  ? "bg-emerald-100 text-emerald-700"
                  : u.status === "Rented"
                    ? "bg-blue-100 text-blue-700"
                    : u.status === "Sold"
                      ? "bg-slate-100 text-slate-700"
                      : u.status === "Booked"
                        ? "bg-indigo-100 text-indigo-700"
                        : u.status === "Reserved"
                          ? "bg-amber-100 text-amber-700"
                          : u.status === "Maintenance"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700",
            }));
            setUnitsData(withStatusColor);
          }

          setLoadingBookingForm(false);
        })
        .catch(() => {
          setLoadingBookingForm(false);
          setMessage("Failed to load form data");
        });
    }
  }, [showBookingForm, API_URL]);

  // Close dropdowns when form closes
  useEffect(() => {
    if (!showBookingForm) {
      setBookingPropertyDropdownOpen(false);
      setBookingUnitDropdownOpen(false);
      setBookingCustomerDropdownOpen(false);
      setBookingAgentDropdownOpen(false);
      setBookingStatusDropdownOpen(false);
      setBookingPropertySearch("");
      setBookingUnitSearch("");
      setBookingCustomerSearch("");
      setBookingAgentSearch("");
      setBookingStatusSearch("");
    }
  }, [showBookingForm]);

  // Fetch properties when opening maintenance form
  useEffect(() => {
    if (showMaintenanceForm) {
      setLoadingMaintenanceForm(true);
      getUnits();
      getUsers();
      fetch(`${API_URL}/api/properties`)
        .then((r) => r.json())
        .then((propsData) => {
          const propsToUse = propsData.properties || [];
          setMaintenanceProperties(propsToUse);
          setLoadingMaintenanceForm(false);
        })
        .catch(() => {
          setMaintenanceProperties([]);
          setLoadingMaintenanceForm(false);
        });
    }
  }, [showMaintenanceForm, API_URL, getUnits, getUsers]);

  // Close dropdowns when maintenance form closes
  useEffect(() => {
    if (!showMaintenanceForm) {
      setMaintenancePropertyDropdownOpen(false);
      setMaintenancePropertySearch("");
      setMaintenanceUnitDropdownOpen(false);
      setMaintenanceUnitSearch("");
      setMaintenanceCustomerDropdownOpen(false);
      setMaintenanceCustomerSearch("");
    }
  }, [showMaintenanceForm]);

  // Close dropdowns when payment form closes
  useEffect(() => {
    if (!showRecordPaymentForm) {
      setPaymentFormDropdownOpen(null);
      setPaymentFormSearch({
        contract: "",
        property: "",
        unit: "",
        client: "",
      });
    }
  }, [showRecordPaymentForm]);

  // Fetch contracts, properties, units, and users when opening payment form
  useEffect(() => {
    if (showRecordPaymentForm) {
      getContracts();
      getProperties();
      getUnits();
      getUsers();
    }
  }, [showRecordPaymentForm, getContracts, getProperties, getUnits, getUsers]);

  // Fetch properties when opening inquiry form
  useEffect(() => {
    if (showInquiryForm && properties.length === 0) {
      getProperties();
    }
  }, [showInquiryForm, properties.length, getProperties]);

  // Fallback: If no units from DB, generate from properties
  useEffect(() => {
    if (newContractMode && properties.length > 0) {
      // Wait a bit for getUnits to fetch, then check if we need fallback
      const timer = setTimeout(() => {
        // Re-check the current unitsData from state
        setUnitsData((prevUnits) => {
          if (prevUnits.length === 0) {
            const generated = properties.flatMap((p, pIdx) =>
              Array.from({ length: 2 }, (_, uIdx) => ({
                _id: `${p._id}-${uIdx}`,
                id: `${p._id}-${uIdx}`,
                unitNumber: `${String(201 + pIdx)}-${String.fromCharCode(65 + uIdx)}`,
                block: `BLOCK ${String.fromCharCode(65 + (pIdx % 5))}`,
                floorLevel: `FLOOR ${uIdx + 1}`,
                property: p.title,
                propertyId: p._id,
                bedrooms: p.bedrooms || "N/A",
                bathrooms: p.bathrooms || "N/A",
                areaSize: p.area || "N/A",
                price: p.price || 0,
                status: "Available",
              })),
            );
            return generated;
          }
          return prevUnits;
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [newContractMode, properties]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (propertySearchOpen && !e.target.closest("[data-property-dropdown]")) {
        setPropertySearchOpen(false);
        setPropertySearchQuery("");
      }
      if (
        contractUnitDropdownOpen &&
        !e.target.closest("[data-contract-unit-dropdown]")
      ) {
        setContractUnitDropdownOpen(false);
        setContractUnitSearchQuery("");
      }
      if (
        contractClientDropdownOpen &&
        !e.target.closest("[data-contract-client-dropdown]")
      ) {
        setContractClientDropdownOpen(false);
        setContractClientSearchQuery("");
      }
      if (
        contractTypeDropdownOpen &&
        !e.target.closest("[data-contract-type-dropdown]")
      ) {
        setContractTypeDropdownOpen(false);
      }
      if (
        contractStatusDropdownOpen &&
        !e.target.closest("[data-contract-status-dropdown]")
      ) {
        setContractStatusDropdownOpen(false);
      }
      if (
        unitStatusDropdownOpen &&
        !e.target.closest("[data-unit-status-dropdown]")
      ) {
        setUnitStatusDropdownOpen(false);
        setUnitStatusSearch("");
      }
      if (
        editingStatusDropdownOpen &&
        !e.target.closest("[data-editing-status-dropdown]")
      ) {
        setEditingStatusDropdownOpen(false);
        setEditingStatusSearch("");
      }
      if (openUnitMenu && !e.target.closest("[data-unit-actions]")) {
        setOpenUnitMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [
    propertySearchOpen,
    contractUnitDropdownOpen,
    contractClientDropdownOpen,
    contractTypeDropdownOpen,
    contractStatusDropdownOpen,
    unitStatusDropdownOpen,
    editingStatusDropdownOpen,
    openUnitMenu,
  ]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6f3] p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Access denied</h2>
          <p className="mt-2 text-sm text-slate-600">
            You do not have permission to access this page.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => (window.location.href = "/profile")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm font-semibold transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200 text-sm font-medium transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fileToDataURL = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });

  const dataURLSizeBytes = (dataURL) => {
    if (!dataURL || !dataURL.includes(",")) return 0;
    return Math.ceil(((dataURL.split(",")[1] || "").length * 3) / 4);
  };

  const compressImage = async (file) => {
    const fileData = await fileToDataURL(file);
    if (!fileData) return null;
    const attemptCompress = (img, quality, maxWidth) => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", quality);
    };
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          let maxWidth = 1600,
            quality = 0.92;
          let compressed = attemptCompress(img, quality, maxWidth);
          let size = dataURLSizeBytes(compressed);
          while (size > 800000 && quality >= 0.7) {
            quality -= 0.05;
            compressed = attemptCompress(img, quality, maxWidth);
            size = dataURLSizeBytes(compressed);
            if (quality <= 0.7 && maxWidth > 1200) maxWidth = 1200;
          }
          resolve(size < 250000 ? fileData : compressed || fileData);
        } catch {
          resolve(fileData);
        }
      };
      img.onerror = () => resolve(fileData);
      img.src = fileData;
    });
  };

  const handleCoverFile = async (file) => {
    try {
      const data = await compressImage(file);
      setPropertyForm((prev) => ({ ...prev, coverImage: data }));
      setMessage(`Cover image selected: ${file.name}`);
    } catch {
      setMessage("Failed to process cover image");
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    if (!files.length) return;
    const items = [];
    for (const file of files) {
      try {
        const data = await compressImage(file);
        if (data)
          items.push({ filename: file.name, contentType: file.type, data });
      } catch {
        console.error("Failed to process image:", file.name);
      }
    }
    setPropertyForm((prev) => ({ ...prev, images: items }));
    setMessage(`${items.length} image(s) selected`);
  };

  const handleContractDocuments = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    if (!files.length) return;
    const docs = [];
    for (const file of files) {
      try {
        const reader = new FileReader();
        const filePromise = new Promise((resolve) => {
          reader.onload = () => {
            docs.push({
              filename: file.name,
              contentType: file.type,
              size: file.size,
              data: reader.result,
            });
            resolve();
          };
          reader.readAsDataURL(file);
        });
        await filePromise;
      } catch (e) {
        console.error("Failed to process document:", file.name, e);
      }
    }
    setContractForm((prev) => ({ ...prev, documents: docs }));
    setMessage(`${docs.length} document(s) selected`);
  };

  // Kept for backward compatibility with other forms

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    if (
      !propertyForm.title ||
      !propertyForm.description ||
      !propertyForm.type ||
      !propertyForm.purpose ||
      !propertyForm.location ||
      !propertyForm.price
    ) {
      setMessage("Please fill all required fields");
      return;
    }
    const outgoingCover = propertyForm.coverImage
      ? propertyForm.coverImage.data || propertyForm.coverImage
      : "";
    const outgoingImages = Array.isArray(propertyForm.images)
      ? propertyForm.images
          .map((img) => ({
            filename: img.filename || "",
            contentType: img.contentType || "image/jpeg",
            data: img.data || "",
          }))
          .filter((img) => img.data)
      : [];
    try {
      const res = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: propertyForm.title,
          description: propertyForm.description,
          type: propertyForm.purpose === "rent" ? "rent" : "sale",
          location: propertyForm.location,
          price: Number(propertyForm.price),
          area: Number(propertyForm.area),
          bedrooms: Number(propertyForm.bedrooms),
          bathrooms: Number(propertyForm.bathrooms),
          propertyType: propertyForm.type,
          amenities: propertyForm.amenities,
          coverImage: outgoingCover,
          images: outgoingImages,
          agentName: propertyForm.agentName,
          agentPhone: propertyForm.agentPhone,
          agent: selectedAgent ? {
            agentId: selectedAgent._id,
            agentName: selectedAgent.name,
            agentPhone: selectedAgent.phone,
            agentEmail: selectedAgent.email,
            agentExperience: selectedAgent.experience,
            agentStatus: selectedAgent.status,
            agentSpecialization: selectedAgent.specialization,
          } : null,
        }),
      });
      const resData = await res.json();
      if (!res.ok)
        throw new Error(resData.message || "Failed to create property");
      setMessage(resData.message || "Property created successfully");
      setPropertyForm({
        title: "",
        description: "",
        type: "",
        purpose: "",
        price: "",
        status: "Available",
        area: "",
        bedrooms: "",
        bathrooms: "",
        location: "",
        amenities: [],
        coverImage: null,
        images: [],
      });
      setSelectedAgent(null);
      setCurrentStep(1);
      if (coverInputRef.current) coverInputRef.current.value = "";
      if (imagesInputRef.current) imagesInputRef.current.value = "";
      getProperties();
      setTimeout(() => setMessage(""), 3500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Delete failed");
      }
      setMessage("Property deleted");
      getProperties();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleCreateInquiry = async (e) => {
    e.preventDefault();
    try {
      if (
        !inquiryForm.clientName ||
        !inquiryForm.email ||
        !inquiryForm.phone ||
        !inquiryForm.message
      ) {
        setMessage("Please fill all required fields");
        return;
      }

      const res = await fetch(`${API_URL}/api/inquiries/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryForm),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Inquiry created successfully");
        setShowInquiryForm(false);
        setInquiryForm({
          clientName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          propertyId: "",
          propertyTitle: "",
          amount: "",
        });
        getInquiries();
      } else {
        setMessage(data.message || "Failed to create inquiry");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      if (
        !bookingForm.targetProperty ||
        !bookingForm.customer ||
        !bookingForm.visitDate ||
        !bookingForm.visitTime
      ) {
        setMessage("Please fill all required fields");
        addNotification("Please fill all required fields", "warning", 3000);
        return;
      }

      const res = await fetch(`${API_URL}/api/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyTitle: bookingForm.targetProperty,
          property: bookingForm.targetProperty,
          unit: bookingForm.unit || null,
          customerName: bookingForm.customer,
          customerEmail: bookingForm.customer.includes("@")
            ? bookingForm.customer
            : `${bookingForm.customer}@customer.local`,
          customerPhone: "",
          agent: bookingForm.assignAgent || "Unassigned",
          visitDate: bookingForm.visitDate,
          visitTime: bookingForm.visitTime,
          status: bookingForm.currentStatus,
          notes: bookingForm.notes,
          createdBy: "ADMIN"
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Booking created successfully");
        addNotification(
          `✓ Booking created for ${bookingForm.customer} at ${bookingForm.targetProperty}`,
          "success",
          5000
        );
        setShowBookingForm(false);
        setBookingForm({
          targetProperty: "",
          targetPropertyId: "",
          unit: "",
          customer: "",
          assignAgent: "",
          visitDate: "",
          visitTime: "",
          currentStatus: "PENDING",
          notes: "",
        });
        getBookings();
      } else {
        setMessage(data.message || "Failed to create booking");
        addNotification(
          data.message || "Failed to create booking",
          "error",
          5000
        );
      }
    } catch (error) {
      setMessage(error.message);
      addNotification(
        "Error creating booking: " + error.message,
        "error",
        5000
      );
    }
  };

  const handleCreateMaintenance = async (e) => {
    e.preventDefault();
    try {
      if (
        !maintenanceForm.property ||
        !maintenanceForm.title ||
        !maintenanceForm.description
      ) {
        setMessage("Please fill all required fields");
        return;
      }

      const res = await fetch(`${API_URL}/api/maintenance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property: maintenanceForm.property,
          issueDescription: maintenanceForm.description,
          priority: maintenanceForm.priority,
          requester: maintenanceForm.requestedBy || "System",
          requesterEmail: `maintenance@${maintenanceForm.property.toLowerCase().replace(/\s+/g, "")}.local`,
          status: maintenanceForm.status,
          notes: `Type: ${maintenanceForm.type}, Est. Cost: ${maintenanceForm.estimatedCost || "N/A"}, Scheduled: ${maintenanceForm.scheduledDate || "TBD"}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Maintenance request created successfully");
        setShowMaintenanceForm(false);
        setMaintenanceForm({
          property: "",
          propertyId: "",
          unit: "",
          requestedBy: "",
          title: "",
          type: "Repair",
          description: "",
          priority: "MEDIUM",
          status: "PENDING",
          estimatedCost: "",
          scheduledDate: "",
        });
        getMaintenances();
      } else {
        setMessage(data.message || "Failed to create maintenance request");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      if (
        !paymentForm.client ||
        !paymentForm.property ||
        !paymentForm.paymentType ||
        !paymentForm.baseAmount ||
        !paymentForm.receivedAmount
      ) {
        setMessage("Please fill all required fields");
        return;
      }

      const invoiceNumber = `INV-${Date.now()}`;
      const res = await fetch(`${API_URL}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: invoiceNumber,
          clientName: paymentForm.client,
          clientEmail:
            users.find((u) => u._id === paymentForm.clientId)?.email || "",
          property: paymentForm.property,
          unit: paymentForm.unit || "N/A",
          paymentType: paymentForm.paymentType,
          amount: parseFloat(paymentForm.baseAmount) || 0,
          received: parseFloat(paymentForm.receivedAmount) || 0,
          due:
            (parseFloat(paymentForm.baseAmount) || 0) -
            (parseFloat(paymentForm.receivedAmount) || 0),
          date: new Date().toISOString().split("T")[0],
          status:
            (parseFloat(paymentForm.receivedAmount) || 0) >=
            (parseFloat(paymentForm.baseAmount) || 0)
              ? "PAID"
              : "PARTIAL",
          paymentMethod: paymentForm.paymentMethod,
          billingMonth: paymentForm.billingMonth,
          billingYear: paymentForm.billingYear,
          internalNotes: paymentForm.internalNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Payment recorded successfully");
        setShowRecordPaymentForm(false);
        setPaymentForm({
          linkedContract: "",
          property: "",
          propertyId: "",
          unit: "",
          unitId: "",
          client: "",
          clientId: "",
          paymentType: "RENT",
          paymentMethod: "CASH",
          baseAmount: "",
          receivedAmount: "",
          billingMonth: "",
          billingYear: new Date().getFullYear().toString(),
          internalNotes: "",
        });
        getPayments();
      } else {
        setMessage(data.message || "Failed to record payment");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const PlaceholderPage = ({ title, description }) => (
    <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 text-center py-16">
      <div className="text-5xl mb-4">📋</div>
      <h2 className="text-2xl font-bold text-[#111] mb-2">{title}</h2>
      <p className="text-[#666] text-sm max-w-md mx-auto">{description}</p>
      <button
        onClick={() => setActiveTab("dashboard")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-[10px] cursor-pointer transition-colors border-none"
      >
        Back to Dashboard
      </button>
    </div>
  );

  const inputCls =
    "w-full bg-[#fafafa] border border-[#e8e8e8] rounded-[10px] px-[14px] py-[10px] text-sm text-[#111111] outline-none focus:border-blue-600 focus:bg-white transition-all font-sans placeholder:text-[#aaa]";
  const labelCls = "text-xs font-semibold text-[#444]";

  return (
    // ✅ FIX: outer wrapper is relative so sidebar can be sticky within it
    <div
      className="flex bg-[#f7f6f3] text-[#080707]"
      style={{
        fontFamily:
          "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── SIDEBAR ── */}
      {/* ✅ FIX: changed from fixed to sticky, top-16 keeps it below navbar,
           self-start + h stays in flow so it never overlaps the footer */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col sticky top-16 self-start h-[calc(100vh-4rem)] bg-white border-r border-[#ebebeb] px-5 py-4">
        {/* Logo & greeting */}
        <div className="text-[22px] font-bold text-[#0f0f0f] tracking-tight mb-1">
          Admin Panel
        </div>
        <div className="text-xs text-[#777] font-normal mb-9">
          Welcome back, {name}
        </div>

        {/* Nav buttons - scrollable */}
        <nav
          className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TAB_OPTIONS.map((section) => (
            <div key={section.section}>
              <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#999] mb-2.5 pl-2">
                {section.section}
              </div>
              <div className="flex flex-col gap-0.5">
                {section.items.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium text-left transition-all border-none cursor-pointer
                      ${
                        activeTab === tab
                          ? "bg-[#f0f5ff] text-blue-600 [&_svg]:stroke-blue-600"
                          : "bg-transparent text-[#444] hover:bg-[#f5f5f5] hover:text-[#111]"
                      }`}
                  >
                    {icons[tab]}
                    {tab
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout fixed at bottom */}
        <button
          onClick={logout}
          className="shrink-0 flex items-center gap-2 w-full m-auto mt-3 px-3 py-2.5 rounded-[10px] border border-[#fee2e2] bg-white text-red-500 text-[13px] font-medium hover:bg-red-50 transition-all cursor-pointer"
        >
          {icons.logout} Sign out
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 px-6 lg:px-10 py-9 min-h-screen">
        {/* Message banner */}
        {message && (
          <div className="flex items-center gap-2.5 bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] rounded-[10px] px-4 py-3 text-[13px] mb-5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {message}
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="relative bg-white border border-[#ebebeb] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl bg-linear-to-r from-blue-500 to-blue-300" />
                <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#777] mb-2.5">
                  Total Properties
                </div>
                <div className="text-[36px] font-semibold text-[#111] leading-none">
                  {properties.length || 0}
                </div>
              </div>
              <div className="relative bg-white border border-[#ebebeb] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl bg-linear-to-r from-amber-400 to-yellow-300" />
                <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#777] mb-2.5">
                  Total Users
                </div>
                <div className="text-[36px] font-semibold text-[#111] leading-none">
                  {users.length || 0}
                </div>
              </div>
              <div className="relative bg-white border border-[#ebebeb] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl bg-linear-to-r from-emerald-500 to-teal-300" />
                <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#777] mb-2.5">
                  Server Status
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 text-base font-semibold">
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="text-[15px] font-semibold text-[#111] mb-5">
                Quick Actions
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setActiveTab("properties")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
                >
                  {icons.add} Add Property
                </button>
                <button
                  onClick={() => setActiveTab("agents")}
                  className="flex items-center gap-2 bg-[#f0f5ff] hover:bg-blue-100 text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
                >
                  {icons.agents} Manage Agents
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="flex items-center gap-2 bg-[#f0f5ff] hover:bg-blue-100 text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
                >
                  {icons.bookings} View Bookings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── PROPERTIES ── */}
        {activeTab === "properties" && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="mb-7">
                <h2 className="text-xl font-bold text-[#111] mb-0.5">
                  Add New Property
                </h2>
                <p className="text-[13px] text-[#999]">
                  List a new property in the system
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto pb-2">
                {[
                  { num: 1, label: "Basic Info", icon: icons.dashboard },
                  {
                    num: 2,
                    label: "Specs & Amenities",
                    icon: icons.properties,
                  },
                  { num: 3, label: "Location", icon: "Pin" },
                  { num: 4, label: "Media & Docs", icon: icons.upload },
                  { num: 5, label: "SEO", icon: "Globe" },
                ].map((step, idx) => (
                  <div
                    key={step.num}
                    className="flex items-center gap-2 shrink-0"
                  >
                    <button
                      onClick={() => setCurrentStep(step.num)}
                      className={`flex items-center justify-center gap-2 text-xs font-bold rounded-full transition-all w-10 h-10 shrink-0 ${
                        currentStep === step.num
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : currentStep > step.num
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-[#f0f0f0] text-[#666]"
                      }`}
                    >
                      {currentStep > step.num ? "✓" : step.num}
                    </button>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wide shrink-0 ${
                        currentStep >= step.num ? "text-[#111]" : "text-[#999]"
                      }`}
                    >
                      {step.label}
                    </span>
                    {idx < 4 && (
                      <div
                        className={`w-6 h-0.5 shrink-0 ${
                          currentStep > step.num
                            ? "bg-emerald-400"
                            : "bg-[#e0e0e0]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Form Steps */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep === 5) handleCreateProperty(e);
                  else setCurrentStep(currentStep + 1);
                }}
              >
                {/* STEP 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className={labelCls}>Property Title *</label>
                        <input
                          name="title"
                          value={propertyForm.title}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g. Modern 2BHK Flat"
                          className={inputCls}
                          required
                        />
                      </div>
                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className={labelCls}>Description *</label>
                        <textarea
                          name="description"
                          value={propertyForm.description}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                          placeholder="Describe the property..."
                          className={inputCls + " resize-y min-h-22.5"}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Property Type *</label>
                        <select
                          value={propertyForm.type}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              type: e.target.value,
                            })
                          }
                          className={inputCls}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="house">House</option>
                          <option value="commercial">Commercial</option>
                          <option value="plot">Plot</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Purpose *</label>
                        <select
                          value={propertyForm.purpose}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              purpose: e.target.value,
                            })
                          }
                          className={inputCls}
                          required
                        >
                          <option value="">Select Purpose</option>
                          <option value="sale">For Sale</option>
                          <option value="rent">For Rent</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Price (£) *</label>
                        <input
                          type="number"
                          value={propertyForm.price}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              price: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Status</label>
                        <select
                          value={propertyForm.status}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              status: e.target.value,
                            })
                          }
                          className={inputCls}
                        >
                          <option value="Available">Available</option>
                          <option value="Rented">Rented</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Specs & Amenities */}
                {currentStep === 2 && (
                  <div className="animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Area (sq ft)</label>
                        <input
                          type="number"
                          value={propertyForm.area}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              area: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Bedrooms</label>
                        <input
                          type="number"
                          value={propertyForm.bedrooms}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              bedrooms: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Bathrooms</label>
                        <input
                          type="number"
                          value={propertyForm.bathrooms}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              bathrooms: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Amenities</label>
                        <input
                          type="text"
                          value={propertyForm.amenities.join(", ")}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              amenities: e.target.value
                                .split(",")
                                .map((a) => a.trim()),
                            })
                          }
                          placeholder="e.g. Pool, Gym, Parking"
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Location Details */}
                {currentStep === 3 && (
                  <div className="animate-fadeIn">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Location/Address *</label>
                        <input
                          value={propertyForm.location}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              location: e.target.value,
                            })
                          }
                          placeholder="e.g. 123 High Street, London, UK"
                          className={inputCls}
                          required
                        />
                      </div>

                      {/* Agent Assignment */}
                      <div className="border-t border-[#e0e0e0] pt-4 mt-2">
                        <h3 className="text-sm font-bold text-[#111] mb-4">Assign Agent</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className={labelCls}>Select Agent</label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() =>
                                  setPropertyAgentDropdownOpen(
                                    !propertyAgentDropdownOpen
                                  )
                                }
                                className="w-full px-3 py-2 border border-[#ccc] rounded-md bg-white text-left text-sm hover:bg-gray-50 flex justify-between items-center"
                              >
                                <span>
                                  {propertyForm.agentName || "Choose an agent"}
                                </span>
                                <span className="text-xs">▼</span>
                              </button>
                              {propertyAgentDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ccc] rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                                  <input
                                    type="text"
                                    placeholder="Search agents..."
                                    value={propertyAgentSearch}
                                    onChange={(e) =>
                                      setPropertyAgentSearch(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border-b border-[#e0e0e0] text-sm sticky top-0 bg-white"
                                  />
                                  {agents
                                    .filter((agent) =>
                                      agent.name
                                        .toLowerCase()
                                        .includes(
                                          propertyAgentSearch.toLowerCase()
                                        )
                                    )
                                    .map((agent) => (
                                      <div
                                        key={agent._id}
                                        onClick={() => {
                                          setPropertyForm({
                                            ...propertyForm,
                                            agentName: agent.name,
                                            agentPhone: agent.phone,
                                          });
                                          setSelectedAgent(agent);
                                          setPropertyAgentDropdownOpen(false);
                                          setPropertyAgentSearch("");
                                        }}
                                        className="px-3 py-2.5 cursor-pointer hover:bg-blue-50 border-b border-[#f0f0f0] text-sm"
                                      >
                                        <div className="font-medium text-[#111]">
                                          {agent.name}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          {agent.phone}
                                        </div>
                                      </div>
                                    ))}
                                  {agents.filter((agent) =>
                                    agent.name
                                      .toLowerCase()
                                      .includes(
                                        propertyAgentSearch.toLowerCase()
                                      )
                                  ).length === 0 && (
                                    <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                      No agents found
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {propertyForm.agentName && (
                            <div className="flex flex-col gap-1.5">
                              <label className={labelCls}>Agent Phone</label>
                              <input
                                type="tel"
                                value={propertyForm.agentPhone}
                                readOnly
                                className={`${inputCls} bg-gray-100 cursor-not-allowed`}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                     
                    </div>
                  </div>
                )}

                {/* STEP 4: Media & Documents */}
                {currentStep === 4 && (
                  <div className="animate-fadeIn space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Cover Image *</label>
                      <label className="relative flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#d0d0d0] rounded-xl p-5 bg-[#fafafa] cursor-pointer hover:border-blue-500 hover:bg-[#f0f5ff] transition-all group">
                        <input
                          ref={coverInputRef}
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleCoverFile(f);
                          }}
                        />
                        <span className="text-[24px] group-hover:scale-110 transition-transform">
                          📸
                        </span>
                        <span className="text-[13px] text-[#666]">
                          {propertyForm.coverImage ? (
                            <span className="text-emerald-600 font-semibold">
                              ✓ Cover image selected
                            </span>
                          ) : (
                            <>
                              <span className="text-blue-600 font-semibold">
                                Click to upload
                              </span>{" "}
                              cover image
                            </>
                          )}
                        </span>
                      </label>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>
                        Gallery Photos (max 10)
                      </label>
                      <label className="relative flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#d0d0d0] rounded-xl p-5 bg-[#fafafa] cursor-pointer hover:border-blue-500 hover:bg-[#f0f5ff] transition-all group">
                        <input
                          ref={imagesInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          onChange={handleFileChange}
                        />
                        <span className="text-[24px] group-hover:scale-110 transition-transform">
                          🖼️
                        </span>
                        <span className="text-[13px] text-[#666]">
                          {propertyForm.images.length > 0 ? (
                            <span className="text-emerald-600 font-semibold">
                              ✓ {propertyForm.images.length} image(s) selected
                            </span>
                          ) : (
                            <>
                              <span className="text-blue-600 font-semibold">
                                Click to upload
                              </span>{" "}
                              gallery images
                            </>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 5: SEO Optimization */}
                {currentStep === 5 && (
                  <div className="animate-fadeIn">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-[13px] text-blue-700">
                        <strong>SEO Optimization Guidelines:</strong>
                        <ul className="mt-2 space-y-1 ml-4 list-disc">
                          <li>Use descriptive property titles (50-60 chars)</li>
                          <li>Include location in description</li>
                          <li>
                            Add relevant keywords: property type, features
                          </li>
                          <li>Keep descriptions natural and informative</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-medium text-emerald-700">
                        ✓ Your property details are SEO-ready! Images will be
                        optimized automatically.
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-[#e0e0e0]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                      currentStep === 1
                        ? "bg-[#f0f0f0] text-[#999] cursor-not-allowed"
                        : "bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#333]"
                    }`}
                    disabled={currentStep === 1}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95"
                  >
                    {currentStep === 5 ? (
                      <>{icons.add} Complete & Add Property</>
                    ) : (
                      <>Next Step →</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
              <div className="flex items-center gap-2 text-[15px] font-semibold text-[#111] mb-5">
                {icons.properties} All Properties ({properties.length})
              </div>
              {properties.length === 0 ? (
                <div className="text-center py-10 text-[#999] text-[13px]">
                  No properties added yet.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {properties.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center justify-between gap-4 px-4 py-3.5 border border-[#f0f0f0] rounded-xl hover:border-[#ddd] hover:bg-[#fafafa] transition-all"
                    >
                      <div>
                        <div className="text-[14px] font-semibold text-[#111] mb-1">
                          {p.title}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-[#666]">
                          <span>{p.location}</span>
                          <span className="w-0.75 h-0.75 rounded-full bg-[#ccc]" />
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                              p.type === "sale"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {p.type}
                          </span>
                          <span className="w-0.75 h-0.75 rounded-full bg-[#ccc]" />
                          <span className="font-semibold text-[#111]">
                            £{p.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteProperty(p._id)}
                        className="flex items-center gap-1.5 bg-transparent border border-[#fecaca] text-red-400 hover:bg-red-50 hover:border-red-400 hover:text-red-500 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer shrink-0"
                      >
                        {icons.trash} Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {activeTab === "users" && (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-[#111] mb-5">
              {icons.users} All Users ({users.length})
            </div>
            {users.length === 0 ? (
              <div className="text-center py-10 text-[#999] text-[13px]">
                No users yet.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {users.map((u) => (
                  <div
                    key={u._id}
                    className="flex items-center gap-3.5 px-4 py-3.5 border border-[#f0f0f0] rounded-xl hover:border-[#ddd] transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-[15px] font-bold text-blue-600 shrink-0">
                      {(u.name || u.email || "U")[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#111] truncate">
                        {u.name || "Unnamed"}
                      </div>
                      <div className="text-[12px] text-[#555] truncate">
                        {u.email}
                      </div>
                    </div>
                    <span className="text-[12px] text-[#888] shrink-0">
                      {u.phone || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── UNITS ── */}
        {activeTab === "units" && (
          <div>
            {showEditUnitForm && editingUnit ? (
              <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => {
                      setShowEditUnitForm(false);
                      setEditingUnit(null);
                    }}
                    className="text-[#666] hover:text-[#111] transition-colors font-semibold text-sm"
                  >
                    ← Back to Inventory
                  </button>
                </div>

                {/* Header */}
                <div className="mb-8 pb-6 border-b border-[#e0e0e0]">
                  <h2 className="text-3xl font-bold text-[#111] mb-2">
                    Unit {editingUnit?.unitNumber}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#999]">Property:</span>
                      <span className="font-semibold text-[#111]">
                        {editingUnit?.property || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#999]">Location:</span>
                      <span className="font-semibold text-[#111]">
                        {editingUnit?.location || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#999]">Block:</span>
                      <span className="font-semibold text-[#111]">
                        {editingUnit?.block || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#999]">Floor:</span>
                      <span className="font-semibold text-[#111]">
                        {editingUnit?.floor || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                      !editingUnit.unitNumber ||
                      !editingUnit.price ||
                      !editingUnit.areaSize
                    ) {
                      setMessage("Please fill all required fields");
                      return;
                    }
                    try {
                      const res = await fetch(
                        `${API_URL}/api/units/${editingUnit.id}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            block: editingUnit.block || "",
                            floorLevel: editingUnit.floor || "",
                            unitNumber: editingUnit.unitNumber,
                            unitType: editingUnit.type || "Apartment",
                            currentStatus: editingUnit.status || "AVAILABLE",
                            price: Number(editingUnit.price),
                            areaSize: Number(editingUnit.areaSize),
                            bedrooms: Number(editingUnit.bedrooms) || 0,
                            bathrooms: Number(editingUnit.bathrooms) || 0,
                          }),
                        },
                      );
                      const resData = await res.json();
                      if (!res.ok)
                        throw new Error(
                          resData.message || "Failed to update unit",
                        );
                      setMessage(
                        resData.message || "Unit updated successfully",
                      );
                      setShowEditUnitForm(false);
                      setEditingUnit(null);
                      getUnits();
                      setTimeout(() => setMessage(""), 3500);
                    } catch (error) {
                      setMessage(error.message);
                    }
                  }}
                >
                  {/* SECTION 1: Unit Location Details */}
                  <div className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
                    <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                      📍 UNIT LOCATION & IDENTIFICATION
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Block / Tower</label>
                        <input
                          value={editingUnit?.block || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              block: e.target.value,
                            })
                          }
                          placeholder="e.g. A, Tower-1"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Floor Level</label>
                        <input
                          value={editingUnit?.floor || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              floor: e.target.value,
                            })
                          }
                          placeholder="e.g. Ground, 1st, 2nd"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Unit Number *</label>
                        <input
                          value={editingUnit?.unitNumber || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              unitNumber: e.target.value,
                            })
                          }
                          placeholder="e.g. 101, A-201"
                          className={inputCls}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Unit Type & Status */}
                  <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-xl">
                    <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
                      📋 UNIT TYPE & STATUS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Unit Type</label>
                        <select
                          value={editingUnit?.type || "Sale"}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              type: e.target.value,
                            })
                          }
                          className={inputCls}
                        >
                          <option value="Sale">Sale</option>
                          <option value="Rent">Rent</option>
                        </select>
                      </div>
                      <div
                        className="flex flex-col gap-1.5 relative"
                        data-editing-status-dropdown
                      >
                        <label className={labelCls}>Current Status</label>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingStatusDropdownOpen(
                              !editingStatusDropdownOpen,
                            )
                          }
                          className={`${inputCls} w-full text-left flex items-center justify-between`}
                        >
                          <span>{editingUnit?.status || "Select status"}</span>
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {editingStatusDropdownOpen && (
                          <div className="absolute mt-1 w-full bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50">
                            <div className="p-2 border-b border-[#e0e0e0]">
                              <input
                                type="text"
                                value={editingStatusSearch}
                                onChange={(e) =>
                                  setEditingStatusSearch(e.target.value)
                                }
                                placeholder="Search status..."
                                className={inputCls + " text-sm"}
                                autoFocus
                              />
                            </div>
                            <div className="max-h-44 overflow-y-auto">
                              {UNIT_STATUS_OPTIONS.filter((status) =>
                                status
                                  .toLowerCase()
                                  .includes(editingStatusSearch.toLowerCase()),
                              ).map((status) => (
                                <button
                                  key={status}
                                  type="button"
                                  className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors ${editingUnit?.status === status ? "bg-blue-100 text-blue-700 font-semibold" : "text-[#333]"}`}
                                  onClick={() => {
                                    setEditingUnit({ ...editingUnit, status });
                                    setEditingStatusDropdownOpen(false);
                                    setEditingStatusSearch("");
                                  }}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Pricing */}
                  <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-xl">
                    <h3 className="text-sm font-bold text-green-900 mb-4 flex items-center gap-2">
                      💰 PRICING & AREA
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Price (£) *</label>
                        <input
                          type="number"
                          value={editingUnit?.price || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              price: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Area Size (sq ft) *</label>
                        <input
                          type="number"
                          value={editingUnit?.areaSize || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              areaSize: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: Bedrooms & Bathrooms */}
                  <div className="mb-8 p-5 bg-purple-50 border border-purple-200 rounded-xl">
                    <h3 className="text-sm font-bold text-purple-900 mb-4 flex items-center gap-2">
                      🛏️ SPECIFICATIONS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Bedrooms</label>
                        <input
                          type="number"
                          value={editingUnit?.bedrooms || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              bedrooms: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Bathrooms</label>
                        <input
                          type="number"
                          value={editingUnit?.bathrooms || ""}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              bathrooms: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Note & Button */}
                  <div className="text-center pt-4 border-t border-[#e0e0e0]">
                    <p className="text-xs text-[#999] mb-6">
                      Update unit information and save changes
                    </p>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-[10px] transition-all active:scale-95 w-full sm:w-auto mx-auto"
                    >
                      ✏️ Update Unit
                    </button>
                  </div>
                </form>
              </div>
            ) : !showAddUnitForm ? (
              <>
                <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[#111] mb-1">
                        {icons.units} Unit Inventory
                      </h2>
                      <p className="text-[13px] text-[#666]">
                        Manage individual units across all properties
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddUnitForm(true)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
                    >
                      {icons.add} Add Unit
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="flex gap-3 mb-5 flex-wrap">
                    <div className="relative flex-1 min-w-62.5">
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#aaa]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search unit no, block..."
                        value={unitSearchQuery}
                        onChange={(e) => setUnitSearchQuery(e.target.value)}
                        className={inputCls + " pl-10"}
                      />
                    </div>
                    <select
                      className={inputCls + " flex-1 min-w-50"}
                      value={unitFilterProperty}
                      onChange={(e) => setUnitFilterProperty(e.target.value)}
                    >
                      <option value="all">All Properties</option>
                      {properties.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    <select
                      className={inputCls + " flex-1 min-w-45"}
                      value={unitFilterStatus}
                      onChange={(e) => setUnitFilterStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      {UNIT_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Table */}
                  {unitsData.length === 0 ? (
                    <div className="text-center py-10 text-[#999] text-[13px]">
                      No units yet.
                    </div>
                  ) : (
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2 text-sm items-center">
                        <span className="font-semibold text-[#444]">
                          Status summary:
                        </span>
                        {UNIT_STATUS_OPTIONS.map((status) => (
                          <span
                            key={status}
                            className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700"
                          >
                            {status}: {unitStatusCounts[status] || 0}
                          </span>
                        ))}
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          Total: {unitStatusCounts.total}
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[#ebebeb]">
                              <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                                UNIT DETAILS
                              </th>
                              <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                                PROPERTY
                              </th>
                              <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                                SPECS
                              </th>
                              <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                                PRICE
                              </th>
                              <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                                STATUS
                              </th>
                              <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                                ACTIONS
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUnits.length === 0 ? (
                              <tr key="no-units">
                                <td
                                  colSpan="6"
                                  className="text-center py-6 text-[#999]"
                                >
                                  No units match your filters
                                </td>
                              </tr>
                            ) : (
                              filteredUnits.map((unit) => (
                                <tr
                                  key={unit.id}
                                  className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                                >
                                  <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                        {unit.unitNumber}
                                      </div>
                                      <div>
                                        <div className="font-semibold text-[#111]">
                                          Unit {unit.unitNumber}
                                        </div>
                                        <div className="text-xs text-[#666]">
                                          {unit.block} • {unit.floorLevel}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div>
                                      <div className="font-semibold text-[#111]">
                                        {unit.property}
                                      </div>
                                      <div className="text-xs text-[#666]">
                                        {unit.areaSize} sqft
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div>
                                      <div className="text-[#111]">
                                        {unit.bedrooms} bed • {unit.bathrooms}{" "}
                                        bath
                                      </div>
                                      <div className="text-xs text-[#666]">
                                        Area: {unit.areaSize}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="font-bold text-emerald-600">
                                      £{parseInt(unit.price).toLocaleString()}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <span
                                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${unit.statusColor}`}
                                    >
                                      {unit.status}
                                    </span>
                                  </td>
                                  <td
                                    className="px-4 py-4"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="relative" data-unit-actions>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenUnitMenu(
                                            openUnitMenu === unit.id
                                              ? null
                                              : unit.id,
                                          );
                                        }}
                                        className="text-[#666] hover:text-[#111] hover:bg-[#f0f0f0] transition-colors p-1.5 rounded-lg"
                                      >
                                        ⋮
                                      </button>
                                      {openUnitMenu === unit.id && (
                                        <div className="absolute right-0 top-full mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg z-50 min-w-max">
                                          <button
                                            type="button"
                                            className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-blue-600 font-medium text-sm transition-colors flex items-center gap-2 border-b border-[#f0f0f0]"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setEditingUnit(unit);
                                              setShowEditUnitForm(true);
                                              setOpenUnitMenu(null);
                                            }}
                                          >
                                            ✏️ Edit Unit
                                          </button>
                                          <button
                                            type="button"
                                            className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 font-medium text-sm transition-colors flex items-center gap-2"
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              if (
                                                confirm(
                                                  `Delete Unit ${unit.unitNumber}?`,
                                                )
                                              ) {
                                                try {
                                                  const res = await fetch(
                                                    `${API_URL}/api/units/${unit.id}`,
                                                    { method: "DELETE" },
                                                  );
                                                  if (!res.ok)
                                                    throw new Error(
                                                      "Delete failed",
                                                    );
                                                  setMessage(
                                                    "Unit deleted successfully",
                                                  );
                                                  getUnits();
                                                  setOpenUnitMenu(null);
                                                  setTimeout(
                                                    () => setMessage(""),
                                                    3500,
                                                  );
                                                } catch (error) {
                                                  setMessage(error.message);
                                                }
                                              }
                                            }}
                                          >
                                            🗑️ Delete Unit
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-[#999]">
                        <div>
                          Showing {filteredUnits.length} of {unitsData.length}{" "}
                          units
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 rounded hover:bg-[#f0f0f0] transition-colors">
                            ‹
                          </button>
                          <button className="px-2 py-1 rounded bg-[#f0f0f0]">
                            PAGE 1 OF 1
                          </button>
                          <button className="px-2 py-1 rounded hover:bg-[#f0f0f0] transition-colors">
                            ›
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setShowAddUnitForm(false)}
                    className="text-[#666] hover:text-[#111] transition-colors font-semibold text-sm"
                  >
                    ← Back to Inventory
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-[#111] mb-1">
                  Add New Unit
                </h2>
                <p className="text-sm text-[#666] mb-6">
                  Add an individual unit to an existing property/building.
                </p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                      !unitForm.parentProperty ||
                      !unitForm.unitNumber ||
                      !unitForm.price ||
                      !unitForm.areaSize
                    ) {
                      setMessage("Please fill all required fields");
                      return;
                    }
                    try {
                      const res = await fetch(`${API_URL}/api/units`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(unitForm),
                      });
                      const resData = await res.json();
                      if (!res.ok)
                        throw new Error(
                          resData.message || "Failed to create unit",
                        );
                      setMessage(
                        resData.message || "Unit created successfully",
                      );
                      setUnitForm({
                        parentProperty: "",
                        block: "",
                        floorLevel: "",
                        unitNumber: "",
                        unitType: "Apartment",
                        currentStatus: "Available",
                        price: "",
                        areaSize: "",
                        bedrooms: "",
                        bathrooms: "",
                        windows: "",
                      });
                      setShowAddUnitForm(false);
                      getUnits();
                      setTimeout(() => setMessage(""), 3500);
                    } catch (error) {
                      setMessage(error.message);
                    }
                  }}
                >
                  {/* Parent Property Section */}
                  <div className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-4">
                      🏢 PARENT PROPERTY
                    </div>
                    <div className="grid gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>
                          Select Building / Project *
                        </label>
                        <div className="relative" data-property-dropdown>
                          <button
                            type="button"
                            onClick={() =>
                              setPropertySearchOpen(!propertySearchOpen)
                            }
                            className={`${inputCls} w-full text-left flex items-center justify-between`}
                          >
                            <span>
                              {unitForm.parentProperty
                                ? properties.find(
                                    (p) => p._id === unitForm.parentProperty,
                                  )?.title +
                                  " (" +
                                  properties.find(
                                    (p) => p._id === unitForm.parentProperty,
                                  )?.location +
                                  ")"
                                : "-- Select Property --"}
                            </span>
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                          {propertySearchOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50">
                              <div className="p-2 border-b border-[#e0e0e0]">
                                <input
                                  type="text"
                                  placeholder="Search properties..."
                                  value={propertySearchQuery}
                                  onChange={(e) =>
                                    setPropertySearchQuery(e.target.value)
                                  }
                                  className={inputCls + " text-sm"}
                                  autoFocus
                                />
                              </div>
                              <div className="max-h-64 overflow-y-auto">
                                {properties
                                  .filter(
                                    (p) =>
                                      p.title
                                        .toLowerCase()
                                        .includes(
                                          propertySearchQuery.toLowerCase(),
                                        ) ||
                                      p.location
                                        .toLowerCase()
                                        .includes(
                                          propertySearchQuery.toLowerCase(),
                                        ),
                                  )
                                  .map((p) => (
                                    <button
                                      key={p._id}
                                      type="button"
                                      onClick={() => {
                                        setUnitForm({
                                          ...unitForm,
                                          parentProperty: p._id,
                                        });
                                        setPropertySearchOpen(false);
                                        setPropertySearchQuery("");
                                      }}
                                      className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors ${
                                        unitForm.parentProperty === p._id
                                          ? "bg-blue-100 text-blue-700 font-semibold"
                                          : "text-[#333]"
                                      }`}
                                    >
                                      {p.title}{" "}
                                      <span className="text-[#666]">
                                        ({p.location})
                                      </span>
                                    </button>
                                  ))}
                                {properties.filter(
                                  (p) =>
                                    p.title
                                      .toLowerCase()
                                      .includes(
                                        propertySearchQuery.toLowerCase(),
                                      ) ||
                                    p.location
                                      .toLowerCase()
                                      .includes(
                                        propertySearchQuery.toLowerCase(),
                                      ),
                                ).length === 0 && (
                                  <div className="px-4 py-3 text-center text-[#999] text-sm">
                                    No properties found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-[#666] mt-1">
                          The unit will be associated with this main
                          property/project.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Unit Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Block / Tower</label>
                      <input
                        value={unitForm.block}
                        onChange={(e) =>
                          setUnitForm({ ...unitForm, block: e.target.value })
                        }
                        placeholder="e.g. A, Tower-1"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Floor Level</label>
                      <input
                        value={unitForm.floorLevel}
                        onChange={(e) =>
                          setUnitForm({
                            ...unitForm,
                            floorLevel: e.target.value,
                          })
                        }
                        placeholder="e.g. Ground, 1st, 2nd"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>
                        Unit Number * <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={unitForm.unitNumber}
                        onChange={(e) =>
                          setUnitForm({
                            ...unitForm,
                            unitNumber: e.target.value,
                          })
                        }
                        placeholder="e.g. 101, A-201"
                        className={inputCls}
                        required
                      />
                    </div>
                  </div>

                  {/* Type & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Unit Type</label>
                      <select
                        value={unitForm.unitType}
                        onChange={(e) =>
                          setUnitForm({ ...unitForm, unitType: e.target.value })
                        }
                        className={inputCls}
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Studio">Studio</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Duplex">Duplex</option>
                      </select>
                    </div>
                    <div
                      className="flex flex-col gap-1.5 relative"
                      data-unit-status-dropdown
                    >
                      <label className={labelCls}>Current Status</label>
                      <button
                        type="button"
                        onClick={() =>
                          setUnitStatusDropdownOpen(!unitStatusDropdownOpen)
                        }
                        className={`${inputCls} w-full text-left flex items-center justify-between`}
                      >
                        <span>{unitForm.currentStatus || "Select status"}</span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {unitStatusDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50">
                          <div className="p-2 border-b border-[#e0e0e0]">
                            <input
                              type="text"
                              value={unitStatusSearch}
                              onChange={(e) =>
                                setUnitStatusSearch(e.target.value)
                              }
                              placeholder="Search status..."
                              className={inputCls + " text-sm"}
                              autoFocus
                            />
                          </div>
                          <div className="max-h-44 overflow-y-auto">
                            {UNIT_STATUS_OPTIONS.filter((status) =>
                              status
                                .toLowerCase()
                                .includes(unitStatusSearch.toLowerCase()),
                            ).map((status) => (
                              <button
                                key={status}
                                type="button"
                                className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors ${unitForm.currentStatus === status ? "bg-blue-100 text-blue-700 font-semibold" : "text-[#333]"}`}
                                onClick={() => {
                                  setUnitForm({
                                    ...unitForm,
                                    currentStatus: status,
                                  });
                                  setUnitStatusDropdownOpen(false);
                                  setUnitStatusSearch("");
                                }}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>
                        Price (£) * <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={unitForm.price}
                        onChange={(e) =>
                          setUnitForm({ ...unitForm, price: e.target.value })
                        }
                        placeholder="0"
                        className={inputCls}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>
                        Area Size (sq ft) *{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={unitForm.areaSize}
                        onChange={(e) =>
                          setUnitForm({ ...unitForm, areaSize: e.target.value })
                        }
                        placeholder="0"
                        className={inputCls}
                        required
                      />
                    </div>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Bedrooms</label>
                      <input
                        type="number"
                        value={unitForm.bedrooms}
                        onChange={(e) =>
                          setUnitForm({ ...unitForm, bedrooms: e.target.value })
                        }
                        placeholder="0"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Bathrooms</label>
                      <input
                        type="number"
                        value={unitForm.bathrooms}
                        onChange={(e) =>
                          setUnitForm({
                            ...unitForm,
                            bathrooms: e.target.value,
                          })
                        }
                        placeholder="0"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Specifications & Windows */}
                  <div className="grid grid-cols-1 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Windows</label>
                      <input
                        value={unitForm.windows}
                        onChange={(e) =>
                          setUnitForm({ ...unitForm, windows: e.target.value })
                        }
                        placeholder="e.g. Corner, East-facing, Valley View"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Footer Note & Button */}
                  <div className="text-center pt-4 border-t border-[#e0e0e0]">
                    <p className="text-xs text-[#999] mb-6">
                      Thank you for your business!
                    </p>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-[10px] transition-all active:scale-95 w-full sm:w-auto mx-auto"
                    >
                      💾 Save Unit Details
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ── CONTRACTS ── */}
        {activeTab === "contracts" && newContractMode && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#111] mb-1">
                    Draft New Contract
                  </h2>
                  <p className="text-sm text-[#666]">
                    Legalize property agreements and rentals
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNewContractMode(false);
                    setContractForm({
                      property: "",
                      unit: "",
                      clientName: "",
                      clientEmail: "",
                      clientPhone: "",
                      status: "",
                      amount: "",
                      billingCycle: "",
                      securityDeposit: "",
                      lateFee: "",
                      startDate: "",
                      endDate: "",
                      additionalNotes: "",
                      documents: [],
                    });
                  }}
                  className="text-[#999] hover:text-[#111] text-3xl font-light transition-colors border-none cursor-pointer bg-transparent"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (
                    !contractForm.property ||
                    !contractForm.amount ||
                    !contractForm.clientName ||
                    !contractForm.startDate ||
                    !contractForm.billingCycle ||
                    !contractForm.status
                  ) {
                    setMessage("Please fill all required fields");
                    return;
                  }
                  try {
                    console.log(
                      "📝 Submitting contract with email:",
                      contractForm.clientEmail,
                    );
                    const res = await fetch(`${API_URL}/api/contracts/create`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        property: contractForm.property,
                        unit: contractForm.unit || null,
                        customer: {
                          name: contractForm.clientName,
                          email: contractForm.clientEmail,
                          phone: contractForm.clientPhone || "",
                        },
                        contractType:
                          contractForm.billingCycle === "Monthly"
                            ? "RENTAL AGREEMENT"
                            : contractForm.billingCycle === "Yearly"
                              ? "LEASE AGREEMENT"
                              : "RENTAL AGREEMENT",
                        amount: Number(contractForm.amount),
                        billingCycle: contractForm.billingCycle,
                        securityDeposit:
                          Number(contractForm.securityDeposit) || 0,
                        lateFee: Number(contractForm.lateFee) || 0,
                        startDate: contractForm.startDate,
                        endDate: contractForm.endDate || null,
                        additionalNotes: contractForm.additionalNotes,
                        documents: contractForm.documents,
                        status: contractForm.status,
                      }),
                    });
                    const data = await res.json();
                    console.log("✅ Contract response:", data);
                    if (data.success) {
                      setMessage("Contract created successfully!");
                      setNewContractMode(false);
                      setContractForm({
                        property: "",
                        unit: "",
                        clientName: "",
                        clientEmail: "",
                        clientPhone: "",
                        status: "",
                        amount: "",
                        billingCycle: "",
                        securityDeposit: "",
                        lateFee: "",
                        startDate: "",
                        endDate: "",
                        additionalNotes: "",
                        documents: [],
                      });
                      getContracts();
                      setTimeout(() => setMessage(""), 3500);
                    } else {
                      setMessage(data.message || "Failed to create contract");
                    }
                  } catch (error) {
                    setMessage("Error: " + error.message);
                  }
                }}
              >
                {/* AGREEMENT BASICS */}
                <div className="mb-7 pb-7 border-b">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="text-xl">📋</div>
                    <h3 className="text-base font-bold text-[#111]">
                      Agreement Basics
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Select Property */}
                    <div
                      className="flex flex-col gap-1.5 relative"
                      data-property-dropdown
                    >
                      <label className={labelCls}>Select Property *</label>
                      <button
                        type="button"
                        onClick={() =>
                          setPropertySearchOpen(!propertySearchOpen)
                        }
                        className={`${inputCls} w-full text-left flex items-center justify-between`}
                        required
                      >
                        <span>
                          {contractForm.property
                            ? properties.find(
                                (p) => p._id === contractForm.property,
                              )?.title || "-- Select Property --"
                            : "-- Select Property --"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {propertySearchOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50 w-full min-w-80">
                          <div className="p-2 border-b border-[#e0e0e0]">
                            <input
                              type="text"
                              placeholder="Search property..."
                              value={propertySearchQuery}
                              onChange={(e) =>
                                setPropertySearchQuery(e.target.value)
                              }
                              className={inputCls + " text-sm"}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div
                            className="max-h-48 overflow-y-auto"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            <div
                              onClick={() => {
                                setContractForm({
                                  ...contractForm,
                                  property: "",
                                  unit: "",
                                });
                                setPropertySearchOpen(false);
                                setPropertySearchQuery("");
                              }}
                              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-[#666]"
                            >
                              -- Select Property --
                            </div>
                            {properties
                              .filter(
                                (p) =>
                                  p.title
                                    .toLowerCase()
                                    .includes(
                                      propertySearchQuery.toLowerCase(),
                                    ) ||
                                  p.location
                                    .toLowerCase()
                                    .includes(
                                      propertySearchQuery.toLowerCase(),
                                    ),
                              )
                              .map((prop) => (
                                <div
                                  key={prop._id}
                                  onClick={() => {
                                    setContractForm({
                                      ...contractForm,
                                      property: prop._id,
                                      unit: "",
                                    });
                                    setPropertySearchOpen(false);
                                    setPropertySearchQuery("");
                                  }}
                                  className={`px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-[#f0f0f0] last:border-0 ${
                                    contractForm.property === prop._id
                                      ? "bg-blue-100 text-blue-700 font-semibold"
                                      : "text-[#333]"
                                  }`}
                                >
                                  <p className="font-semibold">{prop.title}</p>
                                  <p className="text-xs text-[#666]">
                                    £{prop.price?.toLocaleString()} •{" "}
                                    {prop.location}
                                  </p>
                                </div>
                              ))}
                            {properties.filter(
                              (p) =>
                                p.title
                                  .toLowerCase()
                                  .includes(
                                    propertySearchQuery.toLowerCase(),
                                  ) ||
                                p.location
                                  .toLowerCase()
                                  .includes(propertySearchQuery.toLowerCase()),
                            ).length === 0 && (
                              <div className="px-4 py-3 text-center text-[#999] text-sm">
                                No properties found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Select Unit */}
                    <div
                      className="flex flex-col gap-1.5 relative"
                      data-contract-unit-dropdown
                    >
                      <label className={labelCls}>Select Unit (Optional)</label>
                      <button
                        type="button"
                        onClick={() =>
                          setContractUnitDropdownOpen(!contractUnitDropdownOpen)
                        }
                        className={`${inputCls} w-full text-left flex items-center justify-between`}
                      >
                        <span>
                          {contractForm.unit
                            ? unitsData.find(
                                (u) => u.unitNumber === contractForm.unit,
                              )?.unitNumber || "-- Select Unit --"
                            : "-- Select Unit --"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {contractUnitDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50 w-full min-w-80">
                          <div className="p-2 border-b border-[#e0e0e0]">
                            <input
                              type="text"
                              placeholder="Search units..."
                              value={contractUnitSearchQuery}
                              onChange={(e) =>
                                setContractUnitSearchQuery(e.target.value)
                              }
                              className={inputCls + " text-sm"}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div
                            className="max-h-48 overflow-y-auto"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            <div className="px-4 py-1 text-xs text-[#999] bg-[#f9f9f9]">
                              {unitsData?.length || 0} units available
                            </div>
                            <div
                              onClick={() => {
                                setContractForm({ ...contractForm, unit: "" });
                                setContractUnitDropdownOpen(false);
                                setContractUnitSearchQuery("");
                              }}
                              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-[#666]"
                            >
                              -- Select Unit --
                            </div>
                            {(() => {
                              let filtered =
                                unitsData && Array.isArray(unitsData)
                                  ? [...unitsData]
                                  : [];

                              // If a property is selected, filter by that property
                              if (contractForm.property) {
                                filtered = filtered.filter((u) => {
                                  // Try matching by propertyId first (new format)
                                  if (u.propertyId === contractForm.property)
                                    return true;
                                  // Fallback: match by property name (old format)
                                  const selectedProp = properties.find(
                                    (p) => p._id === contractForm.property,
                                  );
                                  if (
                                    selectedProp &&
                                    u.property === selectedProp.title
                                  )
                                    return true;
                                  return false;
                                });
                              }

                              // Filter by search query
                              if (contractUnitSearchQuery.trim()) {
                                filtered = filtered.filter(
                                  (u) =>
                                    (u.unitNumber || "")
                                      .toLowerCase()
                                      .includes(
                                        contractUnitSearchQuery.toLowerCase(),
                                      ) ||
                                    (u.block || "")
                                      .toLowerCase()
                                      .includes(
                                        contractUnitSearchQuery.toLowerCase(),
                                      ) ||
                                    (u.property || "")
                                      .toLowerCase()
                                      .includes(
                                        contractUnitSearchQuery.toLowerCase(),
                                      ),
                                );
                              }

                              // Show all filtered units or no results message
                              if (filtered && filtered.length > 0) {
                                return filtered.map((unit) => (
                                  <div
                                    key={unit._id || unit.id}
                                    onClick={() => {
                                      setContractForm({
                                        ...contractForm,
                                        unit: unit.unitNumber,
                                      });
                                      setContractUnitDropdownOpen(false);
                                      setContractUnitSearchQuery("");
                                    }}
                                    className={`px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-[#f0f0f0] last:border-0 ${
                                      contractForm.unit === unit.unitNumber
                                        ? "bg-blue-100 text-blue-700 font-semibold"
                                        : "text-[#333]"
                                    }`}
                                  >
                                    <p className="font-semibold">
                                      {unit.unitNumber}
                                    </p>
                                    <p className="text-xs text-[#666]">
                                      {unit.property} • {unit.block || "N/A"}
                                    </p>
                                  </div>
                                ));
                              } else {
                                return (
                                  <div className="px-4 py-3 text-center text-[#999] text-sm">
                                    No units found
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contract Type */}
                    <div
                      className="flex flex-col gap-1.5 relative"
                      data-contract-type-dropdown
                    >
                      <label className={labelCls}>Contract Type *</label>
                      <button
                        type="button"
                        onClick={() =>
                          setContractTypeDropdownOpen(!contractTypeDropdownOpen)
                        }
                        className={`${inputCls} w-full text-left flex items-center justify-between`}
                        required
                      >
                        <span>
                          {contractForm.billingCycle === "Monthly"
                            ? "Rental Agreement"
                            : contractForm.billingCycle === "Yearly"
                              ? "Lease Agreement"
                              : "-- Select Type --"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {contractTypeDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50 w-full min-w-80">
                          <div
                            className="max-h-48 overflow-y-auto"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            {[
                              "Rental Agreement",
                              "Lease Agreement",
                              "Sale Agreement",
                            ].map((type) => (
                              <div
                                key={type}
                                onClick={() => {
                                  const billingValue =
                                    type === "Rental Agreement"
                                      ? "Monthly"
                                      : type === "Lease Agreement"
                                        ? "Yearly"
                                        : "Yearly";
                                  setContractForm({
                                    ...contractForm,
                                    billingCycle: billingValue,
                                  });
                                  setContractTypeDropdownOpen(false);
                                }}
                                className={`px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-[#f0f0f0] last:border-0 ${
                                  (contractForm.billingCycle === "Monthly" &&
                                    type === "Rental Agreement") ||
                                  (contractForm.billingCycle === "Yearly" &&
                                    type !== "Rental Agreement")
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "text-[#333]"
                                }`}
                              >
                                <p className="font-semibold">{type}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Select Client */}
                    <div
                      className="flex flex-col gap-1.5 relative"
                      data-contract-client-dropdown
                    >
                      <label className={labelCls}>
                        Select Client (Tenant/Buyer) *
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setContractClientDropdownOpen(
                            !contractClientDropdownOpen,
                          )
                        }
                        className={`${inputCls} w-full text-left flex items-center justify-between`}
                        required
                      >
                        <span>
                          {contractForm.clientEmail
                            ? users.find(
                                (u) => u.email === contractForm.clientEmail,
                              )?.name ||
                              users.find(
                                (u) => u.email === contractForm.clientEmail,
                              )?.email ||
                              "-- Select Customer --"
                            : "-- Select Customer --"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {contractClientDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50 w-full min-w-80">
                          <div className="p-2 border-b border-[#e0e0e0]">
                            <input
                              type="text"
                              placeholder="Search customer..."
                              value={contractClientSearchQuery}
                              onChange={(e) =>
                                setContractClientSearchQuery(e.target.value)
                              }
                              className={inputCls + " text-sm"}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div
                            className="max-h-48 overflow-y-auto"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            <div className="px-4 py-1 text-xs text-[#999] bg-[#f9f9f9]">
                              {users?.length || 0} customers available
                            </div>
                            <div
                              onClick={() => {
                                setContractForm({
                                  ...contractForm,
                                  clientName: "",
                                  clientEmail: "",
                                  clientPhone: "",
                                });
                                setContractClientDropdownOpen(false);
                                setContractClientSearchQuery("");
                              }}
                              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-[#666]"
                            >
                              -- Select Customer --
                            </div>
                            {(() => {
                              let filtered = users || [];

                              // If search query is entered, show all matching users (recent + old)
                              if (contractClientSearchQuery.trim()) {
                                filtered = filtered.filter(
                                  (u) =>
                                    (u.name || "")
                                      .toLowerCase()
                                      .includes(
                                        contractClientSearchQuery.toLowerCase(),
                                      ) ||
                                    (u.email || "")
                                      .toLowerCase()
                                      .includes(
                                        contractClientSearchQuery.toLowerCase(),
                                      ) ||
                                    (u.phone || "")
                                      .toLowerCase()
                                      .includes(
                                        contractClientSearchQuery.toLowerCase(),
                                      ),
                                );
                              } else {
                                // If no search query, show only recent users (last 10)
                                filtered = filtered.slice(-10).reverse();
                              }

                              // Show all filtered users or no results message
                              if (filtered.length > 0) {
                                return filtered.map((user) => (
                                  <div
                                    key={user._id}
                                    onClick={() => {
                                      setContractForm({
                                        ...contractForm,
                                        clientName: user.name || user.email,
                                        clientEmail: user.email,
                                        clientPhone: user.phone || "",
                                      });
                                      setContractClientDropdownOpen(false);
                                      setContractClientSearchQuery("");
                                    }}
                                    className={`px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-[#f0f0f0] last:border-0 ${
                                      contractForm.clientEmail === user.email
                                        ? "bg-blue-100 text-blue-700 font-semibold"
                                        : "text-[#333]"
                                    }`}
                                  >
                                    <p className="font-semibold">
                                      {user.name || user.email}
                                    </p>
                                    <p className="text-xs text-[#666]">
                                      {user.email}{" "}
                                      {user.phone ? `• ${user.phone}` : ""}
                                    </p>
                                  </div>
                                ));
                              } else {
                                return (
                                  <div className="px-4 py-3 text-center text-[#999] text-sm">
                                    No customers found
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Initial Status */}
                    <div
                      className="flex flex-col gap-1.5 relative"
                      data-contract-status-dropdown
                    >
                      <label className={labelCls}>Initial Status *</label>
                      <button
                        type="button"
                        onClick={() =>
                          setContractStatusDropdownOpen(
                            !contractStatusDropdownOpen,
                          )
                        }
                        className={`${inputCls} w-full text-left flex items-center justify-between`}
                        required
                      >
                        <span>
                          {contractForm.status || "-- Select Status --"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {contractStatusDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#d0d0d0] rounded-lg shadow-lg z-50 w-full min-w-80">
                          <div
                            className="max-h-48 overflow-y-auto"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            {["Draft", "Active", "Completed"].map((status) => (
                              <div
                                key={status}
                                onClick={() => {
                                  setContractForm({ ...contractForm, status });
                                  setContractStatusDropdownOpen(false);
                                }}
                                className={`px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-[#f0f0f0] last:border-0 ${
                                  contractForm.status === status
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "text-[#333]"
                                }`}
                              >
                                <p className="font-semibold">{status}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TIMELINE & TERMS */}
                <div className="mb-7 pb-7 border-b">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="text-xl">📅</div>
                    <h3 className="text-base font-bold text-[#111]">
                      Timeline & Terms
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Start Date *</label>
                      <input
                        type="date"
                        value={contractForm.startDate}
                        onChange={(e) =>
                          setContractForm({
                            ...contractForm,
                            startDate: e.target.value,
                          })
                        }
                        className={inputCls}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>End Date (Optional)</label>
                      <input
                        type="date"
                        value={contractForm.endDate}
                        onChange={(e) =>
                          setContractForm({
                            ...contractForm,
                            endDate: e.target.value,
                          })
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>
                      Additional Notes & Special Clauses
                    </label>
                    <textarea
                      value={contractForm.additionalNotes}
                      onChange={(e) =>
                        setContractForm({
                          ...contractForm,
                          additionalNotes: e.target.value,
                        })
                      }
                      placeholder="Add any special terms, conditions or notes..."
                      rows={3}
                      className={inputCls + " resize-y"}
                    />
                  </div>
                </div>

                {/* FINANCIAL TERMS */}
                <div className="mb-7 pb-7 border-b">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="text-xl">💰</div>
                    <h3 className="text-base font-bold text-[#111]">
                      Financial Terms
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>
                        Contract Amount / Rent *
                      </label>
                      <input
                        type="number"
                        value={contractForm.amount}
                        onChange={(e) =>
                          setContractForm({
                            ...contractForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="0"
                        className={inputCls}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Billing Cycle *</label>
                      <select
                        value={contractForm.billingCycle}
                        onChange={(e) =>
                          setContractForm({
                            ...contractForm,
                            billingCycle: e.target.value,
                          })
                        }
                        className={inputCls}
                        required
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Security Deposit</label>
                      <input
                        type="number"
                        value={contractForm.securityDeposit}
                        onChange={(e) =>
                          setContractForm({
                            ...contractForm,
                            securityDeposit: e.target.value,
                          })
                        }
                        placeholder="0"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelCls}>Late Fee (Penalty)</label>
                      <input
                        type="number"
                        value={contractForm.lateFee}
                        onChange={(e) =>
                          setContractForm({
                            ...contractForm,
                            lateFee: e.target.value,
                          })
                        }
                        placeholder="0"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* ATTACHMENTS & PROOFS */}
                <div className="pb-7">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="text-xl">📎</div>
                    <h3 className="text-base font-bold text-[#111]">
                      Attachments & Proofs
                    </h3>
                  </div>
                  <div
                    onClick={() => contractDocsInputRef.current?.click()}
                    className="border-2 border-dashed border-[#d0d0d0] rounded-lg p-8 text-center bg-[#fafafa] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                  >
                    <input
                      ref={contractDocsInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={handleContractDocuments}
                      className="hidden"
                    />
                    <div className="text-4xl mb-2">📤</div>
                    <p className="font-semibold text-[#111]">
                      Upload Contract Documents
                    </p>
                    <p className="text-xs text-[#666]">
                      PDF, DOCX, IMAGES (MAX 5 FILES)
                    </p>
                  </div>
                  {contractForm.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold text-[#666] uppercase">
                        Documents ({contractForm.documents.length}):
                      </p>
                      {contractForm.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-[#f5f5f5] p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-lg">📄</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-[#111] truncate">
                                {doc.filename}
                              </p>
                              <p className="text-xs text-[#999]">
                                {(doc.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setContractForm((prev) => ({
                                ...prev,
                                documents: prev.documents.filter(
                                  (_, i) => i !== idx,
                                ),
                              }))
                            }
                            className="text-red-500 hover:text-red-700 ml-2 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FOOTER BUTTONS */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#ebebeb]">
                  <button
                    type="button"
                    onClick={() => {
                      setNewContractMode(false);
                      setContractForm({
                        property: "",
                        unit: "",
                        clientName: "",
                        clientEmail: "",
                        clientPhone: "",
                        status: "",
                        amount: "",
                        billingCycle: "",
                        securityDeposit: "",
                        lateFee: "",
                        startDate: "",
                        endDate: "",
                        additionalNotes: "",
                        documents: [],
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg bg-[#f0f0f0] text-[#111] font-semibold hover:bg-[#e0e0e0] transition-colors border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors border-none cursor-pointer"
                  >
                    📋 Generate Contract
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── CONTRACTS LIST ── */}
        {activeTab === "contracts" && !newContractMode && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#111] mb-1">
                    Contracts & Leases
                  </h2>
                  <p className="text-sm text-[#666]">
                    Legalize property agreements and rentals
                  </p>
                </div>
                <button
                  onClick={() => setNewContractMode(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-[10px] transition-colors border-none cursor-pointer"
                >
                  ➕ New Contract
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#f8f8f8] border border-[#e8e8e8] rounded-lg p-4">
                  <div className="text-xs font-bold text-[#888] uppercase tracking-wide mb-2">
                    ACTIVE LEASES
                  </div>
                  <div className="text-3xl font-bold text-emerald-600">
                    {contractsData.filter((c) => c.status === "ACTIVE").length}
                  </div>
                </div>
                <div className="bg-[#f8f8f8] border border-[#e8e8e8] rounded-lg p-4">
                  <div className="text-xs font-bold text-[#888] uppercase tracking-wide mb-2">
                    TOTAL REVENUE
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    £
                    {contractsData
                      .reduce((sum, c) => sum + c.amount, 0)
                      .toLocaleString()}
                  </div>
                </div>
                <div className="bg-[#f8f8f8] border border-[#e8e8e8] rounded-lg p-4">
                  <div className="text-xs font-bold text-[#888] uppercase tracking-wide mb-2">
                    EXPIRING SOON
                  </div>
                  <div className="text-3xl font-bold text-orange-600">0</div>
                </div>
                <div className="bg-[#f8f8f8] border border-[#e8e8e8] rounded-lg p-4">
                  <div className="text-xs font-bold text-[#888] uppercase tracking-wide mb-2">
                    PENDING DRAFTS
                  </div>
                  <div className="text-3xl font-bold text-[#999]">0</div>
                </div>
              </div>

              {/* Search & Filter */}
              <div className="flex gap-3 mb-5">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#aaa]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by property, client or owner..."
                    value={contractSearchQuery}
                    onChange={(e) => setContractSearchQuery(e.target.value)}
                    className={inputCls + " pl-10"}
                  />
                </div>
                {contractSearchQuery && (
                  <button
                    onClick={() => setContractSearchQuery("")}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ebebeb]">
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        CONTRACT ID
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PROPERTY & TYPE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PARTIES
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        FINANCIALS
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        DURATION
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        STATUS
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractsData
                      .filter(
                        (contract) =>
                          contract.property
                            .toLowerCase()
                            .includes(contractSearchQuery.toLowerCase()) ||
                          contract.parties
                            .toLowerCase()
                            .includes(contractSearchQuery.toLowerCase()) ||
                          contract.owner
                            .toLowerCase()
                            .includes(contractSearchQuery.toLowerCase()),
                      )
                      .map((contract) => (
                        <tr
                          key={contract.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                        >
                          <td className="px-4 py-3">
                            <span className="font-mono text-[#666] font-semibold">
                              {contract.id}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🏠</span>
                                <div>
                                  <div className="font-semibold text-[#111]">
                                    {contract.property}
                                  </div>
                                  <div className="text-xs text-[#666]">
                                    {contract.type}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-semibold text-[#111]">
                                {contract.parties}
                              </div>
                              <div className="text-xs text-[#666]">
                                Owner: {contract.owner}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-[#111]">
                              £{contract.amount.toLocaleString()}.00
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[#666] flex items-center gap-1">
                              📅 {contract.date}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                contract.status === "ACTIVE"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : contract.status === "PENDING"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-[#f0f0f0] text-[#999]"
                              }`}
                            >
                              {contract.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                setSelectedContractDetail(contract)
                              }
                              className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide rounded-md hover:bg-blue-100 border border-transparent hover:border-blue-200 transition-colors shadow-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#999]">
                <div>
                  Showing {contractsData.length} of {contractsData.length}{" "}
                  contracts
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 rounded hover:bg-[#f0f0f0] transition-colors disabled:opacity-50"
                    disabled
                  >
                    ‹
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-600 text-white font-semibold">
                    1
                  </button>
                  <button className="px-2 py-1 rounded hover:bg-[#f0f0f0] transition-colors">
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── INQUIRIES ── */}
        {activeTab === "inquiries" && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#111] mb-1">
                    Property Inquiries
                  </h2>
                  <p className="text-sm text-[#666]">
                    Track and manage potential client leads
                  </p>
                </div>
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-[10px] transition-colors border-none cursor-pointer"
                >
                  ➕ Create Inquiry
                </button>
              </div>

              {/* Search & Total */}
              <div className="flex gap-3 mb-5 items-end justify-between">
                <div className="relative flex-1 max-w-96">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#aaa]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search client name, email..."
                    value={inquirySearchQuery}
                    onChange={(e) => setInquirySearchQuery(e.target.value)}
                    className={inputCls + " pl-10"}
                  />
                </div>
                <div className="text-sm text-[#666]">
                  {inquiriesData.length} Total Inquiries
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ebebeb]">
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        CLIENT DETAILS
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PROPERTY
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        MESSAGE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        STATUS
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiriesData
                      .filter(
                        (inquiry) =>
                          inquiry.clientName
                            .toLowerCase()
                            .includes(inquirySearchQuery.toLowerCase()) ||
                          inquiry.email
                            .toLowerCase()
                            .includes(inquirySearchQuery.toLowerCase()) ||
                          inquiry.phone.includes(inquirySearchQuery),
                      )
                      .map((inquiry) => (
                        <tr
                          key={inquiry.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                                {inquiry.clientName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-[#111]">
                                  {inquiry.clientName}
                                </div>
                                <div className="text-xs text-[#999]">
                                  {inquiry.email}
                                </div>
                                <div className="text-xs text-[#999]">
                                  {inquiry.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🏠</span>
                              <div>
                                <div className="font-semibold text-[#111]">
                                  {inquiry.property}
                                </div>
                                <div className="text-xs text-[#666]">
                                  {inquiry.amount}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[#666] italic">
                              {inquiry.message}
                            </div>
                            <div className="text-xs text-[#999] mt-1">
                              RECIEVED: {inquiry.receivedDate}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setSelectedInquiryDetail(inquiry)}
                              className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded hover:bg-blue-200 transition-colors cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {inquiriesData.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="text-[#666] font-semibold">No inquiries yet</p>
                  <p className="text-xs text-[#999] mt-1">
                    Customer inquiries from the contact form will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#111] mb-1">
                  Property Visits
                </h2>
                <p className="text-sm text-[#999]">
                  Manage inspection schedules and appointments
                </p>
              </div>
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                + Create Booking
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#ebebeb] rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#999] mb-1">
                      Pending Visits
                    </p>
                    <p className="text-3xl font-bold text-[#111]">
                      {
                        bookingsData.filter((b) => b.status === "PENDING")
                          .length
                      }
                    </p>
                  </div>
                  <span className="text-2xl text-orange-500">⏰</span>
                </div>
              </div>
              <div className="bg-white border border-[#ebebeb] rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#999] mb-1">
                      Confirmed Visits
                    </p>
                    <p className="text-3xl font-bold text-[#111]">
                      {
                        bookingsData.filter((b) => b.status === "CONFIRMED")
                          .length
                      }
                    </p>
                  </div>
                  <span className="text-2xl text-blue-500">✓</span>
                </div>
              </div>
              <div className="bg-white border border-[#ebebeb] rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#999] mb-1">
                      Total Bookings
                    </p>
                    <p className="text-3xl font-bold text-[#111]">
                      {bookingsData.length}
                    </p>
                  </div>
                  <span className="text-2xl text-green-500">📅</span>
                </div>
              </div>
            </div>

            {/* Search & Table Container */}
            <div className="bg-white border border-[#ebebeb] rounded-xl p-6">
              {/* Search Bar */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#ebebeb]">
                <svg
                  className="w-5 h-5 text-[#999]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by customer or property..."
                  className="flex-1 bg-transparent text-sm text-[#111] placeholder-[#999] outline-none"
                  value={bookingSearchQuery}
                  onChange={(e) => setBookingSearchQuery(e.target.value)}
                />
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#999] text-xs uppercase tracking-wide">
                        Property & Visit
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#999] text-xs uppercase tracking-wide">
                        Customer
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#999] text-xs uppercase tracking-wide">
                        Assigned Agent
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#999] text-xs uppercase tracking-wide">
                        Created By
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#999] text-xs uppercase tracking-wide">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#999] text-xs uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsData
                      .filter(
                        (booking) =>
                          booking.property
                            .toLowerCase()
                            .includes(bookingSearchQuery.toLowerCase()) ||
                          booking.customerName
                            .toLowerCase()
                            .includes(bookingSearchQuery.toLowerCase()),
                      )
                      .map((booking, idx) => (
                        <tr
                          key={booking.id}
                          className={`border-b border-[#f0f0f0] ${idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"} hover:bg-[#f5f5f5] transition-colors`}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">📍</span>
                              <div>
                                <p className="font-semibold text-[#111]">
                                  {booking.property}
                                </p>
                                <p className="text-xs text-[#999]">
                                  📅 {booking.visitDate} ⏱ {booking.visitTime}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                                {booking.customerName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-[#111]">
                                  {booking.customerName}
                                </p>
                                <p className="text-xs text-[#999]">
                                  {booking.customerEmail}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-[#111] font-medium">
                              {booking.agent === "Unassigned" ? (
                                <span className="text-[#999] italic">
                                  Unassigned
                                </span>
                              ) : (
                                booking.agent
                              )}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-wide ${
                                booking.createdBy === "USER"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-teal-100 text-teal-600"
                              }`}
                            >
                              {booking.createdBy === "USER" ? "👤 User" : "🔧 Admin"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-wide ${
                                booking.status === "PENDING"
                                  ? "bg-orange-100 text-orange-600"
                                  : booking.status === "CONFIRMED"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => setSelectedBookingDetail(booking)}
                              className="text-[#999] hover:text-[#111] cursor-pointer"
                            >
                              ⋮
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#ebebeb] text-xs text-[#999]">
                <div>
                  Showing{" "}
                  <span className="font-semibold text-[#111]">
                    {
                      bookingsData.filter(
                        (b) =>
                          b.property
                            .toLowerCase()
                            .includes(bookingSearchQuery.toLowerCase()) ||
                          b.customerName
                            .toLowerCase()
                            .includes(bookingSearchQuery.toLowerCase()),
                      ).length
                    }
                  </span>{" "}
                  Appointments
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 hover:bg-[#f0f0f0] rounded disabled:opacity-50">
                    ‹
                  </button>
                  <button className="px-3 py-1 bg-[#f0f0f0] rounded font-medium">
                    PAGE 1 OF 1
                  </button>
                  <button className="px-2 py-1 hover:bg-[#f0f0f0] rounded disabled:opacity-50">
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBookingDetail && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex justify-between items-center gap-4 p-6 border-b border-slate-200 bg-white sticky top-0 z-20">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    📅 Booking Details
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Update booking status and review customer details.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBookingDetail(null)}
                  className="text-slate-500 hover:text-slate-900 text-2xl rounded-full p-2 transition"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 space-y-6 hide-scrollbar">
                {/* Customer Information */}
                <div className="border border-slate-200 rounded-3xl p-5">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">
                    👤 Customer Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Name
                      </p>
                      <p className="text-slate-900 font-semibold break-words">
                        {selectedBookingDetail.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Email
                      </p>
                      <p className="text-slate-900 text-sm break-all">
                        {selectedBookingDetail.customerEmail}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Phone
                      </p>
                      <p className="text-slate-900 break-words">
                        {selectedBookingDetail.customerPhone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="border border-slate-200 rounded-3xl p-5">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">
                    📝 Booking Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Property
                      </p>
                      <p className="text-slate-900 break-words">
                        {selectedBookingDetail.property}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Visit Date
                      </p>
                      <p className="text-slate-900">
                        {selectedBookingDetail.visitDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Visit Time
                      </p>
                      <p className="text-slate-900">
                        {selectedBookingDetail.visitTime}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                        Notes
                      </p>
                      <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm max-h-36 overflow-y-auto hide-scrollbar break-all whitespace-pre-wrap"
                        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                      >
                        {selectedBookingDetail.notes || "No additional notes"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status & Assignment */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                      Status
                    </p>
                    <select
                      value={bookingDetailStatus}
                      onChange={(e) => setBookingDetailStatus(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none"
                    >
                      {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                      Assigned Agent
                    </p>
                    <p className="text-slate-900 font-semibold text-sm break-words">
                      {selectedBookingDetail.agent || "Unassigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                      Created By
                    </p>
                    <span
                      className={`inline-flex items-center justify-center px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                        selectedBookingDetail.createdBy === "USER"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {selectedBookingDetail.createdBy === "USER" ? "👤 User" : "🔧 Admin"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white p-6 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setSelectedBookingDetail(null)}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-slate-900 font-semibold rounded-xl hover:bg-slate-200 transition"
                >
                  Close
                </button>
                <button
                  onClick={updateBookingStatus}
                  className="w-full sm:w-auto px-5 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        )}
        <style>{`.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-lg flex flex-col">
              <div className="p-6 border-b border-[#ebebeb] flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#111]">
                  Schedule New Inspection
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-[#999] hover:text-[#111] text-2xl"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleCreateBooking}
                className="flex flex-col flex-1 overflow-hidden"
              >
                <div
                  className="p-6 overflow-y-auto flex-1"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Property & Client Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-[#666] uppercase tracking-wide mb-4 flex items-center gap-2">
                      <span>🏠</span> Property & Client
                    </h4>

                    <div className="mb-4">
                      <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                        Target Property{" "}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setBookingPropertyDropdownOpen(
                              !bookingPropertyDropdownOpen,
                            )
                          }
                          className={
                            inputCls +
                            " text-left w-full flex items-center justify-between"
                          }
                          disabled={loadingBookingForm}
                        >
                          <span>
                            {bookingForm.targetProperty
                              ? bookingForm.targetProperty
                              : loadingBookingForm
                                ? "Loading properties..."
                                : "Select Target Property"}
                          </span>
                          <span className="text-[#999]">▼</span>
                        </button>
                        {bookingPropertyDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ddd] rounded-lg shadow-lg z-50">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={bookingPropertySearch}
                              onChange={(e) =>
                                setBookingPropertySearch(e.target.value)
                              }
                              className="w-full px-3 py-2 border-b border-[#eee] focus:outline-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div
                              className="max-h-48 overflow-y-auto"
                              style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                              }}
                            >
                              {bookingProperties.filter((p) =>
                                p.title
                                  .toLowerCase()
                                  .includes(
                                    bookingPropertySearch.toLowerCase(),
                                  ),
                              ).length === 0 ? (
                                <div className="px-3 py-2 text-sm text-[#999]">
                                  No results found
                                </div>
                              ) : (
                                bookingProperties
                                  .filter((p) =>
                                    p.title
                                      .toLowerCase()
                                      .includes(
                                        bookingPropertySearch.toLowerCase(),
                                      ),
                                  )
                                  .map((p) => (
                                    <button
                                      key={p._id}
                                      type="button"
                                      onClick={() => {
                                        setBookingForm({
                                          ...bookingForm,
                                          targetProperty: p.title,
                                          targetPropertyId: p._id,
                                          unit: "",
                                        });
                                        setBookingPropertyDropdownOpen(false);
                                        setBookingPropertySearch("");
                                      }}
                                      className="w-full text-left px-3 py-2 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0"
                                    >
                                      <div className="font-medium text-[#111]">
                                        {p.title}
                                      </div>
                                      <div className="text-xs text-[#999]">
                                        {p.type || "Property"} • £{p.price}
                                      </div>
                                    </button>
                                  ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                          Unit (Optional)
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setBookingUnitDropdownOpen(
                                !bookingUnitDropdownOpen,
                              )
                            }
                            className={
                              inputCls +
                              " text-left w-full flex items-center justify-between"
                            }
                            disabled={!bookingForm.targetProperty}
                          >
                            <span>
                              {bookingForm.unit
                                ? bookingForm.unit
                                : bookingForm.targetProperty
                                  ? "Select Unit (Optional)"
                                  : "Select Property First"}
                            </span>
                            <span className="text-[#999]">▼</span>
                          </button>
                          {bookingUnitDropdownOpen &&
                            bookingForm.targetProperty && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ddd] rounded-lg shadow-lg z-50">
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  value={bookingUnitSearch}
                                  onChange={(e) =>
                                    setBookingUnitSearch(e.target.value)
                                  }
                                  className="w-full px-3 py-2 border-b border-[#eee] focus:outline-none text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div
                                  className="max-h-48 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {relatedUnits.filter((u) =>
                                    `Unit ${u.unitNumber} - ${u.block}`
                                      .toLowerCase()
                                      .includes(
                                        bookingUnitSearch.toLowerCase(),
                                      ),
                                  ).length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-[#999]">
                                      No results found
                                    </div>
                                  ) : (
                                    relatedUnits
                                      .filter((u) =>
                                        `Unit ${u.unitNumber} - ${u.block}`
                                          .toLowerCase()
                                          .includes(
                                            bookingUnitSearch.toLowerCase(),
                                          ),
                                      )
                                      .map((u) => (
                                        <button
                                          key={u.id}
                                          type="button"
                                          onClick={() => {
                                            setBookingForm({
                                              ...bookingForm,
                                              unit: u.unitNumber,
                                            });
                                            setBookingUnitDropdownOpen(false);
                                            setBookingUnitSearch("");
                                          }}
                                          className="w-full text-left px-3 py-2 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0"
                                        >
                                          <div className="font-medium text-[#111]">
                                            Unit {u.unitNumber}
                                          </div>
                                          <div className="text-xs text-[#999]">
                                            {u.block}
                                          </div>
                                        </button>
                                      ))
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                          Customer *
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setBookingCustomerDropdownOpen(
                                !bookingCustomerDropdownOpen,
                              )
                            }
                            className={
                              inputCls +
                              " text-left w-full flex items-center justify-between"
                            }
                            disabled={loadingBookingForm}
                          >
                            <span>
                              {bookingForm.customer
                                ? bookingForm.customer
                                : loadingBookingForm
                                  ? "Loading customers..."
                                  : "Select Customer"}
                            </span>
                            <span className="text-[#999]">▼</span>
                          </button>
                          {bookingCustomerDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ddd] rounded-lg shadow-lg z-50">
                              <input
                                type="text"
                                placeholder="Search..."
                                value={bookingCustomerSearch}
                                onChange={(e) =>
                                  setBookingCustomerSearch(e.target.value)
                                }
                                className="w-full px-3 py-2 border-b border-[#eee] focus:outline-none text-sm"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div
                                className="max-h-48 overflow-y-auto"
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                              >
                                {bookingCustomers
                                  .filter((u) => u.role === "user" || !u.role)
                                  .filter((u) =>
                                    (u.name || u.email)
                                      .toLowerCase()
                                      .includes(
                                        bookingCustomerSearch.toLowerCase(),
                                      ),
                                  ).length === 0 ? (
                                  <div className="px-3 py-2 text-sm text-[#999]">
                                    No results found
                                  </div>
                                ) : (
                                  bookingCustomers
                                    .filter((u) => u.role === "user" || !u.role)
                                    .filter((u) =>
                                      (u.name || u.email)
                                        .toLowerCase()
                                        .includes(
                                          bookingCustomerSearch.toLowerCase(),
                                        ),
                                    )
                                    .map((u) => (
                                      <button
                                        key={u._id}
                                        type="button"
                                        onClick={() => {
                                          setBookingForm({
                                            ...bookingForm,
                                            customer: u.name || u.email,
                                          });
                                          setBookingCustomerDropdownOpen(false);
                                          setBookingCustomerSearch("");
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0"
                                      >
                                        <div className="font-medium text-[#111]">
                                          {u.name || u.email}
                                        </div>
                                        {u.name && (
                                          <div className="text-xs text-[#999]">
                                            {u.email}
                                          </div>
                                        )}
                                      </button>
                                    ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                        Assign Agent
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setBookingAgentDropdownOpen(
                              !bookingAgentDropdownOpen,
                            )
                          }
                          className={
                            inputCls +
                            " text-left w-full flex items-center justify-between"
                          }
                          disabled={loadingBookingForm}
                        >
                          <span>
                            {bookingForm.assignAgent
                              ? bookingForm.assignAgent
                              : loadingBookingForm
                                ? "Loading agents..."
                                : "Select Assign Agent"}
                          </span>
                          <span className="text-[#999]">▼</span>
                        </button>
                        {bookingAgentDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ddd] rounded-lg shadow-lg z-50">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={bookingAgentSearch}
                              onChange={(e) =>
                                setBookingAgentSearch(e.target.value)
                              }
                              className="w-full px-3 py-2 border-b border-[#eee] focus:outline-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div
                              className="max-h-48 overflow-y-auto"
                              style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                              }}
                            >
                              {[
                                {
                                  name: "-- Unassigned --",
                                  email: "unassigned",
                                },
                                ...bookingAgents,
                              ].filter((u) =>
                                (u.name || u.email)
                                  .toLowerCase()
                                  .includes(bookingAgentSearch.toLowerCase()),
                              ).length === 0 ? (
                                <div className="px-3 py-2 text-sm text-[#999]">
                                  No results found
                                </div>
                              ) : (
                                [
                                  {
                                    name: "-- Unassigned --",
                                    email: "unassigned",
                                    _id: "unassigned",
                                  },
                                  ...bookingAgents,
                                ]
                                  .filter((u) =>
                                    (u.name || u.email)
                                      .toLowerCase()
                                      .includes(
                                        bookingAgentSearch.toLowerCase(),
                                      ),
                                  )
                                  .map((u) => (
                                    <button
                                      key={u._id || u.email}
                                      type="button"
                                      onClick={() => {
                                        setBookingForm({
                                          ...bookingForm,
                                          assignAgent:
                                            u.name === "-- Unassigned --"
                                              ? "Unassigned"
                                              : u.name || u.email,
                                        });
                                        setBookingAgentDropdownOpen(false);
                                        setBookingAgentSearch("");
                                      }}
                                      className="w-full text-left px-3 py-2 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0"
                                    >
                                      <div className="font-medium text-[#111]">
                                        {u.name || u.email}
                                      </div>
                                    </button>
                                  ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Schedule Details Section */}
                  <div>
                    <h4 className="text-sm font-bold text-[#666] uppercase tracking-wide mb-4 flex items-center gap-2">
                      <span>📅</span> Schedule Details
                    </h4>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                          Visit Date *
                        </label>
                        <input
                          type="date"
                          value={bookingForm.visitDate}
                          onChange={(e) =>
                            setBookingForm({
                              ...bookingForm,
                              visitDate: e.target.value,
                            })
                          }
                          className={inputCls}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                          Visit Time *
                        </label>
                        <input
                          type="time"
                          value={bookingForm.visitTime}
                          onChange={(e) =>
                            setBookingForm({
                              ...bookingForm,
                              visitTime: e.target.value,
                            })
                          }
                          className={inputCls}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                        Current Status *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setBookingStatusDropdownOpen(
                              !bookingStatusDropdownOpen,
                            )
                          }
                          className={
                            inputCls +
                            " text-left w-full flex items-center justify-between"
                          }
                        >
                          <span>
                            {bookingForm.currentStatus || "Pending Request"}
                          </span>
                          <span className="text-[#999]">▼</span>
                        </button>
                        {bookingStatusDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ddd] rounded-lg shadow-lg z-50">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={bookingStatusSearch}
                              onChange={(e) =>
                                setBookingStatusSearch(e.target.value)
                              }
                              className="w-full px-3 py-2 border-b border-[#eee] focus:outline-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="max-h-48 overflow-y-auto">
                              {[
                                { value: "PENDING", label: "Pending Request" },
                                { value: "CONFIRMED", label: "Confirmed" },
                                { value: "COMPLETED", label: "Completed" },
                              ]
                                .filter((s) =>
                                  s.label
                                    .toLowerCase()
                                    .includes(
                                      bookingStatusSearch.toLowerCase(),
                                    ),
                                )
                                .map((s) => (
                                  <button
                                    key={s.value}
                                    type="button"
                                    onClick={() => {
                                      setBookingForm({
                                        ...bookingForm,
                                        currentStatus: s.value,
                                      });
                                      setBookingStatusDropdownOpen(false);
                                      setBookingStatusSearch("");
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0"
                                  >
                                    <div className="font-medium text-[#111]">
                                      {s.label}
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#555] uppercase mb-2 block">
                        Administrative Notes
                      </label>
                      <textarea
                        value={bookingForm.notes}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            notes: e.target.value,
                          })
                        }
                        placeholder="Add internal notes about this visit..."
                        className={inputCls + " resize-none"}
                        rows="4"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 border-t border-[#ebebeb] flex gap-3 bg-white">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-2.5 bg-white border border-[#ddd] text-[#111] font-semibold rounded-lg hover:bg-[#f5f5f5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Create Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div>
            {/* Maintenance Container */}
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#ebebeb]">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Maintenance Requests
                  </h2>
                  <p className="text-sm text-[#999]">
                    Track and manage property maintenance and repairs
                  </p>
                </div>
                <button
                  onClick={() => setShowMaintenanceForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  + New Request
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        Total Requests
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {
                          maintenanceData.filter((m) => {
                            const matchSearch =
                              m.issueDescription
                                .toLowerCase()
                                .includes(
                                  maintenanceSearchQuery.toLowerCase(),
                                ) ||
                              m.property
                                .toLowerCase()
                                .includes(maintenanceSearchQuery.toLowerCase());
                            const matchProperty =
                              !maintenanceFilterProperty ||
                              m.property === maintenanceFilterProperty;
                            const matchPriority =
                              !maintenanceFilterPriority ||
                              m.priority === maintenanceFilterPriority;
                            const matchStatus =
                              !maintenanceFilterStatus ||
                              m.status === maintenanceFilterStatus;
                            return (
                              matchSearch &&
                              matchProperty &&
                              matchPriority &&
                              matchStatus
                            );
                          }).length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                      🔧
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        Pending
                      </p>
                      <p className="text-3xl font-bold text-amber-600">
                        {
                          maintenanceData.filter((m) => {
                            const matchSearch =
                              m.issueDescription
                                .toLowerCase()
                                .includes(
                                  maintenanceSearchQuery.toLowerCase(),
                                ) ||
                              m.property
                                .toLowerCase()
                                .includes(maintenanceSearchQuery.toLowerCase());
                            const matchProperty =
                              !maintenanceFilterProperty ||
                              m.property === maintenanceFilterProperty;
                            const matchPriority =
                              !maintenanceFilterPriority ||
                              m.priority === maintenanceFilterPriority;
                            const matchStatus =
                              !maintenanceFilterStatus ||
                              m.status === maintenanceFilterStatus;
                            return (
                              matchSearch &&
                              matchProperty &&
                              matchPriority &&
                              matchStatus &&
                              m.status === "PENDING"
                            );
                          }).length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl">
                      ⏰
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        In Progress
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {
                          maintenanceData.filter((m) => {
                            const matchSearch =
                              m.issueDescription
                                .toLowerCase()
                                .includes(
                                  maintenanceSearchQuery.toLowerCase(),
                                ) ||
                              m.property
                                .toLowerCase()
                                .includes(maintenanceSearchQuery.toLowerCase());
                            const matchProperty =
                              !maintenanceFilterProperty ||
                              m.property === maintenanceFilterProperty;
                            const matchPriority =
                              !maintenanceFilterPriority ||
                              m.priority === maintenanceFilterPriority;
                            const matchStatus =
                              !maintenanceFilterStatus ||
                              m.status === maintenanceFilterStatus;
                            return (
                              matchSearch &&
                              matchProperty &&
                              matchPriority &&
                              matchStatus &&
                              m.status === "IN_PROGRESS"
                            );
                          }).length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                      📈
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        High Priority
                      </p>
                      <p className="text-3xl font-bold text-red-600">
                        {
                          maintenanceData.filter((m) => {
                            const matchSearch =
                              m.issueDescription
                                .toLowerCase()
                                .includes(
                                  maintenanceSearchQuery.toLowerCase(),
                                ) ||
                              m.property
                                .toLowerCase()
                                .includes(maintenanceSearchQuery.toLowerCase());
                            const matchProperty =
                              !maintenanceFilterProperty ||
                              m.property === maintenanceFilterProperty;
                            const matchPriority =
                              !maintenanceFilterPriority ||
                              m.priority === maintenanceFilterPriority;
                            const matchStatus =
                              !maintenanceFilterStatus ||
                              m.status === maintenanceFilterStatus;
                            return (
                              matchSearch &&
                              matchProperty &&
                              matchPriority &&
                              matchStatus &&
                              m.priority === "HIGH"
                            );
                          }).length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                      ⚠️
                    </div>
                  </div>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-300">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={maintenanceSearchQuery}
                    onChange={(e) => setMaintenanceSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none font-medium"
                  />
                </div>
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <select
                      value={maintenanceFilterProperty}
                      onChange={(e) =>
                        setMaintenanceFilterProperty(e.target.value)
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white cursor-pointer outline-none hover:border-gray-400 transition-colors min-w-[180px]"
                    >
                      <option value="">Property</option>
                      {properties.map((prop) => (
                        <option key={prop._id} value={prop.title}>
                          {prop.title}
                        </option>
                      ))}
                    </select>
                    <select
                      value={maintenanceFilterPriority}
                      onChange={(e) =>
                        setMaintenanceFilterPriority(e.target.value)
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white cursor-pointer outline-none hover:border-gray-400 transition-colors min-w-[150px]"
                    >
                      <option value="">Priority</option>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                    <select
                      value={maintenanceFilterStatus}
                      onChange={(e) =>
                        setMaintenanceFilterStatus(e.target.value)
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white cursor-pointer outline-none hover:border-gray-400 transition-colors min-w-[150px]"
                    >
                      <option value="">Status</option>
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {
                        maintenanceData.filter((m) => {
                          const matchSearch =
                            m.issueDescription
                              .toLowerCase()
                              .includes(maintenanceSearchQuery.toLowerCase()) ||
                            m.property
                              .toLowerCase()
                              .includes(maintenanceSearchQuery.toLowerCase());
                          const matchProperty =
                            !maintenanceFilterProperty ||
                            m.property === maintenanceFilterProperty;
                          const matchPriority =
                            !maintenanceFilterPriority ||
                            m.priority === maintenanceFilterPriority;
                          const matchStatus =
                            !maintenanceFilterStatus ||
                            m.status === maintenanceFilterStatus;
                          return (
                            matchSearch &&
                            matchProperty &&
                            matchPriority &&
                            matchStatus
                          );
                        }).length
                      }
                    </span>{" "}
                    Requests
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Issue Details
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Property
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Client/Requester
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceData.filter((m) => {
                      const matchSearch =
                        m.issueDescription
                          .toLowerCase()
                          .includes(maintenanceSearchQuery.toLowerCase()) ||
                        m.property
                          .toLowerCase()
                          .includes(maintenanceSearchQuery.toLowerCase());
                      const matchProperty =
                        !maintenanceFilterProperty ||
                        m.property === maintenanceFilterProperty;
                      const matchPriority =
                        !maintenanceFilterPriority ||
                        m.priority === maintenanceFilterPriority;
                      const matchStatus =
                        !maintenanceFilterStatus ||
                        m.status === maintenanceFilterStatus;
                      return (
                        matchSearch &&
                        matchProperty &&
                        matchPriority &&
                        matchStatus
                      );
                    }).length === 0 ? (
                      <tr key="no-maintenance">
                        <td
                          colSpan="6"
                          className="px-6 py-8 text-center text-gray-500 text-sm"
                        >
                          No maintenance requests found
                        </td>
                      </tr>
                    ) : (
                      maintenanceData
                        .filter((m) => {
                          const matchSearch =
                            m.issueDescription
                              .toLowerCase()
                              .includes(maintenanceSearchQuery.toLowerCase()) ||
                            m.property
                              .toLowerCase()
                              .includes(maintenanceSearchQuery.toLowerCase());
                          const matchProperty =
                            !maintenanceFilterProperty ||
                            m.property === maintenanceFilterProperty;
                          const matchPriority =
                            !maintenanceFilterPriority ||
                            m.priority === maintenanceFilterPriority;
                          const matchStatus =
                            !maintenanceFilterStatus ||
                            m.status === maintenanceFilterStatus;
                          return (
                            matchSearch &&
                            matchProperty &&
                            matchPriority &&
                            matchStatus
                          );
                        })
                        .map((maintenance, idx) => (
                          <tr
                            key={maintenance.id}
                            className={`border-b border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                          >
                            <td className="px-6 py-4 text-sm">
                              <div className="font-semibold text-gray-900">
                                {maintenance.issueDescription}
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5">
                                Repair
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🏠</span>
                                <span className="text-gray-700">
                                  {maintenance.property}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                                  {maintenance.requester
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {maintenance.requester}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    No contact
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">
                                  {maintenance.priority === "HIGH"
                                    ? "⏰"
                                    : maintenance.priority === "MEDIUM"
                                      ? "⏱️"
                                      : "✓"}
                                </span>
                                <span
                                  className={`font-semibold ${
                                    maintenance.priority === "HIGH"
                                      ? "text-red-700"
                                      : maintenance.priority === "MEDIUM"
                                        ? "text-amber-700"
                                        : "text-green-700"
                                  }`}
                                >
                                  {maintenance.priority}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                  maintenance.status === "PENDING"
                                    ? "bg-amber-100 text-amber-800"
                                    : maintenance.status === "IN_PROGRESS"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {maintenance.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() =>
                                  setSelectedMaintenanceDetail(maintenance)
                                }
                                className="text-gray-500 hover:text-gray-900 text-lg transition-colors font-bold"
                              >
                                ⋮
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Maintenance Detail Modal */}
            {selectedMaintenanceDetail && (
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setSelectedMaintenanceDetail(null)}
              >
                <div
                  className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[#111]">
                      Request Details
                    </h3>
                    <button
                      onClick={() => setSelectedMaintenanceDetail(null)}
                      className="text-[#999] hover:text-[#111] text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#666] uppercasecase">
                        Property
                      </p>
                      <p className="text-[#111] font-medium">
                        {selectedMaintenanceDetail.property}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#666] uppercase">
                        Issue
                      </p>
                      <p className="text-[#111] font-medium">
                        {selectedMaintenanceDetail.issueDescription}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#666] uppercase">
                        Requester
                      </p>
                      <p className="text-[#111] font-medium">
                        {selectedMaintenanceDetail.requester}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-[#666] uppercase">
                          Priority
                        </p>
                        <p
                          className={`font-medium px-2.5 py-1 rounded-full text-xs w-fit ${
                            selectedMaintenanceDetail.priority === "HIGH"
                              ? "bg-red-100 text-red-700"
                              : selectedMaintenanceDetail.priority === "MEDIUM"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {selectedMaintenanceDetail.priority}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#666] uppercase">
                          Status
                        </p>
                        <p className="mt-2 text-sm text-slate-800 font-medium">
                          {selectedMaintenanceDetail.status}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#666] uppercase">
                        Notes
                      </p>
                      <p className="text-[#111] text-sm">
                        {selectedMaintenanceDetail.notes || "No notes"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-[#666] uppercase mb-2">
                      Update status
                    </p>
                    <select
                      value={selectedMaintenanceStatus}
                      onChange={(e) => setSelectedMaintenanceStatus(e.target.value)}
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-900"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => updateMaintenanceStatus(selectedMaintenanceStatus)}
                      disabled={maintenanceStatusUpdating}
                      className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60"
                    >
                      {maintenanceStatusUpdating ? "Updating..." : "Save Status"}
                    </button>
                    <button
                      onClick={() => setSelectedMaintenanceDetail(null)}
                      className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Maintenance Form Modal */}
            {showMaintenanceForm && (
              <div
                className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
                onClick={() => setShowMaintenanceForm(false)}
              >
                <div
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">
                      New Maintenance Request
                    </h3>
                    <button
                      onClick={() => setShowMaintenanceForm(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  <form
                    onSubmit={handleCreateMaintenance}
                    className="flex flex-col flex-1 overflow-hidden"
                  >
                    <div
                      className="p-6 overflow-y-auto flex-1"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {/* PROPERTY DETAILS Section */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-gray-500">🏠</span>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Property Details
                          </h4>
                        </div>

                        {/* Property */}
                        <div className="mb-4">
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Property *
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setMaintenancePropertyDropdownOpen(
                                  !maintenancePropertyDropdownOpen,
                                );
                                if (!maintenancePropertyDropdownOpen) {
                                  setMaintenanceUnitDropdownOpen(false);
                                  setMaintenanceCustomerDropdownOpen(false);
                                }
                              }}
                              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                              disabled={loadingMaintenanceForm}
                            >
                              <span>
                                {maintenanceForm.property || "Select Property"}
                              </span>
                              <span className="text-gray-400">▼</span>
                            </button>
                            {maintenancePropertyDropdownOpen && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  value={maintenancePropertySearch}
                                  onChange={(e) =>
                                    setMaintenancePropertySearch(e.target.value)
                                  }
                                  className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div
                                  className="max-h-48 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {(maintenanceProperties.length > 0
                                    ? maintenanceProperties
                                    : properties
                                  ).filter((p) =>
                                    p.title
                                      .toLowerCase()
                                      .includes(
                                        maintenancePropertySearch.toLowerCase(),
                                      ),
                                  ).length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-gray-500">
                                      No results found
                                    </div>
                                  ) : (
                                    (maintenanceProperties.length > 0
                                      ? maintenanceProperties
                                      : properties
                                    )
                                      .filter((p) =>
                                        p.title
                                          .toLowerCase()
                                          .includes(
                                            maintenancePropertySearch.toLowerCase(),
                                          ),
                                      )
                                      .map((p) => (
                                        <button
                                          key={p._id}
                                          type="button"
                                          onClick={() => {
                                            setMaintenanceForm({
                                              ...maintenanceForm,
                                              property: p.title,
                                              propertyId: p._id,
                                            });
                                            setMaintenancePropertyDropdownOpen(
                                              false,
                                            );
                                            setMaintenancePropertySearch("");
                                          }}
                                          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0"
                                        >
                                          <div className="font-medium text-gray-900">
                                            {p.title}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {p.type || "Property"} • £{p.price}
                                          </div>
                                        </button>
                                      ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Unit (Optional) */}
                        <div className="mb-4">
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Unit (Optional)
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setMaintenanceUnitDropdownOpen(
                                  !maintenanceUnitDropdownOpen,
                                );
                                if (!maintenanceUnitDropdownOpen) {
                                  setMaintenancePropertyDropdownOpen(false);
                                  setMaintenanceCustomerDropdownOpen(false);
                                }
                              }}
                              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                            >
                              <span>
                                {maintenanceForm.unit ||
                                  "Select Unit (Optional)"}
                              </span>
                              <span className="text-gray-400">▼</span>
                            </button>
                            {maintenanceUnitDropdownOpen &&
                              maintenanceForm.propertyId && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                  <input
                                    type="text"
                                    placeholder="Search units..."
                                    value={maintenanceUnitSearch}
                                    onChange={(e) =>
                                      setMaintenanceUnitSearch(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div
                                    className="max-h-48 overflow-y-auto"
                                    style={{
                                      scrollbarWidth: "none",
                                      msOverflowStyle: "none",
                                    }}
                                  >
                                    {unitsData.filter(
                                      (u) =>
                                        (u.propertyId ===
                                          maintenanceForm.propertyId ||
                                          u.property ===
                                            maintenanceForm.property) &&
                                        (u.unitNumber || "")
                                          .toString()
                                          .toLowerCase()
                                          .includes(
                                            maintenanceUnitSearch.toLowerCase(),
                                          ),
                                    ).length === 0 ? (
                                      <div className="px-3 py-2 text-sm text-gray-500">
                                        No units found
                                      </div>
                                    ) : (
                                      unitsData
                                        .filter(
                                          (u) =>
                                            (u.propertyId ===
                                              maintenanceForm.propertyId ||
                                              u.property ===
                                                maintenanceForm.property) &&
                                            (u.unitNumber || "")
                                              .toString()
                                              .toLowerCase()
                                              .includes(
                                                maintenanceUnitSearch.toLowerCase(),
                                              ),
                                        )
                                        .map((u) => (
                                          <button
                                            key={u._id}
                                            type="button"
                                            onClick={() => {
                                              setMaintenanceForm({
                                                ...maintenanceForm,
                                                unit: u.unitNumber,
                                              });
                                              setMaintenanceUnitDropdownOpen(
                                                false,
                                              );
                                              setMaintenanceUnitSearch("");
                                            }}
                                            className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0"
                                          >
                                            <div className="font-medium text-gray-900">
                                              {u.unitNumber}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                              {u.type} • {u.status}
                                            </div>
                                          </button>
                                        ))
                                    )}
                                  </div>
                                </div>
                              )}
                            {maintenanceUnitDropdownOpen &&
                              !maintenanceForm.propertyId && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 px-3 py-2 text-sm text-gray-500">
                                  Please select a property first
                                </div>
                              )}
                          </div>
                        </div>

                        {/* Requested By */}
                        <div>
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Requested By (Customer - Optional)
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setMaintenanceCustomerDropdownOpen(
                                  !maintenanceCustomerDropdownOpen,
                                );
                                if (!maintenanceCustomerDropdownOpen) {
                                  setMaintenancePropertyDropdownOpen(false);
                                  setMaintenanceUnitDropdownOpen(false);
                                }
                              }}
                              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                            >
                              <span>
                                {maintenanceForm.requestedBy ||
                                  "Select Requested By (Customer - Optional)"}
                              </span>
                              <span className="text-gray-400">▼</span>
                            </button>
                            {maintenanceCustomerDropdownOpen && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                <input
                                  type="text"
                                  placeholder="Search customers..."
                                  value={maintenanceCustomerSearch}
                                  onChange={(e) =>
                                    setMaintenanceCustomerSearch(e.target.value)
                                  }
                                  className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div
                                  className="max-h-48 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {users.filter(
                                    (u) =>
                                      u.name
                                        ?.toLowerCase()
                                        .includes(
                                          maintenanceCustomerSearch.toLowerCase(),
                                        ) ||
                                      u.email
                                        ?.toLowerCase()
                                        .includes(
                                          maintenanceCustomerSearch.toLowerCase(),
                                        ),
                                  ).length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-gray-500">
                                      No customers found
                                    </div>
                                  ) : (
                                    users
                                      .filter(
                                        (u) =>
                                          u.name
                                            ?.toLowerCase()
                                            .includes(
                                              maintenanceCustomerSearch.toLowerCase(),
                                            ) ||
                                          u.email
                                            ?.toLowerCase()
                                            .includes(
                                              maintenanceCustomerSearch.toLowerCase(),
                                            ),
                                      )
                                      .map((u) => (
                                        <button
                                          key={u._id}
                                          type="button"
                                          onClick={() => {
                                            setMaintenanceForm({
                                              ...maintenanceForm,
                                              requestedBy: u.name || u.email,
                                            });
                                            setMaintenanceCustomerDropdownOpen(
                                              false,
                                            );
                                            setMaintenanceCustomerSearch("");
                                          }}
                                          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0"
                                        >
                                          <div className="font-medium text-gray-900">
                                            {u.name || u.email}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {u.email}
                                          </div>
                                        </button>
                                      ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Title & Type */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Title *
                          </label>
                          <input
                            type="text"
                            value={maintenanceForm.title}
                            onChange={(e) =>
                              setMaintenanceForm({
                                ...maintenanceForm,
                                title: e.target.value,
                              })
                            }
                            placeholder="E.g. Leaking faucet"
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Type *
                          </label>
                          <select
                            value={maintenanceForm.type}
                            onChange={(e) =>
                              setMaintenanceForm({
                                ...maintenanceForm,
                                type: e.target.value,
                              })
                            }
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                          >
                            <option>Repair</option>
                            <option>Maintenance</option>
                            <option>Inspection</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                          Description *
                        </label>
                        <textarea
                          value={maintenanceForm.description}
                          onChange={(e) =>
                            setMaintenanceForm({
                              ...maintenanceForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe the issue in detail..."
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 resize-none"
                          rows="4"
                          required
                        />
                      </div>

                      {/* STATUS & PRIORITY Section */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-gray-500">⏱️</span>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Status & Priority
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                              Priority *
                            </label>
                            <select
                              value={maintenanceForm.priority}
                              onChange={(e) =>
                                setMaintenanceForm({
                                  ...maintenanceForm,
                                  priority: e.target.value,
                                })
                              }
                              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                            >
                              <option value="LOW">Low</option>
                              <option value="MEDIUM">Medium</option>
                              <option value="HIGH">High</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                              Current Status *
                            </label>
                            <select
                              value={maintenanceForm.status}
                              onChange={(e) =>
                                setMaintenanceForm({
                                  ...maintenanceForm,
                                  status: e.target.value,
                                })
                              }
                              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="COMPLETED">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Estimated Cost & Scheduled Date */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Estimated Cost
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={maintenanceForm.estimatedCost}
                            onChange={(e) =>
                              setMaintenanceForm({
                                ...maintenanceForm,
                                estimatedCost: e.target.value,
                              })
                            }
                            placeholder="0.00"
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block">
                            Scheduled Date
                          </label>
                          <input
                            type="date"
                            value={maintenanceForm.scheduledDate}
                            onChange={(e) =>
                              setMaintenanceForm({
                                ...maintenanceForm,
                                scheduledDate: e.target.value,
                              })
                            }
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-t border-gray-200 flex gap-3 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => setShowMaintenanceForm(false)}
                        className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Create Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── PAYMENTS ── */}
        {activeTab === "payments" && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#ebebeb]">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Payment Records
                  </h2>
                  <p className="text-sm text-[#999]">
                    Track rent collections, deposits, and installments
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const filtered = paymentsData.filter(
                        (p) =>
                          p.invoiceNumber
                            .toLowerCase()
                            .includes(paymentSearchQuery.toLowerCase()) ||
                          p.clientName
                            .toLowerCase()
                            .includes(paymentSearchQuery.toLowerCase()) ||
                          p.property
                            .toLowerCase()
                            .includes(paymentSearchQuery.toLowerCase()),
                      );

                      if (filtered.length === 0) {
                        alert("No payments to export");
                        return;
                      }

                      const headers = [
                        "Invoice",
                        "Client",
                        "Email",
                        "Property",
                        "Unit",
                        "Type",
                        "Total",
                        "Received",
                        "Due",
                        "Date",
                      ];
                      const csvContent = [
                        headers.join(","),
                        ...filtered.map((p) =>
                          [
                            p.invoiceNumber,
                            p.clientName,
                            p.clientEmail,
                            p.property,
                            p.unit,
                            p.paymentType,
                            p.amount,
                            p.received,
                            p.due,
                            p.date,
                          ]
                            .map((cell) => `"${cell}"`)
                            .join(","),
                        ),
                      ].join("\n");

                      const blob = new Blob([csvContent], {
                        type: "text/csv;charset=utf-8;",
                      });
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = `payments-${new Date().toISOString().split("T")[0]}.csv`;
                      link.click();
                    }}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-lg transition-colors border border-gray-300"
                  >
                    ⬇️ Export
                  </button>
                  <button
                    onClick={() => setShowRecordPaymentForm(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    ➕ Record Payment
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        Total Collected
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        £
                        {paymentsData
                          .reduce((sum, p) => sum + (p.received || 0), 0)
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                      💚
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        Total Dues
                      </p>
                      <p className="text-3xl font-bold text-red-600">
                        £
                        {paymentsData
                          .reduce((sum, p) => sum + (p.due || 0), 0)
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                      ⏰
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        This Month
                      </p>
                      <p className="text-3xl font-bold text-blue-600">£0.00</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                      📅
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">
                        Total Records
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {paymentsData.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                      📋
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3 mb-6 flex-wrap overflow-visible">
                {/* Customer Filter */}
                <div className="relative min-w-40 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentCustomerDropdownOpen(
                        !paymentCustomerDropdownOpen,
                      );
                      if (!paymentCustomerDropdownOpen) {
                        setPaymentPropertyDropdownOpen(false);
                        setPaymentUnitDropdownOpen(false);
                        setPaymentTypeDropdownOpen(false);
                      }
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                  >
                    <span>
                      {paymentCustomerFilter
                        ? users.find((u) => u._id === paymentCustomerFilter)
                            ?.name ||
                          users.find((u) => u._id === paymentCustomerFilter)
                            ?.email
                        : "Filter by Customer"}
                    </span>
                    <span className="text-gray-400">▼</span>
                  </button>
                  {paymentCustomerDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                      style={{ zIndex: 9999 }}
                    >
                      <input
                        type="text"
                        placeholder="Search customers..."
                        value={paymentCustomerSearch}
                        onChange={(e) =>
                          setPaymentCustomerSearch(e.target.value)
                        }
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div
                        className="max-h-48 overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentCustomerFilter("");
                            setPaymentCustomerDropdownOpen(false);
                            setPaymentCustomerSearch("");
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100"
                        >
                          All Customers
                        </button>
                        {users
                          .filter((u) =>
                            (u.name || u.email)
                              .toLowerCase()
                              .includes(paymentCustomerSearch.toLowerCase()),
                          )
                          .map((u) => (
                            <button
                              key={u._id}
                              type="button"
                              onClick={() => {
                                setPaymentCustomerFilter(u._id);
                                setPaymentCustomerDropdownOpen(false);
                                setPaymentCustomerSearch("");
                              }}
                              className={`w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 ${paymentCustomerFilter === u._id ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
                            >
                              <div className="font-medium">
                                {u.name || u.email}
                              </div>
                              <div className="text-xs text-gray-500">
                                {u.email}
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Filter */}
                <div className="relative min-w-40 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentPropertyDropdownOpen(
                        !paymentPropertyDropdownOpen,
                      );
                      if (!paymentPropertyDropdownOpen) {
                        setPaymentUnitDropdownOpen(false);
                        setPaymentTypeDropdownOpen(false);
                        setPaymentCustomerDropdownOpen(false);
                      }
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                  >
                    <span>
                      {paymentPropertyFilter
                        ? properties.find(
                            (p) => p._id === paymentPropertyFilter,
                          )?.title
                        : "Select Property"}
                    </span>
                    <span className="text-gray-400">▼</span>
                  </button>
                  {paymentPropertyDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                      style={{ zIndex: 9999 }}
                    >
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={paymentPropertySearch}
                        onChange={(e) =>
                          setPaymentPropertySearch(e.target.value)
                        }
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div
                        className="max-h-48 overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentPropertyFilter("");
                            setPaymentUnitFilter("");
                            setPaymentPropertyDropdownOpen(false);
                            setPaymentPropertySearch("");
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100"
                        >
                          All Properties
                        </button>
                        {properties
                          .filter((p) =>
                            p.title
                              .toLowerCase()
                              .includes(paymentPropertySearch.toLowerCase()),
                          )
                          .map((p) => (
                            <button
                              key={p._id}
                              type="button"
                              onClick={() => {
                                setPaymentPropertyFilter(p._id);
                                setPaymentUnitFilter("");
                                setPaymentPropertyDropdownOpen(false);
                                setPaymentPropertySearch("");
                              }}
                              className={`w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 ${paymentPropertyFilter === p._id ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
                            >
                              {p.title}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Unit Filter */}
                <div className="relative min-w-40 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentUnitDropdownOpen(!paymentUnitDropdownOpen);
                      if (!paymentUnitDropdownOpen) {
                        setPaymentPropertyDropdownOpen(false);
                        setPaymentTypeDropdownOpen(false);
                        setPaymentCustomerDropdownOpen(false);
                      }
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                  >
                    <span>
                      {paymentUnitFilter
                        ? unitsData.find((u) => u._id === paymentUnitFilter)
                            ?.unitNumber
                        : "Select Unit"}
                    </span>
                    <span className="text-gray-400">▼</span>
                  </button>
                  {paymentUnitDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                      style={{ zIndex: 9999 }}
                    >
                      <input
                        type="text"
                        placeholder="Search units..."
                        value={paymentUnitSearch}
                        onChange={(e) => setPaymentUnitSearch(e.target.value)}
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div
                        className="max-h-48 overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentUnitFilter("");
                            setPaymentUnitDropdownOpen(false);
                            setPaymentUnitSearch("");
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100"
                        >
                          All Units
                        </button>
                        {unitsData
                          .filter((u) => {
                            const matchProperty =
                              !paymentPropertyFilter ||
                              u.propertyId === paymentPropertyFilter;
                            return (
                              matchProperty &&
                              (u.unitNumber || "")
                                .toString()
                                .toLowerCase()
                                .includes(paymentUnitSearch.toLowerCase())
                            );
                          })
                          .map((u) => (
                            <button
                              key={u._id}
                              type="button"
                              onClick={() => {
                                setPaymentUnitFilter(u._id);
                                setPaymentUnitDropdownOpen(false);
                                setPaymentUnitSearch("");
                              }}
                              className={`w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 ${paymentUnitFilter === u._id ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
                            >
                              <div className="font-medium">{u.unitNumber}</div>
                              <div className="text-xs text-gray-500">
                                {u.property}
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Type Filter */}
                <div className="relative min-w-36 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentTypeDropdownOpen(!paymentTypeDropdownOpen);
                      if (!paymentTypeDropdownOpen) {
                        setPaymentPropertyDropdownOpen(false);
                        setPaymentUnitDropdownOpen(false);
                        setPaymentCustomerDropdownOpen(false);
                      }
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                  >
                    <span>{paymentTypeFilter || "Payment Type"}</span>
                    <span className="text-gray-400">▼</span>
                  </button>
                  {paymentTypeDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                      style={{ zIndex: 9999 }}
                    >
                      <div
                        className="max-h-48 overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentTypeFilter("");
                            setPaymentTypeDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100"
                        >
                          All Types
                        </button>
                        {["RENT", "DEPOSIT", "MAINTENANCE", "OTHER"].map(
                          (type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setPaymentTypeFilter(type);
                                setPaymentTypeDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 ${paymentTypeFilter === type ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
                            >
                              {type}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Invoice */}
                <input
                  type="text"
                  placeholder="Search invoice #"
                  value={paymentSearchQuery}
                  onChange={(e) => setPaymentSearchQuery(e.target.value)}
                  className="flex-1 min-w-40 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ebebeb]">
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        INVOICE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        CLIENT
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PAYMENT INFO
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        TOTAL
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        RECEIVED
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        DUE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentsData
                      .filter(
                        (p) =>
                          p.invoiceNumber
                            .toLowerCase()
                            .includes(paymentSearchQuery.toLowerCase()) ||
                          p.clientName
                            .toLowerCase()
                            .includes(paymentSearchQuery.toLowerCase()) ||
                          p.property
                            .toLowerCase()
                            .includes(paymentSearchQuery.toLowerCase()),
                      )
                      .map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="font-mono text-[#666] font-semibold text-sm">
                              {payment.invoiceNumber}
                            </div>
                            <div className="text-xs text-[#999] mt-1">
                              {payment.date}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                                {payment.clientName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-[#111]">
                                  {payment.clientName}
                                </div>
                                <div className="text-xs text-[#999]">
                                  {payment.clientEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-600">
                                {payment.paymentType}
                              </span>
                              <div className="text-xs text-[#666] mt-1">
                                Property: {payment.property} • Unit:{" "}
                                {payment.unit}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-[#111]">
                              £{payment.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-green-600">
                              £{payment.received.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div
                              className={`font-semibold ${payment.due === 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              £{payment.due.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setSelectedPaymentDetail(payment)}
                              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {paymentsData.length === 0 && (
                <div className="text-center py-10 text-[#999] text-sm">
                  No payment records found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── DUE COLLECTION ── */}
        {activeTab === "due-collection" && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#ebebeb]">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Due Collection
                  </h2>
                  <p className="text-sm text-[#999]">
                    Manage and collect outstanding payments from clients
                  </p>
                </div>
                <div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-xs text-[#666] font-semibold uppercase">
                        Total Pending Due
                      </p>
                      <p className="text-2xl font-bold text-amber-600">
                        £
                        {paymentsData
                          .reduce((sum, p) => sum + (p.due || 0), 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search & Actions */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Search by invoice number..."
                  value={dueCollectionSearchQuery}
                  onChange={(e) => setDueCollectionSearchQuery(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Table */}
              <div
                className="overflow-x-auto overflow-y-hidden"
                ref={dueCollectionMenuRef}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ebebeb]">
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        INVOICE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        CLIENT
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PROPERTY
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        AMOUNT DUE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        TYPE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentsData
                      .filter((p) => p.due > 0)
                      .filter(
                        (p) =>
                          p.invoiceNumber
                            .toLowerCase()
                            .includes(dueCollectionSearchQuery.toLowerCase()) ||
                          p.clientName
                            .toLowerCase()
                            .includes(dueCollectionSearchQuery.toLowerCase()) ||
                          p.property
                            .toLowerCase()
                            .includes(dueCollectionSearchQuery.toLowerCase()),
                      )
                      .map((payment, dueIndex) => {
                        const dueRowId =
                          payment._id ||
                          payment.invoiceNumber ||
                          `due-${dueIndex}`;
                        return (
                          <tr
                            key={dueRowId}
                            className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="font-mono text-[#666] font-semibold text-sm">
                                {payment.invoiceNumber}
                              </div>
                              <div className="text-xs text-[#999] mt-1">
                                {payment.date}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                                  {payment.clientName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-[#111]">
                                    {payment.clientName}
                                  </div>
                                  <div className="text-xs text-[#999]">
                                    {payment.clientEmail}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-[#111] font-semibold">
                                {payment.property}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-bold text-red-600 text-lg">
                                £{payment.due.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-600">
                                {payment.paymentType}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="relative inline-block">
                                <button
                                  data-menu-button="due-collection"
                                  data-payment-id={dueRowId}
                                  onClick={() =>
                                    setDueCollectionMenuOpen(
                                      dueCollectionMenuOpen === dueRowId
                                        ? null
                                        : dueRowId,
                                    )
                                  }
                                  className="text-gray-600 hover:text-gray-900 font-bold text-xl p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  ⋯
                                </button>

                                {/* Dropdown Menu */}
                                {dueCollectionMenuOpen === dueRowId && (
                                  <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    {dueCollectionActions.map((action) => (
                                      <button
                                        key={action.key}
                                        onClick={() =>
                                          handleDueAction(payment, action.key)
                                        }
                                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors border-b border-gray-100 flex items-center gap-2 last:border-b-0"
                                      >
                                        <span>{action.icon}</span>{" "}
                                        {action.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Showing Results */}
              <div className="mt-4 text-sm text-[#666]">
                Showing{" "}
                <span className="font-semibold">
                  {
                    paymentsData
                      .filter((p) => p.due > 0)
                      .filter(
                        (p) =>
                          p.invoiceNumber
                            .toLowerCase()
                            .includes(dueCollectionSearchQuery.toLowerCase()) ||
                          p.clientName
                            .toLowerCase()
                            .includes(dueCollectionSearchQuery.toLowerCase()) ||
                          p.property
                            .toLowerCase()
                            .includes(dueCollectionSearchQuery.toLowerCase()),
                      ).length
                  }
                </span>{" "}
                pending dues
              </div>

              {paymentsData.filter((p) => p.due > 0).length === 0 && (
                <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">ℹ️</div>
                    <div>
                      <h4 className="text-lg font-bold text-[#111] mb-2">
                        Automated Collection Assistant
                      </h4>
                      <p className="text-sm text-[#666] mb-4">
                        This screen lists all payments currently in{" "}
                        <strong>Pending status</strong>. Marking a payment as
                        paid here will automatically generate any associated
                        agent commissions and update the property's financial
                        shadow.
                      </p>
                      <button
                        onClick={() => setShowRecordPaymentForm(true)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        ➕ RECORD NEW DUE
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PAYROLL ── */}
        {activeTab === "payroll" && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#ebebeb]">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Payroll & Commission
                  </h2>
                  <p className="text-sm text-[#999]">
                    Manage staff salaries, commissions, and tips
                  </p>
                </div>
                <button
                  onClick={() => setShowGeneratePayrollForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  + Generate Payroll
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Total Payout */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Total Payout
                  </p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-blue-600">£0.00</p>
                    <span className="text-xl mb-1">💵</span>
                  </div>
                </div>

                {/* Pending Payout */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Pending Payout
                  </p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-orange-600">£0.00</p>
                    <span className="text-xl mb-1">📊</span>
                  </div>
                </div>

                {/* Quarterly Bonuses */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Quarterly Bonuses
                  </p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-green-600">£0.00</p>
                    <span className="text-xl mb-1">📈</span>
                  </div>
                </div>
              </div>
              {selectedPayrollDetail && (
                <div className="text-sm text-slate-600 mb-4">
                  Selected payroll:{" "}
                  {selectedPayrollDetail.staffName ||
                    selectedPayrollDetail.staffEmail ||
                    selectedPayrollDetail.id}
                </div>
              )}

              {/* Search */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Search by staff name..."
                  value={payrollSearchQuery}
                  onChange={(e) => setPayrollSearchQuery(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Table */}
              <div
                className="overflow-x-auto overflow-y-hidden"
                ref={payrollMenuRef}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ebebeb]">
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        STAFF
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PERIOD
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        SALARY
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        TIPS
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        TOTAL
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        STATUS
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center">
                          <div className="text-gray-400">
                            <p className="text-sm">No payroll records found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      payrollData
                        .filter(
                          (p) =>
                            p.staffName
                              .toLowerCase()
                              .includes(payrollSearchQuery.toLowerCase()) ||
                            p.staffEmail
                              .toLowerCase()
                              .includes(payrollSearchQuery.toLowerCase()),
                        )
                        .map((payroll, payrollIndex) => {
                          const payrollRowId =
                            payroll._id ||
                            `${payroll.staffEmail || "staff"}-${payrollIndex}`;
                          return (
                            <tr
                              key={payrollRowId}
                              className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                                    {payroll.staffName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#111]">
                                      {payroll.staffName}
                                    </div>
                                    <div className="text-xs text-[#999]">
                                      {payroll.staffEmail}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-[#111] font-semibold">
                                  {payroll.period}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-bold text-[#111]">
                                  £{payroll.salary.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-green-600 font-bold">
                                  £{payroll.tips.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-bold text-lg text-[#111]">
                                  £
                                  {(
                                    payroll.salary + payroll.tips
                                  ).toLocaleString()}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                                    payroll.status === "PAID"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-yellow-100 text-yellow-600"
                                  }`}
                                >
                                  {payroll.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="relative inline-block">
                                  <button
                                    data-menu-button="payroll"
                                    data-payroll-id={payrollRowId}
                                    onClick={() =>
                                      setPayrollMenuOpen(
                                        payrollMenuOpen === payrollRowId
                                          ? null
                                          : payrollRowId,
                                      )
                                    }
                                    className="text-gray-600 hover:text-gray-900 font-bold text-xl p-1 hover:bg-gray-100 rounded transition-colors"
                                  >
                                    ⋯
                                  </button>

                                  {/* Dropdown Menu */}
                                  {payrollMenuOpen === payrollRowId && (
                                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                      {[
                                        {
                                          key: "view",
                                          label: "View",
                                          icon: "👁️",
                                        },
                                        {
                                          key: "mark-paid",
                                          label: "Mark Paid",
                                          icon: "✅",
                                        },
                                        {
                                          key: "download",
                                          label: "Download",
                                          icon: "📥",
                                        },
                                      ].map((action) => (
                                        <button
                                          key={action.key}
                                          onClick={() => {
                                            setSelectedPayrollDetail(payroll);
                                            setPayrollMenuOpen(null);
                                            console.log(
                                              `Payroll action: ${action.key} for ${payrollRowId}`,
                                            );
                                          }}
                                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors border-b border-gray-100 flex items-center gap-2 last:border-b-0"
                                        >
                                          <span>{action.icon}</span>{" "}
                                          {action.label}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Showing Results */}
              <div className="mt-4 text-sm text-[#666]">
                Showing{" "}
                <span className="font-semibold">
                  {
                    payrollData.filter(
                      (p) =>
                        p.staffName
                          .toLowerCase()
                          .includes(payrollSearchQuery.toLowerCase()) ||
                        p.staffEmail
                          .toLowerCase()
                          .includes(payrollSearchQuery.toLowerCase()),
                    ).length
                  }
                </span>{" "}
                of <span className="font-semibold">{payrollData.length}</span>{" "}
                records
              </div>
            </div>
          </div>
        )}

        {/* ── GENERATE PAYROLL MODAL ── */}
        {showGeneratePayrollForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Generate Payroll</h3>
                <button
                  onClick={() => setShowGeneratePayrollForm(false)}
                  className="text-xl"
                >
                  ✕
                </button>
              </div>
              <form
                onSubmit={handleGeneratePayrollSubmit}
                className="space-y-4"
              >
                <div className="relative">
                  <label className="text-sm font-semibold text-[#444] block mb-1">
                    Staff Member <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="border border-[#ccc] rounded-lg px-3 py-2 cursor-pointer"
                    onClick={() =>
                      setPayrollStaffDropdownOpen(!payrollStaffDropdownOpen)
                    }
                  >
                    {payrollForm.staffId ? (
                      staffData.find((s) => s._id === payrollForm.staffId)
                        ?.name ||
                      staffData.find((s) => s._id === payrollForm.staffId)
                        ?.email ||
                      "Unknown"
                    ) : (
                      <span className="text-gray-400">Select Staff</span>
                    )}
                  </div>
                  {payrollStaffDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-[#ccc] rounded-lg shadow-lg z-10">
                      <input
                        type="text"
                        value={payrollStaffSearch}
                        onChange={(e) => setPayrollStaffSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full border-none outline-none px-3 py-2"
                      />
                      <div className="max-h-44 overflow-y-auto">
                        {staffData
                          .filter((s) =>
                            `${s.name || ""} ${s.email || ""}`
                              .toLowerCase()
                              .includes(payrollStaffSearch.toLowerCase()),
                          )
                          .map((staffItem) => (
                            <div
                              key={staffItem._id || staffItem.id}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                              onClick={() => {
                                setPayrollForm((prev) => ({
                                  ...prev,
                                  staffId: staffItem._id || staffItem.id,
                                }));
                                setPayrollStaffDropdownOpen(false);
                              }}
                            >
                              {staffItem.name || staffItem.email || "Unknown"}
                            </div>
                          ))}
                        {staffData.filter((s) =>
                          `${s.name || ""} ${s.email || ""}`
                            .toLowerCase()
                            .includes(payrollStaffSearch.toLowerCase()),
                        ).length === 0 && (
                          <div className="px-3 py-2 text-sm text-gray-400">
                            No results found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-[#444] block mb-1">
                      Month
                    </label>
                    <select
                      value={payrollForm.month}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          month: e.target.value,
                        }))
                      }
                      className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                    >
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#444] block mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      min="2000"
                      max="2100"
                      value={payrollForm.year}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                      className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowGeneratePayrollForm(false)}
                    className="px-4 py-2 rounded-lg border border-[#ccc]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Generate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── EXPENSES ── */}
        {activeTab === "expenses" && (
          <div>
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 lg:p-7">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-0 mb-5 lg:mb-6 pb-4 lg:pb-6 border-b border-[#ebebeb]">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Expense Management
                  </h2>
                  <p className="text-sm text-[#999]">
                    Track and manage business expenses
                  </p>
                </div>
                <button
                  onClick={() => setShowAddExpenseForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  + Add Expense
                </button>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4 lg:mb-5">
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full lg:w-[350px] bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center gap-2">
                  <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-base text-gray-800">
                    <option>All Categories</option>
                    <option>Rent</option>
                    <option>Utilities</option>
                    <option>Supplies</option>
                    <option>Maintenance</option>
                  </select>
                  <button className="px-4 py-2 rounded-lg text-base font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50">
                    Reset
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ebebeb]">
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        TITLE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        CATEGORY
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        AMOUNT
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        DATE
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        PAYMENT
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-[#666] text-xs uppercase tracking-wide">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.length === 0 ? (
                      <tr className="border-b border-[#f0f0f0]">
                        <td
                          className="px-4 py-16 text-center text-gray-400"
                          colSpan="6"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">💸</span>
                            <span>No expenses found</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      expenseData.map((expense) => (
                        <tr
                          key={expense.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa]"
                        >
                          <td className="px-4 py-3">{expense.title}</td>
                          <td className="px-4 py-3">{expense.category}</td>
                          <td className="px-4 py-3">
                            £{parseFloat(expense.amount).toFixed(2)}
                          </td>
                          <td className="px-4 py-3">{expense.date}</td>
                          <td className="px-4 py-3">{expense.paymentMethod}</td>
                          <td className="px-4 py-3">
                            <button className="px-2 py-1 text-xs text-blue-600 hover:underline">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-sm text-[#666]">
                Showing 0 of 0 records
              </div>
            </div>
          </div>
        )}

        {/* ── ADD EXPENSE MODAL ── */}
        {showAddExpenseForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Add Expense</h3>
                <button
                  onClick={() => setShowAddExpenseForm(false)}
                  className="text-xl"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#444] block mb-1">
                    Expense Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={expenseForm.title}
                    onChange={(e) =>
                      setExpenseForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g. Monthly Rent"
                    className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-[#444] block mb-1">
                      Amount (£) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={expenseForm.amount}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#444] block mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={expenseForm.category}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                    >
                      <option disabled value="">
                        Select Category
                      </option>
                      <option>Other</option>
                      <option>Rent</option>
                      <option>Utilities</option>
                      <option>Supplies</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-[#444] block mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#444] block mb-1">
                      Payment Method
                    </label>
                    <select
                      value={expenseForm.paymentMethod}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({
                          ...prev,
                          paymentMethod: e.target.value,
                        }))
                      }
                      className="w-full border border-[#ccc] rounded-lg px-3 py-2"
                    >
                      <option value="" disabled>
                        Select payment method
                      </option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Direct Debit">Direct Debit</option>
                      <option value="Bacs">Bacs</option>
                      <option value="CHAPS">CHAPS</option>
                      <option value="Faster Payments">Faster Payments</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#444] block mb-1">
                    Notes
                  </label>
                  <textarea
                    rows="3"
                    value={expenseForm.notes}
                    onChange={(e) =>
                      setExpenseForm((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes (optional)"
                    className="w-full border border-[#ccc] rounded-lg px-3 py-2 h-24"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddExpenseForm(false)}
                    className="px-4 py-2 rounded-lg border border-[#ccc]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── AGENTS ── */}
        {activeTab === "agents" && (
          <div>
            <div className="bg-slate-50 border border-[#ebebeb] rounded-2xl p-5 lg:p-7">
              <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-[#ebebeb] flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Agent Performance
                  </h2>
                  <p className="text-sm text-[#999]">
                    Monitor listing activity and commission earnings
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAgentForm(true);
                    setEditingAgent(null);
                    setAgentForm({
                      name: "",
                      email: "",
                      phone: "",
                      activity: "",
                      earnings: "",
                      status: "Active",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  + Add Agent
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-white border border-[#ebebeb] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] uppercase tracking-wide">
                      Active Agents
                    </p>
                    <p className="text-2xl font-bold">
                      {agentsData.filter((a) => a.status === "Active").length}
                    </p>
                  </div>
                  <span className="text-blue-500 text-2xl">👥</span>
                </div>
                <div className="bg-white border border-[#ebebeb] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] uppercase tracking-wide">
                      Gross Commissions
                    </p>
                    <p className="text-2xl font-bold">
                      £
                      {agentsData
                        .reduce((sum, a) => sum + (Number(a.earnings) || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <span className="text-green-500 text-2xl">💷</span>
                </div>
                <div className="bg-white border border-[#ebebeb] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] uppercase tracking-wide">
                      Top Performer
                    </p>
                    <p className="text-2xl font-bold">
                      {agentsData.length
                        ? agentsData.reduce(
                            (top, a) =>
                              Number(a.earnings || 0) >
                              Number(top.earnings || 0)
                                ? a
                                : top,
                            agentsData[0],
                          ).name
                        : "N/A"}
                    </p>
                  </div>
                  <span className="text-purple-500 text-2xl">🏆</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:justify-between">
                <input
                  type="text"
                  value={agentSearchQuery}
                  onChange={(e) => setAgentSearchQuery(e.target.value)}
                  placeholder="Search agents by name or email..."
                  className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                />
                <button
                  onClick={() => setAgentSearchQuery("")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 md:ml-auto"
                >
                  Reset
                </button>
              </div>
              <hr className="border-t border-[#ebebeb] mb-4" />

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[#666] text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3">AGENT</th>
                      <th className="text-left px-4 py-3">ACTIVITY</th>
                      <th className="text-left px-4 py-3">EARNINGS</th>
                      <th className="text-left px-4 py-3">STATUS</th>
                      <th className="text-left px-4 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentsData
                      .filter(
                        (agent) =>
                          agent.name
                            .toLowerCase()
                            .includes(agentSearchQuery.toLowerCase()) ||
                          agent.email
                            .toLowerCase()
                            .includes(agentSearchQuery.toLowerCase()),
                      )
                      .map((agent) => (
                        <tr
                          key={agent._id || agent.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa]"
                        >
                          <td className="px-4 py-3">
                            <div className="font-semibold">{agent.name}</div>
                            <div className="text-xs text-[#888]">
                              {agent.email}
                            </div>
                          </td>
                          <td className="px-4 py-3">{agent.activity}</td>
                          <td className="px-4 py-3">
                            £{Number(agent.earnings || 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${agent.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}
                            >
                              {agent.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => handleAgentEdit(agent)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleAgentDelete(agent.id)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    {agentsData.filter(
                      (agent) =>
                        agent.name
                          .toLowerCase()
                          .includes(agentSearchQuery.toLowerCase()) ||
                        agent.email
                          .toLowerCase()
                          .includes(agentSearchQuery.toLowerCase()),
                    ).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-sm text-gray-500 py-8"
                        >
                          No agents found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {showAgentForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      {editingAgent ? "Edit Agent" : "Register New Agent"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowAgentForm(false);
                        setEditingAgent(null);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleAgentSubmit} className="space-y-4">
                    <div className="bg-slate-50 border border-[#e5e7eb] rounded-xl p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                        Personal Information
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          value={agentForm.name}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                          placeholder="Full Name"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        <input
                          value={agentForm.email}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                          placeholder="Email address"
                          type="email"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <input
                          value={agentForm.phone}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="Phone Number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-[#e5e7eb] rounded-xl p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                        Professional Details
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={agentForm.commissionType}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              commissionType: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option>Percentage</option>
                          <option>Fixed</option>
                        </select>
                        <input
                          value={agentForm.commissionValue}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              commissionValue: e.target.value,
                            }))
                          }
                          type="number"
                          min="0"
                          placeholder="Commission Value"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <input
                          value={agentForm.experience}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              experience: e.target.value,
                            }))
                          }
                          type="number"
                          min="0"
                          placeholder="Experience (Years)"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        <select
                          value={agentForm.status}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                      <div className="mt-3">
                        <input
                          value={agentForm.specialization}
                          onChange={(e) =>
                            setAgentForm((prev) => ({
                              ...prev,
                              specialization: e.target.value,
                            }))
                          }
                          placeholder="Specialization (comma separated)"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAgentForm(false);
                          setEditingAgent(null);
                        }}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                      >
                        {editingAgent ? "Update" : "Register Agent"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── OWNERS ── */}
        {activeTab === "owners" && (
          <div>
            <div className="bg-slate-50 border border-[#ebebeb] rounded-2xl p-5 lg:p-7">
              <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-[#ebebeb] flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Property Owners
                  </h2>
                  <p className="text-sm text-[#999]">
                    Manage individuals and companies owning properties
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowOwnerForm(true);
                    setEditingOwner(null);
                    setOwnerForm({
                      name: "",
                      company: "",
                      taxId: "",
                      propertiesCount: "",
                      email: "",
                      phone: "",
                      status: "Active",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  + Add Owner
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-white border border-[#ebebeb] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] uppercase tracking-wide">
                      Total Owners
                    </p>
                    <p className="text-2xl font-bold">{ownersData.length}</p>
                  </div>
                  <span className="text-blue-500 text-2xl">👥</span>
                </div>
                <div className="bg-white border border-[#ebebeb] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] uppercase tracking-wide">
                      Total Properties
                    </p>
                    <p className="text-2xl font-bold">
                      {ownersData.reduce(
                        (sum, o) => sum + (Number(o.propertiesCount) || 0),
                        0,
                      )}
                    </p>
                  </div>
                  <span className="text-green-500 text-2xl">🏠</span>
                </div>
                <div className="bg-white border border-[#ebebeb] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] uppercase tracking-wide">
                      Corporate Owners
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        ownersData.filter(
                          (o) =>
                            o.company &&
                            o.company.toLowerCase() !== "individual",
                        ).length
                      }
                    </p>
                  </div>
                  <span className="text-purple-500 text-2xl">🏢</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:justify-between">
                <input
                  type="text"
                  value={ownerSearchQuery}
                  onChange={(e) => setOwnerSearchQuery(e.target.value)}
                  placeholder="Search by name, company or tax ID..."
                  className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                />
                <button
                  onClick={() => setOwnerSearchQuery("")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 md:ml-auto"
                >
                  Reset
                </button>
              </div>
              <hr className="border-t border-[#ebebeb] mb-4" />

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[#666] text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3">OWNER / ENTITY</th>
                      <th className="text-left px-4 py-3">PORTFOLIO</th>
                      <th className="text-left px-4 py-3">CONTACT</th>
                      <th className="text-left px-4 py-3">STATUS</th>
                      <th className="text-left px-4 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownersData
                      .filter(
                        (o) =>
                          o.name
                            .toLowerCase()
                            .includes(ownerSearchQuery.toLowerCase()) ||
                          o.company
                            .toLowerCase()
                            .includes(ownerSearchQuery.toLowerCase()) ||
                          o.taxId
                            .toLowerCase()
                            .includes(ownerSearchQuery.toLowerCase()),
                      )
                      .map((owner) => (
                        <tr
                          key={owner._id || owner.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa]"
                        >
                          <td className="px-4 py-3">
                            <div className="font-semibold">{owner.name}</div>
                            <div className="text-xs text-[#888]">
                              {owner.company || "Individual"}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {(owner.propertiesCount || 0) + " Properties"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs">✉ {owner.email}</div>
                            <div className="text-xs">📞 {owner.phone}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${owner.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}
                            >
                              {owner.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => handleOwnerEdit(owner)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleOwnerDelete(owner.id)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    {ownersData.filter(
                      (o) =>
                        o.name
                          .toLowerCase()
                          .includes(ownerSearchQuery.toLowerCase()) ||
                        o.company
                          .toLowerCase()
                          .includes(ownerSearchQuery.toLowerCase()) ||
                        o.taxId
                          .toLowerCase()
                          .includes(ownerSearchQuery.toLowerCase()),
                    ).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-sm text-gray-500 py-8"
                        >
                          No owners found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Showing{" "}
                {
                  ownersData.filter(
                    (o) =>
                      o.name
                        .toLowerCase()
                        .includes(ownerSearchQuery.toLowerCase()) ||
                      o.company
                        .toLowerCase()
                        .includes(ownerSearchQuery.toLowerCase()) ||
                      o.taxId
                        .toLowerCase()
                        .includes(ownerSearchQuery.toLowerCase()),
                  ).length
                }{" "}
                of {ownersData.length} owners
              </div>
            </div>

            {showOwnerForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="bg-white rounded-[20px] w-full max-w-xl shadow-[0_20px_45px_rgba(15,23,42,0.18)] border border-[#e2e8f0] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
                    <h3 className="text-2xl font-bold text-[#0f172a]">
                      Register New Owner
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowOwnerForm(false);
                        setEditingOwner(null);
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-full text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#334155] transition-colors"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleOwnerSubmit} className="p-6 space-y-4">
                    <div className="rounded-xl border border-[#dbeafe] bg-[#f8fafc] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-600">👤</span>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          Identity Details
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Full Name / Representative{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={ownerForm.name}
                          onChange={(e) =>
                            setOwnerForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                          placeholder="Full Name / Representative"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <div>
                          <label className="text-sm font-semibold text-[#334155]">
                            Email address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={ownerForm.email}
                            onChange={(e) =>
                              setOwnerForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            required
                            placeholder="Email address"
                            type="email"
                            className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#334155]">
                            Contact Number
                          </label>
                          <input
                            value={ownerForm.phone}
                            onChange={(e) =>
                              setOwnerForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            placeholder="Contact Number"
                            className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#ede9fe] bg-[#f9fafb] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-purple-600">🏢</span>
                        <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                          Business Information (Optional)
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-semibold text-[#334155]">
                            Company / Entity Name
                          </label>
                          <input
                            value={ownerForm.company}
                            onChange={(e) =>
                              setOwnerForm((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            placeholder="Real Estate Holdings Ltd."
                            className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-semibold text-[#334155]">
                              Tax / registration ID
                            </label>
                            <input
                              value={ownerForm.taxId}
                              onChange={(e) =>
                                setOwnerForm((prev) => ({
                                  ...prev,
                                  taxId: e.target.value,
                                }))
                              }
                              placeholder="Tax / registration ID"
                              className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-[#334155]">
                              Status
                            </label>
                            <select
                              value={ownerForm.status}
                              onChange={(e) =>
                                setOwnerForm((prev) => ({
                                  ...prev,
                                  status: e.target.value,
                                }))
                              }
                              className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none"
                            >
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowOwnerForm(false);
                          setEditingOwner(null);
                        }}
                        className="px-4 py-2 min-w-[95px] text-sm font-semibold border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 min-w-[135px] text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                      >
                        {editingOwner ? "Update" : "Register Owner"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STAFF ── */}
        {activeTab === "staff" && (
          <div>
            <div className="bg-slate-50 border border-[#ebebeb] rounded-2xl p-5 lg:p-7">
              <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-[#ebebeb] flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Staff Management
                  </h2>
                  <p className="text-sm text-[#999]">
                    Manage beauticians, employees and their access
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowStaffForm(true);
                    setEditingStaff(null);
                    setStaffForm({
                      name: "",
                      email: "",
                      phone: "",
                      role: "",
                      salary: "",
                      status: "Active",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  + Add Staff
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:justify-between">
                <input
                  type="text"
                  value={staffSearchQuery}
                  onChange={(e) => setStaffSearchQuery(e.target.value)}
                  placeholder="Search by name, email or phone..."
                  className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                />
                <button
                  onClick={() => setStaffSearchQuery("")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 md:ml-auto"
                >
                  Reset
                </button>
              </div>
              <hr className="border-t border-[#ebebeb] mb-4" />

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[#666] text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3">MEMBER</th>
                      <th className="text-left px-4 py-3">CONTACT</th>
                      <th className="text-left px-4 py-3">ROLE</th>
                      <th className="text-left px-4 py-3">SALARY</th>
                      <th className="text-left px-4 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData
                      .filter(
                        (s) =>
                          s.name
                            .toLowerCase()
                            .includes(staffSearchQuery.toLowerCase()) ||
                          s.email
                            .toLowerCase()
                            .includes(staffSearchQuery.toLowerCase()) ||
                          s.phone
                            .toLowerCase()
                            .includes(staffSearchQuery.toLowerCase()),
                      )
                      .map((member) => (
                        <tr
                          key={member._id || member.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa]"
                        >
                          <td className="px-4 py-3">
                            <div className="font-semibold">{member.name}</div>
                            <div className="text-xs text-[#888]">
                              {member.status}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs">✉ {member.email}</div>
                            <div className="text-xs">📞 {member.phone}</div>
                          </td>
                          <td className="px-4 py-3">
                            {member.role || "Staff"}
                          </td>
                          <td className="px-4 py-3">
                            £{Number(member.salary || 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => handleStaffEdit(member)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleStaffDelete(member._id || member.id)
                              }
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                    {staffData.filter(
                      (s) =>
                        s.name
                          .toLowerCase()
                          .includes(staffSearchQuery.toLowerCase()) ||
                        s.email
                          .toLowerCase()
                          .includes(staffSearchQuery.toLowerCase()) ||
                        s.phone
                          .toLowerCase()
                          .includes(staffSearchQuery.toLowerCase()),
                    ).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-sm text-gray-500 py-8"
                        >
                          No staff members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Showing{" "}
                {
                  staffData.filter(
                    (s) =>
                      s.name
                        .toLowerCase()
                        .includes(staffSearchQuery.toLowerCase()) ||
                      s.email
                        .toLowerCase()
                        .includes(staffSearchQuery.toLowerCase()) ||
                      s.phone
                        .toLowerCase()
                        .includes(staffSearchQuery.toLowerCase()),
                  ).length
                }{" "}
                of {staffData.length} staff members
              </div>
            </div>

            {showStaffForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="bg-white rounded-[20px] w-full max-w-md shadow-[0_20px_45px_rgba(15,23,42,0.18)] border border-[#e2e8f0] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
                    <h3 className="text-2xl font-bold text-[#0f172a]">
                      {editingStaff ? "Edit Staff Member" : "Add Staff Member"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowStaffForm(false);
                        setEditingStaff(null);
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-full text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#334155] transition-colors"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <form onSubmit={handleStaffSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={staffForm.name}
                        onChange={(e) =>
                          setStaffForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        placeholder="John Doe"
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Email
                        </label>
                        <input
                          value={staffForm.email}
                          onChange={(e) =>
                            setStaffForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="john.doe@example.com"
                          type="email"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Phone
                        </label>
                        <input
                          value={staffForm.phone}
                          onChange={(e) =>
                            setStaffForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="1234567890"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Designation
                        </label>
                        <input
                          value={staffForm.role}
                          onChange={(e) =>
                            setStaffForm((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                          placeholder="e.g. Senior Stylist"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Basic Salary
                        </label>
                        <input
                          value={staffForm.salary}
                          onChange={(e) =>
                            setStaffForm((prev) => ({
                              ...prev,
                              salary: e.target.value,
                            }))
                          }
                          type="number"
                          min="0"
                          placeholder="0"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Bio / Description
                      </label>
                      <textarea
                        value={staffForm.bio}
                        onChange={(e) =>
                          setStaffForm((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        placeholder="Brief bio about this team member"
                        rows="3"
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Avatar Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setStaffImageFile(file);
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setStaffImagePreview(event.target.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                        />
                        {(staffImagePreview || staffForm.image) && (
                          <div className="mt-2 flex items-center gap-2">
                            {staffImagePreview ? (
                              <img src={staffImagePreview} alt="Preview" className="w-12 h-12 rounded object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded bg-cyan-100 flex items-center justify-center text-2xl">
                                {staffForm.image && !staffForm.image.match(/\d/) ? staffForm.image : "👤"}
                              </div>
                            )}
                            <span className="text-xs text-slate-500">{staffImageFile?.name || "Current image"}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Expertise (comma separated)
                        </label>
                        <input
                          value={(staffForm.expertise || []).join(', ')}
                          onChange={(e) =>
                            setStaffForm((prev) => ({
                              ...prev,
                              expertise: e.target.value.split(',').map(e => e.trim()).filter(e => e),
                            }))
                          }
                          placeholder="e.g. Sales, Marketing, Tech"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowStaffForm(false);
                          setEditingStaff(null);
                        }}
                        className="px-4 py-2 border border-[#cbd5e1] rounded-lg hover:bg-[#f8fafc]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                      >
                        {editingStaff ? "Update" : "Add Staff"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CUSTOMERS ── */}
        {activeTab === "customers" && (
          <div>
            <div className="bg-slate-50 border border-[#ebebeb] rounded-2xl p-5 lg:p-7">
              <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-[#ebebeb] flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Customer Management
                  </h2>
                  <p className="text-sm text-[#999]">
                    Manage your customer database and history
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCustomerForm(true);
                    setEditingCustomer(null);
                    setCustomerForm({
                      name: "",
                      email: "",
                      phone: "",
                      status: "Active",
                      notes: "",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  + Add Customer
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:justify-between">
                <input
                  type="text"
                  value={customerSearchQuery}
                  onChange={(e) => setCustomerSearchQuery(e.target.value)}
                  placeholder="Search by name, email or phone..."
                  className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                />
                <button
                  onClick={() => setCustomerSearchQuery("")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 md:ml-auto"
                >
                  Reset
                </button>
              </div>
              <hr className="border-t border-[#ebebeb] mb-4" />

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[#666] text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3">CUSTOMER</th>
                      <th className="text-left px-4 py-3">CONTACT</th>
                      <th className="text-left px-4 py-3">STATUS</th>
                      <th className="text-left px-4 py-3">JOIN DATE</th>
                      <th className="text-left px-4 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersData
                      .filter(
                        (c) =>
                          c.name
                            .toLowerCase()
                            .includes(customerSearchQuery.toLowerCase()) ||
                          c.email
                            .toLowerCase()
                            .includes(customerSearchQuery.toLowerCase()) ||
                          c.phone
                            .toLowerCase()
                            .includes(customerSearchQuery.toLowerCase()),
                      )
                      .map((customer) => (
                        <tr
                          key={customer._id || customer.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa]"
                        >
                          <td className="px-4 py-3">
                            <div className="font-semibold">{customer.name}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs">✉ {customer.email}</div>
                            <div className="text-xs">📞 {customer.phone}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${customer.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}
                            >
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {new Date(
                              customer.joinedAt ||
                                customer.createdAt ||
                                Date.now(),
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => handleCustomerEdit(customer)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleCustomerDelete(
                                  customer._id || customer.id,
                                )
                              }
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                    {customersData.filter(
                      (c) =>
                        c.name
                          .toLowerCase()
                          .includes(customerSearchQuery.toLowerCase()) ||
                        c.email
                          .toLowerCase()
                          .includes(customerSearchQuery.toLowerCase()) ||
                        c.phone
                          .toLowerCase()
                          .includes(customerSearchQuery.toLowerCase()),
                    ).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-sm text-gray-500 py-8"
                        >
                          No customers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Showing{" "}
                {
                  customersData.filter(
                    (c) =>
                      c.name
                        .toLowerCase()
                        .includes(customerSearchQuery.toLowerCase()) ||
                      c.email
                        .toLowerCase()
                        .includes(customerSearchQuery.toLowerCase()) ||
                      c.phone
                        .toLowerCase()
                        .includes(customerSearchQuery.toLowerCase()),
                  ).length
                }{" "}
                of {customersData.length} customers
              </div>
            </div>

            {showCustomerForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="bg-white rounded-[20px] w-full max-w-md shadow-[0_20px_45px_rgba(15,23,42,0.18)] border border-[#e2e8f0] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
                    <h3 className="text-2xl font-bold text-[#0f172a]">
                      {editingCustomer ? "Edit Customer" : "Add New Customer"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomerForm(false);
                        setEditingCustomer(null);
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-full text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#334155] transition-colors"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <form
                    onSubmit={handleCustomerSubmit}
                    className="p-6 space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={customerForm.name}
                        onChange={(e) =>
                          setCustomerForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        placeholder="John Doe"
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Email
                        </label>
                        <input
                          value={customerForm.email}
                          onChange={(e) =>
                            setCustomerForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="customer@example.com"
                          type="email"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={customerForm.password}
                          onChange={(e) =>
                            setCustomerForm((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          placeholder="••••••••"
                          type="password"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          Phone
                        </label>
                        <input
                          value={customerForm.phone}
                          onChange={(e) =>
                            setCustomerForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="Enter phone number"
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#334155]">
                          System Role <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={customerForm.role}
                          onChange={(e) =>
                            setCustomerForm((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                          className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm bg-white"
                        >
                          <option value="Customer">Customer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Address
                      </label>
                      <input
                        value={customerForm.address}
                        onChange={(e) =>
                          setCustomerForm((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Enter address"
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Notes
                      </label>
                      <textarea
                        value={customerForm.notes}
                        onChange={(e) =>
                          setCustomerForm((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                        rows={2}
                        placeholder="Additional notes"
                      />
                    </div>

                    <div className="space-y-3">
                      <select
                        value={customerForm.status}
                        onChange={(e) =>
                          setCustomerForm((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCustomerForm(false);
                            setEditingCustomer(null);
                          }}
                          className="px-4 py-2 border border-[#cbd5e1] rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          {editingCustomer ? "Update" : "Create Customer"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ROLES & PERMISSIONS ── */}
        {activeTab === "roles" && (
          <div>
            <div className="bg-slate-50 border border-[#ebebeb] rounded-2xl p-5 lg:p-7">
              <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-[#ebebeb] flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#111] mb-1">
                    Roles & Permissions
                  </h2>
                  <p className="text-sm text-[#999]">
                    Manage user access levels and permissions
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowRoleForm(true);
                    setEditingRole(null);
                    setRoleForm({
                      title: "",
                      description: "",
                      permissions: "",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  + Create Role
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 md:justify-between">
                <input
                  type="text"
                  value={roleSearchQuery}
                  onChange={(e) => setRoleSearchQuery(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
                />
                <button
                  onClick={() => setRoleSearchQuery("")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 md:ml-auto"
                >
                  Reset
                </button>
              </div>
              <hr className="border-t border-[#ebebeb] mb-4" />

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[#666] text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3">ROLE</th>
                      <th className="text-left px-4 py-3">DESCRIPTION</th>
                      <th className="text-left px-4 py-3">PERMISSIONS</th>
                      <th className="text-left px-4 py-3">UPDATED</th>
                      <th className="text-left px-4 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolesData
                      .filter(
                        (role) =>
                          role.title
                            .toLowerCase()
                            .includes(roleSearchQuery.toLowerCase()) ||
                          role.description
                            .toLowerCase()
                            .includes(roleSearchQuery.toLowerCase()),
                      )
                      .map((role) => (
                        <tr
                          key={role._id || role.id}
                          className="border-b border-[#f0f0f0] hover:bg-[#fafafa]"
                        >
                          <td className="px-4 py-3 font-semibold">
                            {role.title}
                          </td>
                          <td className="px-4 py-3 text-[#555]">
                            {role.description}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                              {countRolePermissions(role.permissions)}{" "}
                              PERMISSIONS
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {role.updatedAt ||
                              (role.createdAt
                                ? new Date(role.createdAt).toLocaleDateString()
                                : "")}
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => handleRoleEdit(role)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleRoleDelete(role._id || role.id)
                              }
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                    {rolesData.filter(
                      (role) =>
                        role.title
                          .toLowerCase()
                          .includes(roleSearchQuery.toLowerCase()) ||
                        role.description
                          .toLowerCase()
                          .includes(roleSearchQuery.toLowerCase()),
                    ).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-sm text-gray-500 py-8"
                        >
                          No roles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Showing{" "}
                {
                  rolesData.filter(
                    (role) =>
                      role.title
                        .toLowerCase()
                        .includes(roleSearchQuery.toLowerCase()) ||
                      role.description
                        .toLowerCase()
                        .includes(roleSearchQuery.toLowerCase()),
                  ).length
                }{" "}
                of {rolesData.length} records
              </div>
            </div>

            {showRoleForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm overflow-hidden">
                <div className="bg-white rounded-[20px] w-full max-w-6xl shadow-[0_20px_45px_rgba(15,23,42,0.18)] border border-[#e2e8f0] overflow-hidden max-h-[90vh]">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0] bg-white">
                    <h3 className="text-2xl font-bold text-[#0f172a]">
                      {editingRole ? "Edit Role" : "Create Role"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRoleForm(false);
                        setEditingRole(null);
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-full text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#334155] transition-colors"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <form
                    onSubmit={handleRoleSubmit}
                    className="p-6 space-y-4 overflow-y-auto"
                    style={{
                      maxHeight: "calc(90vh - 72px)",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <style>{`form::-webkit-scrollbar { display: none; }`}</style>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Role name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={roleForm.title}
                        onChange={(e) =>
                          setRoleForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Customer"
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#334155]">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={roleForm.description}
                        onChange={(e) =>
                          setRoleForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Regular users looking for properties"
                        rows={3}
                        className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div className="bg-slate-50 border border-[#d5d5d5] rounded-xl p-4">
                      <h4 className="text-base font-semibold text-[#334155] mb-3">
                        Access Permissions
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div className="p-3 border border-[#cbd5e1] rounded-lg">
                          <div className="text-sm font-semibold text-[#334155] mb-2">
                            Dashboard
                          </div>
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={!!roleForm.permissions?.dashboard?.view}
                              onChange={(e) =>
                                setRoleForm((prev) => ({
                                  ...prev,
                                  permissions: {
                                    ...prev.permissions,
                                    dashboard: {
                                      ...prev.permissions.dashboard,
                                      view: e.target.checked,
                                    },
                                  },
                                }))
                              }
                            />{" "}
                            Can view Dashboard
                          </label>
                        </div>
                        <div className="p-3 border border-[#cbd5e1] rounded-lg">
                          <div className="text-sm font-semibold text-[#334155] mb-2">
                            System Settings
                          </div>
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={
                                !!roleForm.permissions?.systemSettings?.view
                              }
                              onChange={(e) =>
                                setRoleForm((prev) => ({
                                  ...prev,
                                  permissions: {
                                    ...prev.permissions,
                                    systemSettings: {
                                      ...prev.permissions.systemSettings,
                                      view: e.target.checked,
                                    },
                                  },
                                }))
                              }
                            />{" "}
                            View
                          </label>
                          <label className="inline-flex items-center gap-2 ml-4 text-sm">
                            <input
                              type="checkbox"
                              checked={
                                !!roleForm.permissions?.systemSettings?.edit
                              }
                              onChange={(e) =>
                                setRoleForm((prev) => ({
                                  ...prev,
                                  permissions: {
                                    ...prev.permissions,
                                    systemSettings: {
                                      ...prev.permissions.systemSettings,
                                      edit: e.target.checked,
                                    },
                                  },
                                }))
                              }
                            />{" "}
                            Edit
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div className="overflow-x-auto border border-[#cbd5e1] rounded-lg">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#f7fafc] border-b border-[#e7eaf1]">
                                <th className="px-3 py-2 text-left">Feature</th>
                                <th className="px-2 py-2 text-center">None</th>
                                <th className="px-2 py-2 text-center">Own</th>
                                <th className="px-2 py-2 text-center">All</th>
                                <th className="px-2 py-2 text-center">
                                  Create
                                </th>
                                <th className="px-2 py-2 text-center">Edit</th>
                                <th className="px-2 py-2 text-center">
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {ROLE_FEATURES.map((feature) => {
                                const conf = roleForm.permissions?.features?.[
                                  feature.key
                                ] || {
                                  scope: "none",
                                  create: false,
                                  edit: false,
                                  delete: false,
                                };
                                return (
                                  <tr
                                    key={feature.key}
                                    className="border-b border-[#ebebeb]"
                                  >
                                    <td className="px-3 py-1 text-sm font-medium">
                                      {feature.label}
                                    </td>
                                    {["none", "own", "all"].map((value) => (
                                      <td
                                        key={value}
                                        className="px-2 py-1 text-center"
                                      >
                                        <input
                                          type="radio"
                                          name={`scope-${feature.key}`}
                                          checked={conf.scope === value}
                                          onChange={() =>
                                            setRoleForm((prev) => ({
                                              ...prev,
                                              permissions: {
                                                ...prev.permissions,
                                                features: {
                                                  ...prev.permissions.features,
                                                  [feature.key]: {
                                                    ...conf,
                                                    scope: value,
                                                  },
                                                },
                                              },
                                            }))
                                          }
                                        />
                                      </td>
                                    ))}
                                    <td className="px-2 py-1 text-center">
                                      <input
                                        type="checkbox"
                                        checked={!!conf.create}
                                        onChange={(e) =>
                                          setRoleForm((prev) => ({
                                            ...prev,
                                            permissions: {
                                              ...prev.permissions,
                                              features: {
                                                ...prev.permissions.features,
                                                [feature.key]: {
                                                  ...conf,
                                                  create: e.target.checked,
                                                },
                                              },
                                            },
                                          }))
                                        }
                                      />
                                    </td>
                                    <td className="px-2 py-1 text-center">
                                      <input
                                        type="checkbox"
                                        checked={!!conf.edit}
                                        onChange={(e) =>
                                          setRoleForm((prev) => ({
                                            ...prev,
                                            permissions: {
                                              ...prev.permissions,
                                              features: {
                                                ...prev.permissions.features,
                                                [feature.key]: {
                                                  ...conf,
                                                  edit: e.target.checked,
                                                },
                                              },
                                            },
                                          }))
                                        }
                                      />
                                    </td>
                                    <td className="px-2 py-1 text-center">
                                      <input
                                        type="checkbox"
                                        checked={!!conf.delete}
                                        onChange={(e) =>
                                          setRoleForm((prev) => ({
                                            ...prev,
                                            permissions: {
                                              ...prev.permissions,
                                              features: {
                                                ...prev.permissions.features,
                                                [feature.key]: {
                                                  ...conf,
                                                  delete: e.target.checked,
                                                },
                                              },
                                            },
                                          }))
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex gap-3 text-xs text-gray-600">
                          <span>AI Powered Reports:</span>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={!!roleForm.permissions?.aiReports}
                              onChange={(e) =>
                                setRoleForm((prev) => ({
                                  ...prev,
                                  permissions: {
                                    ...prev.permissions,
                                    aiReports: e.target.checked,
                                  },
                                }))
                              }
                            />{" "}
                            ENABLED
                          </label>
                          <span className="ml-4">AI Property Assistant:</span>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={!!roleForm.permissions?.aiAssistant}
                              onChange={(e) =>
                                setRoleForm((prev) => ({
                                  ...prev,
                                  permissions: {
                                    ...prev.permissions,
                                    aiAssistant: e.target.checked,
                                  },
                                }))
                              }
                            />{" "}
                            ENABLED
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowRoleForm(false);
                          setEditingRole(null);
                        }}
                        className="px-4 py-2 border border-[#cbd5e1] rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        {editingRole ? "Update Role" : "Create Role"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── BLOG MANAGEMENT ── */}
        {activeTab === "blogs" && <BlogManager />}
      </main>

      {/* Record Property Payment Form Modal */}
      {showRecordPaymentForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-[#ebebeb]">
              <h3 className="text-2xl font-bold text-[#111]">
                💳 Record Property Payment
              </h3>
              <button
                onClick={() => setShowRecordPaymentForm(false)}
                className="text-[#999] hover:text-[#111] text-2xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreatePayment}
              className="p-6 max-h-[80vh] overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Source of Funds */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Source of Funds Section */}
                  <div>
                    <h4 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
                      <span>📌</span>Source of Funds
                    </h4>
                    <div className="bg-[#f9f9f9] border border-[#ebebeb] rounded-lg p-4 space-y-4">
                      {/* Link to Contract */}
                      <div>
                        <label className="text-xs font-semibold text-[#444] mb-2 block">
                          Link to Contract (Recommended)
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setPaymentFormDropdownOpen(
                                paymentFormDropdownOpen === "contract"
                                  ? null
                                  : "contract",
                              )
                            }
                            className="w-full bg-white border border-[#ddd] rounded-lg px-3 py-2.5 text-left text-sm text-[#111] hover:bg-[#fafafa] focus:outline-none focus:border-blue-500 flex items-center justify-between"
                          >
                            <span className="truncate">
                              {paymentForm.linkedContract
                                ? (contractsData.find(
                                    (c) => c.id === paymentForm.linkedContract,
                                  )?.clientName || "") +
                                  " - " +
                                  (contractsData.find(
                                    (c) => c.id === paymentForm.linkedContract,
                                  )?.property || "")
                                : "Select an active contract..."}
                            </span>
                            <span className="text-[#999] ml-2">▼</span>
                          </button>
                          {paymentFormDropdownOpen === "contract" && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ddd] rounded-lg shadow-xl z-50">
                              <div
                                className="max-h-48 overflow-y-auto"
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                              >
                                {contractsData.length > 0 ? (
                                  contractsData.map((contract) => (
                                    <button
                                      key={contract.id}
                                      type="button"
                                      onClick={() => {
                                        setPaymentForm((prev) => ({
                                          ...prev,
                                          linkedContract: contract.id,
                                          property: contract.property,
                                          unit: contract.unit,
                                          client: contract.clientName,
                                        }));
                                        setPaymentFormDropdownOpen(null);
                                      }}
                                      className="w-full text-left px-3 py-2.5 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0"
                                    >
                                      <div className="font-semibold text-[#111]">
                                        {contract.clientName}
                                      </div>
                                      <div className="text-xs text-[#666]">
                                        {contract.property} • {contract.unit}
                                      </div>
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-3 py-4 text-center text-sm text-[#999]">
                                    No active contracts found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Property, Unit, Client */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-[#444] mb-2 block">
                            Property <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setPaymentFormDropdownOpen(
                                  paymentFormDropdownOpen === "property"
                                    ? null
                                    : "property",
                                )
                              }
                              className="w-full bg-white border border-[#ddd] rounded-lg px-3 py-2.5 text-left text-sm text-[#111] hover:bg-[#fafafa] focus:outline-none focus:border-blue-500 flex items-center justify-between"
                            >
                              <span className="truncate">
                                {paymentForm.property || "Select property..."}
                              </span>
                              <span className="text-[#999] ml-2">▼</span>
                            </button>
                            {paymentFormDropdownOpen === "property" && (
                              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ddd] rounded-lg shadow-xl z-50">
                                <input
                                  type="text"
                                  placeholder="Search properties..."
                                  value={paymentFormSearch.property}
                                  onChange={(e) =>
                                    setPaymentFormSearch((prev) => ({
                                      ...prev,
                                      property: e.target.value,
                                    }))
                                  }
                                  className="w-full px-3 py-2 border-b border-[#ebebeb] focus:outline-none text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div
                                  className="max-h-36 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {properties
                                    .filter((p) =>
                                      p.title
                                        .toLowerCase()
                                        .includes(
                                          paymentFormSearch.property.toLowerCase(),
                                        ),
                                    )
                                    .map((p) => (
                                      <button
                                        key={p._id}
                                        type="button"
                                        onClick={() => {
                                          setPaymentForm((prev) => ({
                                            ...prev,
                                            property: p.title,
                                            propertyId: p._id,
                                            unit: "",
                                            unitId: "",
                                          }));
                                          setPaymentFormDropdownOpen(null);
                                          setPaymentFormSearch((prev) => ({
                                            ...prev,
                                            property: "",
                                          }));
                                        }}
                                        className={`w-full text-left px-3 py-2.5 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0 ${paymentForm.property === p.title ? "bg-blue-50 text-blue-700 font-semibold" : ""}`}
                                      >
                                        {p.title}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#444] mb-2 block">
                            Unit (Optional)
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setPaymentFormDropdownOpen(
                                  paymentFormDropdownOpen === "unit"
                                    ? null
                                    : "unit",
                                )
                              }
                              className="w-full bg-white border border-[#ddd] rounded-lg px-3 py-2.5 text-left text-sm text-[#111] hover:bg-[#fafafa] focus:outline-none focus:border-blue-500 flex items-center justify-between"
                            >
                              <span className="truncate">
                                {paymentForm.unit || "Select unit..."}
                              </span>
                              <span className="text-[#999] ml-2">▼</span>
                            </button>
                            {paymentFormDropdownOpen === "unit" && (
                              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ddd] rounded-lg shadow-xl z-50">
                                <input
                                  type="text"
                                  placeholder="Search units..."
                                  value={paymentFormSearch.unit}
                                  onChange={(e) =>
                                    setPaymentFormSearch((prev) => ({
                                      ...prev,
                                      unit: e.target.value,
                                    }))
                                  }
                                  className="w-full px-3 py-2 border-b border-[#ebebeb] focus:outline-none text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div
                                  className="max-h-36 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {unitsData.filter((u) => {
                                    const matchProperty =
                                      !paymentForm.property ||
                                      u.property === paymentForm.property ||
                                      u.parentProperty ===
                                        paymentForm.property ||
                                      u.propertyId === paymentForm.propertyId;
                                    return (
                                      matchProperty &&
                                      (u.unitNumber || "")
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          paymentFormSearch.unit.toLowerCase(),
                                        )
                                    );
                                  }).length > 0 ? (
                                    unitsData
                                      .filter((u) => {
                                        const matchProperty =
                                          !paymentForm.property ||
                                          u.property === paymentForm.property ||
                                          u.parentProperty ===
                                            paymentForm.property ||
                                          u.propertyId ===
                                            paymentForm.propertyId;
                                        return (
                                          matchProperty &&
                                          (u.unitNumber || "")
                                            .toString()
                                            .toLowerCase()
                                            .includes(
                                              paymentFormSearch.unit.toLowerCase(),
                                            )
                                        );
                                      })
                                      .map((u) => (
                                        <button
                                          key={u._id}
                                          type="button"
                                          onClick={() => {
                                            setPaymentForm((prev) => ({
                                              ...prev,
                                              unit: u.unitNumber,
                                              unitId: u._id,
                                            }));
                                            setPaymentFormDropdownOpen(null);
                                            setPaymentFormSearch((prev) => ({
                                              ...prev,
                                              unit: "",
                                            }));
                                          }}
                                          className={`w-full text-left px-3 py-2.5 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0 ${paymentForm.unit === u.unitNumber ? "bg-blue-50 text-blue-700 font-semibold" : ""}`}
                                        >
                                          <div className="font-semibold">
                                            {u.unitNumber}
                                          </div>
                                          <div className="text-xs text-[#666]">
                                            {u.property}
                                          </div>
                                        </button>
                                      ))
                                  ) : (
                                    <div className="px-3 py-4 text-center text-sm text-[#999]">
                                      No units available{" "}
                                      {paymentForm.property
                                        ? "for this property"
                                        : ""}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#444] mb-2 block">
                            Client <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setPaymentFormDropdownOpen(
                                  paymentFormDropdownOpen === "client"
                                    ? null
                                    : "client",
                                )
                              }
                              className="w-full bg-white border border-[#ddd] rounded-lg px-3 py-2.5 text-left text-sm text-[#111] hover:bg-[#fafafa] focus:outline-none focus:border-blue-500 flex items-center justify-between"
                            >
                              <span className="truncate">
                                {paymentForm.client || "Select client..."}
                              </span>
                              <span className="text-[#999] ml-2">▼</span>
                            </button>
                            {paymentFormDropdownOpen === "client" && (
                              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ddd] rounded-lg shadow-xl z-50">
                                <input
                                  type="text"
                                  placeholder="Search clients..."
                                  value={paymentFormSearch.client}
                                  onChange={(e) =>
                                    setPaymentFormSearch((prev) => ({
                                      ...prev,
                                      client: e.target.value,
                                    }))
                                  }
                                  className="w-full px-3 py-2 border-b border-[#ebebeb] focus:outline-none text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div
                                  className="max-h-36 overflow-y-auto"
                                  style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                  }}
                                >
                                  {users
                                    .filter((u) =>
                                      (u.name || u.email)
                                        .toLowerCase()
                                        .includes(
                                          paymentFormSearch.client.toLowerCase(),
                                        ),
                                    )
                                    .map((u) => (
                                      <button
                                        key={u._id}
                                        type="button"
                                        onClick={() => {
                                          setPaymentForm((prev) => ({
                                            ...prev,
                                            client: u.name || u.email,
                                            clientId: u._id,
                                          }));
                                          setPaymentFormDropdownOpen(null);
                                          setPaymentFormSearch((prev) => ({
                                            ...prev,
                                            client: "",
                                          }));
                                        }}
                                        className={`w-full text-left px-3 py-2.5 hover:bg-[#f5f5f5] text-sm border-b border-[#f0f0f0] last:border-b-0 ${paymentForm.clientId === u._id ? "bg-blue-50 text-blue-700 font-semibold" : ""}`}
                                      >
                                        <div className="font-semibold">
                                          {u.name || u.email}
                                        </div>
                                        <div className="text-xs text-[#666]">
                                          {u.email}
                                        </div>
                                      </button>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Type & Method */}
                  <div>
                    <h4 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
                      <span>💰</span>Payment Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#444] mb-2 block">
                          Payment Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={paymentForm.paymentType}
                          onChange={(e) =>
                            setPaymentForm((prev) => ({
                              ...prev,
                              paymentType: e.target.value,
                            }))
                          }
                          className={inputCls}
                        >
                          <option value="RENT">Monthly Rent</option>
                          <option value="DEPOSIT">Security Deposit</option>
                          <option value="MAINTENANCE">
                            Maintenance Charges
                          </option>
                          <option value="OTHER">Other Charges</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#444] mb-2 block">
                          Payment Method <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={paymentForm.paymentMethod}
                          onChange={(e) =>
                            setPaymentForm((prev) => ({
                              ...prev,
                              paymentMethod: e.target.value,
                            }))
                          }
                          className={inputCls}
                        >
                          <option value="CASH">Cash</option>
                          <option value="CHEQUE">Cheque</option>
                          <option value="BANK_TRANSFER">Bank Transfer</option>
                          <option value="ONLINE">Online Payment</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Billing Cycle */}
                  <div>
                    <h4 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
                      <span>📅</span>Billing Cycle (Optional)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#444] mb-2 block">
                          Billing Month
                        </label>
                        <select
                          value={paymentForm.billingMonth}
                          onChange={(e) =>
                            setPaymentForm((prev) => ({
                              ...prev,
                              billingMonth: e.target.value,
                            }))
                          }
                          className={inputCls}
                        >
                          <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#444] mb-2 block">
                          Billing Year
                        </label>
                        <input
                          type="number"
                          min="2020"
                          max="2100"
                          value={paymentForm.billingYear}
                          onChange={(e) =>
                            setPaymentForm((prev) => ({
                              ...prev,
                              billingYear: e.target.value,
                            }))
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Internal Notes */}
                  <div>
                    <label className="text-xs font-semibold text-[#444] mb-2 block">
                      Internal Notes
                    </label>
                    <textarea
                      value={paymentForm.internalNotes}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          internalNotes: e.target.value,
                        }))
                      }
                      placeholder="Add payment verification codes or agent notes..."
                      className={inputCls + " min-h-24 resize-none"}
                    />
                  </div>
                </div>

                {/* Right Side - Collection Summary */}
                <div>
                  <h4 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
                    <span>💵</span>Collection Summary
                  </h4>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5 space-y-4 sticky top-6">
                    <div>
                      <p className="text-xs font-semibold text-[#666] uppercase mb-1">
                        Base Amount <span className="text-red-500">*</span>
                      </p>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={paymentForm.baseAmount}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            baseAmount: e.target.value,
                          }))
                        }
                        placeholder="0.00"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#666] uppercase mb-1">
                        Received Amount <span className="text-red-500">*</span>
                      </p>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={paymentForm.receivedAmount}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            receivedAmount: e.target.value,
                          }))
                        }
                        placeholder="0.00"
                        className={inputCls}
                      />
                    </div>

                    <div className="border-t-2 border-blue-200 pt-3">
                      <p className="text-xs font-semibold text-[#666] uppercase mb-2">
                        TOTAL TO COLLECT
                      </p>
                      <p className="text-4xl font-bold text-blue-600">
                        £
                        {Math.max(
                          0,
                          (parseFloat(paymentForm.baseAmount) || 0) -
                            (parseFloat(paymentForm.receivedAmount) || 0),
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <p className="text-xs text-[#666] mb-2 leading-relaxed">
                        <strong>ℹ️ Invoice Policy</strong>
                        <br />
                        Submitting this form will generate a unique digital
                        invoice and notify the property owner.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-[#ebebeb] mt-6 pt-6 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowRecordPaymentForm(false)}
                  className="px-6 py-2.5 bg-[#f0f0f0] text-[#111] font-semibold rounded-lg hover:bg-[#e0e0e0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  💳 Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contract Details Modal */}
      {selectedContractDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 px-6 py-5 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-blue-900">
                📋 Contract Details
              </h3>
              <button
                onClick={() => setSelectedContractDetail(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Key Details Grid */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Contract Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Property</p>
                    <p className="text-lg font-bold text-gray-900">{selectedContractDetail.property}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Unit</p>
                    <p className="text-lg font-bold text-gray-900">{selectedContractDetail.unit || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Amount</p>
                    <p className="text-lg font-bold text-emerald-600">£{selectedContractDetail.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-2 rounded-full text-xs font-bold ${
                        selectedContractDetail.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : selectedContractDetail.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {selectedContractDetail.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Change Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Update Status</h4>
                <select
                  value={selectedContractDetail.status}
                  onChange={async (e) => {
                    const status = e.target.value;
                    try {
                      const res = await fetch(
                        `${API_URL}/api/contracts/${selectedContractDetail.id}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ status }),
                        }
                      );
                      if (res.ok) {
                        const data = await res.json();
                        setSelectedContractDetail({ ...selectedContractDetail, status });
                        setMessage(`Contract status updated to ${status}`);
                        getContracts();
                      }
                    } catch (error) {
                      setMessage("Error updating status: " + error.message);
                    }
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-900 bg-white hover:border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              {/* Documents Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                  📄 Documents ({selectedContractDetail.documents?.length || 0})
                </h4>
                {selectedContractDetail.documents &&
                selectedContractDetail.documents.length > 0 ? (
                  <div className="space-y-2">
                    {selectedContractDetail.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-xl">📎</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {doc.filename}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.size ? `${(doc.size / 1024).toFixed(2)} KB` : 'Unknown size'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  `${API_URL}/api/contracts/${selectedContractDetail.id}/document/${idx}`,
                                  { method: "DELETE" }
                                );
                                if (res.ok) {
                                  setMessage("Document deleted successfully");
                                  getContracts();
                                  setSelectedContractDetail(null);
                                }
                              } catch (error) {
                                setMessage("Error deleting document: " + error.message);
                              }
                            }}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No documents attached to this contract
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-6 flex gap-3">
                <a
                  href={`${API_URL}/api/contracts/${selectedContractDetail.id}/pdf`}
                  download={`Contract-${selectedContractDetail.id}.pdf`}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  📥 Download Document
                </a>
                <button
                  onClick={() => setSelectedContractDetail(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPaymentDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#111]">
                💳 Payment Details
              </h3>
              <button
                onClick={() => setSelectedPaymentDetail(null)}
                className="text-[#999] hover:text-[#111] text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Invoice Number
                    </p>
                    <p className="text-lg font-bold text-[#111] font-mono">
                      {selectedPaymentDetail.invoiceNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Date
                    </p>
                    <p className="text-lg font-bold text-[#111]">
                      {selectedPaymentDetail.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  👤 Client Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Name
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedPaymentDetail.clientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Email
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedPaymentDetail.clientEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property & Unit */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  🏠 Property Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Property
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedPaymentDetail.property}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Unit
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedPaymentDetail.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  💰 Payment Information
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Payment Type
                    </p>
                    <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-600">
                      {selectedPaymentDetail.paymentType}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                        selectedPaymentDetail.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : selectedPaymentDetail.status === "PARTIAL"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedPaymentDetail.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4">
                <h4 className="text-lg font-bold text-[#111] mb-4">
                  📊 Financial Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <p className="text-[#666] font-semibold">Total Amount</p>
                    <p className="text-lg font-bold text-[#111]">
                      £{selectedPaymentDetail.amount?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <p className="text-[#666] font-semibold">Received Amount</p>
                    <p className="text-lg font-bold text-green-600">
                      £{selectedPaymentDetail.received?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 bg-white rounded-lg p-2">
                    <p className="text-[#111] font-bold">Due Amount</p>
                    <p
                      className={`text-lg font-bold ${selectedPaymentDetail.due === 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      £{selectedPaymentDetail.due?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedPaymentDetail(null)}
              className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Due Collection Detail Modal */}
      {selectedDueDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#111]">
                📋 Due Collection Details
              </h3>
              <button
                onClick={() => setSelectedDueDetail(null)}
                className="text-[#999] hover:text-[#111] text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Invoice Number
                    </p>
                    <p className="text-lg font-bold text-[#111] font-mono">
                      {selectedDueDetail.invoiceNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Date
                    </p>
                    <p className="text-lg font-bold text-[#111]">
                      {selectedDueDetail.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  👤 Client Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Name
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedDueDetail.clientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Email
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedDueDetail.clientEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property & Unit */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  🏠 Property Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Property
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedDueDetail.property}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Unit
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedDueDetail.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  💰 Payment Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Payment Type
                    </p>
                    <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-600">
                      {selectedDueDetail.paymentType}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase mb-1">
                      Status
                    </p>
                    <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide bg-red-100 text-red-700">
                      PENDING
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Summary - Due Focused */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
                <h4 className="text-lg font-bold text-[#111] mb-4">
                  📊 Outstanding Amount
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-red-200">
                    <p className="text-[#666] font-semibold">Total Amount</p>
                    <p className="text-lg font-bold text-[#111]">
                      £{selectedDueDetail.amount?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-red-200">
                    <p className="text-[#666] font-semibold">
                      Already Received
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      £{selectedDueDetail.received?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 bg-white rounded-lg p-3 border-2 border-red-300">
                    <p className="text-[#111] font-bold text-lg">AMOUNT DUE</p>
                    <p className="text-2xl font-bold text-red-600">
                      £{selectedDueDetail.due?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedDueDetail(null)}
                className="flex-1 px-4 py-2 bg-[#f0f0f0] text-[#111] font-semibold rounded-lg hover:bg-[#e0e0e0] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowRecordPaymentForm(true);
                  setSelectedDueDetail(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                ✓ Collect Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiryDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#111]">
                📋 Inquiry Details
              </h3>
              <button
                onClick={() => setSelectedInquiryDetail(null)}
                className="text-[#999] hover:text-[#111] text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Client Information */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  👤 Client Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Name
                    </p>
                    <p className="text-[#111] font-semibold">
                      {selectedInquiryDetail.clientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Email
                    </p>
                    <p className="text-[#111]">{selectedInquiryDetail.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Phone
                    </p>
                    <p className="text-[#111]">{selectedInquiryDetail.phone}</p>
                  </div>
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="border-b pb-4">
                <h4 className="text-lg font-bold text-[#111] mb-3">
                  📝 Inquiry Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Subject
                    </p>
                    <p className="text-[#111]">
                      {selectedInquiryDetail.subject || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Property
                    </p>
                    <p className="text-[#111]">
                      {selectedInquiryDetail.property}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Amount
                    </p>
                    <p className="text-[#111]">
                      {selectedInquiryDetail.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666] font-semibold uppercase">
                      Message
                    </p>
                    <p className="text-[#111] bg-[#f5f5f5] p-3 rounded">
                      {selectedInquiryDetail.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#666] font-semibold uppercase mb-2">
                    Status
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                    {selectedInquiryDetail.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#666] font-semibold uppercase mb-2">
                    Received
                  </p>
                  <p className="text-[#111]">
                    {selectedInquiryDetail.receivedDate}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedInquiryDetail(null)}
              className="w-full mt-6 px-4 py-2 bg-[#f0f0f0] text-[#111] font-semibold rounded-lg hover:bg-[#e0e0e0] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-lg flex flex-col">
            <div className="p-6 border-b border-[#ebebeb] flex justify-between items-center">
              <h3 className="text-2xl font-bold text-[#111]">
                📝 Create New Inquiry
              </h3>
              <button
                onClick={() => setShowInquiryForm(false)}
                className="text-[#999] hover:text-[#111] text-2xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateInquiry}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <div
                className="p-6 overflow-y-auto flex-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Contact Information */}
                <div>
                  <label className={labelCls}>Client Name *</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={inquiryForm.clientName}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        clientName: e.target.value,
                      })
                    }
                    className={inputCls}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={inquiryForm.email}
                      onChange={(e) =>
                        setInquiryForm({
                          ...inquiryForm,
                          email: e.target.value,
                        })
                      }
                      className={inputCls}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={inquiryForm.phone}
                      onChange={(e) =>
                        setInquiryForm({
                          ...inquiryForm,
                          phone: e.target.value,
                        })
                      }
                      className={inputCls}
                      required
                    />
                  </div>
                </div>

                {/* Inquiry Details */}
                <div>
                  <label className={labelCls}>Subject</label>
                  <input
                    type="text"
                    placeholder="Inquiry subject (optional)"
                    value={inquiryForm.subject}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        subject: e.target.value,
                      })
                    }
                    className={inputCls}
                  />
                </div>

                {/* Property Selection */}
                <div>
                  <label className={labelCls}>Property (Optional)</label>
                  <div className="relative">
                    <div
                      onClick={() =>
                        setInquiryPropertyDropdownOpen(
                          !inquiryPropertyDropdownOpen,
                        )
                      }
                      className={
                        inputCls +
                        " cursor-pointer flex justify-between items-center"
                      }
                    >
                      <span>
                        {inquiryForm.propertyTitle || "Select a property..."}
                      </span>
                      <span>{inquiryPropertyDropdownOpen ? "▲" : "▼"}</span>
                    </div>
                    {inquiryPropertyDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e8e8e8] rounded-[10px] shadow-lg z-50">
                        <input
                          type="text"
                          placeholder="Search properties..."
                          value={inquiryPropertySearch}
                          onChange={(e) =>
                            setInquiryPropertySearch(e.target.value)
                          }
                          className={inputCls + " m-2 w-[calc(100%-16px)]"}
                        />
                        <div
                          className="max-h-48 overflow-y-auto"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {properties
                            .filter((p) =>
                              p.title
                                .toLowerCase()
                                .includes(inquiryPropertySearch.toLowerCase()),
                            )
                            .map((p) => (
                              <div
                                key={p._id}
                                onClick={() => {
                                  setInquiryForm({
                                    ...inquiryForm,
                                    propertyId: p._id,
                                    propertyTitle: p.title,
                                    amount: p.price,
                                  });
                                  setInquiryPropertyDropdownOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-[#111]"
                              >
                                {p.title} - £{p.price}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls}>Message / Requirements *</label>
                  <textarea
                    placeholder="Client's message or requirements..."
                    value={inquiryForm.message}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        message: e.target.value,
                      })
                    }
                    rows="4"
                    className={inputCls}
                    required
                  />
                </div>

                {/* Buttons */}
              </div>

              {/* Fixed Bottom Buttons */}
              <div className="p-6 border-t border-[#ebebeb] bg-white flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Create Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  className="flex-1 px-4 py-2 bg-[#f0f0f0] text-[#111] font-semibold rounded-lg hover:bg-[#e0e0e0] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;
