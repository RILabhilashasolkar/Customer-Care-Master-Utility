# NHQ Master Utility
### Reliance Retailer One Electronics — NHQ Customer Care Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Vite](https://img.shields.io/badge/Vite-5-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)

A **Role-Based Access Control (RBAC)** enterprise platform for Reliance Retailer One Electronics' NHQ Customer Care department. Built as a config-driven, PII-safe, multi-business-line utility supporting B2B (JMD), B2B2C (ASP), and B2C (Reliance Digital, Jio Signature, My Jio Stores, Distribution) operations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/RILabhilashasolkar/Customer-Care-Master-Utility.git
cd Customer-Care-Master-Utility

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at **http://localhost:5175**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Demo Login Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| Admin | `admin` | `admin123` | Full access — all modules + Admin Panel |
| CC Agent | `agent1` | `agent123` | Customer 360, Order Tracker, Ticket Management |
| CC Lead | `lead1` | `lead123` | All agent modules + Queue dashboards |
| NHQ Customer Care | `nhqcc1` | `nhqcc123` | All dashboards + Customer/Retailer 360 |
| NHQ SCM | `nhqscm1` | `nhqscm123` | SCM dashboards + Order Tracker |
| NHQ Finance | `nhqfin1` | `nhqfin123` | Finance dashboards + reports |
| CC Head | `cchead` | `cchead123` | Full dashboard suite |
| SCM Head | `scmhead` | `scmhead123` | SCM + distribution modules |
| CS Product Manager | `cspm1` | `cspm123` | All modules read-only |
| Finance Head | `finhead` | `finhead123` | Finance + full reports |
| Business Head | `bizhead` | `bizhead123` | Executive dashboards |

---

## 📦 Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Login** | Role-based authentication with demo credential quick-switch |
| 2 | **CC Management Dashboard** | 11 sub-dashboards for real-time and historical CC operations |
| 3 | **Customer 360** | Full customer profile with PII masking, orders, tickets, loyalty |
| 4 | **Retailer 360** | Complete retailer profile with orders, tickets, performance metrics |
| 5 | **Order Tracker** | Multi-business-line order tracking with full timeline |
| 6 | **Ticket Management** | End-to-end ticket lifecycle with escalation and SLA tracking |
| 7 | **Store Locator** | Pincode-based store search with distance sorting |
| 8 | **Admin Panel** | RBAC matrix editor, user management, role management |

---

## 📊 Dashboard Suite (11 Sub-Dashboards)

| Code | Dashboard | Type |
|------|-----------|------|
| D1 | Queue Health (Live) | Real-time, auto-refresh 30s |
| D2 | Live Agent Monitor | Real-time agent status |
| D3 | Queue Performance | Historical bar charts |
| D4 | Agent Performance | Top 10 agents by volume/CSAT |
| D5 | SLA Aging by Queue | Stacked aging buckets per queue |
| D6 | SLA Aging by Agent | Stacked aging buckets per agent |
| D7 | Breaks Adherence | Tea / Lunch / Bio break tracking |
| D8 | Ticket Aging by Queue | Oldest & avg ticket age |
| D9 | Volume Mix | Donut charts — Channel / Type / BL / Priority |
| D10 | Trends (90D) | Area charts — Volume / CSAT / AHT / Backlog |
| DAR | Daily Activity Report | Per-queue opened / resolved / backlog / SLA |

---

## 👥 User Roles (11 Roles)

```
callCentreAgent → callCentreLead → nhqCustomerCare → nhqScm → nhqFinance
     ↓                  ↓                ↓               ↓          ↓
  ccHead           scmHead        csProductManager  financeHead  businessHead
                                                                     ↓
                                                                   admin
```

---

## 🔒 PII Masking

Sensitive fields are masked by default and can be unmasked based on role permissions:

| Field | Masked Example | Roles with Unmask |
|-------|---------------|-------------------|
| Phone | `98******01` | nhqCustomerCare, ccHead, admin |
| Email | `us***@example.com` | nhqCustomerCare, ccHead, admin |
| Address | `XXXX, Street Name` | ccHead, admin |
| PAN | `AABCTXXXXX` | financeHead, admin |
| Aadhaar | `XXXX-XXXX-1234` | financeHead, admin |

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── charts/          # Custom SVG chart widgets (Area, Bar, Donut, Line)
│   ├── core/            # Reusable UI primitives (Card, Table, Badge, etc.)
│   ├── dynamic/         # Config-driven field & table renderers + PII masking
│   ├── guards/          # AuthGuard & PermissionGuard (RBAC route protection)
│   └── layout/          # AppShell, Sidebar, TopBar
├── config/
│   ├── fields.config.ts      # Add new API fields here — zero component changes
│   ├── modules.config.ts     # Module registry with permission keys
│   ├── rbac.config.ts        # Role → permission mappings
│   ├── pii.config.ts         # PII field definitions + unmask role lists
│   └── businessLines.config.ts
├── context/
│   ├── AuthContext.tsx        # Session management
│   ├── RbacContext.tsx        # Permission engine
│   └── DashboardFilterContext.tsx
├── data/                # Mock data layer (customers, orders, tickets, agents…)
├── hooks/               # useInterval, usePermission, usePiiMask
├── pages/               # Feature pages (Dashboard, Customer360, Retailer360…)
├── services/            # DataService interface + MockAdapter
└── types/               # TypeScript interfaces for all domain entities
```

### Key Design Principles

- **Config-driven**: Adding a new API field = one line in `fields.config.ts`, no component changes
- **RBAC-first**: Every route, module, and field is permission-gated via `rbac.config.ts`
- **PII-safe**: All sensitive data masked by default; role-controlled unmask with audit trail
- **Custom SVG charts**: Built from scratch — no Recharts dependency issues with React 18
- **Mock-ready**: Full `DataService` interface enables seamless swap to real APIs

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v6 |
| State | React Context API |
| Charts | Custom SVG (no external chart library) |
| Icons | Lucide React |
| Data | Mock service layer (interface-ready for REST/GraphQL) |

---

## 🎨 Brand

| Token | Value |
|-------|-------|
| Primary | `#1a237e` (Deep Blue) |
| Accent | `#f59e0b` (Amber) |
| Success | `#10b981` |
| Warning | `#f59e0b` |
| Danger | `#ef4444` |

---

## 📁 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready releases |
| `dev` | Active development & feature integration |

---

## 📄 License

Internal use only. © 2026 Reliance Retail Ltd. All rights reserved.
