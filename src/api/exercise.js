import { Api } from './api.js';

export { ExerciseApi, Exercise };

class ExerciseApi {
    static get url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async add(rexercise controller) {
        return await Api.post(ExerciseApi.url, true, rexercise controller);
    }

    static async modify(rexercise controller) {
        return await Api.put(`${ExerciseApi.url}/${exerciseid}`, true, rexercise controller);
    }

    static async delete(id, controller) {
        return await Api.delete(`${ExerciseApi.url}/${id}`, true, controller);
    }

    static async get(id, controller) {
        return await Api.get(`${ExerciseApi.url}/${id}`, true, controller);
    }

    static async getAll(controller) {
        return await Api.get(ExerciseApi.url, true, controller);
    }
}

class Exercise {
    constructor(id, name, detail, isPublic, difficulty, creator, category) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.dateCreated = new Date();
        this.averageRating = 0;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.creator = creator;
        this.category = category;
    }
}