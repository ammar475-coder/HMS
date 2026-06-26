import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'

const NAV_LINKS = [
  "Dashboard", "Patient Consultation", "Diagnosis",
  "Prescription", "Lab Order", "Radiology Order", "Follow-up Manager",
]

function FollowUpManager() {
  const { token } = useParams()
  const navigate  = useNavigate()
  const [activeLink, setActiveLink] = useState("Follow-up Manager")

  // Form state
  const [purpose,      setPurpose]      = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [instructions, setInstructions] = useState('')

  // Follow-up list
  const [followUps, setFollowUps] = useState([
    { patient: "Sneha Patel",  lastVisit: "19 Jun", date: "19 Jul 2025", purpose: "BP Review + Lab results",      },
    { patient: "Arjun Mehta",  lastVisit: "12 Jun", date: "26 Jun 2025", purpose: "Holter monitor review",        },
    { patient: "Rajesh Verma", lastVisit: "15 Jun", date: "22 Jun 2025", purpose: "Medication response check",    },
  ])

  const handleSchedule = () => {
    if (!purpose || !followUpDate) return
    setFollowUps(prev => [{
      patient: "Sneha Patel",
      lastVisit: "19 Jun",
      date: new Date(followUpDate).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      }),
      purpose,
    }, ...prev])
    setPurpose(''); setFollowUpDate(''); setInstructions('')
  }

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")            navigate('/doctor')
    if (link === "Patient Consultation") navigate(`/doctor/consultation/${token}`)
    if (link === "Diagnosis")            navigate(`/doctor/diagnosis/${token}`)
    if (link === "Prescription")         navigate(`/doctor/prescription/${token}`)
    if (link === "Lab Order")            navigate(`/doctor/lab-order/${token}`)
    if (link === "Radiology Order")      navigate(`/doctor/radiology-order/${token}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Breadcrumb + Title */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-1">
            <span className="cursor-pointer hover:text-blue-500"
              onClick={() => navigate('/doctor')}>Doctor</span>
            {" › "}Follow-up Management
          </p>
          <h2 className="text-2xl font-bold text-gray-800">Follow-up Management</h2>
          <p className="text-sm text-gray-400">Schedule and review patient follow-ups</p>
        </div>

        <div className="flex flex-col gap-5 max-w-4xl">

          {/* Schedule Form */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-700 mb-5">Schedule Follow-up</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">

              {/* Patient — prefilled */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Patient
                </label>
                <input
                  value="Current: Sneha Patel"
                  disabled
                  className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Follow-up Purpose */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Follow-up Purpose *
                </label>
                <input
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  placeholder="e.g. BP Review, Lab results..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Follow-up Date *
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={e => setFollowUpDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Instructions for Patient
                </label>
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Tests to repeat, lifestyle changes..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSchedule}
                disabled={!purpose || !followUpDate}
                className="bg-gray-800 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-gray-700 transition disabled:opacity-40 flex items-center gap-2"
              >
                📅 Schedule Follow-up
              </button>
            </div>
          </div>

          {/* Follow-up Schedule Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Follow-up Schedule</h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 uppercase text-xs">
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Last Visit</th>
                  <th className="pb-3 font-medium">Follow-up Date</th>
                  <th className="pb-3 font-medium">Purpose</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {followUps.map((f, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-blue-600">{f.patient}</td>
                    <td className="py-3 text-gray-500">{f.lastVisit}</td>
                    <td className="py-3">
                      <span className="font-medium text-gray-800">{f.date}</span>
                    </td>
                    <td className="py-3 text-gray-600">{f.purpose}</td>
                    <td className="py-3">
                      <button className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                        📅 Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
                {followUps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No follow-ups scheduled
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Done — back to dashboard */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/doctor')}
              className="bg-blue-600 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              ✓ Done — Back to Dashboard
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}

export default FollowUpManager