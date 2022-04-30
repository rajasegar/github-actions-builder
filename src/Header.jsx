import styles from './Header.module.css';
import DownloadButton from './DownloadButton';
import ImportButton from './ImportButton';

export default function Header({onImport}) {
  return (
<header>
  <h1 className={styles.brand}>Github Actions Builder</h1>
  <div className={styles.menu}>
    <DownloadButton/>
    <ImportButton onImport={onImport} />
  </div>
</header>
  )
}
