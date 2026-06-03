import styles from './home.module.css';
import Profile from '../sections/Profile';
import Header from '../sections/Header/Header';

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Profile />
    </div>
  );
}
