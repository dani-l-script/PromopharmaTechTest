"use client";

import React from "react";
import dynamic from "next/dynamic";

interface CSRComponentProps {
  children: React.ReactElement;
  componentImportName: string;
}

const CSRComponent: React.FC<CSRComponentProps> = ({
  children,
  componentImportName,
}) => {
  const DynamicComponent = dynamic(
    () => import(`@components/${componentImportName}/${componentImportName}`),
    {
      ssr: false,
    }
  );

  return (
    <div>
      <DynamicComponent {...children.props} />
    </div>
  );
};

export default CSRComponent;
