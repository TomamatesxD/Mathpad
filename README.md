# Mathpad — Proyecto

Repositorio mínimo con una página estática (index.html).

CI: Se añadió un workflow en .github/workflows/ci.yml que instala html-validate y valida `index.html` en pushes y PRs a `main`.

Validación local:

  npm init -y
  npm install --no-save html-validate
  npx html-validate index.html

Si deseas que el workflow apunte a otra rama o agregar linters/tests, dime qué prefieres.
