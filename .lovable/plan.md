
# Plan: Web IAcloWd — Soluciones IA para Empresas, PYMEs y Autónomos

## Diseño y Estética
- **Paleta de colores**: Negro oscuro (#0a0a0f), azul eléctrico (#2563eb / #3b82f6), azul claro (#60a5fa), plateado/gris (#c0c0c0 / #9ca3af), con acentos dorados para la marca
- **Estilo**: Moderno, corporativo y tecnológico. Fondo oscuro con detalles brillantes y gradientes azulados
- **Logo**: Se usará el logo de IAcloWd proporcionado en el encabezado

## Estructura (Landing page única con scroll)

### 1. Encabezado (Header fijo)
- Logo IAcloWd a la izquierda
- Menús desplegables:
  - **Servicios**: Desarrollo de Bots IA, Automatización de Procesos, Integración de Sistemas, Análisis de Datos
  - **Consultoría**: Transformación Digital, Estrategia IA, Auditoría Tecnológica, Formación
  - **Contactar**: Formulario rápido, WhatsApp, Email, Agendar reunión
- Buscador con icono de lupa
- Selector de idioma (Català, Castellano, English)

### 2. Hero Section
- Titular impactante: "Soluciones de IA para tu negocio"
- Subtítulo descriptivo sobre servicios para empresas, PYMEs y autónomos
- Botón CTA principal

### 3. Menú de Servicios (barra dividida en 6 secciones)
- **Bots**: Chatbots inteligentes, asistentes virtuales
- **Automatización y optimización de procesos**: Flujos de trabajo, RPA, eficiencia operativa
- **Resolución de problemas IA**: Diagnóstico, análisis predictivo, soluciones a medida
- **Monetiza tu empresa**: Estrategias de ingresos con IA, modelos de negocio digital
- **Soluciones Integrales**: Proyectos end-to-end, consultoría 360
- **Chats**: Sistemas de comunicación inteligente, atención al cliente

Cada sección con icono, título y breve descripción. Al hacer clic, scroll a contenido detallado más abajo.

### 4. Secciones de detalle de cada servicio
- Tarjetas con información expandida de cada uno de los 6 servicios
- Iconos representativos y descripciones claras

### 5. FAQ + Formulario de Contacto
- Sección de preguntas frecuentes con acordeón desplegable
- Formulario simple: Nombre, Email, Teléfono, Mensaje
- Los datos se guardarán en base de datos (Supabase) para gestión posterior

### 6. Mapa de Ubicación
- Mapa embebido (Google Maps / OpenStreetMap) centrado en Avenida Montserrat 14, Sant Esteve Sesrovires (08635), Barcelona
- Dirección y datos de contacto junto al mapa

### 7. Footer
- Aviso Legal
- Política de Privacidad
- Política de Cookies
- Condiciones
- Copyright IAcloWd

## Backend (Lovable Cloud / Supabase)
- Tabla para almacenar consultas del formulario de contacto (nombre, email, teléfono, mensaje, fecha)
- Validación de datos tanto en frontend como en servidor

## Multiidioma
- Sistema de traducción client-side con contexto React para cambiar entre Català, Castellano e English
- Textos almacenados en archivos de traducción JSON
