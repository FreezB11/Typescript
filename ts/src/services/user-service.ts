import userRepo from 'src/db/user-repo';
import { IUser } from '@models/user-model';
import { UserNotFoundError } from '../pre-start/errors';

function getAll(): Promise<IUser[]> {
    return userRepo.getAll();
}

function addOne(user: IUser): Promise<void> {
    return userRepo.add(user);
}

async function updateOne(user: IUser): Promise<void> {
    const persists = await userRepo.persists(user.id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return userRepo.update(user);
}

async function deleteOne(id: number): Promise<void> {
    const persists = await userRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return userRepo.delete(id);
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
