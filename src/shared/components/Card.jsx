const Card = ({ title, content }) => {
  return (
    <div className="px-4 py-5 shadow-sm rounded-lg border border-solid border-gray-200">
      <h5 className="w-full mb-2 text-gray-500 text-sm leading-5 font-medium">
        {title}
      </h5>
      <h6 className="w-full flex flex-row-reverse text-gray-900 text-2xl leading-8 font-semibold">
        {content}
      </h6>
    </div>
  );
};

export default Card;
