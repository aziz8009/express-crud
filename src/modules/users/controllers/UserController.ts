// UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {


        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ message: "Berhasil, mengambil data users", status: true, data: users });
        } catch (err: any) {

            res.status(400).json({ status: false, message: err.message, data: null });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {


        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            res.status(200).json({ message: "Berhasil, mengambil data users", status: true, data: user });

        } catch (err: any) {

            res.status(400).json({ status: false, message: err.message, data: null });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body);

            res.status(201).json({ message: "Berhasil, menambah data users", status: true, data: user });

        } catch (err: any) {

            res.status(400).json({ status: false, message: err.message, data: null });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {

        try {
            const { id } = req.params;

            const user = await this.userService.updateUser(id, req.body);

            res.status(200).json({ message: "Berhasil, mengubah data users", status: true, data: user });
        } catch (err: any) {

            res.status(400).json({ status: false, message: err.message, data: null });
        }

    }

    async deleteUser(req: Request, res: Response): Promise<void> {

        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(200).json({ message: 'Berhasil, menghapus data users', status: true });
        } catch (err: any) {

            res.status(400).json({ status: false, message: err.message, data: null });
        }


    }
}
