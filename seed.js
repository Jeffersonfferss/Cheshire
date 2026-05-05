const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String,
    handicap: Number
});

usuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const campoSchema = new mongoose.Schema({
    nombre: String,
    ubicacion: String,
    hoyos: Number,
    par: Number
});

const reservaSchema = new mongoose.Schema({
    usuario_id: mongoose.Schema.Types.ObjectId,
    campo_id: mongoose.Schema.Types.ObjectId,
    fecha: Date,
    hora: String,
    num_jugadores: Number,
    estado: String
});

const resultadoSchema = new mongoose.Schema({
    usuario_id: mongoose.Schema.Types.ObjectId,
    campo_id: mongoose.Schema.Types.ObjectId,
    fecha: Date,
    total_golpes: Number
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Campo = mongoose.model('Campo', campoSchema);
const Reserva = mongoose.model('Reserva', reservaSchema);
const Resultado = mongoose.model('Resultado', resultadoSchema);

async function seed() {
    await mongoose.connect('mongodb://admin:golfpassword123@localhost:27017/cheshire?authSource=admin');

    await Usuario.deleteMany({});
    await Campo.deleteMany({});
    await Reserva.deleteMany({});
    await Resultado.deleteMany({});

    const admin = await Usuario.create({
        nombre: 'Admin',
        email: 'admin@cheshire.com',
        password: 'admin123',
        rol: 'admin',
        handicap: 0
    });

    const jugador1 = await Usuario.create({
        nombre: 'Juan García',
        email: 'juan@golf.com',
        password: 'juan123',
        rol: 'jugador',
        handicap: 12.5
    });

    const jugador2 = await Usuario.create({
        nombre: 'María López',
        email: 'maria@golf.com',
        password: 'maria123',
        rol: 'jugador',
        handicap: 18.0
    });

    const campos = await Campo.create([
        { nombre: 'Campo Real', ubicacion: 'Madrid', hoyos: 18, par: 72 },
        { nombre: 'Green Valley', ubicacion: 'Barcelona', hoyos: 18, par: 70 },
        { nombre: 'Los Lagos', ubicacion: 'Valencia', hoyos: 18, par: 71 }
    ]);

    const hoy = new Date();
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    await Reserva.create([
        { usuario_id: jugador1._id, campo_id: campos[0]._id, fecha: hoy, hora: '09:00', num_jugadores: 4, estado: 'confirmada' },
        { usuario_id: jugador1._id, campo_id: campos[1]._id, fecha: mañana, hora: '10:30', num_jugadores: 2, estado: 'pendiente' },
        { usuario_id: jugador2._id, campo_id: campos[0]._id, fecha: hoy, hora: '11:00', num_jugadores: 3, estado: 'confirmada' },
        { usuario_id: jugador2._id, campo_id: campos[2]._id, fecha: mañana, hora: '08:00', num_jugadores: 4, estado: 'confirmada' }
    ]);

    await Resultado.create([
        { usuario_id: jugador1._id, campo_id: campos[0]._id, fecha: new Date('2026-04-20'), total_golpes: 85 },
        { usuario_id: jugador1._id, campo_id: campos[1]._id, fecha: new Date('2026-04-25'), total_golpes: 82 },
        { usuario_id: jugador2._id, campo_id: campos[0]._id, fecha: new Date('2026-04-22'), total_golpes: 92 },
        { usuario_id: jugador2._id, campo_id: campos[2]._id, fecha: new Date('2026-04-28'), total_golpes: 88 }
    ]);

    console.log('✅ Datos de prueba creados:');
    console.log('   Admin: admin@cheshire.com / admin123');
    console.log('   Jugador: juan@golf.com / juan123');
    console.log('   Jugador: maria@golf.com / maria123');

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(console.error);