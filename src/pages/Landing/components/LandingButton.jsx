const LandingButton = ({ title, clickEvent, bgColor }) => {
  let customColor;
  if (bgColor === 'brand') {
    customColor =
      'bg-brand-600 hover:bg-purple-400 text-white focus-visible:outline-purple-500';
  } else {
    customColor =
      'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 focus-visible:outline-blue-500';
  }
  const buttonClasses = `w-96 h-10 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${customColor}`;

  return (
    <span className="sm:ml-3">
      <button type="button" className={buttonClasses} onClick={clickEvent}>
        <div className="text-base font-medium">{title}</div>
      </button>
    </span>
  );
};

export default LandingButton;
