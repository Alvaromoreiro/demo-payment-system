import bcrypt from 'bcrypt';
import { connectToCollectionUser } from '../mongo/mongoClient';

// Clase AuthModel
export class AuthModel {
    static async login({ email, password }: { email: string; password: string }): Promise<{ email: string; id: string }> {
        const db = await connectToCollectionUser();
        if (!db) {
            throw new Error('Database connection failed');
        }

        const user = await db.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return {
            id: user._id.toString(),
            email: user.email.toString(),
        };
    }

    static async register({ email, password }: { email: string; password: string }): Promise<{ email: string; id: string }> {
        const db = await connectToCollectionUser();

        if (!db) {
            throw new Error('Database connection failed');
        }

        const existingUser = await db.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { email, password: hashedPassword };
        const result = await db.insertOne(user);

        return {
            id: result.insertedId.toString(),
            email: user.email,
        };
    }

    static async logout(): Promise<void> {
        // Aquí puedes agregar la lógica de cierre de sesión si es necesario
        console.log('User logged out'); // Ejemplo de log
    }

    static async resetPassword(email: string, newPassword: string, oldPassword: string): Promise<boolean> {
        const db = await connectToCollectionUser();
        if (!db) {
            throw new Error('Database connection failed');
        }

        const user = await db.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await db.updateOne({ email }, { $set: { password: hashedPassword } });

        return result.modifiedCount > 0;
    }
}
