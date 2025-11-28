# Guía de Deployment - AnimeCBF React

Esta guía proporciona instrucciones detalladas para desplegar AnimeCBF React en diferentes plataformas.

## 📋 Tabla de Contenidos

- [Preparación para Deployment](#preparación-para-deployment)
- [Vercel (Recomendado)](#vercel-recomendado)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Servidor Propio](#servidor-propio)
- [Variables de Entorno](#variables-de-entorno)
- [Optimizaciones](#optimizaciones)
- [Troubleshooting](#troubleshooting)

## Preparación para Deployment

### 1. Build de Producción

Antes de desplegar, asegúrate de que el build funciona correctamente:

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Crear build de producción
npm run build

# Preview del build
npm run preview
```

### 2. Verificar Variables de Entorno

Asegúrate de que todas las variables de entorno necesarias estén configuradas:

```env
VITE_API_BASE_URL=https://kitsu.io/api/edge
VITE_APP_NAME=AnimeCBF
```

### 3. Verificar Configuración

- ✅ `.gitignore` incluye `dist/`, `node_modules/`, `.env`
- ✅ `package.json` tiene scripts de build
- ✅ Archivos de configuración de deployment están presentes

## Vercel (Recomendado)

Vercel es la plataforma recomendada para aplicaciones React con Vite.

### Deployment Automático desde GitHub

1. **Conectar Repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub

2. **Configurar Proyecto**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Variables de Entorno**
   - Agrega las variables de entorno en la sección "Environment Variables"
   - `VITE_API_BASE_URL`: `https://kitsu.io/api/edge`
   - `VITE_APP_NAME`: `AnimeCBF`

4. **Deploy**
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará automáticamente

### Deployment Manual con CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy a producción
vercel --prod
```

### Configuración Avanzada

El archivo `vercel.json` ya está configurado con:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Netlify

Netlify es otra excelente opción para SPAs React.

### Deployment Automático desde GitHub

1. **Conectar Repositorio**
   - Ve a [netlify.com](https://netlify.com)
   - Haz clic en "New site from Git"
   - Conecta tu repositorio de GitHub

2. **Configurar Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (dejar vacío)

3. **Variables de Entorno**
   - Ve a Site settings > Environment variables
   - Agrega:
     - `VITE_API_BASE_URL`: `https://kitsu.io/api/edge`
     - `VITE_APP_NAME`: `AnimeCBF`

4. **Deploy**
   - Haz clic en "Deploy site"
   - Netlify construirá y desplegará automáticamente

### Deployment Manual con CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar sitio
netlify init

# Build
npm run build

# Deploy (preview)
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### Configuración Avanzada

El archivo `netlify.toml` ya está configurado con:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## GitHub Pages

GitHub Pages es una opción gratuita para proyectos open source.

### Configuración

1. **Instalar gh-pages**

```bash
npm install --save-dev gh-pages
```

2. **Agregar Scripts a package.json**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Configurar Base en vite.config.ts**

```typescript
export default defineConfig({
  base: '/nombre-repositorio/',
  // ... resto de configuración
});
```

4. **Deploy**

```bash
npm run deploy
```

5. **Configurar GitHub Pages**
   - Ve a Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Guarda los cambios

Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repositorio/`

## Servidor Propio

Para desplegar en tu propio servidor (Apache, Nginx, etc.).

### Build

```bash
npm run build
```

Los archivos estarán en la carpeta `dist/`.

### Apache

1. **Subir Archivos**
   - Sube el contenido de `dist/` a tu servidor

2. **Configurar .htaccess**
   
El archivo `public/.htaccess` ya está incluido:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

### Nginx

Configuración de ejemplo para Nginx:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/animecbf-react;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cache for HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }
}
```

## Variables de Entorno

### Variables Requeridas

```env
VITE_API_BASE_URL=https://kitsu.io/api/edge
VITE_APP_NAME=AnimeCBF
```

### Variables Opcionales

```env
VITE_PAGE_SIZE=20
VITE_SEARCH_DEBOUNCE_MS=500
VITE_DEBUG_MODE=false
```

### Configuración por Plataforma

**Vercel:**
- Dashboard > Settings > Environment Variables

**Netlify:**
- Site settings > Environment variables

**GitHub Pages:**
- Las variables deben estar en el código (no soporta variables de entorno en runtime)

**Servidor Propio:**
- Configura las variables antes del build
- O usa un archivo `.env` en el servidor

## Optimizaciones

### Antes del Deployment

1. **Analizar Bundle**

```bash
npm run build:analyze
```

Revisa el reporte en `dist/stats.html` para identificar dependencias grandes.

2. **Optimizar Imágenes**
   - Usa formatos modernos (WebP, AVIF)
   - Comprime imágenes antes de subirlas
   - Usa lazy loading

3. **Verificar Performance**
   - Ejecuta Lighthouse en el build local
   - Objetivo: Score > 90

### Después del Deployment

1. **Configurar CDN**
   - Vercel y Netlify incluyen CDN automáticamente
   - Para servidores propios, considera Cloudflare

2. **Monitoreo**
   - Configura analytics (Google Analytics, Plausible, etc.)
   - Monitorea errores (Sentry, LogRocket, etc.)

3. **SSL/HTTPS**
   - Vercel y Netlify incluyen SSL automáticamente
   - Para servidores propios, usa Let's Encrypt

## Troubleshooting

### Error: "Page not found" en rutas

**Problema:** Las rutas de React Router no funcionan después del deployment.

**Solución:**
- Verifica que los rewrites/redirects estén configurados
- Para Vercel: `vercel.json` debe tener rewrites
- Para Netlify: `netlify.toml` debe tener redirects
- Para Apache: `.htaccess` debe tener RewriteRules
- Para Nginx: configuración debe tener `try_files`

### Error: Variables de entorno no definidas

**Problema:** `import.meta.env.VITE_*` es undefined.

**Solución:**
- Verifica que las variables empiecen con `VITE_`
- Configura las variables en la plataforma de deployment
- Reconstruye la aplicación después de agregar variables

### Error: Build falla

**Problema:** El build falla en la plataforma de deployment.

**Solución:**
- Verifica que `npm run build` funcione localmente
- Revisa los logs de build en la plataforma
- Asegúrate de que todas las dependencias estén en `dependencies` (no en `devDependencies`)
- Verifica la versión de Node.js (debe ser >= 18)

### Error: Assets no cargan

**Problema:** CSS, JS o imágenes no cargan correctamente.

**Solución:**
- Verifica la configuración de `base` en `vite.config.ts`
- Para subdirectorios, configura `base: '/subdirectorio/'`
- Verifica que los paths sean relativos

### Performance baja

**Problema:** La aplicación carga lentamente.

**Solución:**
- Ejecuta `npm run build:analyze` para identificar bundles grandes
- Implementa code splitting adicional
- Optimiza imágenes
- Habilita compresión (Gzip/Brotli)
- Configura cache headers correctamente

## Checklist de Deployment

Antes de desplegar a producción:

- [ ] Tests pasan (`npm test`)
- [ ] Build funciona (`npm run build`)
- [ ] Preview funciona (`npm run preview`)
- [ ] Variables de entorno configuradas
- [ ] Lighthouse score > 90
- [ ] Accesibilidad verificada
- [ ] Responsive en todos los dispositivos
- [ ] Errores manejados correctamente
- [ ] Analytics configurado
- [ ] SSL/HTTPS habilitado
- [ ] Dominio personalizado configurado (opcional)

## Recursos Adicionales

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Soporte

Si encuentras problemas durante el deployment, contacta al equipo de desarrollo.
