import { Fragment, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { toastFail } from "../toast";
import { ShortLinker_colors } from "@ShortLinker/theme/colors";

interface CopyToClipboardProps {
  content: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ content }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    } catch (error) {
      toastFail(`Failed to copy: ${content}`);
    }
  };
  return (
    <Fragment>
      {copySuccess ? (
        <FaCheckCircle
          color={ShortLinker_colors.green[100]}
          size={13}
          onClick={() => setCopySuccess(false)}
          aria-label="Copy Success"
        />
      ) : (
        <MdContentCopy
          color={ShortLinker_colors.primary}
          size={13}
          onClick={() => handleCopyClick()}
          aria-label="Copy URL"
        />
      )}
    </Fragment>
  );
};

export default CopyToClipboard;
