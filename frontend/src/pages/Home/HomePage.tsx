import { useEffect, useState } from 'react'
import Button from '@/components/Button/Button'
import styles from './HomePage.module.css'
import Profile from '../sections/Profile'

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then(() => setApiStatus('ok'))
      .catch(() => setApiStatus('error'))
  }, [])

  return (
    <div className={styles.homePage}>
      <Profile />
    </div>

  )
}
