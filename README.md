# Portafolio — Andrés G. García Marcano · Estilo Halo 2

Portafolio web de una página con la estética del menú principal de **Halo 2**:
pantalla de arranque ("Presiona cualquier tecla"), música de fondo del tema del menú,
navegación estilo consola y todo el contenido de la hoja de vida.

## Estructura

```
index.html          Página principal (pantalla de arranque + menú + paneles)
css/style.css       Estilos (estética metálica azul de Halo 2, scanlines, vignette)
js/main.js          Lógica: arranque, navegación con teclado/mouse, audio
assets/
  bg.mp4            Video de fondo del menú (loop de 40 s, 720p, optimizado)
  menu-bg.jpg       Imagen de respaldo / póster del video
  theme.mp3         Tema del menú (recortado, en loop)
  profile.jpg       Foto de perfil (mostrada en el apartado PERFIL)
cv.pdf              Hoja de vida descargable
_source/            Archivos originales (ignorado por git, NO se despliega)
vercel.json         Configuración de despliegue
```

## Cómo usar

- **Teclado:** flechas ↑ ↓ para navegar, cualquier tecla para arrancar.
- **Mouse:** clic o hover sobre los ítems del menú.
- **Audio:** empieza al presionar una tecla (requisito de los navegadores).
  Botón `AUDIO` arriba a la derecha para silenciar.

## Desplegar en Vercel

### Opción A — con Git + Vercel (recomendado)
1. Crea un repositorio en GitHub y sube esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Portafolio Halo 2"
   git branch -M main
   git remote add origin <URL-DE-TU-REPO>
   git push -u origin main
   ```
   > El `.gitignore` evita subir `_source/` (los archivos pesados originales).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
3. Framework Preset: **Other**. Deja todo por defecto y **Deploy**.

### Opción B — con Vercel CLI (sin Git)
```bash
npm i -g vercel
vercel
```
Sigue las indicaciones. Para producción: `vercel --prod`.

## Nota sobre los archivos multimedia

Los originales eran muy pesados para la web y para GitHub (límite de 100 MB por archivo):

- **Música** — original de 1 hora (111 MB) → recortada a ~11 MB, en bucle.
- **Video de fondo** — original 1080p60 de 6 min (109 MB) → recomprimido a un loop de
  120 s en 720p, sin audio y con `+faststart`, de solo **~7 MB**.

Los originales quedan intactos en tu Escritorio / en `_source/`. Si quieres regenerar
las versiones web con otra duración o calidad (requiere `ffmpeg`):
```bash
# audio
ffmpeg -i "<audio original>.mp3" -t 180 -b:a 128k assets/theme.mp3
# video (loop de 120 s desde el segundo 10, 720p, sin audio)
ffmpeg -ss 10 -t 120 -i "<video original>.mp4" -an \
  -vf "scale=1280:720,fps=30" -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart assets/bg.mp4
```
