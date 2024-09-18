import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
}
