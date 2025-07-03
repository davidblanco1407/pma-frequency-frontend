import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Logo / Imagen */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src="/images/logo-pma.png"
          alt="Logo de PMA Frequency"
          style={{ height: '80px' }}
        />
      </div>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
        PMA Frequency
      </h1>
      <h2 style={{ fontWeight: 'normal', color: '#666', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Plataforma de gestión y participación para la comunidad PMA
      </h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>¿Qué es PMA Frequency?</h3>
        <p>
          <em>PMA Frequency</em> es una plataforma digital desarrollada para fortalecer la organización, inclusión y participación activa de los miembros de la comunidad PMA. Nace como una respuesta a la necesidad de contar con un sistema accesible que facilite la gestión interna y promueva el sentido de pertenencia.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Objetivo del proyecto</h3>
        <p>
          El objetivo principal de <strong>PMA Frequency</strong> es ofrecer una aplicación web accesible que permita, en su primera fase, gestionar de forma organizada y segura a los miembros de la comunidad PMA. Esto incluye el registro, administración y seguimiento del estado de cada persona involucrada.
        </p>
        <p>
          A futuro, esta plataforma está pensada como una base sólida sobre la cual puedan desarrollarse nuevas funcionalidades según las necesidades reales de la comunidad, promoviendo una evolución constante hacia un ecosistema digital más inclusivo y funcional.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>¿A quién está dirigido?</h3>
        <p>
          PMA Frequency está diseñado para acompañar los procesos organizativos de la comunidad PMA, ofreciendo una solución accesible tanto para quienes gestionan la comunidad como para sus integrantes. Su enfoque busca fortalecer la participación activa, la transparencia en los procesos internos y la accesibilidad digital.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Funciones actuales</h3>
        <ul>
          <li>Registro y gestión de miembros activos</li>
          <li>Desactivación y reactivación controlada según el historial del miembro</li>
          <li>Envío de solicitudes de corrección por parte de los miembros</li>
          <li>Revisión y administración de solicitudes por parte del equipo gestor</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Visión a futuro</h3>
        <p>
          Esta herramienta está concebida como un proyecto vivo. Se proyecta que en nuevas etapas se incorporen módulos para la gestión de actividades, seguimiento de formación, foros internos o incluso espacios para compartir producciones y logros de los miembros.
        </p>
        <p>
          La meta es que PMA Frequency crezca junto con su comunidad, adaptándose a sus dinámicas reales y fortaleciendo el acceso justo a los procesos organizativos y formativos.
        </p>
      </section>

      {/* Cita institucional */}
      <blockquote style={{ fontStyle: 'italic', color: '#555', borderLeft: '4px solid #007bff', paddingLeft: '1rem', marginBottom: '2rem' }}>
        “PMA no es solo una comunidad, es un espacio donde la discapacidad visual no limita el talento ni la pasión por el sonido.”<br />
        <span style={{ fontWeight: 'bold' }}>— Mauricio Haro, fundador de la comunidad PMA</span>
      </blockquote>

      {/* Créditos */}
      <section style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>
        <p>Desarrollado con ❤️ por <strong>David Blanco</strong> — integrante y creador del sistema PMA Frequency.</p>
        <p>Proyecto académico con proyección comunitaria.</p>
      </section>
            {/* Enlace para volver al inicio */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#007bff',
          fontWeight: 'bold',
        }}>
          ← Volver al inicio
        </Link>
      </div>

    </main>
  )
}
