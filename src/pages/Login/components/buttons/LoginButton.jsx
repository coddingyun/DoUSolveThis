const LoginButton = ({ icon, bgColor, click }) => {
  const borderClasses = bgColor === 'bg-white' ? 'border border-gray-300' : '';
  const buttonClasses = `p-3 rounded-lg ${bgColor} ${borderClasses}`;

  return (
    <button type="button" className={buttonClasses} onClick={click}>
      {icon}
    </button>
  );
};

export default LoginButton;
