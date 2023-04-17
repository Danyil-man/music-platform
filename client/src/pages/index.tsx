import styles from "@/styles/Home.module.css";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className={styles.center}>
          <h1>Welcome to Music Platfrom</h1>
          <h3>The best songs are collected here</h3>
        </div>
      </MainLayout>
    </>
  );
}
