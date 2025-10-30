# Portafolio Profesional

Un portafolio moderno y elegante construido con SvelteKit y TailwindCSS que muestra mi experiencia profesional como desarrollador Full-Stack.

## 🚀 Características

- **Diseño Moderno**: Interfaz elegante con gradientes y efectos visuales atractivos
- **Bilingüe**: Soporte completo para español e inglés con cambio de idioma en tiempo real
- **Animaciones Suaves**: Transiciones y animaciones CSS para una experiencia fluida
- **Responsive**: Totalmente adaptable a diferentes tamaños de pantalla
- **Performance Optimizado**: Construido con SvelteKit para máxima velocidad
- **SEO Friendly**: Meta tags y estructura semántica optimizada
- **Persistencia**: El idioma seleccionado se guarda en localStorage

## 🛠️ Tecnologías Utilizadas

- **SvelteKit**: Framework principal
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS 4**: Framework CSS para estilos modernos
- **Bun**: Runtime y package manager
- **Vite**: Build tool ultrarrápido

## 📦 Instalación

```bash
# Instalar dependencias
bun install

# Ejecutar en modo desarrollo
bun run dev

# Build para producción
bun run build

# Preview del build de producción
bun run preview
```

## 🎨 Personalización

### Actualizar Información Personal

Edita el archivo `src/lib/i18n/translations.ts` para actualizar:

1. **Información de Contacto**: Modifica los enlaces en `src/routes/+page.svelte` (email, LinkedIn, GitHub)
2. **Proyectos**: Actualiza el array `projects` en ambos idiomas (es/en) en el archivo de traducciones
3. **Textos**: Todos los textos están centralizados en `src/lib/i18n/translations.ts`

### Sistema de Idiomas

El portafolio incluye un sistema completo de internacionalización:

- **Archivo de traducciones**: `src/lib/i18n/translations.ts` contiene todos los textos en español e inglés
- **Store de idioma**: `src/lib/stores/language.ts` maneja el estado del idioma actual
- **Botón de cambio**: Componente flotante en la esquina superior derecha
- **Persistencia**: El idioma se guarda automáticamente en localStorage
- **Tipado completo**: TypeScript asegura que todas las traducciones estén completas

### Agregar Screenshots

Para agregar capturas de pantalla de tus proyectos:

1. Coloca las imágenes en la carpeta `static/`
2. Agrega un campo `image` al objeto de cada proyecto
3. Usa el componente de imagen en el template

### Cambiar Colores

Los colores principales están definidos en las clases de Tailwind. Puedes personalizar:

- Gradientes de fondo: Modifica las clases `from-*` y `to-*`
- Colores de acento: Cambia los valores en el objeto `project.color`

## 📱 Secciones

- **Hero**: Presentación principal con título llamativo
- **Sobre Mí**: Breve descripción profesional
- **Experiencia Profesional**: Detalle de proyectos y logros
- **Stack Tecnológico**: Habilidades organizadas por categoría
- **Contacto**: Enlaces a redes sociales y email

## 🎯 Mejoras Futuras

- [ ] Agregar modo claro/oscuro
- [ ] Implementar i18n (internacionalización)
- [ ] Agregar formulario de contacto funcional
- [ ] Incluir blog técnico
- [ ] Agregar sección de certificaciones

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

Desarrollador Full-Stack especializado en Go, SvelteKit, Flutter y tecnologías modernas.

---

Desarrollado con ❤️ usando SvelteKit
