/**
 *  * Attachment picker generic component
 * Allows user to upload an attachment
 * Display file name and (image)
 *
 * @author Ulrich
 *
 */

import React from "react";
// component
import { userUtils } from "./../../helpers";
function AttachmentPicker({
  reference,
  label = "File upload",
  disabled = false,
  handlePickAttachment,
  handleRemoveAttachment,
  files,
  id = "attachment-picker",
  className,
  isAuthorized = false,
  authorizedRoles = [],
  userRoles = [],
  ...props
}) {
  const canAccess = userUtils.isUserRoleValid(userRoles, authorizedRoles);
  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve({ file, url: reader.result, id: Date.now(), isLocal: true });
      };

      reader.readAsDataURL(file);
    });
  };
  /**
   * Pick file handler
   *
   */
  const handlePickFile = async (e) => {
    const { files } = e.target;
    if (
      !files ||
      files.length === 0 ||
      !handlePickAttachment ||
      typeof handlePickAttachment !== "function"
    ) {
      return;
    }
    const promisesArray = Object.values(files).map((file) => {
      return readFileAsync(file);
    });
    const res = await Promise.all(promisesArray);

    if (res) {
      handlePickAttachment(res);
    }
  };

  /**
   * Remove attachment handlers
   *
   */
  const handleRemoveFile = (e, file) => {
    e.preventDefault();
    handleRemoveAttachment(file);
  };

  const renderImage = () => {
    if (!files || !files.length) {
      return null;
    }

    return files.map((file, index) => (
      <div className="attachment-image" index={index}>
        <img src={file.url} alt="avarta" />
        <i
          className="material-icons delete-icon"
          onClick={(e) => handleRemoveFile(e, file)}
        >
          remove_circle_outline
        </i>
      </div>
    ));
  };

  const pickerClassName = ["attachment-picker-container"];
  if (disabled) {
    pickerClassName.push("disabled");
  }
  return (
    <div className={pickerClassName.join(" ")}>
      {isAuthorized || canAccess ? (
        <div className={`attachment-picker ${className ? className : ""}`}>
          <input
            id={id}
            type="file"
            onChange={handlePickFile}
            className="attachment-picker"
            disabled={disabled}
            ref={reference}
            {...props}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ) : (
        "You dont have right to upload"
      )}
      <div className="attachment-image__container">{renderImage()}</div>
    </div>
  );
}

export default AttachmentPicker;
