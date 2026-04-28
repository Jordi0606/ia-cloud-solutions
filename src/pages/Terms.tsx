import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" /> Volver al inicio
      </Link>
      <h1 className="font-display text-3xl font-bold mb-8">Condiciones Generales de Uso</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Aceptación de las condiciones</h2>
          <p>El acceso y uso de este sitio web implica la aceptación plena y sin reservas de las presentes Condiciones Generales de Uso. Si el usuario no está de acuerdo con alguna de estas condiciones, deberá abstenerse de utilizar el sitio web.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Uso del sitio web</h2>
          <p>El usuario se compromete a utilizar el sitio web de forma diligente, correcta y lícita, y en particular se compromete a no:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Utilizar el sitio web con fines ilícitos o contrarios al orden público.</li>
            <li>Introducir virus informáticos o cualquier tipo de software malicioso.</li>
            <li>Intentar acceder de manera no autorizada a áreas restringidas del sitio web.</li>
            <li>Reproducir, copiar o distribuir contenidos del sitio web sin autorización previa.</li>
            <li>Suplantar la identidad de otro usuario o persona.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Servicios ofrecidos</h2>
          <p>IAcloWd ofrece servicios de consultoría y desarrollo en el ámbito de la inteligencia artificial, incluyendo pero no limitándose a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Desarrollo e implementación de chatbots y asistentes virtuales.</li>
            <li>Automatización de procesos empresariales.</li>
            <li>Integración de sistemas con IA.</li>
            <li>Consultoría en transformación digital.</li>
            <li>Análisis de datos y estrategia de IA.</li>
          </ul>
          <p>Las condiciones específicas de cada servicio se acordarán de forma individualizada con cada cliente mediante un contrato o propuesta comercial independiente.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Limitación de responsabilidad</h2>
          <p>IAcloWd no garantiza la disponibilidad permanente del sitio web ni la ausencia de errores en su contenido. No será responsable de:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Interrupciones del servicio por causas técnicas o de fuerza mayor.</li>
            <li>Daños derivados del uso o la imposibilidad de uso del sitio web.</li>
            <li>Contenidos de sitios web de terceros enlazados desde esta página.</li>
            <li>Decisiones tomadas por el usuario basándose en la información del sitio web.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Confidencialidad</h2>
          <p>Toda la información intercambiada entre IAcloWd y sus clientes a través de este sitio web o cualquier otro canal será tratada con la máxima confidencialidad, de acuerdo con la legislación vigente en materia de protección de datos.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Propiedad intelectual</h2>
          <p>Los derechos de propiedad intelectual de los servicios y soluciones desarrollados por IAcloWd se regularán en el contrato específico de cada proyecto. Salvo pacto en contrario, IAcloWd conservará los derechos sobre las metodologías, frameworks y herramientas propias utilizadas.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Legislación aplicable</h2>
          <p>Las presentes Condiciones se rigen por la legislación española. Para la resolución de cualquier conflicto, las partes se someten a los Juzgados y Tribunales de Barcelona.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Modificaciones</h2>
          <p>IAcloWd se reserva el derecho de modificar estas Condiciones Generales de Uso en cualquier momento. Las modificaciones serán efectivas desde su publicación en el sitio web.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Normativa aplicable</h2>
          <p>Las presentes condiciones cumplen con la normativa española y europea vigente, en particular con la Ley 34/2002 (LSSI-CE), el Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios), el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>
        </section>

        <p className="text-xs text-muted-foreground/60 pt-4">Última actualización: Abril 2026</p>
      </div>
    </div>
  </div>
);

export default Terms;
