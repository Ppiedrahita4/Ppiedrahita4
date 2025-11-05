# Formulario de Evaluación del Cuidador

Formulario web para la evaluación neuropsicológica de pacientes con deterioro cognitivo, completado por cuidadores.

## Descripción

Este formulario digital replica el estilo de Google Forms y está diseñado para recopilar información completa sobre el estado funcional, cognitivo y conductual de pacientes con posible deterioro cognitivo, a través de la perspectiva de sus cuidadores.

## Escalas Incluidas

El formulario incluye las siguientes escalas clínicas validadas:

### 1. **Índice de Barthel**
- Evalúa 10 actividades básicas de la vida diaria (AVD)
- Puntuación: 0-100 puntos
- Categorías: Independencia, dependencia leve, moderada, severa y total

### 2. **Escala de Lawton y Brody**
- Evalúa 8 actividades instrumentales de la vida diaria (AIVD)
- Puntuación: 0-8 puntos
- Mide capacidad para tareas complejas (teléfono, compras, medicación, etc.)

### 3. **NPI-Q (Inventario Neuropsiquiátrico)**
- Evalúa síntomas neuropsiquiátricos y conductuales
- Incluye severidad y malestar del cuidador
- 12 dominios: delirios, alucinaciones, agitación, depresión, ansiedad, etc.

### 4. **FBI (Inventario Conductual Frontal)**
- Evalúa cambios en el comportamiento y la personalidad
- Específico para disfunción del lóbulo frontal
- 24 ítems con escala de 0-3

### 5. **DEX-R (Cuestionario Disejecutivo)**
- Evalúa disfunciones ejecutivas
- Versión para informante/cuidador
- 20 ítems con escala de 0-4

## Características

### Diseño y UX
- ✅ Estilo Google Forms (limpio y profesional)
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves y transiciones
- ✅ Accesibilidad mejorada
- ✅ Modo impresión optimizado

### Funcionalidad
- ✅ Cálculo automático de puntajes (Barthel y Lawton & Brody)
- ✅ Interpretación automática de resultados
- ✅ Campos condicionales (se muestran según respuestas)
- ✅ Validación de formulario
- ✅ Mensajes de error personalizados
- ✅ Auto-guardado opcional (localStorage)

### Secciones Informativas
El formulario incluye extensas instrucciones educativas para los cuidadores:

- 🎯 Importancia del formulario
- ⚠️ Consecuencias de respuestas incorrectas
- 📚 Ejemplos de casos reales
- 🎯 Importancia de la honestidad
- 📝 Instrucciones paso a paso detalladas
- ⏱️ Guía de tiempo y dedicación

## Archivos

```
├── index.html          # Estructura del formulario
├── styles.css          # Estilos Google Forms
├── script.js           # Lógica y funcionalidad
└── README.md           # Documentación
```

## Uso

### Abrir el formulario
1. Abrir el archivo `index.html` en cualquier navegador moderno
2. Leer las instrucciones cuidadosamente
3. Completar todas las secciones obligatorias (marcadas con *)
4. Los puntajes se calculan automáticamente
5. Enviar el formulario

### Para desarrolladores

#### Instalar en un servidor web
```bash
# Copiar archivos a directorio del servidor
cp index.html styles.css script.js /var/www/html/evaluacion/

# O usar un servidor local simple
python -m http.server 8000
# Luego abrir http://localhost:8000
```

#### Funciones disponibles en consola
```javascript
// Exportar datos del formulario
exportFormData()

// Imprimir formulario
printForm()

// Ver progreso de completado
updateProgressIndicator()
```

#### Habilitar auto-guardado
En `script.js`, descomentar la línea:
```javascript
enableAutoSave();
```

## Integración con Backend

Para enviar los datos a un servidor, modificar la función de envío en `script.js`:

```javascript
// Ejemplo de integración
fetch('/api/submit-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});
```

## Interpretación de Puntajes

### Índice de Barthel
- **90-100**: Independencia completa o casi completa
- **60-89**: Dependencia leve
- **40-59**: Dependencia moderada
- **20-39**: Dependencia severa
- **0-19**: Dependencia total

### Lawton y Brody
- **8**: Autonomía completa
- **6-7**: Dependencia leve
- **4-5**: Dependencia moderada
- **2-3**: Dependencia severa
- **0-1**: Dependencia total

## Tecnologías Utilizadas

- HTML5
- CSS3 (Google Forms style)
- JavaScript (Vanilla JS - sin frameworks)
- Google Fonts (Roboto)

## Navegadores Compatibles

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## Características de Accesibilidad

- ✅ Navegación por teclado
- ✅ Etiquetas ARIA
- ✅ Alto contraste
- ✅ Foco visible
- ✅ Validación descriptiva
- ✅ Mensajes de error claros

## Licencia

Este formulario está diseñado para uso clínico y de investigación. Las escalas clínicas utilizadas son instrumentos validados y publicados.

## Contacto y Soporte

Para preguntas sobre el uso clínico de estas escalas, consulte con un profesional de la salud especializado en neuropsicología.

## Referencias

- Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965.
- Lawton MP, Brody EM. Assessment of older people: self-maintaining and instrumental activities of daily living. Gerontologist. 1969.
- Cummings JL, et al. The Neuropsychiatric Inventory: comprehensive assessment of psychopathology in dementia. Neurology. 1994.

## Notas Importantes

⚠️ **Este formulario es una herramienta de evaluación clínica**. Los resultados deben ser interpretados por profesionales de la salud calificados.

⚠️ **No realizar auto-diagnósticos**. Este formulario debe ser completado bajo supervisión o indicación de un profesional de la salud.

⚠️ **Privacidad**: Asegúrese de implementar medidas de seguridad apropiadas al manejar datos médicos sensibles.

---

**Versión**: 1.0.0
**Última actualización**: 2025
**Desarrollado para**: Evaluación neuropsicológica de deterioro cognitivo
