class PacientesDatabaseSimulator {
    constructor() {
        // Datos iniciales simulados para pacientes
        this.data = [
            {
                id_paciente: 1,
                ididentificacion: '1',
                nombres_paciente: 'Alejandro',
                apellidos_paciente: 'Mendoza Vargas',
                identificacion_paciente: '9876543210',
                altura_paciente: '1.75',
                peso_paciente: '70',
                genero_paciente: 'Masculino',
                edad_paciente: '28',
                direccion_paciente: 'Av. Siempre Viva 742',
                telefono_paciente: '0981234567',
                correo_paciente: 'alejandro.mendoza@example.com'
            },
            // Puedes agregar más datos iniciales si lo deseas
        ];
    }

    // Obtener todos los pacientes
    getAllPacientes() {
        return this.data;
    }

    // Agregar un nuevo paciente
    addPaciente(paciente) {        
        const newId = this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1;
        const newPaciente = {
            id_paciente: newId,
            ...paciente
        };
        this.data.push(newPaciente);
        return newPaciente;
    }

    // Obtener un paciente por su ID
    getPacienteById(id) {
        return this.data.find(paciente => paciente.id_paciente === id);
    }

    // Actualizar un paciente por su ID
    updatePacienteById(id, pacienteActualizado) {
        const paciente = this.getPacienteById(id); // Busca el paciente por su ID
        if (paciente) {
            // Actualiza los campos del paciente con los valores del objeto pacienteActualizado
            Object.assign(paciente, pacienteActualizado);
            return paciente; // Retorna el paciente actualizado
        } else {
            throw new Error('Paciente no encontrado'); // Si no se encuentra el paciente, lanza un error
        }
    }

    // Eliminar un paciente por su ID
    deletePacienteById(id) {
        const index = this.data.findIndex(paciente => paciente.id_paciente === id);
        if (index !== -1) {
            this.data.splice(index, 1);
        }
    }
}

export default PacientesDatabaseSimulator;
