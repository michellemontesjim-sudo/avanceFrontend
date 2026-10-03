## Equipo
- Michelle Montes Jiménez
- Juan Pablo Alba Ballesteros
- Sebastián Vargas Montenegro
- David Alejandro Potes Muñoz

# NOTA: 
Problema real, objetivos específicos, alcance, diagramas y base de datos en
el PDF "Definición_alcance y modelo de datos" ubicado en este repositorio. 
(Se recomienda tener la extensión vscode-pdf para visualizar)


# Apunta - Interfaz de Usuario (Frontend)

Este módulo corresponde al cliente web de la plataforma **Apunta**, diseñado con un enfoque moderno y responsive para facilitar la gestión y consulta de recursos académicos universitarios.

# Tecnologías y Herramientas
- **HTML5:** Estructura semántica de las vistas públicas y privadas.
- **CSS3:** Estilos personalizados utilizando Flexbox y CSS Grid para la adaptabilidad visual.
- **JavaScript (Vanilla):** Lógica del cliente, manejo de eventos en formularios, 
actualmente el main.js implementa validaciones en tiempo real y flujos de envío simulados
(para los formularios de inicio de sesión y registro), teniendo un feedback visual  al usuario.

## Estructura de Archivos
frontend/
├── index.html       # Landing Page principal
├── login.html       # Vista de inicio de sesión
├── registro.html    # Vista de registro de nuevos usuarios
├── styles.css (en carpeta css)       # Hoja de estilos global y diseño responsive
└── main.js (en carpeta js)           # Controladores de eventos
└── README.md         # Información
└── Definición_alcance y modelo de datos.pdf