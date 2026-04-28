import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LegalNotice = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" /> Volver al inicio
      </Link>
      <h1 className="font-display text-3xl font-bold mb-8">Aviso Legal</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Datos identificativos</h2>
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa al usuario de los datos del titular de este sitio web:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Denominación social:</strong> IAcloWd</li>
            <li><strong>Domicilio:</strong> Avenida Montserrat 14, Sant Esteve Sesrovires (08635), Barcelona, España</li>
            <li><strong>Email de contacto:</strong> info@iaclowd.com</li>
            <li><strong>Sitio web:</strong> https://ia-cloud-solutions.lovable.app</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Objeto</h2>
          <p>Este sitio web tiene como finalidad informar sobre los servicios de inteligencia artificial, automatización y consultoría digital ofrecidos por IAcloWd, así como facilitar el contacto con clientes potenciales.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Propiedad intelectual e industrial</h2>
          <p>Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, iconos, diseño gráfico, código fuente y software, son propiedad de IAcloWd o de sus legítimos licenciantes y están protegidos por las leyes de propiedad intelectual e industrial vigentes.</p>
          <p>Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa de IAcloWd, salvo para uso personal y privado, conforme al Real Decreto Legislativo 1/1996, de 12 de abril, por el que se aprueba el Texto Refundido de la Ley de Propiedad Intelectual, y la Ley 17/2001, de 7 de diciembre, de Marcas.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Responsabilidad</h2>
          <p>IAcloWd no se hace responsable de los daños que pudieran derivarse del uso de este sitio web, ni de las decisiones tomadas a partir de la información proporcionada en el mismo. La información se proporciona "tal cual" sin garantía de exactitud, integridad o actualización.</p>
          <p>IAcloWd no se responsabiliza del contenido de sitios web de terceros enlazados desde esta página.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Legislación aplicable y jurisdicción</h2>
          <p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales de Barcelona, con renuncia a cualquier otro fuero que pudiera corresponderles.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Modificaciones</h2>
          <p>IAcloWd se reserva el derecho de modificar el presente Aviso Legal en cualquier momento, siendo efectivos los cambios desde su publicación en el sitio web.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Normativa aplicable</h2>
          <p>Este sitio web cumple con la normativa española y europea vigente, en particular:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD).</li>
            <li>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</li>
            <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).</li>
            <li>Real Decreto Legislativo 1/1996, de Propiedad Intelectual.</li>
            <li>Ley 17/2001, de Marcas.</li>
          </ul>
        </section>

        <p className="text-xs text-muted-foreground/60 pt-4">Última actualización: Abril 2026</p>
      </div>
    </div>
  </div>
);

export default LegalNotice;
