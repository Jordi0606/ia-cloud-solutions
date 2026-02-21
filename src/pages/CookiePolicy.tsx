import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" /> Volver al inicio
      </Link>
      <h1 className="font-display text-3xl font-bold mb-8">Política de Cookies</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. ¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o móvil) cuando visita un sitio web. Se utilizan para que el sitio web funcione correctamente, mejorar su experiencia de navegación y proporcionar información analítica al propietario del sitio.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Tipos de cookies que utilizamos</h2>
          <h3 className="text-base font-medium text-foreground mt-3">Cookies técnicas (necesarias)</h3>
          <p>Son imprescindibles para el funcionamiento del sitio web. Permiten mantener la sesión del usuario, recordar preferencias de idioma y garantizar la seguridad de la navegación.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Sesión de autenticación:</strong> gestión de inicio de sesión para usuarios registrados.</li>
            <li><strong>Preferencia de idioma:</strong> almacena el idioma seleccionado (Castellano, Catalán o Inglés).</li>
          </ul>

          <h3 className="text-base font-medium text-foreground mt-3">Cookies analíticas</h3>
          <p>Nos permiten medir el tráfico y analizar el comportamiento de los usuarios en el sitio web para mejorar nuestros servicios. Estas cookies no recopilan información que identifique personalmente al visitante.</p>

          <h3 className="text-base font-medium text-foreground mt-3">Cookies de terceros</h3>
          <p>Pueden ser instaladas por servicios de terceros integrados en nuestro sitio, como Google Maps para la visualización del mapa de ubicación.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Duración de las cookies</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Cookies de sesión:</strong> se eliminan al cerrar el navegador.</li>
            <li><strong>Cookies persistentes:</strong> permanecen almacenadas durante un período determinado o hasta que el usuario las elimine manualmente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Gestión de cookies</h2>
          <p>El usuario puede configurar su navegador para aceptar, rechazar o eliminar cookies. A continuación, se facilitan los enlaces a las instrucciones de los principales navegadores:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad & Seguridad → Cookies</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
            <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
          </ul>
          <p>Tenga en cuenta que la desactivación de cookies técnicas puede afectar al correcto funcionamiento del sitio web.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Base legal</h2>
          <p>El uso de cookies técnicas se basa en el interés legítimo del responsable (art. 6.1.f RGPD). Para las cookies analíticas y de terceros, la base legal es el consentimiento del usuario (art. 6.1.a RGPD), que se solicita mediante el banner de cookies al acceder al sitio.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Actualización</h2>
          <p>IAcloWd se reserva el derecho de modificar esta Política de Cookies en cualquier momento para adaptarla a novedades legislativas o cambios en el sitio web.</p>
        </section>

        <p className="text-xs text-muted-foreground/60 pt-4">Última actualización: Febrero 2026</p>
      </div>
    </div>
  </div>
);

export default CookiePolicy;
