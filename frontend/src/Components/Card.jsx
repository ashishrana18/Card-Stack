import React, { useRef, useState } from "react";
import { FaRegFileAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {motion, useAnimation } from "framer-motion";
import {BASE_URL} from "../assets/URL"
import axios from 'axios';

function Card({ reference, textContent, id, color, onDelete}) {
  const cardRef = useRef();
  const [inputText, setInputText] = useState(textContent);
  const [fileSize, setFileSize] = useState("");
  const [showFileSize, setShowFileSize] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  console.log(color);

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`${BASE_URL}/cards/${id}`, { description: inputText });
      setInputText(inputText.trim());
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      event.preventDefault();
      setInputText(inputText.trim());
      await handleSaveChanges(); // Call handleSaveChanges function
      event.target.blur();
    }
  };
  
  const handleDownloadText = () => {
    const blob = new Blob([inputText], { type: "text/plain" });
    const sizeInBytes = blob.size;
  
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = sizeInBytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    const fileSizeString = `${size.toFixed(2)} ${units[unitIndex]}`;
  
    console.log("File size:", fileSizeString);
  
    setFileSize(fileSizeString);
  
    setShowFileSize(true);
    setTimeout(() => {
      setShowFileSize(false);
    }, 3000);
  
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "card_text.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="m-6">
      <motion.div 
        // ref={reference}
        drag
        dragConstraints={reference}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="w-60 h-72 rounded-[28px] bg-zinc-900/90 px-6 py-8 overflow-hidden relative"
      >
        <FaRegFileAlt className="text-[#f1f1f1]" />
        <textarea
          className="text-sm leading-tight mt-5 mb-5 bg-transparent text-[#ecf4e5] font-semibold bg-transparent outline-none resize-none w-full h-full overflow-y-auto"
          style={{ maxHeight: "calc(100% - 4.25rem)", overflowY: "auto", position: "relative" }}
          // placeholder="Type here..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div className="inline-block items-center bottom-[3.75rem] right-[0.08rem] text-white p-4 absolute">
          <span className="h-7 w-7 bg-gray-700 rounded-full flex justify-center items-center" onClick={onDelete}>
            <MdDeleteOutline size={"1.2rem"}/>
          </span>
        </div>
        <div className="footer text-zinc-800 absolute bottom-0 w-full left-0">
          <div onClick={handleDownloadText} className={`flex justify-between items-center ${color} h-[3.5rem] p-4 download-section`}>
          {/* <div onClick={handleDownloadText} className={"flex justify-between items-center bg-blue-500 h-[3.5rem] p-4 download-section"}> */}
            <h1 className="font-bold pl-1 text-base">{showFileSize ? fileSize && <div>File size: {fileSize}</div> : "Download"}</h1>
            <FaCloudDownloadAlt size="1.3em" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Card;