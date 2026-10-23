# MathPad

Pizarra matemática offline (PWA) que funciona sin conexión, sin IA ni backend.
Todo se ejecuta en el navegador y los datos se guardan localmente.

## Funciones principales

- Lienzo con herramientas: lápiz, resaltador, formas, texto, borrador, relleno, selección y mano (pan/zoom).
- Calculadora científica integrada, arrastrable al lienzo.
- Graficador de funciones con tangente, área y análisis.
- Fórmulas LaTeX con vista previa.
- Exportar a PDF y PNG; guardar/cargar proyecto.
- Funciona sin conexión (Service Worker).

## Cómo ejecutar en local

Servidor estático (recomendado para PWA):

```bash
python -m http.server 8000
```

Luego abrir `http://localhost:8000`. También se puede abrir `index.html` directamente, pero el Service Worker requiere servidor.

## Atajos principales

- `P` lápiz · `E` borrador · `F` relleno · `V` selección · `H` mano
- `G` graficador · `C` calculadora · `I` insertar imagen · `A` ejes/regla
- `Space` (mantener) pan temporal · `Z` modo enfoque
- `Ctrl+S` guardar · `Ctrl+Z` deshacer · `Ctrl+Y` rehacer · `Del` borrar selección

Inspirada en las calculadoras científicas escolares; no está afiliada a Casio.
