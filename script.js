// ==========================================
// HUMA - HUMAN MANAGEMENT
// Sistema de Recursos Humanos
// ==========================================

// ==========================================
// 1. CONFIGURACIÓN Y ALMACENAMIENTO
// ==========================================

const STORAGE_KEY = "huma_datos_v1";

let baseDatos = {};

function cargarDatos() {
    try {
        const datosGuardados = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        return datosGuardados && typeof datosGuardados === "object"
            ? datosGuardados
            : {};
    } catch (error) {
        return {};
    }
}

baseDatos = cargarDatos();

function guardarDatos() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(baseDatos)
    );
}

// ==========================================
// 2. CONFIGURACIÓN DE LOS 10 MÓDULOS
// ==========================================

const modulos = {

    empleados: {
        titulo: "Empleados",
        descripcion: "Administra la información de los colaboradores.",
        campos: [
            { id: "nombre", label: "Nombre completo", tipo: "text", requerido: true },
            { id: "puesto", label: "Puesto", tipo: "text", requerido: true },
            {
                id: "departamento",
                label: "Departamento",
                tipo: "select",
                opciones: ["Administración", "Recursos Humanos", "Finanzas", "Ventas", "Producción", "Sistemas"],
                requerido: true
            },
            { id: "salario", label: "Salario mensual (MXN)", tipo: "number", requerido: true },
            { id: "fechaIngreso", label: "Fecha de ingreso", tipo: "date", requerido: true },
            {
                id: "contrato",
                label: "Tipo de contrato",
                tipo: "select",
                opciones: ["Indefinido", "Temporal", "Prácticas", "Por proyecto"],
                requerido: true
            },
            {
                id: "estatus",
                label: "Estatus",
                tipo: "select",
                opciones: ["Activo", "Inactivo", "Baja"],
                requerido: true
            }
        ],
       columnas: [
    ["folio", "Folio"],
    ["nombre", "Nombre"],
    ["puesto", "Puesto"],
    ["departamento", "Departamento"],
    ["salario", "Salario"],
    ["fechaIngreso", "Ingreso"],
    ["estatus", "Estatus"]
]
},

asistencia: {
        titulo: "Asistencia",
        descripcion: "Registra y consulta la asistencia del personal.",
        campos: [
            { id: "empleado", label: "Nombre del empleado", tipo: "text", requerido: true },
            { id: "fecha", label: "Fecha", tipo: "date", requerido: true },
            { id: "entrada", label: "Hora de entrada", tipo: "time", requerido: true },
            { id: "salida", label: "Hora de salida", tipo: "time" },
            {
                id: "estado",
                label: "Estado",
                tipo: "select",
                opciones: ["Presente", "Retardo", "Falta", "Permiso"],
                requerido: true
            }
        ],
        columnas: [
            ["empleado", "Empleado"],
            ["fecha", "Fecha"],
            ["entrada", "Entrada"],
            ["salida", "Salida"],
            ["estado", "Estado"]
        ]
    },

    nomina: {
        titulo: "Nómina",
        descripcion: "Registra simulaciones de pagos y salarios.",
        campos: [
            { id: "empleado", label: "Nombre del empleado", tipo: "text", requerido: true },
            { id: "periodo", label: "Periodo de pago", tipo: "text", requerido: true },
            { id: "salario", label: "Salario bruto (MXN)", tipo: "number", requerido: true },
            { id: "deducciones", label: "Deducciones estimadas (MXN)", tipo: "number", requerido: true },
            { id: "bonos", label: "Bonos (MXN)", tipo: "number" },
            {
                id: "estado",
                label: "Estado del pago",
                tipo: "select",
                opciones: ["Pendiente", "Pagado", "En revisión"],
                requerido: true
            }
        ],
        columnas: [
            ["empleado", "Empleado"],
            ["periodo", "Periodo"],
            ["salario", "Salario bruto"],
            ["deducciones", "Deducciones"],
            ["bonos", "Bonos"],
            ["estado", "Estado"]
        ]
    },

    permisos: {
        titulo: "Permisos",
        descripcion: "Administra las solicitudes y periodos vacacionales.",
        campos: [
    { id: "empleado", label: "Nombre del empleado", tipo: "text", requerido: true },
    { id: "fechaInicio", label: "Fecha de inicio", tipo: "date", requerido: true },
    { id: "fechaFin", label: "Fecha de finalización", tipo: "date", requerido: true },
    { id: "motivo", label: "Motivo del permiso", tipo: "textarea", requerido: true },
    {
        id: "estado",
        label: "Estado de solicitud",
        tipo: "select",
        opciones: ["Pendiente", "Autorizada", "Rechazada"],
        requerido: true
    }
],
   columnas: [
            ["empleado", "Empleado"],
            ["fechaInicio", "Inicio"],
            ["fechaFin", "Finalización"],
            ["motivo", "Motivo"],
            ["estado", "Estado"]
        ]
    },

    reclutamiento: {
        titulo: "Reclutamiento",
        descripcion: "Organiza vacantes y candidatos.",
        campos: [
            { id: "candidato", label: "Nombre del candidato", tipo: "text", requerido: true },
            { id: "vacante", label: "Vacante", tipo: "text", requerido: true },
            { id: "contacto", label: "Correo o teléfono", tipo: "text", requerido: true },
            { id: "fecha", label: "Fecha de registro", tipo: "date", requerido: true },
            {
                id: "estado",
                label: "Etapa del proceso",
                tipo: "select",
                opciones: ["Recibido", "Entrevista", "Evaluación", "Seleccionado", "No seleccionado"],
                requerido: true
            }
        ],
        columnas: [
            ["candidato", "Candidato"],
            ["vacante", "Vacante"],
            ["contacto", "Contacto"],
            ["fecha", "Fecha"],
            ["estado", "Etapa"]
        ]
    },

    desempeno: {
        titulo: "Desempeño",
        descripcion: "Registra evaluaciones y seguimiento del personal.",
        campos: [
            { id: "empleado", label: "Nombre del empleado", tipo: "text", requerido: true },
            { id: "evaluador", label: "Nombre del evaluador", tipo: "text", requerido: true },
            { id: "fecha", label: "Fecha de evaluación", tipo: "date", requerido: true },
            { id: "calificacion", label: "Calificación (0 a 10)", tipo: "number", requerido: true },
            { id: "observaciones", label: "Observaciones", tipo: "textarea" }
        ],
        columnas: [
            ["empleado", "Empleado"],
            ["evaluador", "Evaluador"],
            ["fecha", "Fecha"],
            ["calificacion", "Calificación"],
            ["observaciones", "Observaciones"]
        ]
    },

    reportes: {
        titulo: "Reportes",
        descripcion: "Organiza informes y registros de la organización.",
        campos: [
            { id: "nombre", label: "Nombre del reporte", tipo: "text", requerido: true },
            {
                id: "categoria",
                label: "Categoría",
                tipo: "select",
                opciones: ["Personal", "Asistencia", "Nómina", "Vacaciones", "Reclutamiento", "Desempeño"],
                requerido: true
            },
            { id: "periodo", label: "Periodo", tipo: "text", requerido: true },
            { id: "observaciones", label: "Descripción", tipo: "textarea" }
        ],
        columnas: [
            ["nombre", "Reporte"],
            ["categoria", "Categoría"],
            ["periodo", "Periodo"],
            ["observaciones", "Descripción"]
        ]
    },

    documentacion: {
        titulo: "Documentación",
        descripcion: "Lleva un índice de los documentos del personal.",
        campos: [
            { id: "empleado", label: "Nombre del empleado", tipo: "text", requerido: true },
            { id: "documento", label: "Nombre del documento", tipo: "text", requerido: true },
            {
                id: "categoria",
                label: "Tipo de documento",
                tipo: "select",
                opciones: ["Identificación", "Contrato", "Comprobante", "Constancia", "Otro"],
                requerido: true
            },
            { id: "fecha", label: "Fecha de registro", tipo: "date", requerido: true },
            {
                id: "estado",
                label: "Estado",
                tipo: "select",
                opciones: ["Pendiente", "Recibido", "Por actualizar"],
                requerido: true
            }
        ],
        columnas: [
            ["empleado", "Empleado"],
            ["documento", "Documento"],
            ["categoria", "Categoría"],
            ["fecha", "Fecha"],
            ["estado", "Estado"]
        ]
    },

    empresas: {
        titulo: "Empresas",
        descripcion: "Registra información de organizaciones y sucursales.",
        campos: [
            { id: "nombre", label: "Nombre de la empresa", tipo: "text", requerido: true },
            { id: "representante", label: "Representante", tipo: "text", requerido: true },
            { id: "correo", label: "Correo de contacto", tipo: "email", requerido: true },
            { id: "telefono", label: "Teléfono", tipo: "tel" },
            { id: "sucursal", label: "Sucursal o ubicación", tipo: "text" },
            {
                id: "estado",
                label: "Estado",
                tipo: "select",
                opciones: ["Activa", "Inactiva", "En revisión"],
                requerido: true
            }
        ],
        columnas: [
            ["nombre", "Empresa"],
            ["representante", "Representante"],
            ["correo", "Correo"],
            ["telefono", "Teléfono"],
            ["sucursal", "Sucursal"],
            ["estado", "Estado"]
        ]
    }

};

// ==========================================
// 3. PREPARAR LOS REGISTROS
// ==========================================

// ==========================================
// 3. PREPARAR LOS REGISTROS Y FOLIOS
// ==========================================

const FOLIO_COUNTER_KEY = "huma_folio_counter_v1";

Object.keys(modulos).forEach(clave => {
    if (!Array.isArray(baseDatos[clave])) {
        baseDatos[clave] = [];
    }
});

function numeroDeFolio(folio) {
    const coincidencia = String(folio || "").match(/^HUMA-(\d+)$/);
    return coincidencia ? Number(coincidencia[1]) : 0;
}

function obtenerSiguienteFolio() {
    const mayorExistente = (baseDatos.empleados || []).reduce(
        (mayor, empleado) => Math.max(
            mayor,
            numeroDeFolio(empleado.folio)
        ),
        0
    );

    const contadorGuardado = Number(
        localStorage.getItem(FOLIO_COUNTER_KEY) || 0
    );

    const siguiente = Math.max(
        mayorExistente,
        contadorGuardado
    ) + 1;

    localStorage.setItem(FOLIO_COUNTER_KEY, String(siguiente));

    return "HUMA-" + String(siguiente).padStart(4, "0");
}

function completarFoliosExistentes() {
    const foliosUtilizados = new Set();

    (baseDatos.empleados || []).forEach(empleado => {
        const folio = String(empleado.folio || "");

        if (
            !/^HUMA-\d+$/.test(folio) ||
            foliosUtilizados.has(folio)
        ) {
            empleado.folio = "";
        } else {
            foliosUtilizados.add(folio);
        }
    });

    baseDatos.empleados.forEach(empleado => {
        if (!empleado.folio) {
            empleado.folio = obtenerSiguienteFolio();
            foliosUtilizados.add(empleado.folio);
        }
    });

    const mayorExistente = baseDatos.empleados.reduce(
        (mayor, empleado) => Math.max(
            mayor,
            numeroDeFolio(empleado.folio)
        ),
        0
    );

    const contadorGuardado = Number(
        localStorage.getItem(FOLIO_COUNTER_KEY) || 0
    );

    localStorage.setItem(
        FOLIO_COUNTER_KEY,
        String(Math.max(mayorExistente, contadorGuardado))
    );
}

completarFoliosExistentes();
guardarDatos();

// ==========================================
// 4. ELEMENTOS DE LA PANTALLA
// ==========================================

const dashboardView = document.getElementById("dashboard-view");
const moduleView = document.getElementById("module-view");

const pageTitle = document.getElementById("page-title");
const moduleTitle = document.getElementById("module-title");
const moduleDescription = document.getElementById("module-description");

const moduleFields = document.getElementById("module-fields");
const moduleForm = document.getElementById("module-form");

const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");

const moduleSearch = document.getElementById("module-search");
const recordCount = document.getElementById("record-count");

let moduloActual = null;
let registroEnEdicionId = null;

// ==========================================
// 5. NAVEGACIÓN
// ==========================================

function mostrarInicio() {

    moduloActual = null;

    dashboardView.hidden = false;
    moduleView.hidden = true;

    pageTitle.textContent = "Inicio";

    document.querySelectorAll(".nav-link").forEach(enlace => {
        enlace.classList.remove("active");
    });

    actualizarDashboard();
}

function abrirModulo(nombre) {

    if (!modulos[nombre]) return;

    moduloActual = nombre;

    dashboardView.hidden = true;
    moduleView.hidden = false;

    const modulo = modulos[nombre];

    pageTitle.textContent = modulo.titulo;
    moduleTitle.textContent = modulo.titulo;
    moduleDescription.textContent = modulo.descripcion;

    moduleSearch.value = "";

    document.querySelectorAll(".nav-link").forEach(enlace => {
        enlace.classList.toggle(
            "active",
            enlace.dataset.module === nombre
        );
    });

    crearFormulario(modulo);
    crearEncabezadoTabla(modulo);
    mostrarRegistros();
    actualizarResumenModulo();
}

// ==========================================
// 6. CONECTAR EL MENÚ
// ==========================================

document.querySelectorAll(".nav-link").forEach(enlace => {

    enlace.addEventListener("click", function(event) {

        event.preventDefault();

        const nombre = this.dataset.module;

        if (nombre === "inicio") {
            mostrarInicio();
        } else {
            abrirModulo(nombre);
        }

    });

});

// ==========================================
// 7. ACCESOS RÁPIDOS
// ==========================================

document.querySelectorAll("[data-go]").forEach(boton => {

    boton.addEventListener("click", function() {
        abrirModulo(this.dataset.go);
    });

});

// ==========================================
// 8. CREAR FORMULARIOS AUTOMÁTICAMENTE
// ==========================================

function crearFormulario(modulo) {

    moduleFields.replaceChildren();

    modulo.campos.forEach(campo => {

        const grupo = document.createElement("div");
        grupo.className = "form-group";

        const etiqueta = document.createElement("label");
        etiqueta.htmlFor = campo.id;
        etiqueta.textContent = campo.label;

        let entrada;

        if (campo.tipo === "select") {

            entrada = document.createElement("select");

            const opcionInicial = document.createElement("option");
            opcionInicial.value = "";
            opcionInicial.textContent = "Seleccionar...";
            entrada.appendChild(opcionInicial);

            campo.opciones.forEach(opcion => {
                const elemento = document.createElement("option");
                elemento.value = opcion;
                elemento.textContent = opcion;
                entrada.appendChild(elemento);
            });

        } else if (campo.tipo === "textarea") {

            entrada = document.createElement("textarea");
            entrada.rows = 3;

        } else {

            entrada = document.createElement("input");
            entrada.type = campo.tipo;

            if (campo.tipo === "number") {
                entrada.min = "0";
                entrada.step = "any";
            }

        }

        entrada.id = campo.id;
        entrada.name = campo.id;
        entrada.required = Boolean(campo.requerido);

        grupo.appendChild(etiqueta);
        grupo.appendChild(entrada);

        moduleFields.appendChild(grupo);

    });

}

// ==========================================
// 9. CREAR ENCABEZADOS DE TABLAS
// ==========================================

function crearEncabezadoTabla(modulo) {

    tableHead.replaceChildren();

    const fila = document.createElement("tr");

    modulo.columnas.forEach(columna => {

        const th = document.createElement("th");
        th.textContent = columna[1];

        fila.appendChild(th);

    });

    const thAcciones = document.createElement("th");
    thAcciones.textContent = "Acciones";

    fila.appendChild(thAcciones);
    tableHead.appendChild(fila);

}

// ==========================================
// 10. GUARDAR REGISTROS
// ==========================================

// ==========================================
// 10. GUARDAR Y EDITAR REGISTROS
// ==========================================

moduleForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!moduloActual) return;

    const modulo = modulos[moduloActual];
    const nuevoRegistro = {};

    for (const campo of modulo.campos) {

        const entrada = document.getElementById(campo.id);

        if (!entrada) continue;

        const valor = entrada.value.trim();

        if (campo.requerido && !valor) {
            alert("Completa el campo: " + campo.label);
            entrada.focus();
            return;
        }

        if (campo.tipo === "number" && valor !== "") {

            const numero = Number(valor);

            if (!Number.isFinite(numero) || numero < 0) {
                alert("Introduce una cantidad válida en: " + campo.label);
                entrada.focus();
                return;
            }

            nuevoRegistro[campo.id] = numero;

        } else {
            nuevoRegistro[campo.id] = valor;
        }
    }

    // Validación de fechas de permisos
    if (moduloActual === "permisos") {

        if (nuevoRegistro.fechaFin < nuevoRegistro.fechaInicio) {
            alert("La fecha de finalización no puede ser anterior al inicio.");
            return;
        }

    }

    // Validación de desempeño
    if (moduloActual === "desempeno") {

        if (nuevoRegistro.calificacion > 10) {
            alert("La calificación debe estar entre 0 y 10.");
            return;
        }

    }

    // Validación de nómina
    if (moduloActual === "nomina") {

        if (
            nuevoRegistro.deducciones >
            nuevoRegistro.salario + (nuevoRegistro.bonos || 0)
        ) {
            alert("Las deducciones no pueden superar el total registrado.");
            return;
        }

    }

    // ======================================
    // ACTUALIZAR UN REGISTRO EXISTENTE
    // ======================================

    if (registroEnEdicionId) {

        const indice = baseDatos[moduloActual].findIndex(
            registro => registro.id === registroEnEdicionId
        );

        if (indice === -1) {
            alert("No se encontró el registro que deseas editar.");
            cancelarEdicion();
            return;
        }

        const registroOriginal = baseDatos[moduloActual][indice];

        nuevoRegistro.id = registroOriginal.id;
        nuevoRegistro.fechaCreacion = registroOriginal.fechaCreacion;

        // Conservar siempre el folio original del empleado
        if (moduloActual === "empleados") {
            nuevoRegistro.folio = registroOriginal.folio;
        }

        baseDatos[moduloActual][indice] = nuevoRegistro;

        guardarDatos();

        cancelarEdicion();
        moduleForm.reset();

        mostrarRegistros();
        actualizarResumenModulo();
        actualizarDashboard();

        alert("Expediente actualizado correctamente.");

        return;
    }

    // ======================================
    // REGISTRAR UN NUEVO REGISTRO
    // ======================================

    nuevoRegistro.id = crearId();
    nuevoRegistro.fechaCreacion = new Date().toISOString();

    // Asignar folio automático a empleados
    if (moduloActual === "empleados") {
        nuevoRegistro.folio = obtenerSiguienteFolio();
    }

    baseDatos[moduloActual].push(nuevoRegistro);

    guardarDatos();

    moduleForm.reset();

    mostrarRegistros();
    actualizarResumenModulo();
    actualizarDashboard();

    alert(
        moduloActual === "empleados"
            ? "Empleado registrado correctamente. Su folio es: " + nuevoRegistro.folio
            : "Registro guardado correctamente en HUMA."
    );

});

// ==========================================
// CANCELAR MODO DE EDICIÓN
// ==========================================

function cancelarEdicion() {

    registroEnEdicionId = null;

    const titulo = document.getElementById("form-title");
    const descripcion = document.getElementById("form-description");
    const botonGuardar = document.getElementById("save-button");

    if (titulo) {
        titulo.textContent = "Registrar información";
    }

    if (descripcion) {
        descripcion.textContent = "Completa los campos correspondientes.";
    }

    if (botonGuardar) {
        botonGuardar.textContent = "Guardar registro";
    }

}
moduleForm.addEventListener("reset", function() {
    cancelarEdicion();
});

// ==========================================
// 11. GENERAR IDENTIFICADORES
// ==========================================

function crearId() {

    return Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9);

}

// ==========================================
// 12. MOSTRAR REGISTROS
// ==========================================

// ==========================================
// 12. MOSTRAR REGISTROS Y ACCIONES
// ==========================================

function mostrarRegistros() {

    if (!moduloActual) return;

    const modulo = modulos[moduloActual];

    tableBody.replaceChildren();

    const busqueda = moduleSearch.value.toLowerCase().trim();

    const registros = baseDatos[moduloActual].filter(registro => {

        return modulo.columnas.some(columna => {

            const valor = String(registro[columna[0]] ?? "");

            return valor.toLowerCase().includes(busqueda);

        });

    });

    recordCount.textContent =
        registros.length +
        (registros.length === 1 ? " registro" : " registros");

    if (registros.length === 0) {

        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.colSpan = modulo.columnas.length + 1;
        celda.className = "empty-cell";

        celda.textContent = baseDatos[moduloActual].length === 0
            ? "Todavía no hay registros."
            : "No se encontraron resultados.";

        fila.appendChild(celda);
        tableBody.appendChild(fila);

        return;

    }

    registros.forEach(registro => {

        const fila = document.createElement("tr");

        modulo.columnas.forEach(columna => {

            const celda = document.createElement("td");
            const valor = registro[columna[0]];

            if (
                columna[0] === "salario" ||
                columna[0] === "deducciones" ||
                columna[0] === "bonos"
            ) {

                celda.textContent = Number(valor || 0).toLocaleString(
                    "es-MX",
                    {
                        style: "currency",
                        currency: "MXN"
                    }
                );

            } else {

                celda.textContent = valor ?? "";

            }

            if (columna[0] === "folio") {
                celda.classList.add("folio-text");
            }

            fila.appendChild(celda);

        });

        const celdaAcciones = document.createElement("td");
        const contenedorAcciones = document.createElement("div");

        contenedorAcciones.className = "action-buttons";

        // Botón para consultar el registro
        const botonVer = document.createElement("button");

        botonVer.type = "button";
        botonVer.textContent = moduloActual === "empleados"
            ? "Ver expediente"
            : "Ver";

        botonVer.className = "view-button";

        botonVer.addEventListener("click", function() {
            verExpediente(registro.id);
        });

        function verExpediente(id) {

    const registro = baseDatos[moduloActual].find(
        elemento => elemento.id === id
    );

    if (!registro) {
        alert("No se encontró el registro.");
        return;
    }

    const modal = document.getElementById("detail-modal");
    const contenido = document.getElementById("detail-content");
    const titulo = document.getElementById("detail-modal-title");
    const botonEditar = document.getElementById("edit-detail-button");

    if (!modal || !contenido || !titulo || !botonEditar) {
        alert("Faltan elementos del expediente en index.html.");
        return;
    }

    contenido.replaceChildren();

    const esEmpleado = moduloActual === "empleados";

    titulo.textContent = esEmpleado
        ? "Expediente del empleado"
        : "Detalle del registro";

    botonEditar.hidden = !esEmpleado;

    if (esEmpleado) {
        botonEditar.onclick = function() {
            editarEmpleado(id);
        };
    }

   if (esEmpleado) {

    agregarDetalle(
        contenido,
        "Folio",
        registro.folio
    );

    agregarDetalle(
        contenido,
        "Antigüedad en la empresa",
        calcularAntiguedad(registro.fechaIngreso)
    );

}

    modulos[moduloActual].campos.forEach(campo => {
        agregarDetalle(
            contenido,
            campo.label,
            registro[campo.id]
        );
    });

    if (registro.fechaCreacion) {
        agregarDetalle(
            contenido,
            "Fecha de creación",
            new Date(registro.fechaCreacion).toLocaleString("es-MX")
        );
    }

    modal.hidden = false;
}
function calcularAntiguedad(fechaIngreso) {

    if (!fechaIngreso) {
        return "Sin fecha de ingreso";
    }

    const inicio = new Date(fechaIngreso + "T00:00:00");
    const hoy = new Date();

    if (isNaN(inicio.getTime()) || inicio > hoy) {
        return "Fecha de ingreso no válida";
    }

    let años = hoy.getFullYear() - inicio.getFullYear();
    let meses = hoy.getMonth() - inicio.getMonth();
    let dias = hoy.getDate() - inicio.getDate();

    if (dias < 0) {
        meses--;

        const diasMesAnterior = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            0
        ).getDate();

        dias += diasMesAnterior;
    }

    if (meses < 0) {
        años--;
        meses += 12;
    }

    return `${años} años, ${meses} meses y ${dias} días`;
}
function agregarDetalle(contenedor, etiqueta, valor) {

    const elemento = document.createElement("div");
    elemento.className = "detail-item";

    const nombre = document.createElement("strong");
    nombre.textContent = etiqueta;

    const dato = document.createElement("span");
    dato.textContent = valor || "Sin información";

    elemento.appendChild(nombre);
    elemento.appendChild(dato);

    contenedor.appendChild(elemento);
}
// CERRAR LA VENTANA DEL EXPEDIENTE

document.querySelectorAll("[data-close-modal]").forEach(elemento => {

    elemento.addEventListener("click", function() {

        const modal = document.getElementById("detail-modal");

        if (modal) {
            modal.hidden = true;
        }

    });

});
        contenedorAcciones.appendChild(botonVer);

        // Botón para editar empleados
        if (moduloActual === "empleados") {

            const botonEditar = document.createElement("button");

            botonEditar.type = "button";
            botonEditar.textContent = "Editar";
            botonEditar.className = "edit-button";

            botonEditar.addEventListener("click", function() {
                editarEmpleado(registro.id);
            });

            contenedorAcciones.appendChild(botonEditar);

        }

        // Botón para eliminar
        const botonEliminar = document.createElement("button");

        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "delete-button";

        botonEliminar.addEventListener("click", function() {

            const confirmar = confirm(
                moduloActual === "empleados"
                    ? "¿Estás seguro de eliminar este empleado?"
                    : "¿Estás seguro de eliminar este registro?"
            );

            if (!confirmar) return;

            baseDatos[moduloActual] = baseDatos[moduloActual].filter(
                elemento => elemento.id !== registro.id
            );

            guardarDatos();

            mostrarRegistros();
            actualizarResumenModulo();
            actualizarDashboard();

        });

        contenedorAcciones.appendChild(botonEliminar);

        celdaAcciones.appendChild(contenedorAcciones);
        fila.appendChild(celdaAcciones);

        tableBody.appendChild(fila);

    });

}
// ==========================================
// 12.1 CONSULTAR EXPEDIENTES
// ==========================================

function verExpediente(id) {

    const registro = baseDatos[moduloActual].find(
        elemento => elemento.id === id
    );

    if (!registro) {
        alert("No se encontró el registro.");
        return;
    }

    const modal = document.getElementById("detail-modal");
    const contenido = document.getElementById("detail-content");
    const titulo = document.getElementById("detail-modal-title");
    const botonEditar = document.getElementById("edit-detail-button");

    contenido.replaceChildren();

    const esEmpleado = moduloActual === "empleados";

    titulo.textContent = esEmpleado
        ? "Expediente del empleado"
        : "Detalle del registro";

    botonEditar.hidden = !esEmpleado;

    if (esEmpleado) {
        botonEditar.onclick = function() {
            editarEmpleado(id);
        };
    }

    // Mostrar folio
    if (esEmpleado) {
        agregarDetalle(contenido, "Folio", registro.folio);
    }
if (esEmpleado) {

    agregarDetalle(
        contenido,
        "Antigüedad en la empresa",
        calcularAntiguedad(registro.fechaIngreso)
    );

}
    // Mostrar todos los campos del registro
    modulos[moduloActual].campos.forEach(campo => {

        agregarDetalle(
            contenido,
            campo.label,
            registro[campo.id]
        );

    });

    // Mostrar fecha de creación
    if (registro.fechaCreacion) {

        agregarDetalle(
            contenido,
            "Fecha de creación",
            new Date(registro.fechaCreacion).toLocaleString("es-MX")
        );

    }

    modal.hidden = false;

}

function agregarDetalle(contenedor, etiqueta, valor) {

    const elemento = document.createElement("div");
    elemento.className = "detail-item";

    const nombre = document.createElement("strong");
    nombre.textContent = etiqueta;

    const dato = document.createElement("span");
    dato.textContent = valor === undefined || valor === null || valor === ""
        ? "Sin información"
        : String(valor);

    elemento.appendChild(nombre);
    elemento.appendChild(dato);

    contenedor.appendChild(elemento);

}
// ==========================================
// 12.2 EDITAR EXPEDIENTE DE EMPLEADO
// ==========================================

function editarEmpleado(id) {

    const empleado = baseDatos.empleados.find(
        registro => registro.id === id
    );

    if (!empleado) {
        alert("No se encontró el empleado.");
        return;
    }

    const modal = document.getElementById("detail-modal");

    if (modal) {
        modal.hidden = true;
    }

    abrirModulo("empleados");

    registroEnEdicionId = empleado.id;

    // Cargar información en el formulario
    modulos.empleados.campos.forEach(campo => {

        const entrada = document.getElementById(campo.id);

        if (entrada) {
            entrada.value = empleado[campo.id] ?? "";
        }

    });

    document.getElementById("form-title").textContent =
        "Editar expediente";

    document.getElementById("form-description").textContent =
        "Modifica la información del empleado. Su folio se conservará.";

    document.getElementById("save-button").textContent =
        "Guardar cambios";

    moduleForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// ==========================================
// 13. BUSCADOR
// ==========================================

moduleSearch.addEventListener("input", mostrarRegistros);

// ==========================================
// 14. RESUMEN DE CADA MÓDULO
// ==========================================

function actualizarResumenModulo() {

    if (!moduloActual) return;

    const registros = baseDatos[moduloActual];

    const resumen = document.getElementById("module-summary");

    resumen.replaceChildren();

    const tarjeta = document.createElement("div");
    tarjeta.className = "summary-box";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = "Total de registros";

    const numero = document.createElement("strong");
    numero.textContent = registros.length;

    tarjeta.appendChild(etiqueta);
    tarjeta.appendChild(numero);

    resumen.appendChild(tarjeta);

    if (moduloActual === "empleados") {

        const activos = registros.filter(
            registro => registro.estatus === "Activo"
        ).length;

        agregarTarjetaResumen(
            resumen,
            "Empleados activos",
            activos
        );

    }

    if (moduloActual === "permisos") {

        const pendientes = registros.filter(
            registro => registro.estado === "Pendiente"
        ).length;

        agregarTarjetaResumen(
            resumen,
            "Solicitudes pendientes",
            pendientes
        );

    }

    if (moduloActual === "reclutamiento") {

        const candidatos = registros.filter(
            registro => registro.estado !== "No seleccionado"
        ).length;

        agregarTarjetaResumen(
            resumen,
            "Procesos activos",
            candidatos
        );

    }

}

function agregarTarjetaResumen(contenedor, texto, cantidad) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "summary-box";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = texto;

    const numero = document.createElement("strong");
    numero.textContent = cantidad;

    tarjeta.appendChild(etiqueta);
    tarjeta.appendChild(numero);

    contenedor.appendChild(tarjeta);

}

// ==========================================
// 15. ACTUALIZAR PANEL PRINCIPAL
// ==========================================

function actualizarDashboard() {

    const empleados = baseDatos.empleados || [];
    const asistencias = baseDatos.asistencia || [];
    const permisos = baseDatos.permisos || [];
    const candidatos = baseDatos.reclutamiento || [];

    document.getElementById("stat-employees").textContent =
        empleados.length;

    document.getElementById("stat-attendance").textContent =
        asistencias.length;

    const statPermissions = document.getElementById("stat-permissions");

if (statPermissions) {
    statPermissions.textContent = permisos.length;
}
    document.getElementById("stat-candidates").textContent =
        candidatos.length;

    mostrarActividad();

}

// ==========================================
// 16. ACTIVIDAD RECIENTE
// ==========================================

function mostrarActividad() {

    const contenedor = document.getElementById("recent-activity");

    contenedor.replaceChildren();

    let actividades = [];

    Object.keys(modulos).forEach(clave => {

        (baseDatos[clave] || []).forEach(registro => {

            actividades.push({
                modulo: modulos[clave].titulo,
                fecha: registro.fechaCreacion,
                nombre:
                    registro.nombre ||
                    registro.empleado ||
                    registro.candidato ||
                    registro.documento ||
                    registro.vacante ||
                    "Nuevo registro"
            });

        });

    });

    actividades.sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha);
    });

    actividades = actividades.slice(0, 6);

    if (actividades.length === 0) {

        const mensaje = document.createElement("p");
        mensaje.className = "empty-message";
        mensaje.textContent = "Todavía no hay actividad registrada.";

        contenedor.appendChild(mensaje);

        return;

    }

    actividades.forEach(actividad => {

        const elemento = document.createElement("div");
        elemento.className = "activity-item";

        const informacion = document.createElement("div");

        const nombre = document.createElement("strong");
        nombre.textContent = actividad.nombre;

        const modulo = document.createElement("div");
        modulo.textContent = actividad.modulo;
        modulo.style.color = "#92949d";
        modulo.style.marginTop = "4px";

        informacion.appendChild(nombre);
        informacion.appendChild(modulo);

        const fecha = document.createElement("span");

        fecha.textContent = new Date(
            actividad.fecha
        ).toLocaleDateString("es-MX");

        elemento.appendChild(informacion);
        elemento.appendChild(fecha);

        contenedor.appendChild(elemento);

    });

}

// ==========================================
// 17. FECHA ACTUAL
// ==========================================

function mostrarFecha() {

    const elemento = document.getElementById("current-date");

    elemento.textContent = new Date().toLocaleDateString(
        "es-MX",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}

// ==========================================
// 18. CONEXIÓN PREPARADA CON SUPABASE
// ==========================================

const SUPABASE_URL = "https://bujxqakvsrrdjtzujddc.supabase.co";
const SUPABASE_KEY = "sb_publishable_brSV18QwpTsnxBdAEUH-Zg__HMwnc40";

let supabaseClient = null;

if (window.supabase && window.supabase.createClient) {

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    console.log("HUMA: cliente de Supabase preparado.");

} else {

    console.warn("HUMA: no se pudo cargar Supabase.");

}

// ==========================================
// 19. INICIAR HUMA
// ==========================================

mostrarFecha();
mostrarInicio();