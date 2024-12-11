// ViewPaste.jsx
import "./ViewPaste.css";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  // Find the paste by ID
  const paste = pastes.find((paste) => paste._id === id);

  return (
    <div className="view-paste-container">
      <div className="view-paste-wrapper">
        <input
          type="text"
          placeholder="Title"
          value={paste?.title || ""}
          disabled
          className="view-paste-title"
        />
        <div className="view-paste-content-container">
          <div className="view-paste-header">
            <div className="view-paste-circles">
              <div className="red-circle" />
              <div className="yellow-circle" />
              <div className="green-circle" />
            </div>
            <button
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(paste?.content || "");
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy size={20} />
            </button>
          </div>

          <textarea
            value={paste?.content || ""}
            disabled
            placeholder="Write Your Content Here...."
            className="view-paste-textarea"
            style={{ caretColor: "#000" }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;