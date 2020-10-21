import { Api } from './api.js';

export { RoutineApi, Routine };

class RoutineApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static async add(routine, controller) {
        return await Api.post(RoutineApi.url, true, routine, controller);
    }

    static async modify(routine, controller) {
        return await Api.put(`${RoutineApi.url}/${routine.id}`, true, routine, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(`${RoutineApi.url}/${id}`, true, controller);
    }

    static async get(id, controller) {
        return await Api.get(`${RoutineApi.url}/${id}`, true, controller);
    }

    static async getAll(controller) {
        return await Api.get(RoutineApi.url, true, controller);
    }
}

class Routine {
    constructor(id, name, detail) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
    }
}