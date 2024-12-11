import "./Paste.css";
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search paste here..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="pastes-list">
          <h2 className="list-heading">All Pastes</h2>
          <div className="pastes-container">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div key={paste?._id} className="paste-card">
                  <div className="paste-details">
                    <p className="paste-title">{paste?.title}</p>
                    <p className="paste-content">{paste?.content}</p>
                  </div>

                  <div className="paste-actions">
                    <div className="action-buttons">
                      <button className="edit-btn">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine size={20} />
                        </a>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2 size={20} />
                      </button>
                      <button className="view-btn">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye size={20} />
                        </a>
                      </button>
                      <button
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy size={20} />
                      </button>
                    </div>

                    <div className="paste-date">
                      <Calendar size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;