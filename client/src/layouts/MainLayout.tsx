import React from "react";
import Navbar from "../components/NavBar";
import { Container } from "@material-ui/core";
import Player from "@/components/Player";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Music platform"}</title>
        <meta
          name="description"
          content={"Music platfrom with best tracks" + description}
        />
      </Head>
      <Navbar />
      <Container style={{ margin: "90px 0" }}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
