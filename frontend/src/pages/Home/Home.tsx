import styles from './home.module.css';
import Header from '../sections/Header/Header';
import Profile from '../sections/Profile/Profile';
import Skills from '../sections/Skills/Skills';
import ScrollHint from '@/components/ScrollHint/ScrollHint';

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.home__content}>
        <section id="profile" className={styles.home__content__section}>
          <Profile />
          <ScrollHint />
        </section>
        <section id="skills" className={styles.home__content__section}>
          <Skills />
          <ScrollHint />
        </section>
      </main>
    </div>
  );
}
