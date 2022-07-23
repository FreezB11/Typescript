import jsonfile from 'jsonfile';

const dbFilePath = 'src/repos/database.json';

function openDb(): Promise<Record<string, any>> {
    return jsonfile.readFile(dbFilePath);
}

function saveDb(db: Record<string, any>): Promise<void> {
    return jsonfile.writeFile(dbFilePath, db);
}

export default {
    openDb,
    saveDb,
} as const;
