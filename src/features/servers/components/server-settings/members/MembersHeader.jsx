export const MembersHeader = ({ showMembersInChannel, onToggleShowMembers }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-semibold text-gray-200">Server Members</h2>
      </div>

      {/* Show Members switch */}
      <div className="flex items-center justify-between mt-6 mb-8">
        <div>
          <h3 className="text-[15px] text-gray-200 font-medium mb-1">
            Show Members in Channel List
          </h3>
          <p className="text-sm text-gray-400">
            Enabling this will show the members page in the channel list, allowing you to see quickly who's recently joined your server and find any users flagged for unusual activity.
          </p>
        </div>

        {/* Simple mock switch */}
        <button
          onClick={onToggleShowMembers}
          className={`w-10 h-6 shrink-0 rounded-full p-1 transition-colors ${
            showMembersInChannel ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              showMembersInChannel ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </>
  );
};
