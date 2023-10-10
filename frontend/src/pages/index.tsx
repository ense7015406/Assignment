import styles from "../../styles/HomePage.module.scss";

export default function Home() {
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Software Practice Empirical Evidence Database (SPEED)</h1>

			<div className={styles.content}>
				<p>Welcome to SPEED, your resource for software practice empirical evidence.</p>
				<p>Explore our database of articles and select software practices to learn more.</p>
				<p>Ready to contribute? Submit your own articles and findings to share with the community.</p>
			</div>
		</div>
	);
}
