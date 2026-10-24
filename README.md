# MathPad

Pizarra matemática offline (PWA). Funciona sin conexión, sin IA ni backend:
todo corre en el navegador y los datos se guardan localmente.

## Funciones principales

- Lienzo de dibujo con herramientas: lápiz, resaltador, formas, texto, selección, borrador, relleno, regla y ejes; mano (pan/zoom).
- Calculadora científica con historial, integrada y arrastrable al lienzo.
- Graficador de funciones con tangente, área y análisis.
- Fórmulas LaTeX con vista previa / inserción en el lienzo.
- Exportar a imagen/PDF y guardar/cargar proyectos.
- Funciona sin conexión (Service Worker).

## Cómo ejecutar en local

Servidor estático (recomendado para PWA):

```bash
python -m http.server 8000
```

Luego abrir `http://localhost:8000`. También se puede abrir `index.html` directamente, pero el Service Worker requiere servidor.

## Atajos principales

- `A`: mostrar/ocultar regla y ejes.
- `H`: herramienta mano (paneo). `P`: lápiz. `E`: borrador. `V`: selección.
- `F`: relleno. `I`: insertar imagen. `G`: graficador. `C`: calculadora.
- `Space` (mantener): pan temporal. `Z`: modo enfoque.
- `Ctrl+S`: guardar. `Ctrl+Z`: deshacer. `Ctrl+Y`: rehacer. `Del`: borrar selección.

Inspirada en las calculadoras científicas escolares; no está afiliada a Casio.
