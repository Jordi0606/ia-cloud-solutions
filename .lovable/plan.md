

## Problema

En el archivo `src/components/FaqContact.tsx` (líneas 183-191), todavía aparece el botón de WhatsApp con el icono `FaWhatsapp` y el enlace `https://wa.me/34613825828`. Este es el bloque de contacto que se muestra debajo del formulario.

## Plan

### 1. Sustituir WhatsApp por Telegram en FaqContact.tsx

- Cambiar el import de `FaWhatsapp` por `FaTelegramPlane` de `react-icons/fa`
- Cambiar el enlace de `https://wa.me/34613825828` a `https://t.me/Reguant_Bot`
- Cambiar el icono y sus colores (de verde WhatsApp a azul Telegram)
- Actualizar el texto del número de teléfono por `@Reguant_Bot`

### 2. Publicar los cambios

- Tras aplicar los cambios, deberás pulsar **Publish → Update** para que se reflejen en la web pública.

### Detalle técnico

**Archivo**: `src/components/FaqContact.tsx`
- Línea 7: Cambiar `import { FaWhatsapp } from "react-icons/fa"` → `import { FaTelegramPlane } from "react-icons/fa"`
- Líneas 183-191: Reemplazar el bloque `<a href="https://wa.me/...">` por uno con `href="https://t.me/Reguant_Bot"`, icono `FaTelegramPlane` en azul (`text-[#26A5E4]`), y texto `@Reguant_Bot`

