const API_URL = 'http://localhost:3000/api';

const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.mensaje || 'Error en la solicitud');
        }
        return data;
    },

    auth: {
        async login(email, password) {
            return api.request('/usuarios/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
        },
        async register(userData) {
            return api.request('/usuarios/registro', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        }
    },

    usuarios: {
        async getPerfil(id) {
            return api.request(`/usuarios/perfil/${id}`);
        },
        async getAll(filters = {}) {
            const params = new URLSearchParams(filters);
            return api.request(`/usuarios?${params}`);
        },
        async delete(id) {
            return api.request(`/usuarios/${id}`, {
                method: 'DELETE'
            });
        }
    },

    campos: {
        async getAll(ordenar = 'desc') {
            return api.request(`/campos/lista?ordenar=${ordenar}`);
        },
        async create(campoData) {
            return api.request('/campos/nuevo', {
                method: 'POST',
                body: JSON.stringify(campoData)
            });
        },
        async update(id, campoData) {
            return api.request(`/campos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(campoData)
            });
        },
        async delete(id) {
            return api.request(`/campos/${id}`, {
                method: 'DELETE'
            });
        }
    },

    reservas: {
        async create(reservaData) {
            return api.request('/reservas', {
                method: 'POST',
                body: JSON.stringify(reservaData)
            });
        },
        async getByUser(userId, ordenar = 'desc') {
            return api.request(`/reservas/usuario/${userId}?ordenar=${ordenar}`);
        },
        async getAll(filters = {}) {
            const params = new URLSearchParams(filters);
            return api.request(`/reservas?${params}`);
        },
        async cancel(id) {
            return api.request(`/reservas/${id}`, {
                method: 'DELETE'
            });
        }
    },

resultados: {
        async create(resultadoData) {
            return api.request('/resultados', {
                method: 'POST',
                body: JSON.stringify(resultadoData)
            });
        },
        async getByUser(userId, ordenar = 'desc') {
            return api.request(`/resultados/usuario/${userId}?ordenar=${ordenar}`);
        },
        async getAll(filters = {}) {
            return api.request('/resultados');
        }
    }
};

function showMessage(message, type = 'error') {
    const container = document.getElementById('message-container') || createMessageContainer();
    container.innerHTML = `<div class="message ${type}">${message}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
}

function createMessageContainer() {
    const div = document.createElement('div');
    div.id = 'message-container';
    div.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000;';
    document.body.appendChild(div);
    return div;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/views/index.html';
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token && !window.location.pathname.includes('index.html')) {
        window.location.href = '/views/index.html';
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);