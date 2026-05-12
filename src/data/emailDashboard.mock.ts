// ─── Email Dashboard Mock Data ────────────────────────────────────────────────

export const EMAIL_QUEUES = [
  'Customer Support resQ',
  'BM Bade',
  'CS Head',
  'Social Media',
  'Management',
  'Dealer Support',
]

// ED1 – Overview KPIs
export const EMAIL_KPI_SNAPSHOT = {
  totalEmails: 1247,
  totalActioned: 892,
  totalPending: 168,
  totalResolved: 724,
  slaMet: 87.3,
  avgAht: 13.4,
  freshEmails: 841,
  repeatEmails: 406,
}

// ED2 – Live Queue Monitor
export const LIVE_QUEUE_MONITOR = [
  { queue: 'Customer Support resQ', pendingAssign: 168, agentsInQueue: 21, loggedIn: 11, loggedOut: 0,  available: 3, productiveBreak: 0, onBreak: 8 },
  { queue: 'BM Bade',              pendingAssign: 41,  agentsInQueue: 5,  loggedIn: 4,  loggedOut: 1,  available: 2, productiveBreak: 0, onBreak: 2 },
  { queue: 'CS Head',              pendingAssign: 28,  agentsInQueue: 3,  loggedIn: 3,  loggedOut: 0,  available: 1, productiveBreak: 1, onBreak: 1 },
  { queue: 'Social Media',         pendingAssign: 67,  agentsInQueue: 8,  loggedIn: 6,  loggedOut: 2,  available: 3, productiveBreak: 0, onBreak: 3 },
  { queue: 'Management',           pendingAssign: 34,  agentsInQueue: 4,  loggedIn: 3,  loggedOut: 1,  available: 1, productiveBreak: 0, onBreak: 2 },
  { queue: 'Dealer Support',       pendingAssign: 48,  agentsInQueue: 6,  loggedIn: 5,  loggedOut: 1,  available: 2, productiveBreak: 1, onBreak: 2 },
]

// ED3 – Live Agent Monitor
export const LIVE_AGENT_MONITOR = [
  { empCode: '680213492', name: 'Jyoti Mankar',    status: 'busy',      loginHrs: '8h 02m', tl: 'Rohan Jha',    designation: 'CSA CS',  breakReason: '',       assigned: 13, queue: 'Customer Support resQ' },
  { empCode: '680213501', name: 'Suchita Patil',   status: 'available', loginHrs: '7h 45m', tl: 'Rohan Jha',    designation: 'CSA CS',  breakReason: '',       assigned: 9,  queue: 'Customer Support resQ' },
  { empCode: '680213518', name: 'Rashmi Sharma',   status: 'break',     loginHrs: '6h 30m', tl: 'Priya Nair',   designation: 'CSA CS',  breakReason: 'Lunch',  assigned: 7,  queue: 'Customer Support resQ' },
  { empCode: '680213523', name: 'Abudu Khan',      status: 'busy',      loginHrs: '8h 12m', tl: 'Priya Nair',   designation: 'CSA CS',  breakReason: '',       assigned: 11, queue: 'Social Media'          },
  { empCode: '680213534', name: 'Priya Mehta',     status: 'available', loginHrs: '7h 55m', tl: 'Priya Nair',   designation: 'Sr. CSA', breakReason: '',       assigned: 8,  queue: 'Social Media'          },
  { empCode: '680213545', name: 'Priyanka Verma',  status: 'busy',      loginHrs: '8h 00m', tl: 'Kavita Singh',  designation: 'CSA CS',  breakReason: '',       assigned: 10, queue: 'Dealer Support'        },
  { empCode: '680213556', name: 'Sameer Gupta',    status: 'break',     loginHrs: '5h 48m', tl: 'Kavita Singh',  designation: 'CSA CS',  breakReason: 'Tea',    assigned: 6,  queue: 'Dealer Support'        },
  { empCode: '680213567', name: 'Neha Desai',      status: 'busy',      loginHrs: '8h 05m', tl: 'Rohan Jha',    designation: 'CSA CS',  breakReason: '',       assigned: 12, queue: 'Customer Support resQ' },
  { empCode: '680213578', name: 'Amit Tiwari',     status: 'available', loginHrs: '7h 20m', tl: 'Kavita Singh',  designation: 'Sr. CSA', breakReason: '',       assigned: 5,  queue: 'Management'            },
  { empCode: '680213589', name: 'Kavita Singh',    status: 'busy',      loginHrs: '8h 30m', tl: 'Rohan Jha',    designation: 'TL',      breakReason: '',       assigned: 4,  queue: 'CS Head'               },
  { empCode: '680213600', name: 'Rohan Jha',       status: 'available', loginHrs: '8h 45m', tl: 'Mgmt',         designation: 'TL',      breakReason: '',       assigned: 3,  queue: 'BM Bade'               },
  { empCode: '680213611', name: 'Divya Rao',       status: 'break',     loginHrs: '6h 15m', tl: 'Priya Nair',   designation: 'CSA CS',  breakReason: 'Bio',    assigned: 9,  queue: 'Customer Support resQ' },
]

// ED4 – Queue Performance
export const QUEUE_PERFORMANCE = [
  { queue: 'Customer Support resQ', received: 312, pendingAssign: 168, actioned: 144, unanswered: 48, custReplied: 29, resolved: 96, transferred: 12, withinSla: 275, outSla: 37,  fresh: 198, repeat: 114 },
  { queue: 'BM Bade',              received: 87,  pendingAssign: 41,  actioned: 46,  unanswered: 15, custReplied: 8,  resolved: 38, transferred: 3,  withinSla: 79,  outSla: 8,   fresh: 62,  repeat: 25  },
  { queue: 'CS Head',              received: 54,  pendingAssign: 28,  actioned: 26,  unanswered: 9,  custReplied: 5,  resolved: 21, transferred: 5,  withinSla: 46,  outSla: 8,   fresh: 38,  repeat: 16  },
  { queue: 'Social Media',         received: 143, pendingAssign: 67,  actioned: 76,  unanswered: 22, custReplied: 14, resolved: 62, transferred: 8,  withinSla: 128, outSla: 15,  fresh: 97,  repeat: 46  },
  { queue: 'Management',           received: 76,  pendingAssign: 34,  actioned: 42,  unanswered: 11, custReplied: 7,  resolved: 35, transferred: 6,  withinSla: 67,  outSla: 9,   fresh: 51,  repeat: 25  },
  { queue: 'Dealer Support',       received: 98,  pendingAssign: 48,  actioned: 50,  unanswered: 16, custReplied: 10, resolved: 40, transferred: 4,  withinSla: 88,  outSla: 10,  fresh: 68,  repeat: 30  },
]

// ED5 – Agent Performance
export const AGENT_PERFORMANCE_EMAIL = [
  { agent: 'Jyoti Mankar',   bpId: '50029101', assigned: 45, pending: 13, resolved: 28, actioned: 32, transferred: 4, fresh: 31, repeat: 14, aht: 14 },
  { agent: 'Suchita Patil',  bpId: '50029160', assigned: 44, pending: 12, resolved: 27, actioned: 32, transferred: 3, fresh: 30, repeat: 14, aht: 14 },
  { agent: 'Rashmi Sharma',  bpId: '50029202', assigned: 38, pending: 9,  resolved: 24, actioned: 29, transferred: 3, fresh: 26, repeat: 12, aht: 12 },
  { agent: 'Abudu Khan',     bpId: '50029215', assigned: 41, pending: 11, resolved: 26, actioned: 30, transferred: 2, fresh: 28, repeat: 13, aht: 16 },
  { agent: 'Priya Mehta',    bpId: '50029231', assigned: 36, pending: 8,  resolved: 23, actioned: 28, transferred: 5, fresh: 24, repeat: 12, aht: 13 },
  { agent: 'Priyanka Verma', bpId: '50029248', assigned: 33, pending: 7,  resolved: 21, actioned: 26, transferred: 3, fresh: 22, repeat: 11, aht: 15 },
  { agent: 'Sameer Gupta',   bpId: '50029263', assigned: 39, pending: 10, resolved: 25, actioned: 29, transferred: 4, fresh: 27, repeat: 12, aht: 11 },
  { agent: 'Neha Desai',     bpId: '50029278', assigned: 42, pending: 11, resolved: 26, actioned: 31, transferred: 3, fresh: 29, repeat: 13, aht: 13 },
  { agent: 'Amit Tiwari',    bpId: '50029290', assigned: 29, pending: 6,  resolved: 18, actioned: 23, transferred: 2, fresh: 20, repeat: 9,  aht: 17 },
  { agent: 'Divya Rao',      bpId: '50029305', assigned: 37, pending: 9,  resolved: 23, actioned: 28, transferred: 4, fresh: 25, repeat: 12, aht: 14 },
]

// ED6 – Queue Level Volume (same as queue performance but with Status field)
export const QUEUE_VOLUME = QUEUE_PERFORMANCE.map(q => ({
  ...q,
  status: q.outSla > 10 ? 'At Risk' : 'Healthy',
}))

// ED6 – Email Category Breakdown per Queue
export const EMAIL_CATEGORY_BREAKDOWN = [
  { category: 'Refund Related',       'Customer Support resQ': 89, 'BM Bade': 23, 'CS Head': 12, 'Social Media': 34, 'Management': 18, 'Dealer Support': 27 },
  { category: 'Repair Related',       'Customer Support resQ': 67, 'BM Bade': 18, 'CS Head': 8,  'Social Media': 42, 'Management': 12, 'Dealer Support': 34 },
  { category: 'Installation Related', 'Customer Support resQ': 54, 'BM Bade': 12, 'CS Head': 6,  'Social Media': 28, 'Management': 9,  'Dealer Support': 22 },
  { category: 'Delivery Related',     'Customer Support resQ': 102,'BM Bade': 34, 'CS Head': 28, 'Social Media': 39, 'Management': 37, 'Dealer Support': 15 },
]

// ED7 – Daily Email Flow (90 days)
export const DAILY_EMAIL_FLOW = (() => {
  const base = [42,38,51,47,33,29,30,44,52,49,55,48,61,57,35,31,32,46,53,50,58,52,63,59,37,33,34,48,55,51,
                59,54,65,61,39,34,36,50,57,54,62,56,67,63,41,36,38,52,59,55,63,58,69,65,43,37,39,53,61,57,
                65,60,71,67,44,39,41,55,62,58,66,61,72,68,45,40,42,56,63,59,67,62,74,70,46,41,43,57,64,60]
  const resolved = base.map(v => Math.round(v * 0.82))
  const pending  = base.map(v => Math.round(v * 0.18))
  const days = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(2026, 1, 12)
    d.setDate(d.getDate() + i)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
  })
  return days.map((day, i) => ({ day, received: base[i], resolved: resolved[i], pending: pending[i] }))
})()

// ED8 – Break Report
export const BREAK_REPORT = [
  { agent: 'Jyoti Mankar',   teaBreak: '15m', lunchBreak: '30m', productiveBreak: '0m',  bioBreak: '5m',  totalLogin: '8h 02m', totalBreak: '50m' },
  { agent: 'Suchita Patil',  teaBreak: '10m', lunchBreak: '45m', productiveBreak: '30m', bioBreak: '5m',  totalLogin: '7h 45m', totalBreak: '1h 30m' },
  { agent: 'Rashmi Sharma',  teaBreak: '20m', lunchBreak: '30m', productiveBreak: '0m',  bioBreak: '10m', totalLogin: '6h 30m', totalBreak: '1h 00m' },
  { agent: 'Abudu Khan',     teaBreak: '15m', lunchBreak: '30m', productiveBreak: '45m', bioBreak: '5m',  totalLogin: '8h 12m', totalBreak: '1h 35m' },
  { agent: 'Priya Mehta',    teaBreak: '10m', lunchBreak: '30m', productiveBreak: '0m',  bioBreak: '5m',  totalLogin: '7h 55m', totalBreak: '45m' },
  { agent: 'Priyanka Verma', teaBreak: '15m', lunchBreak: '45m', productiveBreak: '30m', bioBreak: '5m',  totalLogin: '8h 00m', totalBreak: '1h 35m' },
  { agent: 'Sameer Gupta',   teaBreak: '20m', lunchBreak: '30m', productiveBreak: '0m',  bioBreak: '10m', totalLogin: '5h 48m', totalBreak: '1h 00m' },
  { agent: 'Neha Desai',     teaBreak: '15m', lunchBreak: '30m', productiveBreak: '60m', bioBreak: '5m',  totalLogin: '8h 05m', totalBreak: '1h 50m' },
  { agent: 'Amit Tiwari',    teaBreak: '10m', lunchBreak: '45m', productiveBreak: '0m',  bioBreak: '5m',  totalLogin: '7h 20m', totalBreak: '1h 00m' },
  { agent: 'Divya Rao',      teaBreak: '15m', lunchBreak: '30m', productiveBreak: '30m', bioBreak: '10m', totalLogin: '6h 15m', totalBreak: '1h 25m' },
]
