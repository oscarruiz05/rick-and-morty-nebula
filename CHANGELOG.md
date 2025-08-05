# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.


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
