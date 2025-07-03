import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', lineHeight: 1.6 }}>
      {/* Hero principal */}
      <section style={{
        backgroundColor: '#001f3f',
        color: '#fff',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Bienvenido a PMA Frequency
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          La plataforma digital diseñada para fortalecer la organización y participación de la comunidad PMA.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/login" style={styles.button}>Iniciar sesión</Link>
          <Link to="/about" style={styles.secondaryButton}>Conocer más</Link>
        </div>
      </section>

      {/* Sección: quiénes somos */}
      <section style={styles.section}>
        <h2>¿Quiénes somos?</h2>
        <p>
          PMA (Producción Musical Accesible) es una comunidad integrada por personas con discapacidad visual interesadas en el mundo del audio: producción musical, radio online, edición y más. Esta plataforma es una extensión digital de esa comunidad, pensada para acompañar sus procesos organizativos con inclusión y tecnología.
        </p>
      </section>

      {/* Sección: cómo funciona */}
      <section style={styles.sectionAlt}>
        <h2>¿Cómo funciona?</h2>
        <ul style={{ maxWidth: '600px', margin: '0 auto', paddingLeft: '1rem' }}>
          <li>Los miembros pueden registrarse y actualizar su información.</li>
          <li>Los administradores gestionan los perfiles y solicitudes.</li>
          <li>La plataforma controla quién está activo, inactivo o bloqueado.</li>
          <li>Todo se gestiona desde una sola interfaz, accesible y segura.</li>
        </ul>
      </section>

      {/* Llamado a la acción final */}
      <section style={styles.section}>
        <h2>Comienza ahora</h2>
        <p>
          Si ya haces parte de PMA, inicia sesión para acceder a tu perfil. Si eres nuevo, ponte en contacto con los administradores de la comunidad para unirte.
        </p>
        <Link to="/login" style={styles.button}>Entrar al sistema</Link>
      </section>
    </main>
  )
}

const styles = {
  section: {
    padding: '3rem 2rem',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionAlt: {
    padding: '3rem 2rem',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  button: {
    display: 'inline-block',
    marginTop: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  secondaryButton: {
    display: 'inline-block',
    marginTop: '1rem',
    marginLeft: '1rem',
    color: '#fff',
    border: '2px solid #fff',
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
}
