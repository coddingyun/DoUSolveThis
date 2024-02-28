import React from 'react';

const AccountManagementButton = ({ title, onClick }) => {
  return (
    <div
      className="px-4 py-2.5 shadow-sm border border-solid border-gray-300 rounded-lg text-sm font-semibold"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default AccountManagementButton;
