import styles from './HomePage.module.css';
import Profile from '../sections/Profile';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Profile />
    </div>
  );
}
