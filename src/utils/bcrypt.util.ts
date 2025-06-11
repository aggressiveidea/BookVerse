import bcrypt from 'bcrypt'

export class bcryptUtil{
    static async hash(password: string): Promise<string> {
        const saltRounds = 10;
        const pass =  await bcrypt.hash(password, saltRounds);
        return pass
    }
    static async compare(password: string, hash: string): Promise<boolean>{
       const comp = await bcrypt.compare(password, hash);
       return comp
    }
}