import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h3>
        Alok Jagawat Tweets Showcase
      </h3>
      <a className="twitter-timeline" href="https://twitter.com/AlokJagawat?ref_src=twsrc%5Etfw">Tweets by AlokJagawat</a> <script async src="https://platform.twitter.com/widgets.js" ></script>
    </main>
  );
}
