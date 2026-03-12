# Proyecto Angular

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

Proyecto base moderno con Angular 21 + Tailwind CSS 4, pensado para iniciar rapido una aplicacion web con autenticacion, dashboard responsivo y arquitectura limpia por modulos.

## Que encontraras aqui

- 🔐 Login funcional con validacion basica.
- 🧭 Navegacion por rutas entre modulos (Dashboard, Usuarios, Reportes, Configuracion).
- 🛡️ Proteccion de rutas mediante guard de autenticacion.
- 📊 Dashboard base responsivo con layout adaptable a movil y escritorio.
- 🧱 Estructura escalable separada en core y features.
- 🎨 Estilos con Tailwind CSS 4 listos para extender.

## Stack tecnologico

- ⚙️ Angular 21 (Standalone Components)
- 🎨 Tailwind CSS 4
- 🧠 TypeScript
- ✅ Vitest para pruebas

## Requisitos

- Node.js 20+
- npm 10+

## Ejecucion local

```bash
npm install
npm start
```


## Scripts principales

```bash
npm start      # Levanta el servidor de desarrollo
npm run build  # Compila para produccion
npm test       # Ejecuta pruebas
```

## Estructura del proyecto

```text
proyecto-angular/
├─ angular.json
├─ package.json
├─ tsconfig.json
├─ public/
└─ src/
   ├─ index.html
   ├─ main.ts
   ├─ styles.css
   └─ app/
      ├─ app.config.ts
      ├─ app.routes.ts
      ├─ app.ts
      ├─ core/
      │  ├─ guards/
      │  │  └─ auth.guard.ts
      │  ├─ models/
      │  │  └─ user.model.ts
      │  └─ services/
      │     └─ auth.service.ts
      └─ features/
         ├─ auth/
         │  └─ login/
         │     ├─ login.ts
         │     └─ login.html
         └─ dashboard/
            ├─ dashboard.ts
            └─ dashboard.html
```

## Estado del proyecto

- ✅ Base funcional implementada
- 🚧 Modulos secundarios en construccion (Usuarios, Reportes y Configuracion)
- 🔜 Listo para integrar API real de autenticacion y datos

## Uso y autoria

![Libre uso](https://img.shields.io/badge/Uso-Libre-22C55E)
![Autor](https://img.shields.io/badge/Autor-Ing.%20Daniel%20Rubio-0EA5E9)

> ✅ **Proyecto de libre uso**
>
> Puedes usarlo, modificarlo y adaptarlo en proyectos personales o comerciales.

### Creditos

- **Autor original:** Ing. Daniel Rubio
- **Recomendacion:** mantener el credito de autoria al reutilizar el proyecto o partes del codigo.
