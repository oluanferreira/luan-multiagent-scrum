# Guía de Inicio Rápido LMAS v4

> 🌐 [EN](../../installation/v4-quick-start.md) | [PT](../../pt/installation/v4-quick-start.md) | **ES**

---

**Versión:** 2.1
**Última Actualización:** 2026-01-26
**Tiempo para Completar:** 5 minutos

---

## Prerrequisitos

Antes de comenzar, asegúrate de tener:

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm 9+ instalado (`npm --version`)
- [ ] Git instalado (`git --version`)
- [ ] GitHub CLI (`gh`) instalado y autenticado (`gh auth status`)
- [ ] Un IDE con IA o Claude Code CLI

---

## Paso 1: Instalar LMAS Core

### Opción A: Wizard de Instalación npx (Recomendado)

```bash
# Ejecutar el wizard de instalación interactivo
npx lmas-core@latest

# O crear un nuevo proyecto con nombre específico
npx lmas-core@latest init mi-proyecto
cd mi-proyecto
```

### Opción B: Clonar Repositorio (Desarrollo)

```bash
git clone https://github.com/oluanferreira/luan-multiagent-scrum.git
cd lmas-core
npm install
```

---

## Paso 2: Verificar Instalación

Ejecuta el comando de diagnóstico:

```bash
npx lmas-core@latest doctor
```

O si está instalado globalmente:

```bash
lmas doctor
```

### Verificación Manual

```bash
# Verificar que la estructura core existe
ls -la .lmas-core/

# Verificar directorios principales
ls .lmas-core/core/
ls .lmas-core/development/agents/
```

Estructura esperada:

```
.lmas-core/
├── core/               # Core del framework (registry, health-check, orchestration)
├── development/        # Agentes, tareas, workflows
├── product/            # Templates, checklists
└── infrastructure/     # Scripts, herramientas, integraciones
```

---

## Paso 3: Activar Tu Primer Agente

LMAS usa agentes especializados para diferentes tareas. En tu IDE con IA o Claude Code CLI, escribe:

```
@lmas-master
```

El agente te saludará y mostrará comandos disponibles:

```
🎯 LMAS Master listo!
Escribe *help para ver comandos disponibles.
```

### Prueba Estos Comandos

| Comando   | Descripción                            |
| --------- | -------------------------------------- |
| `*help`   | Mostrar todos los comandos disponibles |
| `*status` | Mostrar estado del proyecto            |
| `*agents` | Listar todos los agentes disponibles   |

---

## Paso 4: Explorar Agentes Disponibles

| Agente              | Activación           | Propósito                           |
| ------------------- | -------------------- | ----------------------------------- |
| `@dev` (Neo)        | Desarrollo           | Implementación de código, debugging |
| `@qa` (Oracle)       | Calidad              | Pruebas y validación                |
| `@architect` (Architect) | Arquitectura         | Diseño de sistema y documentación   |
| `@pm` (Sage)        | Product Manager      | Requisitos y planificación          |
| `@devops` (Operator)    | DevOps               | Git push, creación de PR, CI/CD     |
| `@po` (Maven)       | Product Owner        | Creación de stories y backlog       |
| `@sm` (Niobe)       | Scrum Master         | Gestión de sprint                   |
| `@analyst` (Nova)   | Analista de Negocios | Análisis de requisitos              |

### Ejemplo: Activar Agente Desarrollador

```
@dev
```

El agente desarrollador (Neo) se activará con un saludo mostrando:

- Estado del proyecto
- Comandos rápidos
- Opciones de colaboración entre agentes

---

## Paso 5: Crear Tu Primera Story

Las stories dirigen el desarrollo en LMAS. Activa el Product Owner y crea una:

```
@po *create-story
```

Sigue los prompts para definir:

1. Título de la story
2. Descripción
3. Criterios de aceptación
4. Prioridad

---

## Referencia Rápida

### Comandos de Agente

Todos los comandos de agente usan el prefijo `*`:

```
*help          # Mostrar ayuda
*status        # Mostrar estado
*exit          # Salir del agente actual
```

### Comandos CLI

```bash
# Instalación y setup
npx lmas-core@latest           # Ejecutar wizard
npx lmas-core@latest doctor    # Ejecutar diagnósticos
npx lmas-core@latest info      # Mostrar info del sistema

# Desarrollo
npm run lint                           # Verificar estilo de código
npm run typecheck                      # Verificar tipos TypeScript
npm test                               # Ejecutar pruebas unitarias
npm run validate:structure             # Validar estructura LMAS
```

### Estructura del Proyecto

```
tu-proyecto/
├── .lmas-core/                    # Core del framework
│   ├── core/                      # Módulos core
│   │   ├── registry/              # Registro de servicios (200+ workers)
│   │   ├── health-check/          # Sistema de health check
│   │   ├── orchestration/         # Orquestación de workflows
│   │   └── quality-gates/         # Capas de validación de calidad
│   ├── development/               # Assets de desarrollo
│   │   ├── agents/                # Definiciones de agentes (12 agentes)
│   │   ├── tasks/                 # Workflows de tareas (~140 tareas)
│   │   └── workflows/             # Workflows multi-etapa
│   ├── product/                   # Assets de producto
│   │   ├── templates/             # Templates de documentos
│   │   └── checklists/            # Checklists de validación
│   └── infrastructure/            # Infraestructura
│       ├── scripts/               # Scripts utilitarios (~80)
│       ├── integrations/          # Adaptadores de PM tools
│       └── templates/             # Templates de configuración
├── .claude/                       # Configuración Claude Code
│   ├── commands/LMAS/agents/      # Skills de agentes
│   └── rules/                     # Reglas de agentes
├── docs/                          # Documentación
│   └── stories/                   # Stories de desarrollo
└── src/                           # Tu código fuente
```

---

## Próximos Pasos

1. **Lee la guía completa:** [Comenzando](../getting-started.md)
2. **Entiende la arquitectura:** [Arquitectura Core](../core-architecture.md)
3. **Aprende sobre agentes:** [Definiciones de Agentes](../../../.lmas-core/development/agents/)
4. **Únete a la comunidad:** [Discord](https://discord.gg/gk8jAdXWmj)

---

## Solución de Problemas

### Errores "Comando no encontrado"

```bash
# Asegúrate que Node.js está en el PATH
node --version

# Limpia el cache npm si persisten problemas
npm cache clean --force
```

### Agente no responde

1. Asegúrate de estar en un IDE con IA (Cursor, VS Code con Claude, etc.) o Claude Code CLI
2. Verifica que estás usando sintaxis correcta: `@nombre-del-agente`
3. Verifica que el archivo del agente existe: `ls .lmas-core/development/agents/`

### Errores de permisos

```bash
# Corregir permisos npm (macOS/Linux)
sudo chown -R $(whoami) ~/.npm

# O usa un gestor de versiones Node (recomendado)
# nvm, fnm, o volta
```

### Estructura LMAS no encontrada

```bash
# Reinstalar LMAS en el proyecto actual
npx lmas-core@latest install

# O clonar de nuevo
git clone https://github.com/oluanferreira/luan-multiagent-scrum.git
```

---

## Obtener Ayuda

- **Documentación:** [Repositorio GitHub](https://github.com/oluanferreira/luan-multiagent-scrum)
- **GitHub Issues:** [github.com/oluanferreira/luan-multiagent-scrum/issues](https://github.com/oluanferreira/luan-multiagent-scrum/issues)
- **Comunidad Discord:** [discord.gg/gk8jAdXWmj](https://discord.gg/gk8jAdXWmj)

---

**¡Bienvenido a LMAS! ¡Feliz coding!**
