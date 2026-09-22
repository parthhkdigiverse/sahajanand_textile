import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Truck,
  Factory,
  Building2,
  Package,
  Boxes,
  Layers,
  Palette,
  Wrench,
  ClipboardList,
  Scissors,
  BadgeCheck,
  Archive,
  FileText,
  Send,
  MapPin,
  Receipt,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
  Warehouse,
  ArrowLeftRight,
  LineChart,
  ListTodo,
  UserCog,
  BarChart3,
  PieChart,
  Settings,
  BookUser,
  ScrollText,
} from "lucide-react";

export type NavItem = { title: string; to: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", to: "/", icon: LayoutDashboard },
      { title: "CRM", to: "/crm", icon: BookUser },
    ],
  },
  {
    label: "Parties",
    items: [
      { title: "Customers", to: "/customers", icon: Users },
      { title: "Suppliers", to: "/suppliers", icon: Truck },
      { title: "Manufacturers", to: "/manufacturers", icon: Factory },
      { title: "Mills", to: "/mills", icon: Building2 },
    ],
  },
  {
    label: "Catalog & Stock",
    items: [
      { title: "Products", to: "/products", icon: Package },
      { title: "Raw Material", to: "/raw-material", icon: Boxes },
      { title: "Less Inventory", to: "/less-inventory", icon: Layers },
      { title: "Patta Inventory", to: "/patta-inventory", icon: Layers },
      { title: "Color Inventory", to: "/color-inventory", icon: Palette },
      { title: "Warehouse", to: "/warehouse", icon: Warehouse },
      { title: "Stock Transfer", to: "/stock-transfer", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Production",
    items: [
      { title: "Production Orders", to: "/production-orders", icon: ClipboardList },
      { title: "Quality Check", to: "/quality-check", icon: BadgeCheck },
      { title: "Packing", to: "/packing", icon: Archive },
    ],
  },
  {
    label: "Logistics",
    items: [
      { title: "Delivery Challan", to: "/delivery-challan", icon: FileText },
      { title: "Transport", to: "/transport", icon: Truck },
      { title: "E-Way Bill", to: "/e-way-bill", icon: MapPin },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "GST Billing", to: "/gst-billing", icon: Receipt },
      { title: "Invoices", to: "/invoices", icon: ScrollText },
      { title: "Payments", to: "/payments", icon: IndianRupee },
      { title: "Sales", to: "/sales", icon: TrendingUp },
      { title: "Purchase", to: "/purchase", icon: ShoppingCart },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Task Management", to: "/task-management", icon: ListTodo },
      { title: "Employees", to: "/employees", icon: UserCog },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "Reports", to: "/reports", icon: BarChart3 },
      { title: "Analytics", to: "/analytics", icon: PieChart },
      { title: "Settings", to: "/settings", icon: Settings },
    ],
  },
];