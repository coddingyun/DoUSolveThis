import { Button } from "@chakra-ui/react";

const AccountManagementButton = ({ title, onClick }) => {
  return (
    <Button
      className="px-4 py-2.5 shadow-sm border border-solid !bg-white border-gray-300 rounded-lg text-sm font-semibold"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default AccountManagementButton;
