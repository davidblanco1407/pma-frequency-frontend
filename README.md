# 🎧 PMA Frequency – Frontend

**PMA Frequency** es una plataforma web pensada para gestionar miembros, sanciones y solicitudes dentro de una comunidad de producción musical enfocada en la accesibilidad para personas con discapacidad visual.

Este repositorio contiene la interfaz **frontend** del sistema, desarrollada con **React + Vite**.

---

## 🚀 Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Phone Number Input](https://github.com/catamphetamine/react-phone-number-input)

---

## ⚙️ Instalación y configuración

1. Clona el repositorio:

```bash
git clone https://github.com/davidblanco1407/pma-frequency-frontend.git
cd pma-frequency-frontend
````

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` si deseas configurar rutas o entornos personalizados (opcional).

4. Levanta el servidor de desarrollo:

```bash
npm run dev
```

La aplicación quedará disponible normalmente en `http://localhost:5173`.

---

## 📂 Estructura del proyecto

```
src/
│
├── components/         # Componentes reutilizables (modales, formularios, tablas)
│   ├── admin/          # Interfaces para administradores
│   └── miembro/        # Vistas de miembros
│
├── context/            # Contexto global de autenticación
├── pages/              # Páginas principales por ruta
├── services/           # Lógica de conexión con la API (axios, endpoints)
└── utils/              # Funciones auxiliares (formato, errores, etc.)
```

---

## 🔐 Autenticación y roles

El sistema se conecta al backend vía **JWT**. El contexto de autenticación (`AuthContext`) gestiona los siguientes estados:

* Usuario autenticado
* Token válido
* Rol: Admin | Miembro
* Redirección por rutas protegidas

---

## 🧪 Funcionalidades principales

* ✅ Login y logout con JWT
* ✅ Dashboard de administración
* ✅ Registro, edición, bloqueo y reactivación de miembros
* ✅ Registro y visualización de sanciones
* ✅ Envío de solicitudes de corrección por miembros
* ✅ Panel para gestionar y responder solicitudes (admin)
* ✅ Cambio de contraseña
* ✅ Accesibilidad y soporte para lectores de pantalla

---

## 🌐 Variables de entorno (opcional)

Puedes definir una variable para la URL base de la API:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Si no se define, se usará el valor por defecto en `services/api.js`.

---

## 📦 Build para producción

```bash
npm run build
```

Esto generará una carpeta `dist/` lista para deploy.

---

## 👨‍💻 Autor

Creado por [@davidblanco1407](https://github.com/davidblanco1407) con apoyo de IA.

---

## 🧠 Nota final

Este proyecto tiene como objetivo facilitar la participación y organización de personas con discapacidad visual en entornos musicales digitales. Cada línea de código aquí busca ser una herramienta más para la inclusión y la accesibilidad real. 💚

---
