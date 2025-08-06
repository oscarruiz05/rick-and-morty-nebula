# 🌌 Rick and Morty Nebula

Una aplicación web moderna y responsiva para explorar el universo de Rick and Morty, construida con Next.js 15 y React 19. Navega a través de personajes, episodios y ubicaciones con una experiencia de usuario fluida e intuitiva.


## ✨ Características Principales

### 🎭 Personajes
- **Exploración completa** de todos los personajes de Rick and Morty
- **Información detallada**: estado vital, especie, género, origen y ubicación
- **Indicadores visuales** de estado con colores intuitivos (verde/rojo/gris)
- **Páginas de detalle** con información completa de cada personaje

### 📺 Episodios
- **Catálogo completo** de episodios organizados por temporadas
- **Información detallada**: código de episodio, fecha de emisión
- **Lista de personajes** que aparecen en cada episodio
- **Navegación entre episodios** y personajes relacionados

### 🌍 Ubicaciones
- **Exploración de dimensiones** y ubicaciones del multiverso
- **Información completa**: tipo, dimensión y residentes
- **Relaciones entre ubicaciones** y personajes
- **Navegación intuitiva** entre ubicaciones y habitantes

### ⭐ Sistema de Favoritos
- **Guardar favoritos** en personajes, episodios y ubicaciones
- **Persistencia local** que mantiene tus selecciones
- **Página dedicada** con navegación por tabs
- **Gestión completa** de elementos favoritos

### ⚡ Rendimiento y UX
- **Scroll infinito** para carga eficiente de contenido
- **Loading skeletons** para una mejor experiencia visual
- **Gestión de errores** con opciones de reintento
- **Diseño responsivo** que funciona en todos los dispositivos

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.4.5** - Framework React con App Router
- **React 19.1.0** - Biblioteca de componentes con últimas características
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS 4** - Framework de utilidades CSS
- **shadcn/ui** - Componentes UI accesibles y personalizables

### Funcionalidades
- **Axios** - Cliente HTTP para llamadas a la API
- **React Intersection Observer** - Scroll infinito eficiente
- **Lucide React** - Iconografía moderna y consistente
- **Radix UI** - Componentes primitivos accesibles

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### 1. Clonación del Repositorio
```bash
git clone https://github.com/oscarruiz05/rick-and-morty-nebula.git
cd rick-and-morty-nebula
```

### 2. Instalación de Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configuración del Entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita las variables si es necesario
# Por defecto usa la API pública de Rick and Morty
```

### 4. Ejecución en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 🐳 Deployment con Docker

### Construcción y Ejecución Rápida
```bash
# Construir imagen Docker y crear el contendor
docker-compose up --build
```

Para más detalles sobre Docker, consulta [DOCKER.md](./DOCKER.md).

## 📁 Estructura del Proyecto

```
rick-and-morty-nebula/
├── src/
│   ├── app/                     # App Router de Next.js
│   │   ├── characters/          # Páginas de personajes
│   │   ├── episodes/           # Páginas de episodios
│   │   ├── locations/          # Páginas de ubicaciones
│   │   └── favorites/          # Página de favoritos
│   ├── components/             # Componentes reutilizables
│   │   ├── character/          # Componentes de personajes
│   │   ├── episode/           # Componentes de episodios
│   │   ├── location/          # Componentes de ubicaciones
│   │   ├── favorites/         # Componentes de favoritos
│   │   ├── layout/            # Componentes de layout
│   │   └── ui/               # Componentes UI base
│   ├── hooks/                 # Hooks personalizados
│   ├── services/             # Servicios de API
│   ├── types/               # Definiciones TypeScript
│   └── lib/                # Utilidades y configuración
├── public/                 # Archivos estáticos
└── docs/                  # Documentación adicional
```

## 🌐 API

### Endpoints Principales
- `GET /character` - Lista de personajes con paginación
- `GET /character/{id}` - Detalle de personaje específico
- `GET /episode` - Lista de episodios
- `GET /location` - Lista de ubicaciones
