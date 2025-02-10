import React, { ReactNode } from "react";

interface LayautProps {
  children: ReactNode;
}

const Layout = ({ children }: LayautProps) => {
  return <div>{children}</div>;
};

export default Layout;
