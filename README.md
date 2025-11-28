# AnimeCBF React

Plataforma web moderna para visualización y descubrimiento de series y películas de anime, construida con React 18 y Vite.

## 🚀 Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Framer Motion** - Animaciones
- **React Icons** - Iconos
- **Kitsu API** - Datos de anime

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## 🛠️ Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
npm run lint:fix

# Formateo de código
npm run format
npm run format:check
```

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes React
│   ├── common/      # Componentes compartidos
│   ├── anime/       # Componentes de anime
│   ├── home/        # Componentes de home
│   └── layout/      # Componentes de layout
├── pages/           # Páginas principales
├── context/         # Context providers
├── hooks/           # Custom hooks
├── services/        # Servicios API
├── utils/           # Utilidades
└── styles/          # Estilos globales
```

## 🌐 Variables de Entorno

- `VITE_API_BASE_URL` - URL base de la API de Kitsu
- `VITE_APP_NAME` - Nombre de la aplicación

## 📝 Scripts Disponibles

- `dev` - Inicia el servidor de desarrollo
- `build` - Construye la aplicación para producción
- `build:analyze` - Construye y abre el analizador de bundle
- `preview` - Preview del build de producción
- `lint` - Ejecuta ESLint
- `lint:fix` - Ejecuta ESLint y corrige errores
- `format` - Formatea el código con Prettier
- `format:check` - Verifica el formato del código
- `test` - Ejecuta los tests
- `test:watch` - Ejecuta los tests en modo watch
- `test:ui` - Abre la interfaz de tests

## 🎨 Características

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Tema claro/oscuro
- ✅ Lazy loading de imágenes
- ✅ Infinite scroll
- ✅ Búsqueda con debounce
- ✅ Animaciones fluidas
- ✅ Accesibilidad (WCAG AA)
- ✅ Code splitting
- ✅ Optimización de performance

## ⚡ Optimizaciones

La aplicación incluye optimizaciones completas de assets:

- **Minificación**: CSS y JavaScript minificados con esbuild
- **Compresión**: Gzip/Brotli habilitado en servidores
- **Cache Headers**: Configuración de cache para assets estáticos (1 año)
- **Code Splitting**: Separación de vendors para mejor caching
- **Asset Inlining**: Assets pequeños (<4KB) inlineados como base64
- **Bundle Analysis**: Visualizador de bundle incluido

### Análisis de Bundle

Para analizar el tamaño del bundle:

```bash
npm run build:analyze
```

Esto generará un reporte visual en `dist/stats.html` mostrando el tamaño de cada chunk.

### Configuración de Cache

La aplicación incluye configuración de cache headers para:

- **Vercel**: `vercel.json`
- **Netlify**: `netlify.toml`
- **Apache**: `public/.htaccess`

Los assets con hash en el nombre se cachean por 1 año (immutable), mientras que el HTML no se cachea para asegurar actualizaciones inmediatas.

Para más detalles, consulta [docs/optimization-guide.md](docs/optimization-guide.md).

## 🚀 Deployment

### Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Para producción:
```bash
vercel --prod
```

### Netlify

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

3. Para producción:
```bash
netlify deploy --prod
```

### Build Manual

```bash
# Construir para producción
npm run build


## 📄 Licencia

MIT
