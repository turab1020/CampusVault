// Mock API Service for CampusVault
import productsData from '../data/products.json'

// Mimic a network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const api = {
    get: async (endpoint) => {
        await delay(300)
        if (endpoint === '/listings' || endpoint.startsWith('/listings?')) {
            return { data: productsData }
        }
        if (endpoint.startsWith('/listings/')) {
            const id = endpoint.split('/').pop()
            const item = productsData.find(i => String(i.id) === id)
            if (item) return { data: item }
            throw new Error('Not found')
        }
        if (endpoint.startsWith('/users/')) {
            return {
                data: {
                    id: 'usr-1',
                    email: 'student@campus.edu',
                    role: 'STUDENT',
                    trustScore: 98,
                    profile: {
                        name: 'Ali Hassan',
                        avatarRef: null
                    }
                }
            }
        }
        if (endpoint === '/bookings/mine') {
            return {
                data: {
                    asRenter: []
                }
            }
        }
        return { data: [] }
    },
    post: async (endpoint, payload) => {
        await delay(500)
        if (endpoint === '/auth/login') {
            if (payload.email && payload.password) {
                return {
                    data: {
                        token: 'mock-jwt-token-1234',
                        user: {
                            id: 'usr-1',
                            email: payload.email,
                            role: payload.email.includes('admin') ? 'ADMIN' : 'STUDENT',
                            trustScore: 98
                        }
                    }
                }
            }
        }
        if (endpoint === '/auth/register') {
            return { data: { success: true } }
        }
        if (endpoint === '/bookings') {
            return { data: { success: true, id: 'booking-mock-1' } }
        }
        return { data: { success: true } }
    },
    patch: async (endpoint) => {
        await delay(300)
        return { data: { success: true } }
    }
}

export default api
