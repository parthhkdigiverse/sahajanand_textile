// Realistic dummy data for the Textile Less-Patta ERP.
// Kept as static exports so any component can import directly.

export const COMPANY = {
  name: "Vastra Textiles Pvt. Ltd.",
  short: "Vastra ERP",
  gstin: "24AABCV1234N1Z5",
  address: "42, Ring Road Silk Market, Surat, Gujarat 395002",
  phone: "+91 98250 12345",
  email: "hello@vastratextiles.in",
  fy: "FY 2025-26",
};

export const USER = {
  name: "Rajesh Agarwal",
  role: "Managing Director",
  initials: "RA",
  email: "rajesh@vastratextiles.in",
};

export type Status =
  | "active"
  | "pending"
  | "processing"
  | "completed"
  | "delayed"
  | "cancelled"
  | "approved"
  | "draft"
  | "paid"
  | "partial"
  | "overdue";

export const KPIS = {
  revenueMTD: 8_74_65_000,
  revenueYTD: 62_45_00_000,
  pendingOrders: 47,
  runningMillJobs: 18,
  todaysDispatch: 26,
  lowStockItems: 12,
  outstandingReceivable: 1_45_60_000,
  outstandingPayable: 82_30_000,
};

export const REVENUE_TREND = [
  { month: "Apr", sales: 42500000, purchase: 31200000 },
  { month: "May", sales: 51800000, purchase: 36800000 },
  { month: "Jun", sales: 48200000, purchase: 34500000 },
  { month: "Jul", sales: 61200000, purchase: 42100000 },
  { month: "Aug", sales: 58900000, purchase: 40200000 },
  { month: "Sep", sales: 67800000, purchase: 45800000 },
  { month: "Oct", sales: 74200000, purchase: 51200000 },
  { month: "Nov", sales: 82500000, purchase: 55600000 },
  { month: "Dec", sales: 91200000, purchase: 62300000 },
  { month: "Jan", sales: 78400000, purchase: 54100000 },
  { month: "Feb", sales: 84600000, purchase: 58900000 },
  { month: "Mar", sales: 87465000, purchase: 61200000 },
];

export const CUSTOMERS = [
  { id: "CUST-1042", name: "Krishna Silk House", city: "Surat", gstin: "24AAGCK4521B1Z9", contact: "Nilesh Bhai", phone: "+91 98240 11223", credit: 1500000, outstanding: 425000, terms: "45 Days", status: "active" as Status, category: "Wholesaler" },
  { id: "CUST-1043", name: "Radhe Fashion Fabrics", city: "Mumbai", gstin: "27AAGCR8891K1Z3", contact: "Meera Shah", phone: "+91 98200 33445", credit: 2500000, outstanding: 1180000, terms: "30 Days", status: "active" as Status, category: "Distributor" },
  { id: "CUST-1044", name: "Shanti Textiles", city: "Ahmedabad", gstin: "24AABCS9987L1Z2", contact: "Piyush Patel", phone: "+91 98250 88112", credit: 800000, outstanding: 65000, terms: "COD", status: "active" as Status, category: "Retailer" },
  { id: "CUST-1045", name: "Vardhman Sarees", city: "Jaipur", gstin: "08AACCV5510R1Z8", contact: "Rakesh Jain", phone: "+91 94140 22110", credit: 1200000, outstanding: 890000, terms: "60 Days", status: "pending" as Status, category: "Wholesaler" },
  { id: "CUST-1046", name: "Aashiyana Enterprises", city: "Delhi", gstin: "07AAECA6621Q1Z4", contact: "Sameer Khan", phone: "+91 98110 55223", credit: 3000000, outstanding: 2140000, terms: "45 Days", status: "delayed" as Status, category: "Distributor" },
  { id: "CUST-1047", name: "Laxmi Fabric Mart", city: "Kolkata", gstin: "19AAKCL2210H1Z6", contact: "Debashish Roy", phone: "+91 98300 44112", credit: 900000, outstanding: 240000, terms: "30 Days", status: "active" as Status, category: "Retailer" },
  { id: "CUST-1048", name: "Sanskruti Weaves", city: "Bengaluru", gstin: "29AAJCS7712M1Z1", contact: "Latha Reddy", phone: "+91 98450 66332", credit: 1800000, outstanding: 1020000, terms: "45 Days", status: "active" as Status, category: "Wholesaler" },
  { id: "CUST-1049", name: "Golden Border House", city: "Hyderabad", gstin: "36AAKCG3320D1Z7", contact: "Vijay Rao", phone: "+91 98490 22114", credit: 2200000, outstanding: 0, terms: "COD", status: "active" as Status, category: "Wholesaler" },
  { id: "CUST-1050", name: "Nakoda Sarees", city: "Surat", gstin: "24AAFCN6612E1Z0", contact: "Mahendra Bhai", phone: "+91 98240 77889", credit: 500000, outstanding: 145000, terms: "15 Days", status: "active" as Status, category: "Retailer" },
  { id: "CUST-1051", name: "Trimurti Textiles", city: "Indore", gstin: "23AAECT4489G1Z2", contact: "Sunil Agrawal", phone: "+91 98260 33221", credit: 1600000, outstanding: 780000, terms: "30 Days", status: "delayed" as Status, category: "Distributor" },
];

export const SUPPLIERS = [
  { id: "SUP-201", name: "Ganesh Yarn Traders", city: "Surat", gstin: "24AAGGY1122A1Z6", material: "Polyester Yarn", outstanding: 320000, phone: "+91 98240 11221", status: "active" as Status },
  { id: "SUP-202", name: "Shree Ram Zari", city: "Varanasi", gstin: "09AAKSR5567B1Z8", material: "Gold Zari, Lace", outstanding: 145000, phone: "+91 94152 33456", status: "active" as Status },
  { id: "SUP-203", name: "Kalpataru Dyes & Chem", city: "Ankleshwar", gstin: "24AABCK7789F1Z4", material: "Reactive Dyes", outstanding: 285000, phone: "+91 98252 66774", status: "active" as Status },
  { id: "SUP-204", name: "Modi Silk Suppliers", city: "Bengaluru", gstin: "29AAKCM8890H1Z3", material: "Raw Silk", outstanding: 0, phone: "+91 98455 22119", status: "active" as Status },
  { id: "SUP-205", name: "Anmol Border Works", city: "Delhi", gstin: "07AABCA3345J1Z9", material: "Fancy Borders", outstanding: 92000, phone: "+91 98115 77332", status: "pending" as Status },
  { id: "SUP-206", name: "New Style Lace House", city: "Ludhiana", gstin: "03AAECN9987L1Z1", material: "Nylon Lace", outstanding: 168000, phone: "+91 98150 22114", status: "active" as Status },
];

export const MANUFACTURERS = [
  { id: "MFR-301", name: "Ambica Weaving Works", city: "Surat", ratePerMeter: 42, running: 6, pending: 3, completed: 142, rating: 4.8, delivery: 96, outstanding: 145000, status: "active" as Status },
  { id: "MFR-302", name: "Shivam Powerlooms", city: "Bhiwandi", ratePerMeter: 38, running: 9, pending: 5, completed: 208, rating: 4.6, delivery: 92, outstanding: 320000, status: "active" as Status },
  { id: "MFR-303", name: "Jai Bhavani Textiles", city: "Ichalkaranji", ratePerMeter: 45, running: 4, pending: 2, completed: 96, rating: 4.9, delivery: 98, outstanding: 82000, status: "active" as Status },
  { id: "MFR-304", name: "Om Sai Weavers", city: "Erode", ratePerMeter: 40, running: 7, pending: 4, completed: 175, rating: 4.5, delivery: 90, outstanding: 265000, status: "active" as Status },
  { id: "MFR-305", name: "Rangoli Fabrics", city: "Surat", ratePerMeter: 44, running: 5, pending: 6, completed: 128, rating: 4.7, delivery: 94, outstanding: 190000, status: "pending" as Status },
];

export const MILLS = [
  { id: "MILL-401", name: "Suryodaya Processing Mills", process: "Dyeing & Printing", fabricSent: 12500, fabricReceived: 8200, pending: 4300, eta: "2026-07-08", charges: 285000, status: "processing" as Status, shade: "Rani Pink #C6155B", lot: "LOT-2607" },
  { id: "MILL-402", name: "Ganpati Colour Works", process: "Reactive Dyeing", fabricSent: 8600, fabricReceived: 8600, pending: 0, eta: "2026-07-04", charges: 172000, status: "completed" as Status, shade: "Firozi #16A8B3", lot: "LOT-2608" },
  { id: "MILL-403", name: "Sardar Textile Mills", process: "Digital Printing", fabricSent: 5400, fabricReceived: 1800, pending: 3600, eta: "2026-07-11", charges: 216000, status: "processing" as Status, shade: "Kesar Orange #E9762D", lot: "LOT-2609" },
  { id: "MILL-404", name: "Vraj Finishing Unit", process: "Calendering & Finishing", fabricSent: 15200, fabricReceived: 14800, pending: 400, eta: "2026-07-06", charges: 168000, status: "processing" as Status, shade: "Mehendi Green #4C7A2F", lot: "LOT-2610" },
  { id: "MILL-405", name: "Om Shakti Print House", process: "Screen Printing", fabricSent: 3200, fabricReceived: 0, pending: 3200, eta: "2026-07-14", charges: 96000, status: "pending" as Status, shade: "Ivory White #F2ECDD", lot: "LOT-2611" },
];

export const PRODUCTS = [
  { id: "PRD-Less-001", code: "LES-BNR-42", name: "Zari Border Less 3\"", category: "Less", width: "3 inch", material: "Polyester + Zari", color: "Gold / Maroon", hsn: "5808", gst: 5, stock: 4820, min: 800, unit: "Meter", rate: 42, mfr: "Ambica Weaving Works" },
  { id: "PRD-Less-002", code: "LES-EMB-58", name: "Embroidered Less 2.5\"", category: "Less", width: "2.5 inch", material: "Viscose", color: "Multi", hsn: "5810", gst: 12, stock: 1120, min: 500, unit: "Meter", rate: 58, mfr: "Shivam Powerlooms" },
  { id: "PRD-Patta-101", code: "PAT-SLK-95", name: "Banarasi Silk Patta 6\"", category: "Patta", width: "6 inch", material: "Pure Silk", color: "Rani Pink", hsn: "5407", gst: 5, stock: 2260, min: 400, unit: "Meter", rate: 95, mfr: "Jai Bhavani Textiles" },
  { id: "PRD-Patta-102", code: "PAT-JAC-120", name: "Jacquard Patta 8\"", category: "Patta", width: "8 inch", material: "Polyester Jacquard", color: "Firozi", hsn: "5407", gst: 12, stock: 1740, min: 600, unit: "Meter", rate: 120, mfr: "Om Sai Weavers" },
  { id: "PRD-Brdr-201", code: "BRD-LCE-35", name: "Fancy Lace Border 1.5\"", category: "Border", width: "1.5 inch", material: "Nylon", color: "Silver", hsn: "5810", gst: 12, stock: 320, min: 500, unit: "Meter", rate: 35, mfr: "Rangoli Fabrics" },
  { id: "PRD-Less-003", code: "LES-CUT-48", name: "Cutwork Less 4\"", category: "Less", width: "4 inch", material: "Cotton Blend", color: "Ivory", hsn: "5808", gst: 5, stock: 890, min: 400, unit: "Meter", rate: 48, mfr: "Ambica Weaving Works" },
  { id: "PRD-Patta-103", code: "PAT-EMB-140", name: "Embroidered Patta 10\"", category: "Patta", width: "10 inch", material: "Georgette + Zari", color: "Kesar Orange", hsn: "5810", gst: 12, stock: 640, min: 300, unit: "Meter", rate: 140, mfr: "Jai Bhavani Textiles" },
  { id: "PRD-Brdr-202", code: "BRD-VLV-62", name: "Velvet Border 2\"", category: "Border", width: "2 inch", material: "Velvet", color: "Maroon", hsn: "5810", gst: 12, stock: 1240, min: 500, unit: "Meter", rate: 62, mfr: "Rangoli Fabrics" },
];

export const RAW_MATERIAL = [
  { id: "RM-01", name: "Polyester Yarn 150D", unit: "Kg", stock: 4200, min: 1000, rate: 148, supplier: "Ganesh Yarn Traders", location: "Warehouse A - Rack 12", incoming: 800 },
  { id: "RM-02", name: "Gold Zari 1200", unit: "Kg", stock: 380, min: 100, rate: 3850, supplier: "Shree Ram Zari", location: "Warehouse B - Rack 04", incoming: 50 },
  { id: "RM-03", name: "Viscose Filament", unit: "Kg", stock: 1240, min: 400, rate: 285, supplier: "Modi Silk Suppliers", location: "Warehouse A - Rack 08", incoming: 200 },
  { id: "RM-04", name: "Reactive Dye Red", unit: "Kg", stock: 96, min: 50, rate: 1250, supplier: "Kalpataru Dyes & Chem", location: "Chem Store - Rack 02", incoming: 25 },
  { id: "RM-05", name: "Nylon Filament 40D", unit: "Kg", stock: 620, min: 300, rate: 320, supplier: "New Style Lace House", location: "Warehouse A - Rack 15", incoming: 0 },
  { id: "RM-06", name: "Silver Zari 800", unit: "Kg", stock: 145, min: 80, rate: 2150, supplier: "Shree Ram Zari", location: "Warehouse B - Rack 04", incoming: 40 },
];

export const COLORS = [
  { id: "CLR-01", name: "Rani Pink", hex: "#C6155B", stock: 145, unit: "Kg", used: 82, mill: "Suryodaya" },
  { id: "CLR-02", name: "Firozi", hex: "#16A8B3", stock: 92, unit: "Kg", used: 40, mill: "Ganpati" },
  { id: "CLR-03", name: "Kesar Orange", hex: "#E9762D", stock: 68, unit: "Kg", used: 55, mill: "Sardar" },
  { id: "CLR-04", name: "Mehendi Green", hex: "#4C7A2F", stock: 120, unit: "Kg", used: 30, mill: "Vraj" },
  { id: "CLR-05", name: "Maroon", hex: "#7A1F2B", stock: 210, unit: "Kg", used: 74, mill: "Suryodaya" },
  { id: "CLR-06", name: "Ivory White", hex: "#F2ECDD", stock: 340, unit: "Kg", used: 120, mill: "Om Shakti" },
  { id: "CLR-07", name: "Royal Blue", hex: "#1E3A8A", stock: 180, unit: "Kg", used: 46, mill: "Ganpati" },
  { id: "CLR-08", name: "Golden Yellow", hex: "#D4A017", stock: 88, unit: "Kg", used: 22, mill: "Sardar" },
];

export const PRODUCTION_ORDERS = [
  { id: "PO-8821", product: "Zari Border Less 3\"", qty: 5000, done: 3200, mfr: "Ambica Weaving Works", priority: "High", eta: "2026-07-08", status: "processing" as Status, cost: 210000 },
  { id: "PO-8822", product: "Banarasi Silk Patta 6\"", qty: 2000, done: 1900, mfr: "Jai Bhavani Textiles", priority: "Medium", eta: "2026-07-05", status: "processing" as Status, cost: 190000 },
  { id: "PO-8823", product: "Jacquard Patta 8\"", qty: 3500, done: 3500, mfr: "Om Sai Weavers", priority: "Medium", eta: "2026-07-02", status: "completed" as Status, cost: 420000 },
  { id: "PO-8824", product: "Fancy Lace Border 1.5\"", qty: 8000, done: 1200, mfr: "Rangoli Fabrics", priority: "Low", eta: "2026-07-15", status: "processing" as Status, cost: 280000 },
  { id: "PO-8825", product: "Embroidered Less 2.5\"", qty: 4200, done: 0, mfr: "Shivam Powerlooms", priority: "High", eta: "2026-07-12", status: "pending" as Status, cost: 244000 },
  { id: "PO-8826", product: "Embroidered Patta 10\"", qty: 1500, done: 900, mfr: "Jai Bhavani Textiles", priority: "High", eta: "2026-07-10", status: "delayed" as Status, cost: 210000 },
];

export const CUTTING_JOBS = [
  { id: "CUT-501", product: "Zari Border Less 3\"", received: 3200, cut: 2850, waste: 45, remaining: 305, operator: "Suresh Kumar", machine: "Auto Cutter A2", status: "processing" as Status },
  { id: "CUT-502", product: "Banarasi Silk Patta 6\"", received: 1900, cut: 1900, waste: 22, remaining: 0, operator: "Anita Devi", machine: "Precision B1", status: "completed" as Status },
  { id: "CUT-503", product: "Jacquard Patta 8\"", received: 3500, cut: 1200, waste: 30, remaining: 2270, operator: "Vinod Yadav", machine: "Auto Cutter A1", status: "processing" as Status },
  { id: "CUT-504", product: "Velvet Border 2\"", received: 1240, cut: 0, waste: 0, remaining: 1240, operator: "Ramesh Bhai", machine: "Manual C3", status: "pending" as Status },
];

export const QC_INSPECTIONS = [
  { id: "QC-701", product: "Zari Border Less 3\"", lot: "LOT-2607", inspected: 2850, passed: 2780, rejected: 40, rework: 30, inspector: "Kailash Nath", date: "2026-07-02", status: "completed" as Status },
  { id: "QC-702", product: "Banarasi Silk Patta 6\"", lot: "LOT-2608", inspected: 1900, passed: 1890, rejected: 5, rework: 5, inspector: "Priya Sharma", date: "2026-07-01", status: "approved" as Status },
  { id: "QC-703", product: "Jacquard Patta 8\"", lot: "LOT-2609", inspected: 1200, passed: 1150, rejected: 30, rework: 20, inspector: "Kailash Nath", date: "2026-07-03", status: "processing" as Status },
];

export const PACKING = [
  { id: "PKG-901", product: "Zari Border Less 3\"", packed: 2780, pending: 70, packageType: "Roll Bundle (50m)", weight: "18 Kg", labels: "Ready" },
  { id: "PKG-902", product: "Banarasi Silk Patta 6\"", packed: 1890, pending: 10, packageType: "Roll Bundle (25m)", weight: "22 Kg", labels: "Ready" },
  { id: "PKG-903", product: "Jacquard Patta 8\"", packed: 800, pending: 350, packageType: "Roll Bundle (25m)", weight: "26 Kg", labels: "Pending" },
];

export const CHALLANS = [
  { id: "DC/26-27/1024", date: "2026-07-03", customer: "Krishna Silk House", city: "Surat", transport: "VRL Logistics", vehicle: "GJ-05-AB-4421", driver: "Ashok Singh", items: 3, qty: 2500, status: "processing" as Status, eta: "2026-07-04", amount: 148500 },
  { id: "DC/26-27/1025", date: "2026-07-03", customer: "Radhe Fashion Fabrics", city: "Mumbai", transport: "Gati KWE", vehicle: "MH-04-CG-9982", driver: "Firoz Khan", items: 5, qty: 4800, status: "completed" as Status, eta: "2026-07-05", amount: 486200 },
  { id: "DC/26-27/1026", date: "2026-07-02", customer: "Sanskruti Weaves", city: "Bengaluru", transport: "Safexpress", vehicle: "KA-01-MJ-5511", driver: "Manjunath", items: 4, qty: 3200, status: "processing" as Status, eta: "2026-07-06", amount: 322400 },
  { id: "DC/26-27/1027", date: "2026-07-02", customer: "Aashiyana Enterprises", city: "Delhi", transport: "TCI Freight", vehicle: "DL-01-XZ-2244", driver: "Rakesh Kumar", items: 6, qty: 5600, status: "delayed" as Status, eta: "2026-07-08", amount: 612800 },
  { id: "DC/26-27/1028", date: "2026-07-01", customer: "Vardhman Sarees", city: "Jaipur", transport: "V-Trans India", vehicle: "RJ-14-BB-7712", driver: "Suresh Yadav", items: 3, qty: 2100, status: "completed" as Status, eta: "2026-07-03", amount: 218400 },
  { id: "DC/26-27/1029", date: "2026-07-01", customer: "Laxmi Fabric Mart", city: "Kolkata", transport: "Delhivery", vehicle: "WB-02-CD-3399", driver: "Sanjoy Das", items: 2, qty: 1400, status: "completed" as Status, eta: "2026-07-04", amount: 142100 },
];

export type InvoiceType = "GST" | "Non-GST";

export const INVOICES = [
  { id: "INV/26-27/2201", date: "2026-07-03", customer: "Krishna Silk House", type: "GST" as InvoiceType, amount: 148500, gst: 7425, total: 155925, status: "paid" as Status, dueDays: 45 },
  { id: "INV/26-27/2202", date: "2026-07-03", customer: "Radhe Fashion Fabrics", type: "GST" as InvoiceType, amount: 486200, gst: 58344, total: 544544, status: "partial" as Status, dueDays: 30 },
  { id: "EST/26-27/0401", date: "2026-07-02", customer: "Local Retail Counter", type: "Non-GST" as InvoiceType, amount: 85000, gst: 0, total: 85000, status: "paid" as Status, dueDays: 15 },
  { id: "INV/26-27/2203", date: "2026-07-02", customer: "Sanskruti Weaves", type: "GST" as InvoiceType, amount: 322400, gst: 38688, total: 361088, status: "pending" as Status, dueDays: 45 },
  { id: "INV/26-27/2204", date: "2026-07-02", customer: "Aashiyana Enterprises", type: "GST" as InvoiceType, amount: 612800, gst: 73536, total: 686336, status: "overdue" as Status, dueDays: 45 },
  { id: "EST/26-27/0402", date: "2026-07-01", customer: "Shreeji Synthetics", type: "Non-GST" as InvoiceType, amount: 145000, gst: 0, total: 145000, status: "pending" as Status, dueDays: 30 },
  { id: "INV/26-27/2205", date: "2026-07-01", customer: "Vardhman Sarees", type: "GST" as InvoiceType, amount: 218400, gst: 26208, total: 244608, status: "paid" as Status, dueDays: 60 },
  { id: "INV/26-27/2206", date: "2026-06-30", customer: "Laxmi Fabric Mart", type: "GST" as InvoiceType, amount: 142100, gst: 17052, total: 159152, status: "paid" as Status, dueDays: 30 },
  { id: "EST/26-27/0403", date: "2026-06-30", customer: "Anand Traders", type: "Non-GST" as InvoiceType, amount: 92000, gst: 0, total: 92000, status: "paid" as Status, dueDays: 15 },
  { id: "INV/26-27/2207", date: "2026-06-30", customer: "Trimurti Textiles", type: "GST" as InvoiceType, amount: 385600, gst: 46272, total: 431872, status: "overdue" as Status, dueDays: 30 },
];

export const PAYMENTS = [
  { id: "PMT-4501", date: "2026-07-03", party: "Krishna Silk House", type: "Received", mode: "RTGS", amount: 155925, ref: "SBIN26070312", against: "INV/26-27/2201" },
  { id: "PMT-4502", date: "2026-07-03", party: "Ganesh Yarn Traders", type: "Paid", mode: "NEFT", amount: 285000, ref: "HDFC26070345", against: "PO-Yarn-118" },
  { id: "PMT-4503", date: "2026-07-02", party: "Radhe Fashion Fabrics", type: "Received", mode: "Cheque", amount: 250000, ref: "CHQ-887421", against: "INV/26-27/2202 (Partial)" },
  { id: "PMT-4504", date: "2026-07-02", party: "Ambica Weaving Works", type: "Paid", mode: "UPI", amount: 145000, ref: "UPI-89412232", against: "PO-8821" },
  { id: "PMT-4505", date: "2026-07-01", party: "Vardhman Sarees", type: "Received", mode: "RTGS", amount: 244608, ref: "ICIC26070109", against: "INV/26-27/2205" },
  { id: "PMT-4506", date: "2026-07-01", party: "Suryodaya Processing Mills", type: "Paid", mode: "RTGS", amount: 285000, ref: "SBIN26070189", against: "MILL-401" },
];

export const LIVE_PRICING = [
  { material: "Polyester Yarn 150D", mfr: "Ganesh Yarn Traders", today: 148, yesterday: 145, diff: 3, updated: "2h ago" },
  { material: "Gold Zari 1200", mfr: "Shree Ram Zari", today: 3850, yesterday: 3880, diff: -30, updated: "45m ago" },
  { material: "Viscose Filament", mfr: "Modi Silk Suppliers", today: 285, yesterday: 282, diff: 3, updated: "3h ago" },
  { material: "Reactive Dye Red", mfr: "Kalpataru Dyes & Chem", today: 1250, yesterday: 1240, diff: 10, updated: "5h ago" },
  { material: "Nylon Filament 40D", mfr: "New Style Lace House", today: 320, yesterday: 318, diff: 2, updated: "1h ago" },
  { material: "Silver Zari 800", mfr: "Shree Ram Zari", today: 2150, yesterday: 2180, diff: -30, updated: "45m ago" },
  { material: "Polyester Yarn 150D", mfr: "Anmol Border Works", today: 152, yesterday: 150, diff: 2, updated: "1d ago" },
];

export const PRICE_HISTORY = [
  { d: "24 Jun", price: 142 },
  { d: "25 Jun", price: 143 },
  { d: "26 Jun", price: 141 },
  { d: "27 Jun", price: 144 },
  { d: "28 Jun", price: 145 },
  { d: "29 Jun", price: 146 },
  { d: "30 Jun", price: 145 },
  { d: "01 Jul", price: 145 },
  { d: "02 Jul", price: 145 },
  { d: "03 Jul", price: 148 },
];

export const WAREHOUSES = [
  { id: "WH-A", name: "Warehouse A — Main Store", city: "Surat", racks: 42, utilisation: 78, stockValue: 3_20_00_000, manager: "Prakash Bhai" },
  { id: "WH-B", name: "Warehouse B — Zari & Border", city: "Surat", racks: 24, utilisation: 62, stockValue: 1_45_00_000, manager: "Devang Shah" },
  { id: "WH-C", name: "Warehouse C — Finished Goods", city: "Ahmedabad", racks: 36, utilisation: 88, stockValue: 2_65_00_000, manager: "Nitin Patel" },
  { id: "WH-D", name: "Chem Store — Dyes", city: "Ankleshwar", racks: 12, utilisation: 45, stockValue: 32_00_000, manager: "Ravi Mehta" },
];

export const STOCK_TRANSFERS = [
  { id: "ST-1801", date: "2026-07-02", from: "WH-A", to: "WH-C", items: 4, qty: 3200, status: "completed" as Status, ref: "PO-8823" },
  { id: "ST-1802", date: "2026-07-02", from: "WH-B", to: "WH-A", items: 2, qty: 480, status: "processing" as Status, ref: "PO-8824" },
  { id: "ST-1803", date: "2026-07-01", from: "WH-C", to: "WH-A", items: 6, qty: 5100, status: "completed" as Status, ref: "Rework" },
];

export const TASKS = [
  { id: "T-01", title: "Approve Suryodaya mill charges", assignee: "Rajesh Agarwal", priority: "High", due: "2026-07-04", column: "todo" },
  { id: "T-02", title: "Follow up Aashiyana payment", assignee: "Meera Shah", priority: "High", due: "2026-07-04", column: "todo" },
  { id: "T-03", title: "Confirm Rani Pink shade sample", assignee: "Kailash Nath", priority: "Medium", due: "2026-07-05", column: "todo" },
  { id: "T-04", title: "Cutting job CUT-503 supervision", assignee: "Vinod Yadav", priority: "Medium", due: "2026-07-05", column: "running" },
  { id: "T-05", title: "Prepare DC/26-27/1030 for Nakoda", assignee: "Prakash Bhai", priority: "Medium", due: "2026-07-04", column: "running" },
  { id: "T-06", title: "Reorder Reactive Dye Red (RM-04)", assignee: "Ravi Mehta", priority: "High", due: "2026-07-06", column: "running" },
  { id: "T-07", title: "Sanction credit limit — Trimurti", assignee: "Rajesh Agarwal", priority: "Medium", due: "2026-07-07", column: "approval" },
  { id: "T-08", title: "GST return June — final review", assignee: "Nitin Patel", priority: "High", due: "2026-07-10", column: "approval" },
  { id: "T-09", title: "Ambica payment PMT-4504", assignee: "Rajesh Agarwal", priority: "Low", due: "2026-07-02", column: "done" },
  { id: "T-10", title: "QC-702 sign-off", assignee: "Priya Sharma", priority: "Low", due: "2026-07-01", column: "done" },
];

export const EMPLOYEES = [
  { id: "EMP-01", name: "Rajesh Agarwal", role: "Managing Director", dept: "Executive", phone: "+91 98250 12345", status: "active" as Status },
  { id: "EMP-02", name: "Meera Shah", role: "Sales Head", dept: "Sales", phone: "+91 98240 33445", status: "active" as Status },
  { id: "EMP-03", name: "Prakash Bhai", role: "Warehouse Manager", dept: "Operations", phone: "+91 98252 88110", status: "active" as Status },
  { id: "EMP-04", name: "Kailash Nath", role: "QC Inspector", dept: "Quality", phone: "+91 98240 44112", status: "active" as Status },
  { id: "EMP-05", name: "Nitin Patel", role: "Accounts Head", dept: "Finance", phone: "+91 98250 66223", status: "active" as Status },
  { id: "EMP-06", name: "Vinod Yadav", role: "Cutting Supervisor", dept: "Production", phone: "+91 98241 22119", status: "active" as Status },
  { id: "EMP-07", name: "Priya Sharma", role: "QC Assistant", dept: "Quality", phone: "+91 98242 77883", status: "active" as Status },
  { id: "EMP-08", name: "Ravi Mehta", role: "Chem Store In-charge", dept: "Store", phone: "+91 98244 99226", status: "active" as Status },
];

export const NOTIFICATIONS = [
  { id: 1, type: "warning" as const, title: "Order PO-8826 delayed", desc: "Embroidered Patta 10\" is 2 days behind schedule.", time: "5m ago" },
  { id: 2, type: "info" as const, title: "Price changed", desc: "Gold Zari 1200 dropped by ₹30/kg at Shree Ram Zari.", time: "45m ago" },
  { id: 3, type: "success" as const, title: "Mill completed", desc: "Ganpati Colour Works finished LOT-2608 Firozi.", time: "2h ago" },
  { id: 4, type: "success" as const, title: "Payment received", desc: "₹2,50,000 from Radhe Fashion Fabrics.", time: "3h ago" },
  { id: 5, type: "danger" as const, title: "Stock low", desc: "Fancy Lace Border 1.5\" below reorder level (320m).", time: "5h ago" },
  { id: 6, type: "info" as const, title: "Manufacturing completed", desc: "PO-8823 Jacquard Patta 8\" ready for QC.", time: "6h ago" },
];

export const DISPATCH_STAGES = [
  { key: "order", label: "Order Received", count: 8 },
  { key: "quotation", label: "Quotation Approved", count: 6 },
  { key: "production", label: "Production Started", count: 12 },
  { key: "sent_mfr", label: "Sent to Manufacturer", count: 9 },
  { key: "manufacturing", label: "Manufacturing", count: 14 },
  { key: "sent_mill", label: "Sent to Mill", count: 7 },
  { key: "mill", label: "Mill Processing", count: 11 },
  { key: "returned", label: "Returned from Mill", count: 5 },
  { key: "cutting", label: "Cutting", count: 6 },
  { key: "qc", label: "Quality Check", count: 4 },
  { key: "packing", label: "Packing", count: 5 },
  { key: "challan", label: "Delivery Challan", count: 8 },
  { key: "dispatch", label: "Dispatch", count: 6 },
  { key: "transport", label: "Transport", count: 12 },
  { key: "delivery", label: "Customer Delivery", count: 4 },
  { key: "invoice", label: "Invoice", count: 9 },
  { key: "payment", label: "Payment", count: 7 },
  { key: "completed", label: "Completed", count: 142 },
];

export const TOP_PRODUCTS = [
  { name: "Banarasi Silk Patta 6\"", qty: 12400, revenue: 11780000 },
  { name: "Zari Border Less 3\"", qty: 24800, revenue: 10416000 },
  { name: "Jacquard Patta 8\"", qty: 9200, revenue: 11040000 },
  { name: "Embroidered Patta 10\"", qty: 4200, revenue: 5880000 },
  { name: "Velvet Border 2\"", qty: 8600, revenue: 5332000 },
];

export const MFR_PERFORMANCE = [
  { name: "Jai Bhavani", quality: 98, delivery: 98, cost: 88 },
  { name: "Ambica", quality: 96, delivery: 96, cost: 92 },
  { name: "Shivam", quality: 92, delivery: 92, cost: 94 },
  { name: "Om Sai", quality: 90, delivery: 90, cost: 90 },
  { name: "Rangoli", quality: 94, delivery: 94, cost: 86 },
];

export const UPCOMING_DELIVERIES = [
  { id: "DC/26-27/1024", customer: "Krishna Silk House", city: "Surat", eta: "Tomorrow, 10:30 AM" },
  { id: "DC/26-27/1026", customer: "Sanskruti Weaves", city: "Bengaluru", eta: "6 Jul, 04:15 PM" },
  { id: "DC/26-27/1027", customer: "Aashiyana Enterprises", city: "Delhi", eta: "8 Jul, 11:00 AM" },
  { id: "DC/26-27/1030", customer: "Nakoda Sarees", city: "Surat", eta: "5 Jul, 09:00 AM" },
];