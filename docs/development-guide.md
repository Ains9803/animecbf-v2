# Guía de Desarrollo - AnimeCBF React

Esta guía proporciona información detallada para desarrolladores que trabajan en el proyecto AnimeCBF React.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración Inicial](#configuración-inicial)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Convenciones de Código](#convenciones-de-código)
- [Desarrollo de Componentes](#desarrollo-de-componentes)
- [Gestión de Estado](#gestión-de-estado)
- [Integración con API](#integración-con-api)
- [Testing](#testing)
- [Debugging](#debugging)

## Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Git**: Para control de versiones
- **Editor**: VS Code recomendado con las siguientes extensiones:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets

## Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd animecbf-react
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` según tus necesidades:

```env
VITE_API_BASE_URL=https://kitsu.io/api/edge
VITE_APP_NAME=AnimeCBF
```

### 4. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
animecbf-react/
├── public/              # Assets estáticos
│   ├── logo.png
│   └── .htaccess
├── src/
│   ├── components/      # Componentes React
│   │   ├── common/     # Componentes compartidos (Header, Footer, etc.)
│   │   ├── anime/      # Componentes específicos de anime
│   │   ├── home/       # Componentes de la página home
│   │   └── layout/     # Componentes de layout
│   ├── pages/          # Páginas principales (rutas)
│   ├── context/        # Context providers (Theme, Anime)
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servicios API
│   ├── utils/          # Funciones utilitarias
│   ├── styles/         # Estilos globales
│   ├── test/           # Configuración de tests
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Punto de entrada
├── docs/               # Documentación
├── .env.example        # Variables de entorno de ejemplo
├── package.json        # Dependencias y scripts
├── vite.config.ts      # Configuración de Vite
├── vitest.config.ts    # Configuración de Vitest
└── tsconfig.json       # Configuración de TypeScript
```

## Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`AnimeCard.jsx`, `SearchBar.jsx`)
- **Hooks**: camelCase con prefijo `use` (`useDebounce.js`, `useAnime.js`)
- **Utilidades**: camelCase (`formatDate.js`, `helpers.js`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`, `PAGE_SIZE`)
- **CSS**: kebab-case para clases (`.anime-card`, `.search-bar`)

### Estructura de Componentes

```jsx
// Imports
import React from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

// Componente
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  
  // Efectos
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// Default Props
ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### Estilos

- Usa CSS Modules o archivos CSS dedicados por componente
- Utiliza variables CSS para temas y colores
- Sigue la metodología BEM para nombres de clases cuando sea apropiado

```css
/* AnimeCard.css */
.anime-card {
  /* Estilos base */
}

.anime-card__image {
  /* Elemento */
}

.anime-card--featured {
  /* Modificador */
}
```

## Desarrollo de Componentes

### Crear un Nuevo Componente

1. Crea el archivo del componente en la carpeta apropiada
2. Crea el archivo CSS asociado
3. Implementa el componente siguiendo las convenciones
4. Exporta el componente desde `index.js` si está en una carpeta de componentes

```jsx
// components/anime/AnimeCard.jsx
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './AnimeCard.css';

const AnimeCard = ({ anime, onClick }) => {
  return (
    <div className="anime-card" onClick={onClick}>
      <LazyLoadImage
        src={anime.attributes.posterImage.small}
        alt={anime.attributes.canonicalTitle}
        effect="blur"
      />
      <h3>{anime.attributes.canonicalTitle}</h3>
      <span className="status">{anime.attributes.status}</span>
    </div>
  );
};

export default AnimeCard;
```

### Componentes Reutilizables

Prioriza la creación de componentes reutilizables:

- Acepta props para personalización
- Evita lógica de negocio específica
- Usa composición sobre herencia
- Implementa PropTypes para validación

## Gestión de Estado

### Context API

Usamos Context API para estado global:

```jsx
// context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);
  
  const value = { theme, setTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### Estado Local

Para estado local de componentes, usa `useState`:

```jsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);
```

## Integración con API

### Servicio API

Todas las llamadas a la API se centralizan en `services/kitsuApi.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const kitsuApi = {
  getAnime: async (params) => {
    const response = await axios.get(`${API_BASE_URL}/anime`, { params });
    return response.data;
  },
  
  getAnimeById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/anime/${id}`);
    return response.data;
  },
};
```

### Uso en Componentes

```jsx
import { kitsuApi } from '../services/kitsuApi';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const data = await kitsuApi.getAnime({
          'filter[subtype]': 'TV',
          'page[limit]': 20,
        });
        setSeries(data.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSeries();
  }, []);
  
  return (
    // JSX
  );
};
```

## Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch
npm run test:watch

# UI de tests
npm run test:ui

# Coverage
npm run test:coverage
```

### Escribir Tests

```jsx
// AnimeCard.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AnimeCard from './AnimeCard';

describe('AnimeCard', () => {
  const mockAnime = {
    id: '1',
    attributes: {
      canonicalTitle: 'Naruto',
      posterImage: { small: 'image.jpg' },
      status: 'finished',
    },
  };
  
  it('renders anime title', () => {
    render(<AnimeCard anime={mockAnime} />);
    expect(screen.getByText('Naruto')).toBeInTheDocument();
  });
  
  it('renders anime image', () => {
    render(<AnimeCard anime={mockAnime} />);
    const img = screen.getByAltText('Naruto');
    expect(img).toBeInTheDocument();
  });
});
```

## Debugging

### React DevTools

Instala React DevTools para inspeccionar componentes y estado:
- Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Firefox: [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Console Logging

```jsx
// Debug props
console.log('Props:', { prop1, prop2 });

// Debug state
console.log('State:', state);

// Debug API responses
console.log('API Response:', data);
```

### Vite Debug Mode

Para ver logs detallados de Vite:

```bash
DEBUG=vite:* npm run dev
```

## Mejores Prácticas

1. **Componentes Pequeños**: Mantén componentes enfocados en una sola responsabilidad
2. **Hooks Personalizados**: Extrae lógica reutilizable en custom hooks
3. **Lazy Loading**: Usa `React.lazy()` para code splitting
4. **Memoización**: Usa `React.memo`, `useMemo`, `useCallback` para optimizar
5. **Accesibilidad**: Siempre incluye atributos ARIA y alt text
6. **Error Handling**: Implementa manejo de errores robusto
7. **TypeScript**: Usa tipos cuando sea posible para mejor DX

## Recursos Adicionales

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Kitsu API Documentation](https://kitsu.docs.apiary.io/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## Soporte

Si tienes preguntas o problemas, contacta al equipo de desarrollo.
