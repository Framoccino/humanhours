export function CommunityHub() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Community Members</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#28a745] rounded-full flex items-center justify-center text-white">
              JD
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-600">Gardening Expert</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#28a745] rounded-full flex items-center justify-center text-white">
              AS
            </div>
            <div>
              <p className="font-medium">Alice Smith</p>
              <p className="text-sm text-gray-600">Photography Pro</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">John completed a gardening task</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Alice shared photography tips</p>
            <p className="text-xs text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
} 