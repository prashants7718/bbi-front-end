import { useState } from "react";

interface CreateTeamProps {
  onClose: () => void;
  handleCreateTeam: () => void;
  teamName: string;
   setTeamName: (teamName:string) => void;
}

const CreateTeamDialog = ({
  onClose,
  handleCreateTeam,
  teamName,
  setTeamName,
 }: CreateTeamProps) => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-auto">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <div className="mb-4">
          <h3 className="text-lg py-1 font-normal text-textBlack">
            Create New Team
          </h3>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full h-9 px-2 border rounded"
            placeholder="Enter Team Name"
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTeam}
            className={`px-4 py-1 bg-blueBackground text-secondaryPink rounded ${
              creating ? "cursor-wait" : ""
            }`}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Team"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamDialog;
