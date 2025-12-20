import React from "react";
import "../../css/deleteModalCss/deleteModal.css"

export default function DeleteModal({ name, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4 className="modal-title">Delete Student</h4>

        <p className="modal-text">
          Are you sure you want to delete <strong>{name}</strong>?  
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
