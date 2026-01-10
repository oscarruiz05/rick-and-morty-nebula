# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo..

## [0.1.2] - 2025-08-05

### Añadido
- **Configuración Docker completa** para deployment en producción
- **Dockerfile multi-stage** optimizado con Alpine Linux para imágenes ligeras
- **docker-compose.yml** con variables de entorno y configuración de salud
- **Scripts de deployment** multiplataforma (deploy.sh para Linux/macOS, deploy.bat para Windows)
- **Documentación Docker** (DOCKER.md) con guía completa de deployment
- **Variables de entorno** organizadas en .env.example con configuración de producción
- **Health checks** y monitoreo de contenedores
- **Comandos npm** para gestión Docker (build, up, down, logs, restart)

### Mejorado
- **TypeScript** corregidos tipos en useInfiniteScroll hook para mayor seguridad
- **Configuración Next.js** optimizada para standalone output en Docker
- **Gestión de dependencias** mejorada con cache cleaning y optimizaciones de build
- **Seguridad** implementada con usuario no-root en contenedores
- **Performance** optimizada con multi-stage builds y compresión

### Técnico
- **Base Alpine Linux** reduce el tamaño de imagen en ~70%
- **Variables de entorno** centralizadas en .env para configuración flexible
- **Build process** optimizado para CI/CD y deployment automatizado
- **Cross-platform support** con scripts de deployment para Windows y Unix

## [0.1.1] - 2025-08-05

### Añadido
- **Páginas de detalle para ubicaciones** (`/locations/[id]`) con información completa y residentes
- **Página de favoritos** (`/favorites`) con navegación por tabs y gestión completa
- **Navegación desde tarjetas de favoritos** hacia páginas de detalle
- **Hook useFavorites** para gestión centralizada del estado de favoritos
- **Hook useLocationRelations** para cargar residentes de ubicaciones
- **Componente FavoritesTabs** modular y reutilizable
- **Componente LocationRelations** para mostrar detalles y residentes

### Mejorado
- **Header de navegación** ahora mantiene tabs activos en rutas anidadas (ej: `/characters/1`)
- **Navegación consistente** entre todas las páginas principales y de detalle
- **Gestión de estados** mejorada con loading, error y empty states específicos

### Corregido
- **Click handlers** agregados a todas las tarjetas para navegación fluida
- **TypeScript** tipos y interfaces completadas para mejor desarrollo


## [0.1.0] - 2025-08-04

### Añadido

#### 🎨 Interfaz de Usuario
- **Diseño responsivo** con Tailwind CSS y componentes de shadcn/ui
- **Header de navegación** con tabs para diferentes secciones
- **Tema personalizado** con gradientes y fuente Comfortaa
- **Loading skeletons** para mejorar la experiencia de usuario
- **Componentes de error** con funcionalidad de reintentar

#### 🔍 Funcionalidades Principales
- **Visualización de personajes** con tarjetas informativas que incluyen:
  - Imagen, nombre, estado (vivo/muerto/desconocido)
  - Especie, género, origen y ubicación actual
  - Indicadores de estado con colores (verde, rojo, gris)
- **Visualización de episodios** con información detallada:
  - Nombre del episodio, código (S01E01)
  - Fecha de emisión y lista de personajes
- **Visualización de ubicaciones** con detalles:
  - Nombre, tipo, dimensión
  - Lista de residentes
- **Sistema de favoritos** completo:
  - Guardar/quitar personajes, episodios y ubicaciones de favoritos
  - Persistencia en localStorage
  - Indicadores visuales de elementos favoritos

#### ⚡ Rendimiento y Experiencia
- **Scroll infinito** implementado con Intersection Observer
- **Carga bajo demanda** para optimizar el rendimiento
- **Gestión de estados** para loading, error y datos
- **Prevención de duplicados** en la carga de datos
- **Debounce y throttling** en búsquedas y acciones

#### 🛠️ Arquitectura Técnica
- **Next.js 15.4.5** con App Router
- **React 19.1.0** con hooks personalizados
- **TypeScript** para type safety
- **Axios** para llamadas a la API de Rick and Morty
- **Tailwind CSS 4** para estilos
- **Lucide React** para iconografía
- **Radix UI** para componentes accesibles

#### 🔧 Hooks Personalizados
- **useInfiniteScroll**: Manejo de scroll infinito y paginación
- **useScrollToTop**: Funcionalidad de scroll al inicio

#### 📱 Componentes Reutilizables
- **CharacterCard**: Tarjeta de personaje con favoritos
- **EpisodeCard**: Tarjeta de episodio con información detallada
- **LocationCard**: Tarjeta de ubicación con residentes
- **LoadingSkeleton**: Esqueletos de carga personalizables
- **ErrorMessage**: Componente de error con retry

#### 🌐 Servicios y API
- **Servicio de personajes**: CRUD completo
- **Servicio de episodios**: Obtención y gestión
- **Servicio de ubicaciones**: Visualización y detalles
- **Servicio de favoritos**: Persistencia local
- **Interceptores HTTP**: Logging y manejo de errores
