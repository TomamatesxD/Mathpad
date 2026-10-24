# MathPad

Pizarra matemática offline (PWA). Funciona sin conexión, sin IA ni backend:
todo corre en el navegador.

## Funciones principales

- Lienzo de dibujo con herramientas: lápiz, formas, texto, selección, borrador, regla y ejes.
- Calculadora científica con historial.
- Graficador de funciones con tangente, área y análisis.
- Inserción de LaTeX en el lienzo.
- Exportar a imagen/PDF y guardar/cargar proyectos.
- Funciona sin conexión (Service Worker).

## Cómo correrlo en local

```bash
python -m http.server 8000
```

Abrí http://localhost:8000 en el navegador.

## Atajos principales

- A: mostrar/ocultar regla y ejes.
- H: herramienta mano (paneo). P: lápiz. E: borrador. V: selección.
- F: relleno. I: insertar imagen. G: graficador. C: calculadora.
- Z: modo concentración. Ctrl+S: guardar. Ctrl+Z: deshacer. Ctrl+Y: rehacer.

Inspirada en las calculadoras científicas escolares; no está afiliada a Casio.
