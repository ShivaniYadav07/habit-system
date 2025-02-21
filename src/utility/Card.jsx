import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white/30 dark:bg-pink-500/10 backdrop-blur-md shadow-lg rounded-lg p-6 ${className}`}>
    {children}
  </div>
  
  );
};

Card.Header = ({ children }) => {
  return <div className="mb-4 font-semibold text-lg">{children}</div>;
};

Card.Title = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

Card.Content = ({ children }) => {
  return <div className="">{children}</div>;
};
