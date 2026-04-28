import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" /> Volver al inicio
      </Link>
      <h1 className="font-display text-3xl font-bold mb-8">Política de Privacidad</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Responsable del tratamiento</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Responsable:</strong> IAcloWd</li>
            <li><strong>Domicilio:</strong> Sant Esteve Sesrovires (08635), Barcelona, España</li>
            <li><strong>Email:</strong> info@iaclowd.com</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Datos personales que recogemos</h2>
          <p>A través de nuestro formulario de contacto, recogemos los siguientes datos:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono (opcional)</li>
            <li>Nivel de prioridad de la consulta</li>
            <li>Contenido del mensaje</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Finalidad del tratamiento</h2>
          <p>Los datos personales recogidos se utilizan exclusivamente para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gestionar y responder a las solicitudes de contacto.</li>
            <li>Enviar información comercial relacionada con nuestros servicios, solo si el usuario ha dado su consentimiento expreso.</li>
            <li>Mejorar la calidad de nuestros servicios y la experiencia del usuario.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Base legal del tratamiento</h2>
          <p>El tratamiento de sus datos se fundamenta en:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD): al enviar el formulario de contacto.</li>
            <li><strong>Interés legítimo</strong> (art. 6.1.f RGPD): para gestionar solicitudes comerciales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Conservación de datos</h2>
          <p>Los datos personales se conservarán durante el tiempo necesario para atender la solicitud y, en todo caso, durante los plazos legalmente establecidos. Los datos de contacto se eliminarán cuando ya no sean necesarios para la finalidad para la que fueron recogidos.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Destinatarios de los datos</h2>
          <p>Los datos no serán cedidos a terceros, salvo obligación legal. Utilizamos proveedores de servicios de alojamiento y bases de datos que pueden actuar como encargados del tratamiento, ubicados dentro del Espacio Económico Europeo o en países que ofrecen un nivel adecuado de protección.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Derechos del interesado</h2>
          <p>El usuario puede ejercer los siguientes derechos en cualquier momento enviando un email a info@iaclowd.com:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Acceso:</strong> conocer qué datos personales se están tratando.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de sus datos.</li>
            <li><strong>Limitación:</strong> restringir el tratamiento en determinados supuestos.</li>
            <li><strong>Portabilidad:</strong> recibir los datos en un formato estructurado.</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos.</li>
          </ul>
          <p>Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Seguridad</h2>
          <p>IAcloWd ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, conforme al estado de la tecnología y la naturaleza de los datos almacenados.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Normativa aplicable</h2>
          <p>El tratamiento de datos personales se realiza conforme a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Reglamento (UE) 2016/679 (RGPD).</li>
            <li>Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).</li>
            <li>Ley 34/2002 (LSSI-CE).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Transferencias internacionales</h2>
          <p>En caso de que algún encargado de tratamiento esté ubicado fuera del Espacio Económico Europeo, IAcloWd garantizará que existan las salvaguardas adecuadas previstas en los artículos 44 a 49 del RGPD (cláusulas contractuales tipo aprobadas por la Comisión Europea o decisiones de adecuación).</p>
        </section>

        <p className="text-xs text-muted-foreground/60 pt-4">Última actualización: Abril 2026</p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
