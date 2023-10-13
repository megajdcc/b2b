#!/usr/bin/envsh

# abortar en caso de errores
set -e

# compilado
npm run build

# navega al directorio de salida de compilación
cd dist

# coloca .nojekyll para forzar el procesamiento de Jekyllgit
echo > .nojekyll

# si estás desplegando en un dominio personalizado
# echo 'www.ejemplo.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# si estás desplegando en https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<NOMBRE DE USUARIO>.github.io.git main

# si estás desplegando en https://<USERNAME>.github.io/<repo>
git push -f git@github.com:megajdcc/b2b.git main:gh-pages

cd -