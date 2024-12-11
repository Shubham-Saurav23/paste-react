import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="container">
      <div className="form-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`title-input ${pasteId ? "title-input-edit" : "title-input-new"}`}
          />
          <button
            className="primary-btn"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>
          {pasteId && (
            <button
              className="primary-btn"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div className="content-container">
          <div className="content-header">
            <div className="status-indicators">
              <div className="indicator red" />
              <div className="indicator yellow" />
              <div className="indicator green" />
            </div>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", { position: "top-right" });
              }}
            >
              <Copy size={20} />
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="textarea"
            style={{ caretColor: "#000" }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;