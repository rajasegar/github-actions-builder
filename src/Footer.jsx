import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <p>Built with <span className={styles.red}>&hearts;</span> by <a href="https://twitter.com/rajasegar_c">Rajasegar</a></p>
    </footer>
  )
}

export default Footer;
