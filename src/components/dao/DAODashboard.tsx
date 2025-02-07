export function DAODashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Active Proposals</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-100 rounded-lg">
            <h3 className="font-medium mb-2">Add New Skill Category</h3>
            <p className="text-sm text-gray-600 mb-2">Proposal to add "Web Development" as a new skill category</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Votes: 45/100</span>
              <span className="text-[#28a745]">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Your Voting Power</h2>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-[#28a745]">10 VP</p>
          <p className="text-gray-600">Based on your activity and HH balance</p>
        </div>
      </div>
    </div>
  );
} 